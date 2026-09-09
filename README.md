# Learnlytica

A student industry-readiness operating system for engineering colleges. Learnlytica is
not an LMS: every screen exists to drive an action, capture evidence, or trigger an
intervention. It continuously turns a first-year student into an industry-ready engineer and
gives colleges an evidence-based view of cohort readiness.

The product loop:

> Learn → Solve → Build → Compete → Present → Assess → Intervene → Improve → Evidence → Company-Ready

## Architecture at a glance

Everything derives from an append-only activity log (the source of truth). Skill mastery,
evidence, and readiness are projections recomputed from that log by a versioned readiness
model. We never store a readiness score as an opaque, un-explainable number.

```
Activity (fact) → Evidence (skill-scoped, with confidence)
                → Skill mastery (projection) → Readiness per role archetype (projection)
```

Key principles we protect:

- No single readiness score. Readiness is always student × target role × company archetype.
- Facts vs projections. Immutable facts are never edited; projections are recomputable.
- Multi-tenant. A college is a tenant; global content (skills, problems) is shared.
- Explainable. Every recommendation and score references the evidence behind it.

## Repository layout

This is a pnpm monorepo:

| Package | Stack | Purpose |
| ----------- | ---------------------------- | --------------------------------------------------- |
| shared/ | TypeScript | Enums and API contracts shared by frontend + backend |
| backend/ | NestJS + Prisma + PostgreSQL | Domain-modular API and the readiness engine |
| frontend/ | React + Vite + TypeScript | Feature-modular student / mentor / college surfaces |

Each package has its own README.md describing local conventions.

## Getting started

```bash
# Requires Node 20+ and pnpm 9+
pnpm install

# Backend (see backend/README.md for DB setup)
pnpm --filter @learnlytica/backend dev

# Frontend
pnpm --filter @learnlytica/frontend dev
```

## Conventions (read before adding code)

- One folder per domain on the backend and one folder per feature on the frontend. Mirror
the names so a concept is easy to find on both sides.
- Consistent internal layout. Backend modules always use controllers / services /
  repositories / dto / entities. Frontend features always use api / components / hooks /
  pages / types.
- Shared types live in shared/. Do not redeclare enums or DTOs in both apps.
- Keep functions small and named for intent. Prefer readability over cleverness — this codebase
  is meant to be maintained by people, not only by AI.
