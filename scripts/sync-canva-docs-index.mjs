import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCES = [
  { id: 'apps', url: 'https://www.canva.dev/docs/apps/llms.txt', minLinks: 200 },
  { id: 'admin', url: 'https://www.canva.dev/docs/admin/llms.txt', minLinks: 20 },
];
const ROOT = 'docs/canva';
const MANIFEST = ROOT + '/canva-url-manifest.json';
const DESCRIPTION = 'URL-to-file map generated from official Canva Apps and Admin llms.txt indexes. Existing files were preserved.';
const PLACEHOLDER = '> Structure-only placeholder. The original page content has not been copied into this file.';

function pathForUrl(url){
  const match=url.match(/^https?:\/\/([^/?#]+)(\/[^?#]*)?/);
  if(!match||match[1].toLowerCase()!=="www.canva.dev")return null;
  const pathname=match[2]||"/", parts=pathname.split("/").filter(Boolean);
  if(parts[0]!=="docs"||parts.length<2)return null;
  const tail=parts.slice(1);
  if(!tail.every(part=>/^[a-z0-9][a-z0-9._%-]*$/i.test(part)&&part!==".."&&!/%2f|%5c/i.test(part)))return null;
  const last=tail.at(-1);
  if(last.endsWith(".md"))return tail.length===1?`${ROOT}/${last.slice(0,-3)}/index.md`:`${ROOT}/${tail.join("/")}`;
  if(last.includes("."))return null;
  return `${ROOT}/${tail.join("/")}${pathname.endsWith("/")&&tail.length===1?"/index.md":".md"}`;
}

function buildCatalog(indexes){
  const pages=new Map(), other=new Map();
  for(const source of SOURCES){
    const markdown=indexes[source.id];
    if(typeof markdown!=="string")throw new Error(`Missing source: ${source.id}`);
    const links=[
      ...[...markdown.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(m=>({title:m[1],url:m[2].trim()})),
      ...[...markdown.matchAll(/https?:\/\/[^\s<>()\]]+/g)].map(m=>({title:"",url:m[0]}))
    ];
    for(let {title,url} of links){
      if(url.startsWith("/"))url=`https://www.canva.dev${url}`;
      if(!/^https?:\/\//.test(url))continue;
      url=url.replace(/[.,;]+$/,"");
      const local=pathForUrl(url);
      if(local){
        if(!pages.has(local))pages.set(local,{path:local,title:title||local.split("/").at(-1).replace(/\.md$/,""),urls:new Set(),sources:new Set()});
        const rec=pages.get(local);
        if(title&&(!rec.title||rec.title==="Overview"))rec.title=title;
        rec.urls.add(url);rec.sources.add(source.id);
      } else if(!other.has(url))other.set(url,{url,source:source.id});
    }
  }
  return {pages:[...pages.values()].sort((a,b)=>a.path.localeCompare(b.path)),external:[...other.values()].sort((a,b)=>a.url.localeCompare(b.url))};
}

function placeholder(rec){
 const title=String(rec.title||"Canva documentation").replace(/[\r\n#]/g," ").trim();
 return `# ${title}\n\n**Official source:** ${rec.urls[0]}\n\n**Documentation index:** ${rec.sources.map(id=>`https://www.canva.dev/docs/${id}/llms.txt`).join(", ")}\n\n${PLACEHOLDER}\n`;
}

function synchronize(rootDir,indexes){
 const {pages,external}=buildCatalog(indexes);
 if(pages.length<200||pages.length>1000)throw new Error(`Unexpected documentation page count: ${pages.length}`);
 const manifestFile=path.join(rootDir,MANIFEST);
 const previous=fs.existsSync(manifestFile)?JSON.parse(fs.readFileSync(manifestFile,"utf8")):{pages:[]};
 if(!Array.isArray(previous.pages))throw new Error("Invalid existing Canva manifest");
 const previousByPath=new Map(previous.pages.map(rec=>[rec.path,rec]));
 const records=pages.map(rec=>{
   const fullPath=path.resolve(rootDir,rec.path), expectedRoot=path.resolve(rootDir,ROOT)+path.sep;
   if(!fullPath.startsWith(expectedRoot))throw new Error(`Refusing unsafe path: ${rec.path}`);
   const old=previousByPath.get(rec.path);
   return {path:rec.path,title:rec.title,urls:[...rec.urls].sort(),sources:[...rec.sources].sort(),status:old?.status==="created-placeholder"||old?.status==="preserved-existing"?old.status:fs.existsSync(fullPath)?"preserved-existing":"created-placeholder"};
 });
 const recordMap=new Map(records.map(rec=>[rec.path,rec]));
 const ordered=previous.pages.filter(rec=>recordMap.has(rec.path)).map(rec=>recordMap.get(rec.path));
 ordered.push(...records.filter(rec=>!previousByPath.has(rec.path)));
 const output={description:DESCRIPTION,source_indexes:SOURCES.map(source=>source.url),pages:ordered,referenced_non_document_urls:external};
 const missing=records.filter(rec=>!fs.existsSync(path.join(rootDir,rec.path)));
 const withdrawn=previous.pages.filter(rec=>!recordMap.has(rec.path)).map(rec=>rec.path);
 for(const rec of missing){
   const filename=path.join(rootDir,rec.path);
   fs.mkdirSync(path.dirname(filename),{recursive:true});
   fs.writeFileSync(filename,placeholder(rec),{flag:"wx"});
 }
 const next=JSON.stringify(output,null,2)+"\n";
 if(!fs.existsSync(manifestFile)||fs.readFileSync(manifestFile,"utf8")!==next){
   fs.mkdirSync(path.dirname(manifestFile),{recursive:true});
   fs.writeFileSync(manifestFile,next);
 }
 const report=`Canva index sync: ${records.length} mapped pages; ${missing.length} new files; ${withdrawn.length} withdrawn paths (files retained); ${external.length} external URLs.`;
 console.log(report);
 if(withdrawn.length)console.log("Withdrawn paths (not deleted):\n"+withdrawn.map(v=>`  ${v}`).join("\n"));
 if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,`### Canva documentation index\n\n${report}\n\nFull page content is **not** mirrored. Existing documents are never overwritten or deleted.\n`);
 return {mapped:records.length,created:missing.length,withdrawn,external:external.length};
}

async function fetchIndexes(fetchImpl=fetch){
 const data={};
 for(const source of SOURCES){
   const response=await fetchImpl(source.url,{headers:{Accept:"text/plain","User-Agent":"utekos-ai-context-index-sync/1.0"},signal:AbortSignal.timeout(30000)});
   if(!response.ok)throw new Error(`${source.id}: HTTP ${response.status}`);
   const text=await response.text();
   const matched=[...text.matchAll(/https:\/\/www\.canva\.dev\/docs\//g)].length;
   if(text.length>2_000_000||!text.trimStart().startsWith("#")||matched<source.minLinks)throw new Error(`${source.id}: unexpected index format, links=${matched}, size=${text.length}`);
   data[source.id]=text;
 }
 return data;
}

export { SOURCES, buildCatalog, synchronize, fetchIndexes };
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const indexes = await fetchIndexes();
    synchronize(process.cwd(), indexes);
  } catch (error) {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  }
}
