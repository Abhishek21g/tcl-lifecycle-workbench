# Claude Project Memory

## Mission

Help build this project with careful context gathering, small changes, and real verification.

At the start of a session, read:

- `agent/PROJECT_CONTEXT.md`
- `agent/WORKFLOW.md`
- `agent/TOOL_REGISTRY.md`
- relevant source files

## Workflow

1. Understand the user request.
2. Inspect the relevant files.
3. Make a short plan for substantial work.
4. Edit the smallest useful surface area.
5. Run the relevant checks.
6. Summarize changes and residual risk.

## Preferences

- Prefer evidence from files, tests, docs, logs, and command output.
- Do not invent project architecture.
- Do not add dependencies unless clearly justified.
- Avoid unrelated cleanup.
- Promote repeated instructions into skills.
- Add durable project lessons to the appropriate project file.

## Commands

Fill these in for each project:

```sh
# install
cd app && npm install

# dev
cd app && npm run dev

# test
cd app && npm run build

# lint
cd app && npm run lint

# build
cd app && npm run build
```

## Quality Bar

A task is done when the implementation, verification, and explanation all match the requested outcome.
