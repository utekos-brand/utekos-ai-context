# Agent

> deepagents → Agent

## Oversikt

The [`createDeepAgent`](#agent.createDeepAgent) function is the main entry point for creating deep agents.

> **Learn more:** For tutorials and guides on building deep agents, see the [Deep Agents documentation](https://docs.langchain.com/oss/javascript/deepagents/overview).

---

## Funksjoner

* [`createDeepAgent()`](https://reference.langchain.com/javascript/deepagents/agent/createDeepAgent)

---

## Interfaces

* [`CreateDeepAgentParams`](https://reference.langchain.com/javascript/deepagents/types/CreateDeepAgentParams)
* [`DeepAgent`](https://reference.langchain.com/javascript/deepagents/types/DeepAgent)
* [`SubAgent`](https://reference.langchain.com/javascript/deepagents/index/SubAgent)
* [`CompiledSubAgent`](https://reference.langchain.com/javascript/deepagents/index/CompiledSubAgent)

---

## Typer

* [`MergedDeepAgentState`](https://reference.langchain.com/javascript/deepagents/types/MergedDeepAgentState)

---

# Deep Agents Code

Deep Agents Code

Copy page

Deep Agents Code (dcode) is an open source coding agent built on the Deep Agents SDK. It works with any large language model and supports switching between providers or models mid-session. Persistent memory carries context across conversations, customizable skills shape its behavior, and approval controls gate code execution.

---

## Quickstart

### Install and launch

curl -LsSf https://langch.in/dcode | bash

### Add provider credentials

Deep Agents Code works with any tool-calling LLM. OpenAI, Anthropic, and Google are available out of the box.

Use the /auth command to connect with a provider. See Providers for the full list and credential details.

Web search uses Tavily. Add a key from /auth or set TAVILY_API_KEY. See Enable web search.

### Choose a model (optional)

Run /model inside a session to open the interactive switcher, or launch with --model:

dcode --model anthropic
dcode --model openai.5
dcode --model fireworks/fireworks/models/deepseek-v4-pro
dcode --model baseten/Kimi-K2.7-Code

See Model providers for the full provider list, open weights options, and credential details.

### Give the agent a task

Create a Python script that prints "Hello, World!"

The agent interprets the query and proposes changes with diffs for your approval before modifying files. If needed, it can run shell commands to test the code, check documentation, or search the web for up-to-date information.

### Enable tracing (optional)

To log agent operations, tool calls, and decisions in LangSmith, add the following to ~/.deepagents/.env or export the variables in your shell:

~/.deepagents/.env
LANGSMITH_TRACING=true
LANGSMITH_API_KEY=lsv2_...
LANGSMITH_PROJECT=optional-project-name  # Specify a project name or default to "deepagents-code"

For more details and usage, see Trace with LangSmith.

Deep Agents Code is not officially supported on Windows. Windows users can try running it under Windows Subsystem for Linux (WSL).

---

## Capabilities

Deep Agents Code has the following built-in capabilities:

* File operations - read, write, and edit files on disk.
* Shell execution - execute commands to run tests, build projects, manage dependencies, and interact with version control.
* Remote sandboxes - run agent tools remotely instead of on your local machine.
* Web search - search the web for up-to-date information and documentation. Requires a Tavily API key.
* Task planning and tracking - break down complex tasks into discrete steps and track progress.
* Goals and rubrics - define measurable objectives or grading criteria so the agent can check whether work is done.
* Subagents - delegate work to task-specific subagents.
* Memory storage and retrieval - store and retrieve information across sessions, enabling agents to remember project conventions and learned patterns.
* Context compaction & offloading - summarize older conversation messages and offload originals to storage.
* Human-in-the-loop - require human approval for sensitive tool operations.
* Skills - extend agent capabilities with custom expertise and instructions.
* MCP tools - load external tools from Model Context Protocol servers.
* Tracing - trace agent operations in LangSmith for observability and debugging.

Full list of built-in tools

---

## Command reference

### Use a specific agent configuration

dcode --agent mybot

### Use a specific model (provider format or auto-detect)

dcode --model anthropic
dcode --model gpt-5.5

### Auto-approve tool usage (skip human-in-the-loop prompts)

dcode -y

### Startup command examples

# list directory contents, then summarize directory as first prompt—the command runs first, then the prompt is submitted

# the prompt does NOT have access to the command output

dcode --startup-cmd "ls -la" -m "Summarize what's in this directory"

# Non-interactive with startup command: show git status before the task runs

# the task does NOT have access to the command output

dcode --startup-cmd "git diff --stat" -n "Review these changes"

---

## Command-line options

CLI commands

---

## Configuration

For the full reference—including config.toml schema, provider parameters, profile overrides, and hook configuration—see Configuration.

Deep Agents Code stores all configuration under ~/.deepagents/. Within that directory, each agent gets its own subdirectory (default: agent):

| Path                        | Purpose                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ~/.deepagents/config.toml   | Model and agent defaults, provider settings, constructor params, profile overrides, themes, update settings |
| ~/.deepagents/.env          | Global API keys and secrets. See configuration                                                              |
| ~/.deepagents/hooks.json    | Lifecycle event hooks (session start/end, task complete, etc.)                                              |
| ~/.deepagents/<agent_name>/ | Per-agent memory, skills, and conversation threads                                                          |
| .deepagents/ (project root) | Project-specific memory and skills, loaded when running inside a git repo                                   |

---

## Interactive mode

Type naturally as you would in a chat interface. The agent uses its built-in tools, skills, and memory to help you with tasks.

### Slash commands

### Shell commands

### Keyboard shortcuts

---

## Non-interactive mode and piping

Use -n to run a single task without launching the interactive UI:

dcode -n "Write a Python script that prints hello world"

Each non-interactive run starts a fresh thread—conversation history does not carry between invocations. File-based state (memory, skills, configuration) persists.

You can also pipe input via stdin. When input is piped, Deep Agents Code automatically runs non-interactively:

echo "Explain this code" | dcode
cat error.log | dcode -n "What's causing this error?"
git diff | dcode -n "Review these changes"
git diff | dcode --skill code-review -n 'summarize changes'

When you combine piped input with -n or -m, the piped content appears first, followed by the text you pass to the flag.

The maximum piped input size is 10 MiB.

Shell execution is disabled by default in non-interactive mode. Use -S/--shell-allow-list to enable specific commands (e.g., -S "pytest,git,make"), recommended for safe defaults, or all to permit any command.

### Cap turn count

### Cap wall-clock time

### Clean output and buffering

### Shell execution examples

Use with caution.

-S all (or --shell-allow-list all) lets the agent execute arbitrary shell commands with no human confirmation.

---

## Trace with LangSmith

Enable LangSmith tracing to see agent operations, tool calls, and decisions in a LangSmith project.

Add your tracing keys to ~/.deepagents/.env so tracing is enabled in every session without per-shell exports:

~/.deepagents/.env
LANGSMITH_TRACING=true
LANGSMITH_API_KEY=lsv2_...
LANGSMITH_PROJECT=optional-project-name  # Specify a project name or default to "deepagents-code"

To override for a specific project, add the same keys to a .env in the project directory. See environment variables for the full loading order.

You can also set these as shell environment variables if you prefer. Shell exports always take precedence over .env values, so this is a good option for temporary overrides or testing:

export LANGSMITH_TRACING=false

---

## Separate agent traces from app traces

Deep Agents Code can produce two kinds of LangSmith traces:

* Agent traces are Deep Agents Code’s own model calls, tool calls, orchestration, and middleware.
* Shell-command traces are traces emitted by code that Deep Agents Code runs for you in a shell, such as tests, scripts, or a local LangGraph app.

To send Deep Agents Code’s own traces to a dedicated project, set DEEPAGENTS_CODE_LANGSMITH_PROJECT:

~/.deepagents/.env

# Example value; use any LangSmith project name you want.

DEEPAGENTS_CODE_LANGSMITH_PROJECT=deepagents-code

Then configure LANGSMITH_PROJECT for your application traces:

.env
LANGSMITH_PROJECT=customer-support-agent

For example, suppose you ask Deep Agents Code to debug a failing LangGraph test:

uv run pytest tests/test_escalation_flow.py

If that test runs your app with LangSmith tracing enabled, those app traces are created by the shell process and go to customer-support-agent. Deep Agents Code’s own reasoning and tool-use traces go to deepagents-code.

You can also scope LangSmith credentials to Deep Agents Code using the DEEPAGENTS_CODE_ prefix (e.g., DEEPAGENTS_CODE_LANGSMITH_API_KEY).

---

## Dual-write traces to a second project

To mirror agent traces to a second LangSmith project, set DEEPAGENTS_CODE_LANGSMITH_REPLICA_PROJECTS. This is useful for sending the same traces to both a personal project and a shared team project.

~/.deepagents/.env
DEEPAGENTS_CODE_LANGSMITH_REPLICA_PROJECTS=team-shared

When set and tracing is active, each agent run is written to both the primary project (DEEPAGENTS_CODE_LANGSMITH_PROJECT, or deepagents-code by default) and the project you name here. Leave the variable unset to write to a single project as usual.

When configured, Deep Agents Code displays a status line with a link to the LangSmith project. In supported terminals, click the link to open it directly. You can also use /trace to print the URL and open it in your browser.

✓ LangSmith tracing: 'my-project'

We recommend you also set up LangSmith Engine, which monitors your traces, detects issues, and proposes fixes.
