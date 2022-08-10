<div align="center">

  <a href="https://ohbug.net" target="_blank">
    <img src="https://raw.githubusercontent.com/ohbug-org/blog/master/images/ohbug_logo.svg" alt="Ohbug" height="40">
  </a>

[![build](https://img.shields.io/github/workflow/status/ohbug-org/ohbug/Node.js%20CI/master?style=flat-square)](https://github.com/ohbug-org/ohbug/actions?query=workflow%3A%22Node.js+CI%22)
[![npm](https://img.shields.io/npm/v/@ohbug/core.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/core)
[![license](https://img.shields.io/github/license/ohbug-org/ohbug?style=flat-square)](https://github.com/ohbug-org/ohbug/blob/master/LICENSE)

</div>

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
- [@ohbug/angular](./packages/ohbug-angular): SDK for Angular.
- [@ohbug/miniapp](https://github.com/ohbug-org/ohbug-miniapp): Ohbug 小程序 SDK 用于小程序平台（支持微信、字节跳动、支付宝、QQ 小程序）

### Extensions

see [extensions](https://github.com/ohbug-org/extensions)

### Others

- [@ohbug/core](./packages/ohbug-core): 核心功能模块。
- [@ohbug/utils](./packages/ohbug-utils): 包含一些帮助/工具程序。
- [@ohbug/types](./packages/ohbug-types): 包含所有包中使用的类型。
- [@ohbug/unplugin](https://github.com/ohbug-org/unplugin-ohbug): Unplugin 用于上传 sourceMap 文件.
- [@ohbug/cli](https://github.com/ohbug-org/ohbug-cli): 一键上传您的 sourceMap 文件到 Ohbug 或其他服务。

## Dashboard

这部分包含了整个控制台，你可以私有部署 Ohbug，查看[部署文档](https://ohbug.net/guide/deploying.html)。

- [ohbug-dashboard](https://github.com/ohbug-org/ohbug-dashboard): 控制台应用，基于 nestjs 和 nextjs。


## Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/ohbug-org/ohbug/graphs/contributors"><img src="https://opencollective.com/ohbug/contributors.svg?width=890&button=false" /></a>

## Feedback

| Github Issue                                                        | 微信群                                                                                                                 |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [ohbug-org/ohbug/issues](https://github.com/ohbug-org/ohbug/issues) | <img src="https://github.com/ohbug-org/blog/blob/master/images/qrcode.jpg?raw=true" width="200" /> 关注后回复「ohbug」 |

## License

This project is licensed under the terms of the [Apache License 2.0](https://github.com/ohbug-org/ohbug/blob/master/LICENSE).
