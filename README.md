<div align="center">

  <a href="https://ohbug.net" target="_blank">
    <img src="https://raw.githubusercontent.com/ohbug-org/blog/master/images/ohbug_logo.svg" alt="Ohbug" height="40">
  </a>

[![build](https://img.shields.io/github/workflow/status/ohbug-org/ohbug/Node.js%20CI/master?style=flat-square)](https://github.com/ohbug-org/ohbug/actions?query=workflow%3A%22Node.js+CI%22)
[![npm](https://img.shields.io/npm/v/@ohbug/core.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/core)
[![license](https://img.shields.io/github/license/ohbug-org/ohbug?style=flat-square)](https://github.com/ohbug-org/ohbug/blob/master/LICENSE)

</div>

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
- [@ohbug/angular](./packages/ohbug-angular): SDK for Angular.
- [@ohbug/miniapp](https://github.com/ohbug-org/ohbug-miniapp): SDK for miniapp.

### Extensions

see [extensions](https://github.com/ohbug-org/extensions)

### Others

- [@ohbug/core](./packages/ohbug-core): Core function modules.
- [@ohbug/utils](./packages/ohbug-utils): Contains some helper/tool programs.
- [@ohbug/types](./packages/ohbug-types): Contains types used in all packages.
- [@ohbug/unplugin](https://github.com/ohbug-org/unplugin-ohbug): plugin for upload your sourceMap files to Ohbug.
- [@ohbug/cli](https://github.com/ohbug-org/ohbug-cli): Upload your sourceMap file to Ohbug or other services in one click.

## Dashboard

This part contains the entire dashboard, you can deploy Ohbug privately, view the [deployment document](https://ohbug.net/guide/deploying.html).

- [ohbug-dashboard](https://github.com/ohbug-org/ohbug-dashboard): The dashboard is implemented based on nestjs and nextjs.

## Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/ohbug-org/ohbug/graphs/contributors"><img src="https://opencollective.com/ohbug/contributors.svg?width=890&button=false" /></a>

## Feedback

| Github Issue                                                        | 微信群                                                                                                                 |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [ohbug-org/ohbug/issues](https://github.com/ohbug-org/ohbug/issues) | <img src="https://github.com/ohbug-org/blog/blob/master/images/qrcode.jpg?raw=true" width="200" /> 关注后回复「ohbug」 |

## License

This project is licensed under the terms of the [Apache License 2.0](https://github.com/ohbug-org/ohbug/blob/master/LICENSE).
