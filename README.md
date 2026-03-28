<div align="center">

  <a href="https://ohbug.net" target="_blank">
    <img src="https://raw.githubusercontent.com/ohbug-org/blog/master/images/ohbug_logo.svg" alt="Ohbug" height="40">
  </a>

[![npm](https://img.shields.io/npm/v/@ohbug/core.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/core)
[![license](https://img.shields.io/github/license/ohbug-org/ohbug?style=flat-square)](https://github.com/ohbug-org/ohbug/blob/master/LICENSE)

</div>

English | [简体中文](./README-zh_CN.md)

## Introduction

Ohbug is a JavaScript monitoring module that integrates behavior monitoring, exception monitoring, and custom behavior monitoring.

Through a flexible extension system, you can achieve performance monitoring, collection of specific information, and advanced features like session replay ("screen recording").

## Features

- 🔍 **Error Monitoring** — Automatically captures uncaught errors, resource errors, unhandled rejections, AJAX/Fetch errors, and WebSocket errors
- 🧩 **Extension System** — Extend functionality with a flexible plugin architecture
- 📱 **Multi-Framework** — First-class support for React, Vue, and Angular
- 🎬 **Session Replay** — Record and replay user sessions via [rrweb](https://github.com/rrweb-io/rrweb) extension
- 📦 **Lightweight** — Tree-shakable ESM modules with zero unnecessary bloat
- 🔧 **Customizable** — Hooks (`onEvent`, `onNotify`), user tracking, metadata, and action recording

## Quick Start

### Browser

```bash
npm install @ohbug/browser
```

```ts
import Ohbug from "@ohbug/browser";

const client = Ohbug.setup({
  apiKey: "YOUR_API_KEY",
  appVersion: "1.0.0",
});
```

### React

```bash
npm install @ohbug/browser @ohbug/react
```

```tsx
import Ohbug from "@ohbug/browser";
import { OhbugErrorBoundary } from "@ohbug/react";

const client = Ohbug.setup({ apiKey: "YOUR_API_KEY" });

function App() {
  return (
    <OhbugErrorBoundary client={client} FallbackComponent={<div>Something went wrong</div>}>
      <YourApp />
    </OhbugErrorBoundary>
  );
}
```

### Vue

```bash
npm install @ohbug/browser @ohbug/vue
```

```ts
import Ohbug from "@ohbug/browser";
import { install } from "@ohbug/vue";

const client = Ohbug.setup({ apiKey: "YOUR_API_KEY" });
install(client, Vue);
```

### Angular

```bash
npm install @ohbug/browser @ohbug/angular
```

```ts
import Ohbug from "@ohbug/browser";
import createProvider from "@ohbug/angular";

const client = Ohbug.setup({ apiKey: "YOUR_API_KEY" });
const provider = createProvider(client, ErrorHandler);
```

## Configuration

| Option         | Type       | Default                   | Description                              |
| -------------- | ---------- | ------------------------- | ---------------------------------------- |
| `apiKey`       | `string`   | —                         | **Required.** Your project API key       |
| `appVersion`   | `string`   | —                         | Application version                      |
| `appType`      | `string`   | —                         | Application type identifier              |
| `releaseStage` | `string`   | `"production"`            | Current release stage                    |
| `endpoint`     | `string`   | `"http://localhost:6660"` | Event reporting endpoint                 |
| `maxActions`   | `number`   | `30`                      | Max number of actions to keep (0–100)    |
| `onEvent`      | `function` | —                         | Hook called when an event is created     |
| `onNotify`     | `function` | —                         | Hook called when an event is reported    |
| `user`         | `object`   | —                         | User info (up to 6 attributes)           |
| `metadata`     | `object`   | —                         | Additional metadata                      |
| `logger`       | `object`   | `console`                 | Custom logger with `log/info/warn/error` |

## Packages

| Package                                    | Description                                              |
| ------------------------------------------ | -------------------------------------------------------- |
| [@ohbug/core](./packages/ohbug-core)       | Core module — client, events, extensions, actions        |
| [@ohbug/browser](./packages/ohbug-browser) | Browser SDK — auto-captures errors, network issues, etc. |
| [@ohbug/react](./packages/ohbug-react)     | React integration — `OhbugErrorBoundary` component       |
| [@ohbug/vue](./packages/ohbug-vue)         | Vue integration — Vue error handler plugin               |
| [@ohbug/angular](./packages/ohbug-angular) | Angular integration — `ErrorHandler` provider            |
| [@ohbug/types](./packages/ohbug-types)     | TypeScript type definitions for all packages             |
| [@ohbug/utils](./packages/ohbug-utils)     | Shared utility functions                                 |

### Related Projects

- [@ohbug/miniapp](https://github.com/ohbug-org/ohbug-miniapp) — SDK for Mini Programs
- [@ohbug/unplugin](https://github.com/ohbug-org/unplugin-ohbug) — Build plugin for uploading sourcemaps
- [@ohbug/cli](https://github.com/ohbug-org/ohbug-cli) — CLI tool for uploading sourcemaps
- [Extensions](https://github.com/ohbug-org/extensions) — Official extensions (rrweb, performance, etc.)
- [ohbug-dashboard](https://github.com/ohbug-org/ohbug-dashboard) — Self-hosted dashboard (NestJS + Next.js)

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) 10+

### Setup

```bash
git clone git@github.com:ohbug-org/ohbug.git
cd ohbug
pnpm install
```

### Scripts

```bash
pnpm dev       # Watch mode for all packages
pnpm build     # Build all packages
pnpm test      # Run tests (vitest)
pnpm check     # Type check with auto-fix
pnpm lint      # Lint with auto-fix
pnpm fmt       # Format code
```

### Playground

A React playground app is included for local development and testing:

```bash
cd playground
pnpm dev       # Starts at http://localhost:4000
```

## Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/ohbug-org/ohbug/graphs/contributors"><img src="https://opencollective.com/ohbug/contributors.svg?width=890&button=false" /></a>

## Feedback

| GitHub Issues                                                       | WeChat                                                                                                                 |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [ohbug-org/ohbug/issues](https://github.com/ohbug-org/ohbug/issues) | <img src="https://github.com/ohbug-org/blog/blob/master/images/qrcode.jpg?raw=true" width="200" /> 关注后回复「ohbug」 |

## License

[Apache License 2.0](./LICENSE)
