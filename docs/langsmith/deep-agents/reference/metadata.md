# Middleware

> deepagents → Middleware

Deep agents use a modular middleware architecture where each core
capability is implemented as composable middleware. This design
allows you to customize agent behavior by adding, removing, or
modifying middleware.

> **Learn more:** For architecture details and customization
> patterns, see the
> [Middleware documentation](https://docs.langchain.com/oss/javascript/deepagents/middleware).

## Functions

- [`createFilesystemMiddleware()`](https://reference.langchain.com/javascript/deepagents/index/createFilesystemMiddleware)
- [`createSubAgentMiddleware()`](https://reference.langchain.com/javascript/deepagents/index/createSubAgentMiddleware)
- [`createMemoryMiddleware()`](https://reference.langchain.com/javascript/deepagents/index/createMemoryMiddleware)
- [`createAgentMemoryMiddleware()`](https://reference.langchain.com/javascript/deepagents/index/createAgentMemoryMiddleware)
- [`createSummarizationMiddleware()`](https://reference.langchain.com/javascript/deepagents/middleware/createSummarizationMiddleware)
- [`createSkillsMiddleware()`](https://reference.langchain.com/javascript/deepagents/index/createSkillsMiddleware)

## Interfaces

- [`FilesystemMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/index/FilesystemMiddlewareOptions)
- [`SubAgentMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/index/SubAgentMiddlewareOptions)
- [`MemoryMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/index/MemoryMiddlewareOptions)
- [`AgentMemoryMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/index/AgentMemoryMiddlewareOptions)
- [`SummarizationMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/middleware/SummarizationMiddlewareOptions)
- [`SkillsMiddlewareOptions`](https://reference.langchain.com/javascript/deepagents/index/SkillsMiddlewareOptions)
