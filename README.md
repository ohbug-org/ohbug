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

English | [简体中文](./README-zh_CN.md)

## Introduction

Ohbug is a JavaScript monitoring module that integrates behavior monitoring, exception monitoring, and custom behavior monitoring.

Through the flexible plug-in system, functions such as performance monitoring, collection of specific information, and "screen recording" of black technology can be realized.

Will support Mini Program, NodeJS, React Native and other JavaScript platforms.

## Packages

### Platform

- [@ohbug/browser](./packages/browser): SDK for Browsers.
- [@ohbug/react](packages/react): SDK for React.
- [@ohbug/vue](packages/vue): SDK for Vue.

### Extensions

- [@ohbug/extension-perfume](packages/ohbug-extension-perfume): Package [perfume.js](https://github.com/Zizzamia/perfume.js), to collect performance information.
- [@ohbug/extension-rrweb](packages/ohbug-extension-rrweb): Package [rrweb](https://github.com/rrweb-io/rrweb), to "screen recording".
- [@ohbug/extension-uuid](packages/ohbug-extension-uuid): Extend `Event.user` and add `UUID` .

### Others

- [@ohbug/core](./packages/core): Core function modules.
- [@ohbug/utils](./packages/utils): Contains some helper/tool programs.
- [@ohbug/types](./packages/types): Contains types used in all packages.
- [@ohbug/webpack-plugin](./packages/webpack-plugin): webpack plugin for uploading sourceMap files.
- [@ohbug/cli](https://github.com/ohbug-org/ohbug-cli): Upload your sourceMap file to Ohbug or other services in one click.

## License

This project is licensed under the terms of the [Apache License 2.0](https://github.com/ohbug-org/ohbug/blob/master/LICENSE).
