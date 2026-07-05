# Project Context

## Project Name

TCL Lifecycle Workbench

## One-Sentence Goal

Build an unofficial Terafab Coordination Layer evaluator that validates and visualizes L2-to-L6 semiconductor event chains.

## User / Customer

Abhishek; public audience is developers evaluating the public `terafab-labs/Terafab` repo.

## What This Project Should Do

- Validate TCL-style event envelopes, topics, schema coverage, and correlation continuity.
- Visualize a chip lifecycle from L2 tapeout through L6 fleet telemetry.
- Generate report artifacts that pair validation results with reproducibility commands.
- Stay explicitly unofficial unless Terafab maintainers engage.

## What This Project Should Not Do

- Do not claim Terafab uses this tool.
- Do not become a generic assistant/chatbot.
- Do not depend on the upstream stack being fully runnable for the sample-data MVP.

## Tech Stack

- Language: TypeScript
- Framework: React + Vite
- Package manager: npm
- Database: none for MVP
- Hosting: local first
- Testing: TypeScript/Vite build; browser QA before public launch

## Important Commands

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

## Key Files And Directories

- `app/src/App.tsx`
- `app/src/index.css`
- `agent/design/tcl-lifecycle-workbench-concept.png`

## Design / Product Taste

- Dense but readable engineering tool.
- Dark neutral surface, precise grid, restrained status colors.
- First screen is the usable workbench, not a marketing page.

## Constraints

- Time: MVP should move fast and prove event-chain understanding.
- Budget: local/open tooling only.
- Security: no production claims, no private data.
- Performance: static sample flow first, then parser/import support.
- Compatibility: modern desktop browser first.

## Definition Of Done

- Code is implemented.
- Relevant checks pass.
- Important docs/context are updated.
- Remaining risks are called out.

## Open Questions

- Should the first public version import upstream `@tcl/shared` directly or mirror schemas for decoupled demos?
- Should report export be Markdown-first or HTML-first?
