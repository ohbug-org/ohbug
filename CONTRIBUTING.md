# Contributing

## Set up

Git clone the repo.

```bash
git clone git@github.com:ohbug-org/ohbug.git
```

Install dev deps.

```bash
yarn
```

Link each module.

```bash
yarn bootstrap
```

## Build

Transform with rollup.

```bash
yarn build

# Build specified package only
yarn build ohbug-core

# Build and monitor file changes
yarn dev

# Build and monitor specified package only
yarn dev ohbug-core
```

## Test

```bash
yarn test
```
