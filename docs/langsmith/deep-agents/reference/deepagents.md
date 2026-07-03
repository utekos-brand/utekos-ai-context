# deepagents

> JavaScript/TypeScript package

📖 [View in docs](https://reference.langchain.com/javascript/deepagents)

<div align="center">
  <a href="https://docs.langchain.com/oss/javascript/deepagents/overview#deep-agents-overview">
    <picture>
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/langchain-ai/deepagentsjs/refs/heads/main/.github/images/logo-light.svg">
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/langchain-ai/deepagentsjs/refs/heads/main/.github/images/logo-dark.svg">
      <img alt="Deep Agents Logo" src="https://raw.githubusercontent.com/langchain-ai/deepagentsjs/refs/heads/main/.github/images/logo-light.svg" width="50%">
    </picture>
  </a>
</div>

<div align="center">
  <h3>The batteries-included agent harness.</h3>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/deepagents"><img src="https://img.shields.io/npm/v/deepagents.svg" alt="npm version"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0+-blue.svg" alt="TypeScript"></a>
  <a href="https://x.com/langchain_js" target="_blank"><img src="https://img.shields.io/twitter/url/https/twitter.com/langchain_js.svg?style=social&label=Follow%20%40LangChain_JS" alt="Twitter / X"></a>
</div>

<br>

Deep Agents is an agent harness. An opinionated, ready-to-run agent out of the box. Instead of wiring prompts, tools, and context management yourself, you get a working agent immediately and customize what you need.

**What's included:**

- **Planning** — `write_todos` for task breakdown and progress tracking
- **Filesystem** — `read_file`, `write_file`, `edit_file`, `ls`, `glob`, `grep` for working memory
- **Sub-agents** — `task` for delegating work with isolated context windows
- **Smart defaults** — built-in prompt and middleware that make these tools useful out of the box
- **Context management** — file-based workflows to keep long tasks manageable

> [!NOTE]
> Looking for the Python package? See [langchain-ai/deepagents](https://github.com/langchain-ai/deepagents).

## Quickstart

```bash
npm install deepagents
# or
pnpm add deepagents
# or
yarn add deepagents
```

> [!IMPORTANT]
> `deepagents` declares the LangChain runtime packages as **peer dependencies** so
> your app controls their versions and everything resolves to a single shared copy.
> npm 7+ and pnpm 8+ install these automatically; **Yarn users must add them explicitly**:
>
> ```bash
> yarn add @langchain/core @langchain/langgraph @langchain/langgraph-checkpoint @langchain/langgraph-sdk langchain langsmith
> ```

```typescript
import { createDeepAgent } from "deepagents";

const agent = createDeepAgent();

const result = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "Research LangGraph and write a summary in summary.md",
    },
  ],
});
```

The agent can plan, read/write files, and manage longer tasks with sub-agents and filesystem tools.

> [!TIP]
> For developing, debugging, and deploying AI agents and LLM applications, see [LangSmith](https://docs.langchain.com/langsmith/home).

## Runtime Entrypoints

`deepagents` now publishes environment-specific entrypoints:

- `deepagents` - default Node.js/server entrypoint with the full API.
- `deepagents/browser` - recommended browser entrypoint (no Node-only exports).
- `deepagents/node` - optional explicit Node.js entrypoint (same full API as `deepagents`).

```typescript
// Browser-safe usage
import { createDeepAgent, StateBackend } from "deepagents/browser";

// Node.js usage (recommended)
import { createDeepAgent, FilesystemBackend } from "deepagents";

// Optional explicit Node.js usage
// import { createDeepAgent, FilesystemBackend } from "deepagents/node";
```

## Customization

Add tools, swap models, and customize prompts as needed:

```typescript
import { ChatOpenAI } from "@langchain/openai";
import { createDeepAgent } from "deepagents";

const agent = createDeepAgent({
  model: new ChatOpenAI({ model: "gpt-5", temperature: 0 }),
  tools: [myCustomTool],
  systemPrompt: "You are a research assistant.",
});
```

See the [JavaScript Deep Agents docs](https://docs.langchain.com/oss/javascript/deepagents/overview) for full configuration options.

## LangGraph Native

`createDeepAgent` returns a compiled [LangGraph](https://docs.langchain.com/oss/javascript/langgraph/overview) graph, so you can use streaming, Studio, checkpointers, and other LangGraph features.

## Why Use It

- **100% open source** — MIT licensed and extensible
- **Provider agnostic** — works with tool-calling chat models
- **Built on LangGraph** — production runtime with streaming and persistence
- **Batteries included** — planning, file access, sub-agents, and defaults out of the box
- **Fast to start** — install and run with sensible defaults
- **Easy to customize** — add tools/models/prompts when you need to

---

## Documentation

- [docs.langchain.com](https://docs.langchain.com/oss/javascript/deepagents/overview) - Concepts and guides
- [Examples](/examples) - Working agents and patterns
- [LangChain Forum](https://forum.langchain.com) - Community discussion and support

## Security

Deep Agents follows a "trust the LLM" model. The agent can do anything its tools allow. Enforce boundaries at the tool/sandbox level, not by expecting the model to self-police. See the [security policy](https://github.com/langchain-ai/deepagentsjs?tab=security-ov-file) for more information.

## Classes

- [`BaseSandbox`](https://reference.langchain.com/javascript/deepagents/backends/BaseSandbox)
- [`CompositeBackend`](https://reference.langchain.com/javascript/deepagents/backends/CompositeBackend)
- [`ContextHubBackend`](https://reference.langchain.com/javascript/deepagents/backends/ContextHubBackend)
- [`FilesystemBackend`](https://reference.langchain.com/javascript/deepagents/backends/FilesystemBackend)
- [`LangSmithSandbox`](https://reference.langchain.com/javascript/deepagents/backends/LangSmithSandbox)
- [`LocalShellBackend`](https://reference.langchain.com/javascript/deepagents/backends/LocalShellBackend)
- [`SandboxError`](https://reference.langchain.com/javascript/deepagents/backends/SandboxError)
- [`StateBackend`](https://reference.langchain.com/javascript/deepagents/backends/StateBackend)
- [`StoreBackend`](https://reference.langchain.com/javascript/deepagents/backends/StoreBackend)
- [`BaseSandbox`](https://reference.langchain.com/javascript/deepagents/browser/BaseSandbox)
- [`CompositeBackend`](https://reference.langchain.com/javascript/deepagents/browser/CompositeBackend)
- [`ContextHubBackend`](https://reference.langchain.com/javascript/deepagents/browser/ContextHubBackend)
- [`LangSmithSandbox`](https://reference.langchain.com/javascript/deepagents/browser/LangSmithSandbox)
- [`SandboxError`](https://reference.langchain.com/javascript/deepagents/browser/SandboxError)
- [`StateBackend`](https://reference.langchain.com/javascript/deepagents/browser/StateBackend)
- [`StoreBackend`](https://reference.langchain.com/javascript/deepagents/browser/StoreBackend)
- [`ConfigurationError`](https://reference.langchain.com/javascript/deepagents/browser/ConfigurationError)
- [`ConfigurationError`](https://reference.langchain.com/javascript/deepagents/errors/ConfigurationError)
- [`FilesystemBackend`](https://reference.langchain.com/javascript/deepagents/index/FilesystemBackend)
- [`LocalShellBackend`](https://reference.langchain.com/javascript/deepagents/index/LocalShellBackend)
- [`BaseSandbox`](https://reference.langchain.com/javascript/deepagents/index/BaseSandbox)
- [`CompositeBackend`](https://reference.langchain.com/javascript/deepagents/index/CompositeBackend)
- [`ConfigurationError`](https://reference.langchain.com/javascript/deepagents/index/ConfigurationError)
- [`ContextHubBackend`](https://reference.langchain.com/javascript/deepagents/index/ContextHubBackend)
- [`LangSmithSandbox`](https://reference.langchain.com/javascript/deepagents/index/LangSmithSandbox)
- [`SandboxError`](https://reference.langchain.com/javascript/deepagents/index/SandboxError)
- [`StateBackend`](https://reference.langchain.com/javascript/deepagents/index/StateBackend)
- [`StoreBackend`](https://reference.langchain.com/javascript/deepagents/index/StoreBackend)
- [`BaseSandbox`](https://reference.langchain.com/javascript/deepagents/node/BaseSandbox)
- [`CompositeBackend`](https://reference.langchain.com/javascript/deepagents/node/CompositeBackend)
- [`ConfigurationError`](https://reference.langchain.com/javascript/deepagents/node/ConfigurationError)
- [`ContextHubBackend`](https://reference.langchain.com/javascript/deepagents/node/ContextHubBackend)
- [`FilesystemBackend`](https://reference.langchain.com/javascript/deepagents/node/FilesystemBackend)
- [`LangSmithSandbox`](https://reference.langchain.com/javascript/deepagents/node/LangSmithSandbox)
- [`LocalShellBackend`](https://reference.langchain.com/javascript/deepagents/node/LocalShellBackend)
- [`SandboxError`](https://reference.langchain.com/javascript/deepagents/node/SandboxError)
- [`StateBackend`](https://reference.langchain.com/javascript/deepagents/node/StateBackend)
- [`StoreBackend`](https://reference.langchain.com/javascript/deepagents/node/StoreBackend)

## Functions

- [`createDeepAgent()`](https://reference.langchain.com/javascript/deepagents/agent/createDeepAgent)
- [`adaptBackendProtocol()`](https://reference.langchain.com/javascript/deepagents/backends/adaptBackendProtocol)
- [`adaptSandboxProtocol()`](https://reference.langchain.com/javascript/deepagents/backends/adaptSandboxProtocol)
- [`buildGrepResultsDict()`](https://reference.langchain.com/javascript/deepagents/backends/buildGrepResultsDict)
- [`checkEmptyContent()`](https://reference.langchain.com/javascript/deepagents/backends/checkEmptyContent)
- [`createFileData()`](https://reference.langchain.com/javascript/deepagents/backends/createFileData)
- [`fileDataToString()`](https://reference.langchain.com/javascript/deepagents/backends/fileDataToString)
- [`formatContentWithLineNumbers()`](https://reference.langchain.com/javascript/deepagents/backends/formatContentWithLineNumbers)
- [`formatGrepMatches()`](https://reference.langchain.com/javascript/deepagents/backends/formatGrepMatches)
- [`formatGrepResults()`](https://reference.langchain.com/javascript/deepagents/backends/formatGrepResults)
- [`formatReadResponse()`](https://reference.langchain.com/javascript/deepagents/backends/formatReadResponse)
- [`getMimeType()`](https://reference.langchain.com/javascript/deepagents/backends/getMimeType)
- [`globSearchFiles()`](https://reference.langchain.com/javascript/deepagents/backends/globSearchFiles)
- [`grepMatchesFromFiles()`](https://reference.langchain.com/javascript/deepagents/backends/grepMatchesFromFiles)
- [`grepSearchFiles()`](https://reference.langchain.com/javascript/deepagents/backends/grepSearchFiles)
- [`isFileDataBinary()`](https://reference.langchain.com/javascript/deepagents/backends/isFileDataBinary)
- [`isFileDataV1()`](https://reference.langchain.com/javascript/deepagents/backends/isFileDataV1)
- [`isTextMimeType()`](https://reference.langchain.com/javascript/deepagents/backends/isTextMimeType)
- [`migrateToFileDataV2()`](https://reference.langchain.com/javascript/deepagents/backends/migrateToFileDataV2)
- [`performStringReplacement()`](https://reference.langchain.com/javascript/deepagents/backends/performStringReplacement)
- [`sanitizeToolCallId()`](https://reference.langchain.com/javascript/deepagents/backends/sanitizeToolCallId)
- [`truncateIfTooLong()`](https://reference.langchain.com/javascript/deepagents/backends/truncateIfTooLong)
- [`updateFileData()`](https://reference.langchain.com/javascript/deepagents/backends/updateFileData)
- [`validateFilePath()`](https://reference.langchain.com/javascript/deepagents/backends/validateFilePath)
- [`validatePath()`](https://reference.langchain.com/javascript/deepagents/backends/validatePath)
- [`isSandboxBackend()`](https://reference.langchain.com/javascript/deepagents/backends/isSandboxBackend)
- [`isSandboxProtocol()`](https://reference.langchain.com/javascript/deepagents/backends/isSandboxProtocol)
- [`computeSummarizationDefaults()`](https://reference.langchain.com/javascript/deepagents/browser/computeSummarizationDefaults)
- [`createAsyncSubAgentMiddleware()`](https://reference.langchain.com/javascript/deepagents/browser/createAsyncSubAgentMiddleware)
- [`createCompletionCallbackMiddleware()`](https://reference.langchain.com/javascript/deepagents/browser/createCompletionCallbackMiddleware)
- [`createFilesystemMiddleware()`](https://reference.langchain.com/javascript/deepagents/browser/createFilesystemMiddleware)
- [`createHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/browser/createHarnessProfile)
- [`createMemoryMiddleware()`](https://reference.langchain.com/javascript/deepagents/browser/createMemoryMiddleware)
- [`createPatchToolCallsMiddleware()`](https://reference.langchain.com/javascript/deepagents/browser/createPatchToolCallsMiddleware)
- [`createSkillsMiddleware()`](https://reference.langchain.com/javascript/deepagents/browser/createSkillsMiddleware)
- [`createSubAgentMiddleware()`](https://reference.langchain.com/javascript/deepagents/browser/createSubAgentMiddleware)
- [`createSummarizationMiddleware()`](https://reference.langchain.com/javascript/deepagents/browser/createSummarizationMiddleware)
- [`getHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/browser/getHarnessProfile)
- [`isAsyncSubAgent()`](https://reference.langchain.com/javascript/deepagents/browser/isAsyncSubAgent)
- [`isSandboxBackend()`](https://reference.langchain.com/javascript/deepagents/browser/isSandboxBackend)
- [`isSandboxProtocol()`](https://reference.langchain.com/javascript/deepagents/browser/isSandboxProtocol)
- [`parseHarnessProfileConfig()`](https://reference.langchain.com/javascript/deepagents/browser/parseHarnessProfileConfig)
- [`registerHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/browser/registerHarnessProfile)
- [`serializeProfile()`](https://reference.langchain.com/javascript/deepagents/browser/serializeProfile)
- [`adaptBackendProtocol()`](https://reference.langchain.com/javascript/deepagents/browser/adaptBackendProtocol)
- [`adaptSandboxProtocol()`](https://reference.langchain.com/javascript/deepagents/browser/adaptSandboxProtocol)
- [`createDeepAgent()`](https://reference.langchain.com/javascript/deepagents/browser/createDeepAgent)
- [`createSettings()`](https://reference.langchain.com/javascript/deepagents/config/createSettings)
- [`findProjectRoot()`](https://reference.langchain.com/javascript/deepagents/config/findProjectRoot)
- [`createAgentMemoryMiddleware()`](https://reference.langchain.com/javascript/deepagents/index/createAgentMemoryMiddleware)
- [`createSubAgent()`](https://reference.langchain.com/javascript/deepagents/index/createSubAgent)
- [`listSkills()`](https://reference.langchain.com/javascript/deepagents/index/listSkills)
- [`parseSkillMetadata()`](https://reference.langchain.com/javascript/deepagents/index/parseSkillMetadata)
- [`adaptBackendProtocol()`](https://reference.langchain.com/javascript/deepagents/index/adaptBackendProtocol)
- [`adaptSandboxProtocol()`](https://reference.langchain.com/javascript/deepagents/index/adaptSandboxProtocol)
- [`computeSummarizationDefaults()`](https://reference.langchain.com/javascript/deepagents/index/computeSummarizationDefaults)
- [`createAsyncSubAgentMiddleware()`](https://reference.langchain.com/javascript/deepagents/index/createAsyncSubAgentMiddleware)
- [`createCompletionCallbackMiddleware()`](https://reference.langchain.com/javascript/deepagents/index/createCompletionCallbackMiddleware)
- [`createDeepAgent()`](https://reference.langchain.com/javascript/deepagents/index/createDeepAgent)
- [`createFilesystemMiddleware()`](https://reference.langchain.com/javascript/deepagents/index/createFilesystemMiddleware)
- [`createHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/index/createHarnessProfile)
- [`createMemoryMiddleware()`](https://reference.langchain.com/javascript/deepagents/index/createMemoryMiddleware)
- [`createPatchToolCallsMiddleware()`](https://reference.langchain.com/javascript/deepagents/index/createPatchToolCallsMiddleware)
- [`createSettings()`](https://reference.langchain.com/javascript/deepagents/index/createSettings)
- [`createSkillsMiddleware()`](https://reference.langchain.com/javascript/deepagents/index/createSkillsMiddleware)
- [`createSubAgentMiddleware()`](https://reference.langchain.com/javascript/deepagents/index/createSubAgentMiddleware)
- [`createSummarizationMiddleware()`](https://reference.langchain.com/javascript/deepagents/index/createSummarizationMiddleware)
- [`findProjectRoot()`](https://reference.langchain.com/javascript/deepagents/index/findProjectRoot)
- [`getHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/index/getHarnessProfile)
- [`isAsyncSubAgent()`](https://reference.langchain.com/javascript/deepagents/index/isAsyncSubAgent)
- [`isSandboxBackend()`](https://reference.langchain.com/javascript/deepagents/index/isSandboxBackend)
- [`isSandboxProtocol()`](https://reference.langchain.com/javascript/deepagents/index/isSandboxProtocol)
- [`parseHarnessProfileConfig()`](https://reference.langchain.com/javascript/deepagents/index/parseHarnessProfileConfig)
- [`registerHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/index/registerHarnessProfile)
- [`serializeProfile()`](https://reference.langchain.com/javascript/deepagents/index/serializeProfile)
- [`appendToSystemMessage()`](https://reference.langchain.com/javascript/deepagents/middleware/appendToSystemMessage)
- [`createContentPreview()`](https://reference.langchain.com/javascript/deepagents/middleware/createContentPreview)
- [`patchDanglingToolCalls()`](https://reference.langchain.com/javascript/deepagents/middleware/patchDanglingToolCalls)
- [`prependToSystemMessage()`](https://reference.langchain.com/javascript/deepagents/middleware/prependToSystemMessage)
- [`computeSummarizationDefaults()`](https://reference.langchain.com/javascript/deepagents/middleware/computeSummarizationDefaults)
- [`createAsyncSubAgentMiddleware()`](https://reference.langchain.com/javascript/deepagents/middleware/createAsyncSubAgentMiddleware)
- [`createCompletionCallbackMiddleware()`](https://reference.langchain.com/javascript/deepagents/middleware/createCompletionCallbackMiddleware)
- [`createFilesystemMiddleware()`](https://reference.langchain.com/javascript/deepagents/middleware/createFilesystemMiddleware)
- [`createMemoryMiddleware()`](https://reference.langchain.com/javascript/deepagents/middleware/createMemoryMiddleware)
- [`createPatchToolCallsMiddleware()`](https://reference.langchain.com/javascript/deepagents/middleware/createPatchToolCallsMiddleware)
- [`createSkillsMiddleware()`](https://reference.langchain.com/javascript/deepagents/middleware/createSkillsMiddleware)
- [`createSubAgentMiddleware()`](https://reference.langchain.com/javascript/deepagents/middleware/createSubAgentMiddleware)
- [`createSummarizationMiddleware()`](https://reference.langchain.com/javascript/deepagents/middleware/createSummarizationMiddleware)
- [`isAsyncSubAgent()`](https://reference.langchain.com/javascript/deepagents/middleware/isAsyncSubAgent)
- [`adaptBackendProtocol()`](https://reference.langchain.com/javascript/deepagents/node/adaptBackendProtocol)
- [`adaptSandboxProtocol()`](https://reference.langchain.com/javascript/deepagents/node/adaptSandboxProtocol)
- [`computeSummarizationDefaults()`](https://reference.langchain.com/javascript/deepagents/node/computeSummarizationDefaults)
- [`createAgentMemoryMiddleware()`](https://reference.langchain.com/javascript/deepagents/node/createAgentMemoryMiddleware)
- [`createAsyncSubAgentMiddleware()`](https://reference.langchain.com/javascript/deepagents/node/createAsyncSubAgentMiddleware)
- [`createCompletionCallbackMiddleware()`](https://reference.langchain.com/javascript/deepagents/node/createCompletionCallbackMiddleware)
- [`createDeepAgent()`](https://reference.langchain.com/javascript/deepagents/node/createDeepAgent)
- [`createFilesystemMiddleware()`](https://reference.langchain.com/javascript/deepagents/node/createFilesystemMiddleware)
- [`createHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/node/createHarnessProfile)
- [`createMemoryMiddleware()`](https://reference.langchain.com/javascript/deepagents/node/createMemoryMiddleware)
- [`createPatchToolCallsMiddleware()`](https://reference.langchain.com/javascript/deepagents/node/createPatchToolCallsMiddleware)
- [`createSettings()`](https://reference.langchain.com/javascript/deepagents/node/createSettings)
- [`createSkillsMiddleware()`](https://reference.langchain.com/javascript/deepagents/node/createSkillsMiddleware)
- [`createSubAgent()`](https://reference.langchain.com/javascript/deepagents/node/createSubAgent)
- [`createSubAgentMiddleware()`](https://reference.langchain.com/javascript/deepagents/node/createSubAgentMiddleware)
- [`createSummarizationMiddleware()`](https://reference.langchain.com/javascript/deepagents/node/createSummarizationMiddleware)
- [`findProjectRoot()`](https://reference.langchain.com/javascript/deepagents/node/findProjectRoot)
- [`getHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/node/getHarnessProfile)
- [`isAsyncSubAgent()`](https://reference.langchain.com/javascript/deepagents/node/isAsyncSubAgent)
- [`isSandboxBackend()`](https://reference.langchain.com/javascript/deepagents/node/isSandboxBackend)
- [`isSandboxProtocol()`](https://reference.langchain.com/javascript/deepagents/node/isSandboxProtocol)
- [`listSkills()`](https://reference.langchain.com/javascript/deepagents/node/listSkills)
- [`parseHarnessProfileConfig()`](https://reference.langchain.com/javascript/deepagents/node/parseHarnessProfileConfig)
- [`parseSkillMetadata()`](https://reference.langchain.com/javascript/deepagents/node/parseSkillMetadata)
- [`registerHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/node/registerHarnessProfile)
- [`serializeProfile()`](https://reference.langchain.com/javascript/deepagents/node/serializeProfile)
- [`decidePathAccess()`](https://reference.langchain.com/javascript/deepagents/permissions/decidePathAccess)
- [`globMatch()`](https://reference.langchain.com/javascript/deepagents/permissions/globMatch)
- [`validatePath()`](https://reference.langchain.com/javascript/deepagents/permissions/validatePath)
- [`validatePermissionPaths()`](https://reference.langchain.com/javascript/deepagents/permissions/validatePermissionPaths)
- [`applyProfilePrompt()`](https://reference.langchain.com/javascript/deepagents/profiles/applyProfilePrompt)
- [`mergeProfiles()`](https://reference.langchain.com/javascript/deepagents/profiles/mergeProfiles)
- [`validateProfileKey()`](https://reference.langchain.com/javascript/deepagents/profiles/validateProfileKey)
- [`createHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/profiles/createHarnessProfile)
- [`getHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/profiles/getHarnessProfile)
- [`parseHarnessProfileConfig()`](https://reference.langchain.com/javascript/deepagents/profiles/parseHarnessProfileConfig)
- [`registerHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/profiles/registerHarnessProfile)
- [`serializeProfile()`](https://reference.langchain.com/javascript/deepagents/profiles/serializeProfile)
- [`isHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/profiles/harness/isHarnessProfile)
- [`applyProfilePrompt()`](https://reference.langchain.com/javascript/deepagents/profiles/harness/applyProfilePrompt)
- [`createHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/profiles/harness/createHarnessProfile)
- [`getHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/profiles/harness/getHarnessProfile)
- [`mergeProfiles()`](https://reference.langchain.com/javascript/deepagents/profiles/harness/mergeProfiles)
- [`parseHarnessProfileConfig()`](https://reference.langchain.com/javascript/deepagents/profiles/harness/parseHarnessProfileConfig)
- [`registerHarnessProfile()`](https://reference.langchain.com/javascript/deepagents/profiles/harness/registerHarnessProfile)
- [`serializeProfile()`](https://reference.langchain.com/javascript/deepagents/profiles/harness/serializeProfile)
- [`listSkills()`](https://reference.langchain.com/javascript/deepagents/skills/listSkills)
- [`parseSkillMetadata()`](https://reference.langchain.com/javascript/deepagents/skills/parseSkillMetadata)
- [`isAnthropicModel()`](https://reference.langchain.com/javascript/deepagents/utils/isAnthropicModel)
- [`isBedrockConverseModel()`](https://reference.langchain.com/javascript/deepagents/utils/isBedrockConverseModel)

## Interfaces

- [`BackendProtocol`](https://reference.langchain.com/javascript/deepagents/backends/BackendProtocol)
- [`BackendProtocolV1`](https://reference.langchain.com/javascript/deepagents/backends/BackendProtocolV1)
- [`BackendProtocolV2`](https://reference.langchain.com/javascript/deepagents/backends/BackendProtocolV2)
- [`BackendRuntime`](https://reference.langchain.com/javascript/deepagents/backends/BackendRuntime)
- [`EditResult`](https://reference.langchain.com/javascript/deepagents/backends/EditResult)
- [`ExecuteResponse`](https://reference.langchain.com/javascript/deepagents/backends/ExecuteResponse)
- [`FileDownloadResponse`](https://reference.langchain.com/javascript/deepagents/backends/FileDownloadResponse)
- [`FileInfo`](https://reference.langchain.com/javascript/deepagents/backends/FileInfo)
- [`FileUploadResponse`](https://reference.langchain.com/javascript/deepagents/backends/FileUploadResponse)
- [`GlobResult`](https://reference.langchain.com/javascript/deepagents/backends/GlobResult)
- [`GrepMatch`](https://reference.langchain.com/javascript/deepagents/backends/GrepMatch)
- [`GrepResult`](https://reference.langchain.com/javascript/deepagents/backends/GrepResult)
- [`LangSmithCaptureSnapshotOptions`](https://reference.langchain.com/javascript/deepagents/backends/LangSmithCaptureSnapshotOptions)
- [`LangSmithSandboxCreateOptions`](https://reference.langchain.com/javascript/deepagents/backends/LangSmithSandboxCreateOptions)
- [`LangSmithSandboxOptions`](https://reference.langchain.com/javascript/deepagents/backends/LangSmithSandboxOptions)
- [`LangSmithSnapshot`](https://reference.langchain.com/javascript/deepagents/backends/LangSmithSnapshot)
- [`LangSmithStartSandboxOptions`](https://reference.langchain.com/javascript/deepagents/backends/LangSmithStartSandboxOptions)
- [`LocalShellBackendOptions`](https://reference.langchain.com/javascript/deepagents/backends/LocalShellBackendOptions)
- [`LsResult`](https://reference.langchain.com/javascript/deepagents/backends/LsResult)
- [`ReadRawResult`](https://reference.langchain.com/javascript/deepagents/backends/ReadRawResult)
- [`ReadResult`](https://reference.langchain.com/javascript/deepagents/backends/ReadResult)
- [`SandboxBackendProtocol`](https://reference.langchain.com/javascript/deepagents/backends/SandboxBackendProtocol)
- [`SandboxBackendProtocolV1`](https://reference.langchain.com/javascript/deepagents/backends/SandboxBackendProtocolV1)
- [`SandboxBackendProtocolV2`](https://reference.langchain.com/javascript/deepagents/backends/SandboxBackendProtocolV2)
- [`SandboxDeleteOptions`](https://reference.langchain.com/javascript/deepagents/backends/SandboxDeleteOptions)
- [`SandboxGetOrCreateOptions`](https://reference.langchain.com/javascript/deepagents/backends/SandboxGetOrCreateOptions)
- [`SandboxInfo`](https://reference.langchain.com/javascript/deepagents/backends/SandboxInfo)
- [`SandboxListOptions`](https://reference.langchain.com/javascript/deepagents/backends/SandboxListOptions)
- [`SandboxListResponse`](https://reference.langchain.com/javascript/deepagents/backends/SandboxListResponse)
- [`StateAndStore`](https://reference.langchain.com/javascript/deepagents/backends/StateAndStore)
- [`StoreBackendContext`](https://reference.langchain.com/javascript/deepagents/backends/StoreBackendContext)
- [`StoreBackendOptions`](https://reference.langchain.com/javascript/deepagents/backends/StoreBackendOptions)
- [`WriteResult`](https://reference.langchain.com/javascript/deepagents/backends/WriteResult)
- [`AsyncSubAgent`](https://reference.langchain.com/javascript/deepagents/browser/AsyncSubAgent)
- [`AsyncSubAgentMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/browser/AsyncSubAgentMiddlewareOptions)
- [`AsyncTask`](https://reference.langchain.com/javascript/deepagents/browser/AsyncTask)
- [`BackendProtocol`](https://reference.langchain.com/javascript/deepagents/browser/BackendProtocol)
- [`BackendProtocolV1`](https://reference.langchain.com/javascript/deepagents/browser/BackendProtocolV1)
- [`BackendProtocolV2`](https://reference.langchain.com/javascript/deepagents/browser/BackendProtocolV2)
- [`BackendRuntime`](https://reference.langchain.com/javascript/deepagents/browser/BackendRuntime)
- [`CompiledSubAgent`](https://reference.langchain.com/javascript/deepagents/browser/CompiledSubAgent)
- [`CompletionCallbackOptions`](https://reference.langchain.com/javascript/deepagents/browser/CompletionCallbackOptions)
- [`EditResult`](https://reference.langchain.com/javascript/deepagents/browser/EditResult)
- [`ExecuteResponse`](https://reference.langchain.com/javascript/deepagents/browser/ExecuteResponse)
- [`FileDownloadResponse`](https://reference.langchain.com/javascript/deepagents/browser/FileDownloadResponse)
- [`FileInfo`](https://reference.langchain.com/javascript/deepagents/browser/FileInfo)
- [`FilesystemMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/browser/FilesystemMiddlewareOptions)
- [`FilesystemPermission`](https://reference.langchain.com/javascript/deepagents/browser/FilesystemPermission)
- [`FileUploadResponse`](https://reference.langchain.com/javascript/deepagents/browser/FileUploadResponse)
- [`GeneralPurposeSubagentConfig`](https://reference.langchain.com/javascript/deepagents/browser/GeneralPurposeSubagentConfig)
- [`GlobResult`](https://reference.langchain.com/javascript/deepagents/browser/GlobResult)
- [`GrepMatch`](https://reference.langchain.com/javascript/deepagents/browser/GrepMatch)
- [`GrepResult`](https://reference.langchain.com/javascript/deepagents/browser/GrepResult)
- [`HarnessProfile`](https://reference.langchain.com/javascript/deepagents/browser/HarnessProfile)
- [`HarnessProfileOptions`](https://reference.langchain.com/javascript/deepagents/browser/HarnessProfileOptions)
- [`LangSmithSandboxCreateOptions`](https://reference.langchain.com/javascript/deepagents/browser/LangSmithSandboxCreateOptions)
- [`LangSmithSandboxOptions`](https://reference.langchain.com/javascript/deepagents/browser/LangSmithSandboxOptions)
- [`LsResult`](https://reference.langchain.com/javascript/deepagents/browser/LsResult)
- [`MemoryMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/browser/MemoryMiddlewareOptions)
- [`ReadRawResult`](https://reference.langchain.com/javascript/deepagents/browser/ReadRawResult)
- [`ReadResult`](https://reference.langchain.com/javascript/deepagents/browser/ReadResult)
- [`SandboxBackendProtocol`](https://reference.langchain.com/javascript/deepagents/browser/SandboxBackendProtocol)
- [`SandboxBackendProtocolV1`](https://reference.langchain.com/javascript/deepagents/browser/SandboxBackendProtocolV1)
- [`SandboxBackendProtocolV2`](https://reference.langchain.com/javascript/deepagents/browser/SandboxBackendProtocolV2)
- [`SandboxDeleteOptions`](https://reference.langchain.com/javascript/deepagents/browser/SandboxDeleteOptions)
- [`SandboxGetOrCreateOptions`](https://reference.langchain.com/javascript/deepagents/browser/SandboxGetOrCreateOptions)
- [`SandboxInfo`](https://reference.langchain.com/javascript/deepagents/browser/SandboxInfo)
- [`SandboxListOptions`](https://reference.langchain.com/javascript/deepagents/browser/SandboxListOptions)
- [`SandboxListResponse`](https://reference.langchain.com/javascript/deepagents/browser/SandboxListResponse)
- [`SkillMetadata`](https://reference.langchain.com/javascript/deepagents/browser/SkillMetadata)
- [`SkillsMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/browser/SkillsMiddlewareOptions)
- [`StateAndStore`](https://reference.langchain.com/javascript/deepagents/browser/StateAndStore)
- [`StoreBackendContext`](https://reference.langchain.com/javascript/deepagents/browser/StoreBackendContext)
- [`StoreBackendOptions`](https://reference.langchain.com/javascript/deepagents/browser/StoreBackendOptions)
- [`SubAgent`](https://reference.langchain.com/javascript/deepagents/browser/SubAgent)
- [`SubAgentMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/browser/SubAgentMiddlewareOptions)
- [`WriteResult`](https://reference.langchain.com/javascript/deepagents/browser/WriteResult)
- [`CreateDeepAgentParams`](https://reference.langchain.com/javascript/deepagents/browser/CreateDeepAgentParams)
- [`DeepAgent`](https://reference.langchain.com/javascript/deepagents/browser/DeepAgent)
- [`DeepAgentTypeConfig`](https://reference.langchain.com/javascript/deepagents/browser/DeepAgentTypeConfig)
- [`DefaultDeepAgentTypeConfig`](https://reference.langchain.com/javascript/deepagents/browser/DefaultDeepAgentTypeConfig)
- [`Settings`](https://reference.langchain.com/javascript/deepagents/config/Settings)
- [`SettingsOptions`](https://reference.langchain.com/javascript/deepagents/config/SettingsOptions)
- [`AgentMemoryMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/index/AgentMemoryMiddlewareOptions)
- [`ListSkillsOptions`](https://reference.langchain.com/javascript/deepagents/index/ListSkillsOptions)
- [`LoaderSkillMetadata`](https://reference.langchain.com/javascript/deepagents/index/LoaderSkillMetadata)
- [`LocalShellBackendOptions`](https://reference.langchain.com/javascript/deepagents/index/LocalShellBackendOptions)
- [`AsyncSubAgent`](https://reference.langchain.com/javascript/deepagents/index/AsyncSubAgent)
- [`AsyncSubAgentMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/index/AsyncSubAgentMiddlewareOptions)
- [`AsyncTask`](https://reference.langchain.com/javascript/deepagents/index/AsyncTask)
- [`BackendProtocol`](https://reference.langchain.com/javascript/deepagents/index/BackendProtocol)
- [`BackendProtocolV1`](https://reference.langchain.com/javascript/deepagents/index/BackendProtocolV1)
- [`BackendProtocolV2`](https://reference.langchain.com/javascript/deepagents/index/BackendProtocolV2)
- [`BackendRuntime`](https://reference.langchain.com/javascript/deepagents/index/BackendRuntime)
- [`CompiledSubAgent`](https://reference.langchain.com/javascript/deepagents/index/CompiledSubAgent)
- [`CompletionCallbackOptions`](https://reference.langchain.com/javascript/deepagents/index/CompletionCallbackOptions)
- [`CreateDeepAgentParams`](https://reference.langchain.com/javascript/deepagents/index/CreateDeepAgentParams)
- [`DeepAgent`](https://reference.langchain.com/javascript/deepagents/index/DeepAgent)
- [`DeepAgentTypeConfig`](https://reference.langchain.com/javascript/deepagents/index/DeepAgentTypeConfig)
- [`DefaultDeepAgentTypeConfig`](https://reference.langchain.com/javascript/deepagents/index/DefaultDeepAgentTypeConfig)
- [`EditResult`](https://reference.langchain.com/javascript/deepagents/index/EditResult)
- [`ExecuteResponse`](https://reference.langchain.com/javascript/deepagents/index/ExecuteResponse)
- [`FileDownloadResponse`](https://reference.langchain.com/javascript/deepagents/index/FileDownloadResponse)
- [`FileInfo`](https://reference.langchain.com/javascript/deepagents/index/FileInfo)
- [`FilesystemMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/index/FilesystemMiddlewareOptions)
- [`FilesystemPermission`](https://reference.langchain.com/javascript/deepagents/index/FilesystemPermission)
- [`FileUploadResponse`](https://reference.langchain.com/javascript/deepagents/index/FileUploadResponse)
- [`GeneralPurposeSubagentConfig`](https://reference.langchain.com/javascript/deepagents/index/GeneralPurposeSubagentConfig)
- [`GlobResult`](https://reference.langchain.com/javascript/deepagents/index/GlobResult)
- [`GrepMatch`](https://reference.langchain.com/javascript/deepagents/index/GrepMatch)
- [`GrepResult`](https://reference.langchain.com/javascript/deepagents/index/GrepResult)
- [`HarnessProfile`](https://reference.langchain.com/javascript/deepagents/index/HarnessProfile)
- [`HarnessProfileOptions`](https://reference.langchain.com/javascript/deepagents/index/HarnessProfileOptions)
- [`LangSmithCaptureSnapshotOptions`](https://reference.langchain.com/javascript/deepagents/index/LangSmithCaptureSnapshotOptions)
- [`LangSmithSandboxCreateOptions`](https://reference.langchain.com/javascript/deepagents/index/LangSmithSandboxCreateOptions)
- [`LangSmithSandboxOptions`](https://reference.langchain.com/javascript/deepagents/index/LangSmithSandboxOptions)
- [`LangSmithSnapshot`](https://reference.langchain.com/javascript/deepagents/index/LangSmithSnapshot)
- [`LangSmithStartSandboxOptions`](https://reference.langchain.com/javascript/deepagents/index/LangSmithStartSandboxOptions)
- [`LsResult`](https://reference.langchain.com/javascript/deepagents/index/LsResult)
- [`MemoryMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/index/MemoryMiddlewareOptions)
- [`ReadRawResult`](https://reference.langchain.com/javascript/deepagents/index/ReadRawResult)
- [`ReadResult`](https://reference.langchain.com/javascript/deepagents/index/ReadResult)
- [`SandboxBackendProtocol`](https://reference.langchain.com/javascript/deepagents/index/SandboxBackendProtocol)
- [`SandboxBackendProtocolV1`](https://reference.langchain.com/javascript/deepagents/index/SandboxBackendProtocolV1)
- [`SandboxBackendProtocolV2`](https://reference.langchain.com/javascript/deepagents/index/SandboxBackendProtocolV2)
- [`SandboxDeleteOptions`](https://reference.langchain.com/javascript/deepagents/index/SandboxDeleteOptions)
- [`SandboxGetOrCreateOptions`](https://reference.langchain.com/javascript/deepagents/index/SandboxGetOrCreateOptions)
- [`SandboxInfo`](https://reference.langchain.com/javascript/deepagents/index/SandboxInfo)
- [`SandboxListOptions`](https://reference.langchain.com/javascript/deepagents/index/SandboxListOptions)
- [`SandboxListResponse`](https://reference.langchain.com/javascript/deepagents/index/SandboxListResponse)
- [`Settings`](https://reference.langchain.com/javascript/deepagents/index/Settings)
- [`SettingsOptions`](https://reference.langchain.com/javascript/deepagents/index/SettingsOptions)
- [`SkillMetadata`](https://reference.langchain.com/javascript/deepagents/index/SkillMetadata)
- [`SkillsMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/index/SkillsMiddlewareOptions)
- [`StateAndStore`](https://reference.langchain.com/javascript/deepagents/index/StateAndStore)
- [`StoreBackendContext`](https://reference.langchain.com/javascript/deepagents/index/StoreBackendContext)
- [`StoreBackendOptions`](https://reference.langchain.com/javascript/deepagents/index/StoreBackendOptions)
- [`SubAgent`](https://reference.langchain.com/javascript/deepagents/index/SubAgent)
- [`SubAgentMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/index/SubAgentMiddlewareOptions)
- [`SubagentRunStream`](https://reference.langchain.com/javascript/deepagents/index/SubagentRunStream)
- [`WriteResult`](https://reference.langchain.com/javascript/deepagents/index/WriteResult)
- [`ContextSize`](https://reference.langchain.com/javascript/deepagents/middleware/ContextSize)
- [`SummarizationMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/middleware/SummarizationMiddlewareOptions)
- [`TruncateArgsSettings`](https://reference.langchain.com/javascript/deepagents/middleware/TruncateArgsSettings)
- [`AsyncSubAgent`](https://reference.langchain.com/javascript/deepagents/middleware/AsyncSubAgent)
- [`AsyncSubAgentMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/middleware/AsyncSubAgentMiddlewareOptions)
- [`AsyncTask`](https://reference.langchain.com/javascript/deepagents/middleware/AsyncTask)
- [`CompiledSubAgent`](https://reference.langchain.com/javascript/deepagents/middleware/CompiledSubAgent)
- [`CompletionCallbackOptions`](https://reference.langchain.com/javascript/deepagents/middleware/CompletionCallbackOptions)
- [`FilesystemMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/middleware/FilesystemMiddlewareOptions)
- [`MemoryMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/middleware/MemoryMiddlewareOptions)
- [`SkillMetadata`](https://reference.langchain.com/javascript/deepagents/middleware/SkillMetadata)
- [`SkillsMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/middleware/SkillsMiddlewareOptions)
- [`SubAgent`](https://reference.langchain.com/javascript/deepagents/middleware/SubAgent)
- [`SubAgentMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/middleware/SubAgentMiddlewareOptions)
- [`AgentMemoryMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/node/AgentMemoryMiddlewareOptions)
- [`AsyncSubAgent`](https://reference.langchain.com/javascript/deepagents/node/AsyncSubAgent)
- [`AsyncSubAgentMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/node/AsyncSubAgentMiddlewareOptions)
- [`AsyncTask`](https://reference.langchain.com/javascript/deepagents/node/AsyncTask)
- [`BackendProtocol`](https://reference.langchain.com/javascript/deepagents/node/BackendProtocol)
- [`BackendProtocolV1`](https://reference.langchain.com/javascript/deepagents/node/BackendProtocolV1)
- [`BackendProtocolV2`](https://reference.langchain.com/javascript/deepagents/node/BackendProtocolV2)
- [`BackendRuntime`](https://reference.langchain.com/javascript/deepagents/node/BackendRuntime)
- [`CompiledSubAgent`](https://reference.langchain.com/javascript/deepagents/node/CompiledSubAgent)
- [`CompletionCallbackOptions`](https://reference.langchain.com/javascript/deepagents/node/CompletionCallbackOptions)
- [`CreateDeepAgentParams`](https://reference.langchain.com/javascript/deepagents/node/CreateDeepAgentParams)
- [`DeepAgent`](https://reference.langchain.com/javascript/deepagents/node/DeepAgent)
- [`DeepAgentTypeConfig`](https://reference.langchain.com/javascript/deepagents/node/DeepAgentTypeConfig)
- [`DefaultDeepAgentTypeConfig`](https://reference.langchain.com/javascript/deepagents/node/DefaultDeepAgentTypeConfig)
- [`EditResult`](https://reference.langchain.com/javascript/deepagents/node/EditResult)
- [`ExecuteResponse`](https://reference.langchain.com/javascript/deepagents/node/ExecuteResponse)
- [`FileDownloadResponse`](https://reference.langchain.com/javascript/deepagents/node/FileDownloadResponse)
- [`FileInfo`](https://reference.langchain.com/javascript/deepagents/node/FileInfo)
- [`FilesystemMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/node/FilesystemMiddlewareOptions)
- [`FilesystemPermission`](https://reference.langchain.com/javascript/deepagents/node/FilesystemPermission)
- [`FileUploadResponse`](https://reference.langchain.com/javascript/deepagents/node/FileUploadResponse)
- [`GeneralPurposeSubagentConfig`](https://reference.langchain.com/javascript/deepagents/node/GeneralPurposeSubagentConfig)
- [`GlobResult`](https://reference.langchain.com/javascript/deepagents/node/GlobResult)
- [`GrepMatch`](https://reference.langchain.com/javascript/deepagents/node/GrepMatch)
- [`GrepResult`](https://reference.langchain.com/javascript/deepagents/node/GrepResult)
- [`HarnessProfile`](https://reference.langchain.com/javascript/deepagents/node/HarnessProfile)
- [`HarnessProfileOptions`](https://reference.langchain.com/javascript/deepagents/node/HarnessProfileOptions)
- [`LangSmithCaptureSnapshotOptions`](https://reference.langchain.com/javascript/deepagents/node/LangSmithCaptureSnapshotOptions)
- [`LangSmithSandboxCreateOptions`](https://reference.langchain.com/javascript/deepagents/node/LangSmithSandboxCreateOptions)
- [`LangSmithSandboxOptions`](https://reference.langchain.com/javascript/deepagents/node/LangSmithSandboxOptions)
- [`LangSmithSnapshot`](https://reference.langchain.com/javascript/deepagents/node/LangSmithSnapshot)
- [`LangSmithStartSandboxOptions`](https://reference.langchain.com/javascript/deepagents/node/LangSmithStartSandboxOptions)
- [`ListSkillsOptions`](https://reference.langchain.com/javascript/deepagents/node/ListSkillsOptions)
- [`LoaderSkillMetadata`](https://reference.langchain.com/javascript/deepagents/node/LoaderSkillMetadata)
- [`LocalShellBackendOptions`](https://reference.langchain.com/javascript/deepagents/node/LocalShellBackendOptions)
- [`LsResult`](https://reference.langchain.com/javascript/deepagents/node/LsResult)
- [`MemoryMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/node/MemoryMiddlewareOptions)
- [`ReadRawResult`](https://reference.langchain.com/javascript/deepagents/node/ReadRawResult)
- [`ReadResult`](https://reference.langchain.com/javascript/deepagents/node/ReadResult)
- [`SandboxBackendProtocol`](https://reference.langchain.com/javascript/deepagents/node/SandboxBackendProtocol)
- [`SandboxBackendProtocolV1`](https://reference.langchain.com/javascript/deepagents/node/SandboxBackendProtocolV1)
- [`SandboxBackendProtocolV2`](https://reference.langchain.com/javascript/deepagents/node/SandboxBackendProtocolV2)
- [`SandboxDeleteOptions`](https://reference.langchain.com/javascript/deepagents/node/SandboxDeleteOptions)
- [`SandboxGetOrCreateOptions`](https://reference.langchain.com/javascript/deepagents/node/SandboxGetOrCreateOptions)
- [`SandboxInfo`](https://reference.langchain.com/javascript/deepagents/node/SandboxInfo)
- [`SandboxListOptions`](https://reference.langchain.com/javascript/deepagents/node/SandboxListOptions)
- [`SandboxListResponse`](https://reference.langchain.com/javascript/deepagents/node/SandboxListResponse)
- [`Settings`](https://reference.langchain.com/javascript/deepagents/node/Settings)
- [`SettingsOptions`](https://reference.langchain.com/javascript/deepagents/node/SettingsOptions)
- [`SkillMetadata`](https://reference.langchain.com/javascript/deepagents/node/SkillMetadata)
- [`SkillsMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/node/SkillsMiddlewareOptions)
- [`StateAndStore`](https://reference.langchain.com/javascript/deepagents/node/StateAndStore)
- [`StoreBackendContext`](https://reference.langchain.com/javascript/deepagents/node/StoreBackendContext)
- [`StoreBackendOptions`](https://reference.langchain.com/javascript/deepagents/node/StoreBackendOptions)
- [`SubAgent`](https://reference.langchain.com/javascript/deepagents/node/SubAgent)
- [`SubAgentMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/node/SubAgentMiddlewareOptions)
- [`SubagentRunStream`](https://reference.langchain.com/javascript/deepagents/node/SubagentRunStream)
- [`WriteResult`](https://reference.langchain.com/javascript/deepagents/node/WriteResult)
- [`FilesystemPermission`](https://reference.langchain.com/javascript/deepagents/permissions/FilesystemPermission)
- [`GeneralPurposeSubagentConfig`](https://reference.langchain.com/javascript/deepagents/profiles/GeneralPurposeSubagentConfig)
- [`HarnessProfile`](https://reference.langchain.com/javascript/deepagents/profiles/HarnessProfile)
- [`HarnessProfileOptions`](https://reference.langchain.com/javascript/deepagents/profiles/HarnessProfileOptions)
- [`ResolveHarnessProfileOpts`](https://reference.langchain.com/javascript/deepagents/profiles/harness/ResolveHarnessProfileOpts)
- [`GeneralPurposeSubagentConfig`](https://reference.langchain.com/javascript/deepagents/profiles/harness/GeneralPurposeSubagentConfig)
- [`HarnessProfile`](https://reference.langchain.com/javascript/deepagents/profiles/harness/HarnessProfile)
- [`HarnessProfileOptions`](https://reference.langchain.com/javascript/deepagents/profiles/harness/HarnessProfileOptions)
- [`ListSkillsOptions`](https://reference.langchain.com/javascript/deepagents/skills/ListSkillsOptions)
- [`SkillMetadata`](https://reference.langchain.com/javascript/deepagents/skills/SkillMetadata)
- [`SubagentRunStream`](https://reference.langchain.com/javascript/deepagents/stream/SubagentRunStream)
- [`CreateDeepAgentParams`](https://reference.langchain.com/javascript/deepagents/types/CreateDeepAgentParams)
- [`DeepAgent`](https://reference.langchain.com/javascript/deepagents/types/DeepAgent)
- [`DeepAgentTypeConfig`](https://reference.langchain.com/javascript/deepagents/types/DeepAgentTypeConfig)
- [`DefaultDeepAgentTypeConfig`](https://reference.langchain.com/javascript/deepagents/types/DefaultDeepAgentTypeConfig)

## Types

- [`AnyBackendProtocol`](https://reference.langchain.com/javascript/deepagents/backends/AnyBackendProtocol)
- [`BackendFactory`](https://reference.langchain.com/javascript/deepagents/backends/BackendFactory)
- [`FileData`](https://reference.langchain.com/javascript/deepagents/backends/FileData)
- [`FileOperationError`](https://reference.langchain.com/javascript/deepagents/backends/FileOperationError)
- [`MaybePromise`](https://reference.langchain.com/javascript/deepagents/backends/MaybePromise)
- [`SandboxErrorCode`](https://reference.langchain.com/javascript/deepagents/backends/SandboxErrorCode)
- [`StoreBackendNamespaceFactory`](https://reference.langchain.com/javascript/deepagents/backends/StoreBackendNamespaceFactory)
- [`AnyBackendProtocol`](https://reference.langchain.com/javascript/deepagents/browser/AnyBackendProtocol)
- [`AsyncTaskStatus`](https://reference.langchain.com/javascript/deepagents/browser/AsyncTaskStatus)
- [`BackendFactory`](https://reference.langchain.com/javascript/deepagents/browser/BackendFactory)
- [`FileData`](https://reference.langchain.com/javascript/deepagents/browser/FileData)
- [`FileOperationError`](https://reference.langchain.com/javascript/deepagents/browser/FileOperationError)
- [`FilesystemOperation`](https://reference.langchain.com/javascript/deepagents/browser/FilesystemOperation)
- [`HarnessProfileConfigData`](https://reference.langchain.com/javascript/deepagents/browser/HarnessProfileConfigData)
- [`MaybePromise`](https://reference.langchain.com/javascript/deepagents/browser/MaybePromise)
- [`PermissionMode`](https://reference.langchain.com/javascript/deepagents/browser/PermissionMode)
- [`SandboxErrorCode`](https://reference.langchain.com/javascript/deepagents/browser/SandboxErrorCode)
- [`StoreBackendNamespaceFactory`](https://reference.langchain.com/javascript/deepagents/browser/StoreBackendNamespaceFactory)
- [`AnySubAgent`](https://reference.langchain.com/javascript/deepagents/browser/AnySubAgent)
- [`ConfigurationErrorCode`](https://reference.langchain.com/javascript/deepagents/browser/ConfigurationErrorCode)
- [`DeepAgentRunStream`](https://reference.langchain.com/javascript/deepagents/browser/DeepAgentRunStream)
- [`ExtractSubAgentMiddleware`](https://reference.langchain.com/javascript/deepagents/browser/ExtractSubAgentMiddleware)
- [`FlattenSubAgentMiddleware`](https://reference.langchain.com/javascript/deepagents/browser/FlattenSubAgentMiddleware)
- [`InferDeepAgentSubagents`](https://reference.langchain.com/javascript/deepagents/browser/InferDeepAgentSubagents)
- [`InferDeepAgentType`](https://reference.langchain.com/javascript/deepagents/browser/InferDeepAgentType)
- [`InferStructuredResponse`](https://reference.langchain.com/javascript/deepagents/browser/InferStructuredResponse)
- [`InferSubagentByName`](https://reference.langchain.com/javascript/deepagents/browser/InferSubagentByName)
- [`InferSubAgentMiddlewareStates`](https://reference.langchain.com/javascript/deepagents/browser/InferSubAgentMiddlewareStates)
- [`InferSubagentReactAgentType`](https://reference.langchain.com/javascript/deepagents/browser/InferSubagentReactAgentType)
- [`MergedDeepAgentState`](https://reference.langchain.com/javascript/deepagents/browser/MergedDeepAgentState)
- [`ResolveDeepAgentTypeConfig`](https://reference.langchain.com/javascript/deepagents/browser/ResolveDeepAgentTypeConfig)
- [`SupportedResponseFormat`](https://reference.langchain.com/javascript/deepagents/browser/SupportedResponseFormat)
- [`ConfigurationErrorCode`](https://reference.langchain.com/javascript/deepagents/errors/ConfigurationErrorCode)
- [`AnyBackendProtocol`](https://reference.langchain.com/javascript/deepagents/index/AnyBackendProtocol)
- [`AnySubAgent`](https://reference.langchain.com/javascript/deepagents/index/AnySubAgent)
- [`AsyncTaskStatus`](https://reference.langchain.com/javascript/deepagents/index/AsyncTaskStatus)
- [`BackendFactory`](https://reference.langchain.com/javascript/deepagents/index/BackendFactory)
- [`ConfigurationErrorCode`](https://reference.langchain.com/javascript/deepagents/index/ConfigurationErrorCode)
- [`DeepAgentRunStream`](https://reference.langchain.com/javascript/deepagents/index/DeepAgentRunStream)
- [`ExtractSubAgentMiddleware`](https://reference.langchain.com/javascript/deepagents/index/ExtractSubAgentMiddleware)
- [`FileData`](https://reference.langchain.com/javascript/deepagents/index/FileData)
- [`FileOperationError`](https://reference.langchain.com/javascript/deepagents/index/FileOperationError)
- [`FilesystemOperation`](https://reference.langchain.com/javascript/deepagents/index/FilesystemOperation)
- [`FlattenSubAgentMiddleware`](https://reference.langchain.com/javascript/deepagents/index/FlattenSubAgentMiddleware)
- [`HarnessProfileConfigData`](https://reference.langchain.com/javascript/deepagents/index/HarnessProfileConfigData)
- [`InferDeepAgentSubagents`](https://reference.langchain.com/javascript/deepagents/index/InferDeepAgentSubagents)
- [`InferDeepAgentType`](https://reference.langchain.com/javascript/deepagents/index/InferDeepAgentType)
- [`InferStructuredResponse`](https://reference.langchain.com/javascript/deepagents/index/InferStructuredResponse)
- [`InferSubagentByName`](https://reference.langchain.com/javascript/deepagents/index/InferSubagentByName)
- [`InferSubAgentMiddlewareStates`](https://reference.langchain.com/javascript/deepagents/index/InferSubAgentMiddlewareStates)
- [`InferSubagentReactAgentType`](https://reference.langchain.com/javascript/deepagents/index/InferSubagentReactAgentType)
- [`MaybePromise`](https://reference.langchain.com/javascript/deepagents/index/MaybePromise)
- [`MergedDeepAgentState`](https://reference.langchain.com/javascript/deepagents/index/MergedDeepAgentState)
- [`PermissionMode`](https://reference.langchain.com/javascript/deepagents/index/PermissionMode)
- [`ResolveDeepAgentTypeConfig`](https://reference.langchain.com/javascript/deepagents/index/ResolveDeepAgentTypeConfig)
- [`SandboxErrorCode`](https://reference.langchain.com/javascript/deepagents/index/SandboxErrorCode)
- [`StoreBackendNamespaceFactory`](https://reference.langchain.com/javascript/deepagents/index/StoreBackendNamespaceFactory)
- [`SupportedResponseFormat`](https://reference.langchain.com/javascript/deepagents/index/SupportedResponseFormat)
- [`SummarizationEvent`](https://reference.langchain.com/javascript/deepagents/middleware/SummarizationEvent)
- [`AsyncTaskStatus`](https://reference.langchain.com/javascript/deepagents/middleware/AsyncTaskStatus)
- [`AnyBackendProtocol`](https://reference.langchain.com/javascript/deepagents/node/AnyBackendProtocol)
- [`AnySubAgent`](https://reference.langchain.com/javascript/deepagents/node/AnySubAgent)
- [`AsyncTaskStatus`](https://reference.langchain.com/javascript/deepagents/node/AsyncTaskStatus)
- [`BackendFactory`](https://reference.langchain.com/javascript/deepagents/node/BackendFactory)
- [`ConfigurationErrorCode`](https://reference.langchain.com/javascript/deepagents/node/ConfigurationErrorCode)
- [`DeepAgentRunStream`](https://reference.langchain.com/javascript/deepagents/node/DeepAgentRunStream)
- [`ExtractSubAgentMiddleware`](https://reference.langchain.com/javascript/deepagents/node/ExtractSubAgentMiddleware)
- [`FileData`](https://reference.langchain.com/javascript/deepagents/node/FileData)
- [`FileOperationError`](https://reference.langchain.com/javascript/deepagents/node/FileOperationError)
- [`FilesystemOperation`](https://reference.langchain.com/javascript/deepagents/node/FilesystemOperation)
- [`FlattenSubAgentMiddleware`](https://reference.langchain.com/javascript/deepagents/node/FlattenSubAgentMiddleware)
- [`HarnessProfileConfigData`](https://reference.langchain.com/javascript/deepagents/node/HarnessProfileConfigData)
- [`InferDeepAgentSubagents`](https://reference.langchain.com/javascript/deepagents/node/InferDeepAgentSubagents)
- [`InferDeepAgentType`](https://reference.langchain.com/javascript/deepagents/node/InferDeepAgentType)
- [`InferStructuredResponse`](https://reference.langchain.com/javascript/deepagents/node/InferStructuredResponse)
- [`InferSubagentByName`](https://reference.langchain.com/javascript/deepagents/node/InferSubagentByName)
- [`InferSubAgentMiddlewareStates`](https://reference.langchain.com/javascript/deepagents/node/InferSubAgentMiddlewareStates)
- [`InferSubagentReactAgentType`](https://reference.langchain.com/javascript/deepagents/node/InferSubagentReactAgentType)
- [`MaybePromise`](https://reference.langchain.com/javascript/deepagents/node/MaybePromise)
- [`MergedDeepAgentState`](https://reference.langchain.com/javascript/deepagents/node/MergedDeepAgentState)
- [`PermissionMode`](https://reference.langchain.com/javascript/deepagents/node/PermissionMode)
- [`ResolveDeepAgentTypeConfig`](https://reference.langchain.com/javascript/deepagents/node/ResolveDeepAgentTypeConfig)
- [`SandboxErrorCode`](https://reference.langchain.com/javascript/deepagents/node/SandboxErrorCode)
- [`StoreBackendNamespaceFactory`](https://reference.langchain.com/javascript/deepagents/node/StoreBackendNamespaceFactory)
- [`SupportedResponseFormat`](https://reference.langchain.com/javascript/deepagents/node/SupportedResponseFormat)
- [`FilesystemOperation`](https://reference.langchain.com/javascript/deepagents/permissions/FilesystemOperation)
- [`PermissionMode`](https://reference.langchain.com/javascript/deepagents/permissions/PermissionMode)
- [`HarnessProfileConfigData`](https://reference.langchain.com/javascript/deepagents/profiles/HarnessProfileConfigData)
- [`HarnessProfileConfigData`](https://reference.langchain.com/javascript/deepagents/profiles/harness/HarnessProfileConfigData)
- [`DeepAgentRunStream`](https://reference.langchain.com/javascript/deepagents/stream/DeepAgentRunStream)
- [`NamedSubagentRunStream`](https://reference.langchain.com/javascript/deepagents/stream/NamedSubagentRunStream)
- [`SubagentOutputOf`](https://reference.langchain.com/javascript/deepagents/stream/SubagentOutputOf)
- [`SubagentRunStreamUnion`](https://reference.langchain.com/javascript/deepagents/stream/SubagentRunStreamUnion)
- [`SubagentToolsOf`](https://reference.langchain.com/javascript/deepagents/stream/SubagentToolsOf)
- [`AnySubAgent`](https://reference.langchain.com/javascript/deepagents/types/AnySubAgent)
- [`ExtractSubAgentMiddleware`](https://reference.langchain.com/javascript/deepagents/types/ExtractSubAgentMiddleware)
- [`FlattenSubAgentMiddleware`](https://reference.langchain.com/javascript/deepagents/types/FlattenSubAgentMiddleware)
- [`InferCompiledSubagents`](https://reference.langchain.com/javascript/deepagents/types/InferCompiledSubagents)
- [`InferDeepAgentSubagents`](https://reference.langchain.com/javascript/deepagents/types/InferDeepAgentSubagents)
- [`InferDeepAgentType`](https://reference.langchain.com/javascript/deepagents/types/InferDeepAgentType)
- [`InferRegularSubagents`](https://reference.langchain.com/javascript/deepagents/types/InferRegularSubagents)
- [`InferStructuredResponse`](https://reference.langchain.com/javascript/deepagents/types/InferStructuredResponse)
- [`InferSubagentByName`](https://reference.langchain.com/javascript/deepagents/types/InferSubagentByName)
- [`InferSubAgentMiddlewareStates`](https://reference.langchain.com/javascript/deepagents/types/InferSubAgentMiddlewareStates)
- [`InferSubagentReactAgentType`](https://reference.langchain.com/javascript/deepagents/types/InferSubagentReactAgentType)
- [`MergedDeepAgentState`](https://reference.langchain.com/javascript/deepagents/types/MergedDeepAgentState)
- [`ResolveDeepAgentTypeConfig`](https://reference.langchain.com/javascript/deepagents/types/ResolveDeepAgentTypeConfig)
- [`SupportedResponseFormat`](https://reference.langchain.com/javascript/deepagents/types/SupportedResponseFormat)
