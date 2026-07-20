On this page

# Configuring regions for Vercel Functions

The Vercel platform caches all static content in [the CDN](/docs/cdn-cache) by default. This means your users will always get static files like HTML, CSS, and JavaScript served from the region that is closest to them. See the [regions](/docs/regions) page for a full list of our regions.

In a globally distributed application, the physical distance between your function and its data source can impact latency and response times. Therefore, Vercel allows you to specify the region in which your functions execute, ideally close to your data source (such as your [database](/marketplace/category/database)).

- By default, Vercel Functions execute in [_Washington, D.C., USA_ (`iad1`)](/docs/pricing/regional-pricing/iad1) for all new projects to ensure they are located close to most external data sources, which are hosted on the East Coast of the USA. You can set a new default region through your [project's settings on Vercel](#setting-your-default-region)
- You can define the region in your `vercel.json` using the [`regions` setting](/docs/functions/configuring-functions/region#project-configuration)
- You can set your region in the [Vercel CLI](#vercel-cli)
- You can override regions for individual functions using the [`functions` property](#per-function-configuration) in your project configuration

## Setting your default region

The default Function region is [_Washington, D.C., USA_ (`iad1`)](/docs/pricing/regional-pricing/iad1) for all new projects.

### Dashboard

To change the default regions in the dashboard:

1. Choose the appropriate project from your [dashboard](/dashboard) on Vercel
2. Open Settings in the sidebar
3. From the left side, select [Functions](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ffunctions&title=Go+to+Functions+Settings)
4. Use the Function Regions accordion to select your project's default regions:

![The Function Regions setting in a Vercel project's dashboard](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/edge-network/regions/function-regions-selection-light.png)![The Function Regions setting in a Vercel project's dashboard](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/edge-network/regions/function-regions-selection-dark.png)

The Function Regions setting in a Vercel project's dashboard

### Project configuration

To change the default region in your `vercel.json` [configuration file](/docs/project-configuration/vercel-json#regions), add the region code(s) to the `"regions"` key:

vercel.json

```
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "regions": ["sfo1"]
}
```

Additionally, Pro and Enterprise teams can deploy Vercel Functions to multiple regions. See [Limits](#limits) for the number of regions available on each plan.

Enterprise users can also use [`functionFailoverRegions`](/docs/project-configuration/vercel-json#functionfailoverregions) to specify regions that a Vercel Function should failover to if the default region is out of service.

### Per-function configuration

You can override the project-level `regions` and `functionFailoverRegions` settings for individual functions using the [`functions`](/docs/project-configuration/vercel-json#functions) property in your project configuration. This is useful when different functions access different data sources in different regions.

vercel.json

```
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "regions": ["iad1"],
  "functionFailoverRegions": ["cle1"],
  "functions": {
    "api/eu-data.js": {
      "regions": ["cdg1"],
      "functionFailoverRegions": ["lhr1"]
    },
    "api/us-west.js": {
      "regions": ["sfo1"],
      "functionFailoverRegions": ["pdx1"]
    }
  }
}
```

In this example:

- `api/eu-data.js` runs in Paris (`cdg1`) and fails over to London (`lhr1`)
- `api/us-west.js` runs in San Francisco (`sfo1`) and fails over to Portland (`pdx1`)
- All other functions use the project-level defaults: Washington, D.C. (`iad1`) with Cleveland (`cle1`) as failover

Per-function `regions` accepts an array of [region identifiers](/docs/regions#region-list). Per-function `functionFailoverRegions` is Enterprise only and accepts up to 4 region identifiers. When set on a function, these values completely override the corresponding project-level setting for that function.

### Vercel CLI

Pass `--regions` to `vercel deploy` (or the default `vercel` command) from your project's root directory with a region value, for example `vercel --regions sfo1`. The flag requires a region value; running `vercel --regions` on its own fails with `option requires argument: --regions`. Learn more about setting regions with the `--regions` flag in the [CLI docs](/docs/cli/deploy#regions).

## Limits

The number of regions your functions can run in depends on your plan:

| Plan       | Function regions |
| ---------- | ---------------- |
| Hobby      | Single region    |
| Pro        | 5 regions        |
| Enterprise | All regions      |

Deploying to more regions than your plan allows causes the deployment to fail before the [build step](/docs/deployments/configure-a-build).

Vercel deploys [Routing Middleware](/docs/routing-middleware) to all regions by default, regardless of your region settings. On the Hobby plan, Routing Middleware runs in fewer regions.

If your functions communicate with external services, choosing regions far from those services increases latency. Select only regions close to your external services.

## Available regions

To learn more about the regions that you can set for your Functions, see the [region list](/docs/regions#region-list).

## Automatic failover

Vercel Functions have multiple availability zone redundancy by default. Multi-region redundancy is available depending on your runtime.

### Node.js runtime failover

Setting failover regions are available on [Enterprise plans](/docs/plans/enterprise)

Enterprise teams can enable multi-region redundancy for Vercel Functions using Node.js.

To automatically failover to the closest region in the event of an outage:

1. Select your project from your team's [dashboard](/dashboard)
   
2. Open Settings in the sidebar and select [Functions](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ffunctions&title=Go+to+Functions+Settings)
   
3. Enable the Function Failover toggle:
   
   ![](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/functions/function-failover-light.png)![](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/functions/function-failover-dark.png)
   

To manually specify the fallback region, you can pass one or more regions to the [`functionFailoverRegions`](/docs/project-configuration/vercel-json#functionfailoverregions) property in your `vercel.json` file:

vercel.json

```
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functionFailoverRegions": ["dub1", "fra1"]
}
```

You can also set `functionFailoverRegions` on a per-function basis using the [`functions`](/docs/project-configuration/vercel-json#functions) property. See [per-function configuration](#per-function-configuration) above.

The region(s) set in the `functionFailoverRegions` property must be different from the default region(s) specified in the [`regions`](/docs/project-configuration/vercel-json#regions) property.

During an automatic failover, Vercel will reroute application traffic to the next closest region, meaning the order of the regions in `functionFailoverRegions` does not matter. For more information on how failover routing works, see [`functionFailoverRegions`](/docs/project-configuration/vercel-json#functionfailoverregions).

You can view your default and failover regions through the [deployment summary](/docs/deployments#resources-tab-and-deployment-summary):

![Failover regions for your Vercel functions shown in the deployment summary.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/functions/function-failover-region-light.png)![Failover regions for your Vercel functions shown in the deployment summary.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/functions/function-failover-region-dark.png)

Failover regions for your Vercel functions shown in the deployment summary.

Region failover is supported with Secure Compute. See [Region Failover](/docs/networking/secure-compute#region-failover) to learn more.
