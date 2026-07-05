# Tool Registry

Use this file to track current and future agent tools.

Add a tool here before making it part of the normal workflow.

**Last reviewed:** 2026-06-30 (see `agent/AUTO_UPDATE.md` for how this file stays current)

## Core Tools

| Tool | Category | Use When | Setup Needed | Status |
|---|---|---|---|---|
| `AGENTS.md` | Memory (project) | Codex needs durable project instructions | Create at repo root | Active |
| `CLAUDE.md` | Memory (project) | Claude needs durable project instructions | Create at repo root | Active |
| `~/.codex/AGENTS.md` | Memory (global) | Standing preferences across ALL Codex projects | One-time, home dir | Active |
| `~/.claude/CLAUDE.md` | Memory (global) | Standing preferences across ALL Claude sessions | One-time, home dir | Active |
| Claude Projects (claude.ai) | Memory (initiative) | Recurring body of work needs a 200K-token knowledge base + its own chat history | Create project on claude.ai, upload docs | Optional |
| Skills | Workflow | A process repeats more than twice | Add `SKILL.md` files | Active |
| Subagents | Orchestration | Work can be split into research/test/review/implementation | Configure agent descriptions | Active |
| MCP | Tooling | Need GitHub, docs, browser, Figma, Linear, DBs, or internal tools | Add MCP server config | Optional |
| Hooks | Guardrails | Need automatic, no-exceptions checks before/after tool use | Add hook scripts/config | Optional |
| Plugins | Distribution | Want to bundle skills+hooks+subagents+MCP as one installable unit | Package or install from marketplace | Optional |
| Evals | Measurement | Need to know whether agent behavior improved | Create task set and grader (see `EVALS.md`) | Optional |
| Traces | Debugging | Need to inspect agent steps/tool calls | Enable tracing where supported | Optional |
| Structured output (JSON schema / strict tool use) | Reliability | Downstream code needs to parse the agent's answer programmatically | Define schema, request JSON mode or strict tools | Optional |
| Prompt caching | Cost/speed | Same large context (big CLAUDE.md, long doc) reused across many calls | Enable cache_control on stable context blocks (API only) | Optional |
| Extended thinking / reasoning effort | Quality | Task is hard enough that visible step-by-step reasoning helps | Set reasoning/thinking budget per call | Optional |
| Plan mode | Safety | Want Claude to propose an approach before touching files | Built into Claude Code/Cowork, invoke explicitly | Active |
| Compaction / context management | Longevity | Session is running long, context filling up | `/clear` between unrelated tasks, `/compact` for long ones | Active |
| `agent/PROMOTE.md` + `PROJECTS.md` + `harvest-template-lessons` skill | Feedback loop | Want lessons from real project work to improve the master template over time | Already scaffolded; run the skill periodically from the template repo | Active |
| `rudhra-swarm` | Orchestration | Need multiple specialized roles or subagents on one project | Skill + terminal helper | Active |
| `rudhra-herd` | Terminal orchestration | Need real persistent multi-agent panes through Herdr | Optional Herdr install + skill + terminal helper | Active |
| `rudhra-learn` | Human-approved learning | Need to capture reusable lessons from a message/session | Skill + terminal helper; writes only with approval | Active |
| `rudhra-daemon` | Living-agent runtime | Need background monitoring, scheduled reviews, session memory, dashboard/API, and PR proposals | Python stdlib daemon + terminal helper | Active |
| Rudhra Admin Terminal | Host control | Need to inspect local files, docs, logs, Git state, or run setup commands from the private dashboard | Start daemon with `--enable-terminal` or `RUDHRA_ENABLE_TERMINAL=1` | Active opt-in |
| `rudhra-remember` | Session memory | Need to save a session note for later review | Terminal helper or daemon API | Active |
| `friday` / `rudhra-bar` | Personal assistant UI | Need an always-on capture strip for people, reels, screenshots, reminders, tabs, and questions | Electron app backed by `rudhra-daemon` | Active prototype |
| `friday-index` | Local memory/RAG | Need to inventory, ingest, or search approved local files and memories for Friday | Python stdlib SQLite FTS; indexes into `~/.rudhra/rudhra.db` | Active v1 |
| Rudhra iPhone PWA | Mobile control room | Need phone access to inbox, terminal, work queue, projects, and approvals | Open private dashboard in Safari and Add to Home Screen | Active |
| `rudhra-install-service` | Background service | Need Rudhra to stay running after terminal closes | macOS LaunchAgent or Linux systemd user service | Active |
| `rudhra-setup-laptop` | Machine setup | Need to install Rudhra commands and skills on a new laptop/VPS | Requires Git, gh, Python 3 | Active |
| Agent ecosystem scan | Research loop | Need to compare Rudhra against outside agent systems and harvest ideas | See `agent/AGENT_ECOSYSTEM_RESEARCH.md` | Active |

## Future Tool Slots

Genuinely open rows — fill in as real things emerge.

| Tool | Category | What It Does | When To Use | Setup | Owner | Status |
|---|---|---|---|---|---|---|
| [Herdr](https://github.com/ogulcancelik/herdr) | Terminal agent multiplexer | Runs multiple real agent terminals with persistent sessions, detach/reattach, status detection, remote/SSH access, and socket API | Use as Rudhra's optional multi-agent terminal runtime on the living-agent machine | `curl -fsSL https://herdr.dev/install.sh \| sh`; optional `npx skills add ogulcancelik/herdr --skill herdr -g` | Abhishek | Candidate: high priority |
| [Agency Agents](https://github.com/msitarzewski/agency-agents) | Specialist agent roster | Large catalog of domain agents plus converters/installers for Claude Code, Codex, Gemini CLI, Cursor, Hermes, and others | Use as inspiration for a lazy specialist router, not as a giant always-loaded context dump | Clone or use app; for Codex it generates TOML agents under `~/.codex/agents/` | Abhishek | Candidate: medium priority |
| [Astryx](https://github.com/facebook/astryx) | Agent-ready design system | Meta-origin design system with CLI docs, dense docs, sync contracts, custom commands, and vibe tests | Use as a model for Rudhra docs/testing discipline | Study docs/commands; no install needed unless building UI with Astryx | Abhishek | Reference |
| [Google ADK](https://github.com/google/adk-python) | Agent workflow framework | Code-first framework with agents, graph workflows, routing, fan-out/fan-in, loops, retries, state, HITL, nested workflows | Use as architecture reference for future Rudhra task graph/runtime | `pip install google-adk` if prototyping | Abhishek | Reference |
| [A2A](https://github.com/a2aproject/A2A) | Agent-to-agent protocol | Lets opaque agents discover capabilities, collaborate, and communicate without exposing internal tools/memory | Explore only after Rudhra daemon/auth/logging are stable | Study protocol; no setup yet | Abhishek | Long-term |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | Terminal coding agent | Open-source Gemini agent with ReAct loop, MCP, context files, checkpointing, and GitHub integration | Add optional third agent runner to Rudhra swarm | `npm install -g @google/gemini-cli` or `npx @google/gemini-cli` | Abhishek | Candidate |
| [Hermes Agent](https://github.com/nousresearch/hermes-agent) (Nous Research) | Standalone agent runtime | A separate, self-hosted agent — not a Claude/Codex plugin. Wraps whatever LLM backend you choose (Claude, GPT, OpenRouter, local models) with its own closed learning loop: agent-curated memory with periodic nudges, autonomous skill creation that self-improves during use, FTS5 session search + LLM summarization for cross-session recall, Honcho-based user modeling. Has its own CLI, Telegram/Discord/Slack/WhatsApp gateway, cron scheduler, subagents, MCP support, and context files (its AGENTS.md/CLAUDE.md equivalent). Important: this is agentic memory/skill automation, not weight-level model retraining — the underlying LLM itself doesn't get fine-tuned. | If you want an always-on personal agent that keeps its own memory/skills current automatically instead of you hand-maintaining MEMORY.md/TOOL_REGISTRY.md yourself | `curl -fsSL https://hermes-agent.nousresearch.com/install.sh \| bash` (own runtime, runs independently of Claude Code/Codex) | Abhishek | Watch (verified real, not yet installed) |
| TBD | TBD | TBD | TBD | TBD | TBD | TBD |

## Decision Rule

Only add a tool to the default workflow if it saves repeated effort, reduces mistakes, improves verification, or gives the agent access to context it cannot otherwise get.

## How This List Stays Current

See `agent/AUTO_UPDATE.md` — a weekly scheduled check proposes additions here; nothing gets added to "Core Tools" without your approval first.
