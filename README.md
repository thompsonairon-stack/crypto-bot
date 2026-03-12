# EtherOS Monorepo Scaffold

This repository now contains a starter scaffold for EtherOS with:

- **Runtime primitives** (`packages/core`)
- **Agent and adapter interfaces** (`packages/core`, `packages/adapters`)
- **Event bus foundation** (`packages/core/src/events`)
- **Express API service** (`services/api`)
- **Next.js frontend app** (`apps/web`)
- **Expo mobile shell** (`apps/mobile`)

## Quick start

```bash
pnpm install
pnpm dev:api
pnpm dev:web
pnpm dev:mobile
```

## Workspace structure

```text
apps/
  web/
  mobile/
services/
  api/
packages/
  core/
  adapters/
```
