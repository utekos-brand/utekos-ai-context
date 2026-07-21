# BackendFactory

> **Type Alias** in `deepagents`

📖
[View in docs](https://reference.langchain.com/javascript/deepagents/node/BackendFactory)

Factory function type for creating backend instances.

Backends receive BackendRuntime which contains the current state
and runtime information, extracted from the execution context.

## Signature

```javascript
BackendFactory: (runtime: BackendRuntime) => MaybePromise<AnyBackendProtocol>
```

## Examples

```typescript
// Using in middleware
const middleware = createFilesystemMiddleware({
  backend: (runtime) => new StateBackend(runtime)
});
```

## ⚠️ Deprecated

Pass a pre-constructed backend instance instead of a factory.
E.g., `backend: new StateBackend()` instead of
`backend: (runtime) => new StateBackend(runtime)`.

---

[View source on GitHub](https://github.com/langchain-ai/deepagentsjs/blob/ff7d82a791456b268c0e9bf70a9e455295ffb4b9/libs/deepagents/src/backends/protocol.ts#L559)
