# Contributing

## Set up

Git clone the repo.

```bash
git clone git@github.com:ohbug-org/ohbug.git
```

Install dev deps.

```bash
pnpm i
```

## Build

Transform with rollup.

```bash
pnpm build

# Build specified package only
pnpm build ohbug-core

# Build and monitor file changes
pnpm dev

# Build and monitor specified package only
pnpm dev ohbug-core
```

## Test

```bash
pnpm test
```
