# Learnlytica Backend

This package contains the NestJS backend for Learnlytica. It is designed as a modular,
versioned readiness engine with Prisma as the persistence layer.

## Local setup

```bash
pnpm install
pnpm --filter @learnlytica/backend prisma:generate
pnpm --filter @learnlytica/backend dev
```

## Structure

- src/app: application bootstrap
- src/modules: domain modules
- src/common: reusable utilities and guards
- prisma/: Prisma schema and migrations

## Notes

The current repository setup keeps the frontend and backend separated while sharing contracts from the shared package.
