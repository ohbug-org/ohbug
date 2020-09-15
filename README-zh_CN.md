<div align="center">
  <h1>Ohbug</h1>
  <p>为您的应用提供实时监控。</p>

  [![build](https://img.shields.io/github/workflow/status/ohbug-org/ohbug/Node.js%20CI/master?style=flat-square)](https://github.com/ohbug-org/ohbug/actions?query=workflow%3A%22Node.js+CI%22)
  [![npm](https://img.shields.io/npm/v/@ohbug/core.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/core)
  [![codecov](https://img.shields.io/codecov/c/github/ohbug-org/ohbug.svg?style=flat-square)](https://codecov.io/gh/ohbug-org/ohbug)
  [![license](https://img.shields.io/github/license/ohbug-org/ohbug?style=flat-square)](https://github.com/ohbug-org/ohbug/blob/master/LICENSE)
  [![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
  [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg?style=flat-square)](https://lerna.js.org/)
</div>

<p align="center">
  <img width="300" src="https://raw.githubusercontent.com/ohbug-org/ohbug-website/master/static/images/dashboard-issues.png" alt="dashboard-issues">
  <img width="300" src="https://raw.githubusercontent.com/ohbug-org/ohbug-website/master/static/images/dashboard-event.png" alt="dashboard-event">
</p>

[English](./README.md) | 简体中文

## 简介

Ohbug 是一套集 行为监控、异常监控、自定义行为监控 于一体的 JavaScript 监控模块。

通过灵活的插件系统，可以实现性能监控、特定信息的采集、黑科技“录屏“等功能。

将支持 NodeJS、React Native 等 JavaScript 平台。

## Packages

### Platform

- [@ohbug/browser](./packages/ohbug-browser): SDK for Browsers.
- [@ohbug/react](./packages/ohbug-react): SDK for React.
- [@ohbug/vue](./packages/ohbug-vue): SDK for Vue.
- [@ohbug/miniapp](https://github.com/ohbug-org/ohbug-miniapp): Ohbug 小程序 SDK 用于小程序平台（支持微信、字节跳动、支付宝、QQ 小程序）

### Extensions

- [@ohbug/extension-perfume](./packages/ohbug-extension-perfume): 封装 [perfume.js](https://github.com/Zizzamia/perfume.js)，用于收集性能信息。
- [@ohbug/extension-rrweb](./packages/ohbug-extension-rrweb): 封装 [rrweb](https://github.com/rrweb-io/rrweb)，用于“录屏”。
- [@ohbug/extension-uuid](./packages/ohbug-extension-uuid): 扩展 `Event.user` 增加 `UUID` 标识。

### Others

- [@ohbug/core](./packages/ohbug-core): 核心功能模块。
- [@ohbug/utils](./packages/ohbug-utils): 包含一些帮助/工具程序。
- [@ohbug/types](./packages/ohbug-types): 包含所有包中使用的类型。
- [@ohbug/redux-middleware](./packages/ohbug-redux-middleware): Redux 中间件，用于将 Redux state/actions 记录在 Ohbug Actions 内.
- [@ohbug/webpack-plugin](./packages/ohbug-webpack-plugin): webpack 插件，用于上传 sourceMap 文件。
- [@ohbug/cli](https://github.com/ohbug-org/ohbug-cli): 一键上传您的 sourceMap 文件到 Ohbug 或其他服务。

## Dashboard

这部分包含了整个控制台，你可以私有部署 Ohbug，查看[部署文档](https://github.com/ohbug-org/ohbug-server/blob/master/setup.md)。

- [ohbug-server](https://github.com/ohbug-org/ohbug-server): 控制台后端部分，基于 nestjs 实现。
- [ohbug-web-app](https://github.com/ohbug-org/ohbug-web-app): 控制台前端部分。

## License

This project is licensed under the terms of the [Apache License 2.0](https://github.com/ohbug-org/ohbug/blob/master/LICENSE).
