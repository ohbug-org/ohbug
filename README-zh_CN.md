<div align="center">

  <a href="https://ohbug.net" target="_blank">
    <img src="https://raw.githubusercontent.com/ohbug-org/blog/master/images/ohbug_logo.svg" alt="Ohbug" height="40">
  </a>

[![npm](https://img.shields.io/npm/v/@ohbug/core.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/core)
[![license](https://img.shields.io/github/license/ohbug-org/ohbug?style=flat-square)](https://github.com/ohbug-org/ohbug/blob/master/LICENSE)

</div>

[English](./README.md) | 简体中文

## 简介

Ohbug 是一套集行为监控、异常监控、自定义行为监控于一体的 JavaScript 监控模块。

通过灵活的扩展系统，可以实现性能监控、特定信息的采集、以及基于 rrweb 的"录屏"回放等高级功能。

## 特性

- 🔍 **错误监控** — 自动捕获未处理异常、资源加载错误、Promise 拒绝、AJAX/Fetch 错误和 WebSocket 错误
- 🧩 **扩展系统** — 通过灵活的插件架构扩展功能
- 📱 **多框架支持** — 原生支持 React、Vue 和 Angular
- 🎬 **会话回放** — 通过 [rrweb](https://github.com/rrweb-io/rrweb) 扩展录制和回放用户会话
- 📦 **轻量级** — 支持 Tree-shaking 的 ESM 模块，零冗余
- 🔧 **可定制** — 支持钩子（`onEvent`、`onNotify`）、用户追踪、元数据和行为记录

## 快速开始

### 浏览器

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
    <OhbugErrorBoundary client={client} FallbackComponent={<div>出错了</div>}>
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

## 配置项

| 选项           | 类型       | 默认值                    | 说明                                            |
| -------------- | ---------- | ------------------------- | ----------------------------------------------- |
| `apiKey`       | `string`   | —                         | **必填**，项目 API Key                          |
| `appVersion`   | `string`   | —                         | 应用版本号                                      |
| `appType`      | `string`   | —                         | 应用类型标识                                    |
| `releaseStage` | `string`   | `"production"`            | 当前发布阶段                                    |
| `endpoint`     | `string`   | `"http://localhost:6660"` | 事件上报地址                                    |
| `maxActions`   | `number`   | `30`                      | 保留的最大行为数量（0–100）                     |
| `onEvent`      | `function` | —                         | 事件创建时的钩子函数                            |
| `onNotify`     | `function` | —                         | 事件上报时的钩子函数                            |
| `user`         | `object`   | —                         | 用户信息（最多 6 个属性）                       |
| `metadata`     | `object`   | —                         | 附加元数据                                      |
| `logger`       | `object`   | `console`                 | 自定义日志器，需包含 `log/info/warn/error` 方法 |

## 包列表

| 包名                                       | 说明                                        |
| ------------------------------------------ | ------------------------------------------- |
| [@ohbug/core](./packages/ohbug-core)       | 核心模块 — 客户端、事件系统、扩展、行为记录 |
| [@ohbug/browser](./packages/ohbug-browser) | 浏览器 SDK — 自动捕获错误、网络异常等       |
| [@ohbug/react](./packages/ohbug-react)     | React 集成 — `OhbugErrorBoundary` 组件      |
| [@ohbug/vue](./packages/ohbug-vue)         | Vue 集成 — Vue 错误处理器插件               |
| [@ohbug/angular](./packages/ohbug-angular) | Angular 集成 — `ErrorHandler` Provider      |
| [@ohbug/types](./packages/ohbug-types)     | 所有包的 TypeScript 类型定义                |
| [@ohbug/utils](./packages/ohbug-utils)     | 共享工具函数                                |

### 相关项目

- [@ohbug/miniapp](https://github.com/ohbug-org/ohbug-miniapp) — 小程序 SDK（支持微信、字节跳动、支付宝、QQ 小程序）
- [@ohbug/unplugin](https://github.com/ohbug-org/unplugin-ohbug) — 构建插件，用于上传 SourceMap 文件
- [@ohbug/cli](https://github.com/ohbug-org/ohbug-cli) — 命令行工具，一键上传 SourceMap 文件
- [Extensions](https://github.com/ohbug-org/extensions) — 官方扩展（rrweb、性能监控等）
- [ohbug-dashboard](https://github.com/ohbug-org/ohbug-dashboard) — 可私有部署的控制台（NestJS + Next.js）

## 开发

### 环境要求

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) 10+

### 安装

```bash
git clone git@github.com:ohbug-org/ohbug.git
cd ohbug
pnpm install
```

### 常用命令

```bash
pnpm dev       # 监听模式，开发所有包
pnpm build     # 构建所有包
pnpm test      # 运行测试（Vitest）
pnpm check     # 类型检查并自动修复
pnpm lint      # 代码检查并自动修复
pnpm fmt       # 格式化代码
```

### Playground

项目包含一个 React Playground 应用，用于本地开发和测试：

```bash
cd playground
pnpm dev       # 启动开发服务器 http://localhost:4000
```

## 贡献者

感谢所有为项目做出贡献的人。

<a href="https://github.com/ohbug-org/ohbug/graphs/contributors"><img src="https://opencollective.com/ohbug/contributors.svg?width=890&button=false" /></a>

## 许可证

[Apache License 2.0](./LICENSE)
