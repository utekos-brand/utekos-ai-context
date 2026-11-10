> ## Documentation Index
> Fetch the complete documentation index at: https://www.canva.dev/docs/apps/llms.txt
> Use this file to discover all available pages before exploring further.

# Apps Scripts config reference

Every default value @canva/app-scripts applies, and the full resolved bundler configuration.

This page lists every default value [`@canva/app-scripts`](https://www.canva.dev/docs/apps/canva-app-scripts/) applies when you don't set an option yourself, plus the full Rsbuild and webpack configuration it builds from them. The values are based on the latest `@canva/app-scripts` release.

Use this page when customizing your setup, for example to check what a default is before overriding it in `canva-app.config.ts`. For how overrides work, see [Canva App Scripts](https://www.canva.dev/docs/apps/canva-app-scripts/).

## Named constants

| Constant                           | Value                             | Description                                                                                                                                                                                                                                          |
| ---------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DEFAULT_ASSETS_DIR`               | `"assets"`                        | Default static assets directory, relative to the project root.                                                                                                                                                                                       |
| `DEFAULT_BACKEND_ENTRY`            | `"backend/server.ts"`             | Default backend entry script, relative to the project root.                                                                                                                                                                                          |
| `DEFAULT_BACKEND_PORT`             | `3001`                            | Default backend port when `CANVA_BACKEND_PORT` is unset.                                                                                                                                                                                             |
| `DEFAULT_BUNDLER`                  | `"rsbuild"`                       | The bundler used when `CanvaAppConfig.bundler` is omitted.                                                                                                                                                                                           |
| `DEFAULT_EXTRACT_PATTERN`          | `"src/**/*.{ts,tsx}"`             | Default glob for source files scanned by `extractTranslations`.                                                                                                                                                                                      |
| `DEFAULT_FRONTEND_ENTRY`           | `"src/index.tsx"`                 | Default frontend entry module, relative to the project root.                                                                                                                                                                                         |
| `DEFAULT_FRONTEND_PORT`            | `8080`                            | Default frontend dev-server port when `devServer.port` is unset.                                                                                                                                                                                     |
| `DEFAULT_HARNESS_ENTRY`            | `"harness/harness.tsx"`           | Harness entry module used in place of the app entry when `IN_HARNESS` is set, relative to the project root. Package-fixed, not user-configurable. See [https://www.canva.dev/docs/apps/test-harness/](https://www.canva.dev/docs/apps/test-harness/) |
| `DEFAULT_HARNESS_HTML`             | `"harness.html"`                  | Filename of the harness HTML page, used only to build the printed dev-server URL — `app-scripts` doesn't read or serve the file itself. Package-fixed, not user-configurable.                                                                        |
| `DEFAULT_HARNESS_INIT_ENTRY`       | `"harness/init.ts"`               | Harness init module, paired with `DEFAULT_HARNESS_ENTRY`. Package-fixed, not user-configurable.                                                                                                                                                      |
| `DEFAULT_OUTPUT_DIR`               | `"dist"`                          | Default build output directory, relative to the project root.                                                                                                                                                                                        |
| `MESSAGES_FILENAME`                | `"messages_en.json"`              | Filename `extractTranslations` writes the extracted message catalog to.                                                                                                                                                                              |
| `MESSAGE_ID_INTERPOLATION_PATTERN` | `"[sha512:contenthash:base64:6]"` | formatjs message-ID interpolation pattern. Must be identical across every bundler adapter, or message IDs drift and translated catalogs stop matching at runtime. Package-fixed, not user-configurable.                                              |

## Bundler configuration

<Tabs storageKey="app-scripts-defaults-bundler">
  <Tab name="Rsbuild (default)">
    See the [Rsbuild configuration reference](https://rsbuild.rs/config/) for what each of these options configures.

    Resolved configuration for a production build, with a placeholder project at `/path/to/your-app`:

    ```js
    {
      mode: "production",
      root: ".",
      logLevel: "silent",
      source: {
        entry: {
          app: "src/index.tsx",
        },
        define: {
          BACKEND_HOST: '"http://localhost:3001"',
        },
      },
      resolve: {
        alias: {
          assets: "assets",
          styles: "styles",
          src: "src",
        },
        extensions: [".ts", ".tsx", ".js", ".css", ".svg", ".woff", ".woff2"],
      },
      output: {
        target: "web",
        overrideBrowserslist: [
          "chrome >= 99",
          "edge >= 99",
          "firefox >= 102",
          "safari >= 15.4",
          "ios_saf >= 15.4",
          "opera >= 86",
        ],
        distPath: {
          root: "dist",
          js: "",
          jsAsync: "",
          css: "",
          cssAsync: "",
        },
        filename: {
          js: "[name].js",
        },
        filenameHash: false,
        cleanDistPath: true,
        injectStyles: true,
        cssModules: {
          auto: (resource) => !resource.includes("node_modules"),
          namedExport: true,
        },
        dataUriLimit: {
          image: 9007199254740991,
          font: 9007199254740991,
          svg: 200,
        },
        minify: {
          jsOptions: {
            minimizerOptions: {
              format: {
                asciiOnly: true,
              },
            },
          },
        },
        sourceMap: false,
      },
      performance: {
        chunkSplit: {
          strategy: "all-in-one",
        },
        printFileSize: false,
      },
      plugins: [
        pluginReact({ fastRefresh: false }),
        pluginSvgr({ query: /react/ }),
      ],
      tools: {
        htmlPlugin: false,
        rspack: {
          plugins: [
            formatjs({
              idInterpolationPattern: MESSAGE_ID_INTERPOLATION_PATTERN,
              flatten: false,
            }),
            new LimitChunkCountPlugin({ maxChunks: 1 }),
          ],
        },
      },
    }
    ```

    In development mode (`canva apps start`), `mode` becomes `"development"` and the following is added:

    ```js
    {
      dev: {
        hmr: true,
        liveReload: true,
        assetPrefix: "http://localhost:8080/",
        lazyCompilation: false,
        client: {
          protocol: "ws",
          host: "localhost",
          port: 8080,
        },
      },
      server: {
        host: "localhost",
        port: 8080,
        strictPort: true,
        printUrls: false,
        headers: {
          "Access-Control-Allow-Origin": "https://app-aabbccddeeff.canva-apps.com",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Private-Network": "true",
        },
        historyApiFallback: {
          rewrites: [
            {
              from: /^\/$/,
              to: "/app.js",
            },
          ],
        },
      },
    }
    ```
  </Tab>

  <Tab name="Webpack">
    See the [webpack concepts documentation](https://webpack.js.org/concepts) for what each of these options configures.

    Resolved configuration for a production build, with a placeholder project at `/path/to/your-app`:

    ```js
    {
      mode: "production",
      context: ".",
      entry: {
        app: "src/index.tsx",
      },
      target: "web",
      resolve: {
        alias: {
          assets: "assets",
          styles: "styles",
          src: "src",
        },
        extensions: [".ts", ".tsx", ".js", ".css", ".svg", ".woff", ".woff2"],
      },
      infrastructureLogging: {
        level: "none",
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "ts-loader",
                options: {
                  transpileOnly: true,
                  getCustomTransformers: function getCustomTransformers() {
                    return {
                      before: [
                        transform({
                          overrideIdFn: MESSAGE_ID_INTERPOLATION_PATTERN,
                        }),
                      ],
                    };
                  },
                },
              },
            ],
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: true,
                },
              },
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [cssnano({ preset: "default" })],
                  },
                },
              },
            ],
          },
          {
            test: /\.(png|jpg|jpeg)$/i,
            type: "asset/inline",
          },
          {
            test: /\.(woff|woff2)$/,
            type: "asset/inline",
          },
          {
            test: /\.svg$/,
            oneOf: [
              {
                issuer: /\.[jt]sx?$/,
                resourceQuery: /react/,
                use: ["@svgr/webpack", "url-loader"],
              },
              {
                type: "asset/resource",
                parser: {
                  dataUrlCondition: {
                    maxSize: 200,
                  },
                },
              },
            ],
          },
          {
            test: /\.css$/,
            include: /node_modules/,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [cssnano({ preset: "default" })],
                  },
                },
              },
            ],
          },
        ],
      },
      optimization: {
        minimizer: [
          new TerserPlugin({ terserOptions: { format: { ascii_only: true } } }),
        ],
      },
      output: {
        filename: "[name].js",
        path: "dist",
        clean: true,
      },
      plugins: [
        new DefinePlugin({ BACKEND_HOST: '"http://localhost:3001"' }),
        new LimitChunkCountPlugin({ maxChunks: 1 }),
      ],
    }
    ```

    In development mode (`canva apps start`), `mode` becomes `"development"` and the following is added:

    ```js
    {
      devServer: {
        server: "http",
        host: "localhost",
        allowedHosts: ["localhost", "app-aabbccddeeff.canva-apps.com"],
        historyApiFallback: {
          rewrites: [
            {
              from: /^\/$/,
              to: "/app.js",
            },
          ],
        },
        port: 8080,
        client: {
          logging: "verbose",
        },
        headers: {
          "Access-Control-Allow-Origin": "https://app-aabbccddeeff.canva-apps.com",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Private-Network": "true",
        },
      },
      devtool: "source-map",
    }
    ```
  </Tab>
</Tabs>
