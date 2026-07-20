On this page

# Workflows with Python

You can build durable workflows in Python using the [`vercel` Python SDK](https://pypi.org/project/vercel/). Your workflow code can pause, resume, and maintain state, just like the JavaScript and TypeScript Workflow SDK.

Workflow support in the Python SDK is currently in beta. APIs and behavior may change.

## Getting started

Add the `vercel` package and workflow entrypoint to `pyproject.toml`:

pyproject.toml

```
[project]
requires-python = ">=3.12"
dependencies = ["vercel"]
 
[[tool.vercel.workflows]]
entrypoint = "app.workflows:wf"
```

The workflow `entrypoint` uses the `module:object` format and points to the exported `Workflows` registry.

## Workflows

A workflow is a stateful function that coordinates multi-step logic over time. Create a `Workflows` instance and use the `@wf.workflow` decorator to mark a function as durable:

app/workflow.py

```
from vercel import workflow
 
wf = workflow.Workflows()
```

app/workflows/ai\_content\_workflow.py

```
from app.workflow import wf
 
@wf.workflow
async def ai_content_workflow(*, topic: str):
    draft = await generate_draft(topic=topic)
    summary = await summarize_draft(draft=draft)
 
    return {
        "draft": draft,
        "summary": summary,
    }
```

Export the registry from the workflow package and import the module containing your workflow so its definitions are registered:

app/workflows/\_\_init\_\_.py

```
from app.workflow import wf
from app.workflows import ai_content_workflow
 
__all__ = ["ai_content_workflow", "wf"]
```

## Steps

A step is a stateless function that runs a unit of durable work inside a workflow. Use `@wf.step` to mark a function as a step:

app/steps/generate\_draft.py

```
import random
from app.workflow import wf
 
@wf.step
async def generate_draft(*, topic: str):
    return await ai_generate(prompt=f"Write a blog post about {topic}")
 
@wf.step
async def summarize_draft(*, draft: str):
    summary = await ai_summarize(text=draft)
 
    # Simulate a transient error. The step automatically retries.
    if random.random() < 0.3:
        raise Exception("Transient AI provider error")
 
    return summary
```

Each step compiles into an isolated route. While the step executes, the workflow suspends without consuming resources. When the step completes, the workflow resumes automatically where it left off.

## Sleep

Sleep pauses a workflow for a specified duration without consuming compute resources:

app/workflows/ai\_refine.py

```
from vercel import workflow
from app.workflow import wf
 
@wf.workflow
async def ai_refine_workflow(*, draft_id: str):
    draft = await fetch_draft(draft_id)
 
    await workflow.sleep("7 days")  # Wait 7 days to gather more signals.
 
    refined = await refine_draft(draft)
 
    return {
        "draft_id": draft_id,
        "refined": refined,
    }
```

## Hooks

A hook lets a workflow wait for external events such as user actions, webhooks, or third-party API responses.

Define a hook model with Pydantic and `workflow.BaseHook`:

app/workflows/approval.py

```
import typing, pydantic
from vercel import workflow
from app.workflow import wf
 
class Approval(pydantic.BaseModel, workflow.BaseHook):
    """Human approval for AI-generated drafts"""
 
    decision: typing.Literal["approved", "changes"]
    notes: str | None = None
 
@wf.workflow
async def ai_approval_workflow(*, topic: str):
    draft = await generate_draft(topic=topic)
 
    # Wait for human approval events
    async for event in Approval.wait(token="draft-123"):
        if event.decision == "approved":
            await publish_draft(draft)
            break
 
        revised = await refine_draft(draft, event.notes)
        await publish_draft(revised)
```

Resume the workflow when data arrives:

app/api/resume.py

```
from app.workflows.approval import Approval
 
@app.post("/api/resume")
async def resume(approval: Approval):
    """Resume the workflow when an approval is received"""
 
    await approval.resume("draft-123")
    return {"ok": True}
```
