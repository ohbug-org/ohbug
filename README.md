<div align="center">
  <h1>Ohbug</h1>
  <p>Real-time monitoring reporting for your app.</p>

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

English | [简体中文](./README-zh_CN.md)

## Introduction

Ohbug is a JavaScript monitoring module that integrates behavior monitoring, exception monitoring, and custom behavior monitoring.

Through the flexible plug-in system, functions such as performance monitoring, collection of specific information, and "screen recording" of black technology can be realized.

Will support NodeJS, React Native and other JavaScript platforms.

## Packages

### Platform

- [@ohbug/browser](./packages/ohbug-browser): SDK for Browsers.
- [@ohbug/react](./packages/ohbug-react): SDK for React.
- [@ohbug/vue](./packages/ohbug-vue): SDK for Vue.
- [@ohbug/miniapp](https://github.com/ohbug-org/ohbug-miniapp): SDK for miniapp.

### Extensions

- [@ohbug/extension-perfume](https://github.com/ohbug-org/ohbug-extension-perfume): Package [perfume.js](https://github.com/Zizzamia/perfume.js), to collect performance information.
- [@ohbug/extension-rrweb](https://github.com/ohbug-org/ohbug-extension-rrweb): Package [rrweb](https://github.com/rrweb-io/rrweb), to "screen recording".
- [@ohbug/extension-uuid](./packages/ohbug-extension-uuid): Extend `Event.user` and add `UUID` .

### Others

- [@ohbug/core](./packages/ohbug-core): Core function modules.
- [@ohbug/utils](./packages/ohbug-utils): Contains some helper/tool programs.
- [@ohbug/types](./packages/ohbug-types): Contains types used in all packages.
- [@ohbug/redux-middleware](./packages/ohbug-redux-middleware): Redux middleware for propagating Redux state/actions to use with Ohbug.
- [@ohbug/webpack-plugin](./packages/ohbug-webpack-plugin): webpack plugin for uploading sourceMap files.
- [@ohbug/cli](https://github.com/ohbug-org/ohbug-cli): Upload your sourceMap file to Ohbug or other services in one click.

## Dashboard

This part contains the entire dashboard, you can deploy Ohbug privately, view the [deployment document](https://github.com/ohbug-org/ohbug-server/blob/master/setup.md).

- [ohbug-server](https://github.com/ohbug-org/ohbug-server): The back end of the dashboard is implemented based on nestjs.
- [ohbug-web-app](https://github.com/ohbug-org/ohbug-web-app): Front end of the dashboard.

## License

This project is licensed under the terms of the [Apache License 2.0](https://github.com/ohbug-org/ohbug/blob/master/LICENSE).
