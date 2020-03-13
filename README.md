# Ohbug

Real-time monitoring reporting for your app.

English | [简体中文](./README-zh_CN.md)

## Introduction

Ohbug is a JavaScript monitoring module that integrates behavior monitoring, exception monitoring, and custom behavior monitoring.

Through the flexible plug-in system, functions such as performance monitoring, collection of specific information, and "screen recording" of black technology can be realized.

Will support Mini Program, NodeJS, React Native and other JavaScript platforms.

## Packages

### Platform

- [@ohbug/browser](./packages/browser): SDK for Browsers.
- [@ohbug/react](./packages/ohbug-react): SDK for React.
- [@ohbug/vue](./packages/ohbug-vue): SDK for Vue.

### Plugins

- [@ohbug/plugin-perfume](./packages/plugin-perfume): Package [perfume.js](https://github.com/Zizzamia/perfume.js), to collect performance information.
- [@ohbug/plugin-rrweb](./packages/plugin-rrweb): Package [rrweb](https://github.com/rrweb-io/rrweb), to "screen recording".

### Others

- [@ohbug/core](./packages/core): Core function modules.
- [@ohbug/utils](./packages/utils): Contains some helper/tool programs.
- [@ohbug/types](./packages/types): Contains types used in all packages.
- [@ohbug/webpack-plugin](./packages/webpack-plugin): webpack plugin for uploading sourceMap files.
- [@ohbug/cli](https://github.com/ohbug-org/ohbug-cli): Upload your sourceMap file to Ohbug or other services in one click.

## License

This project is licensed under the terms of the [Apache License 2.0](https://github.com/ohbug-org/ohbug/blob/master/LICENSE).
