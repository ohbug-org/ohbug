# `@ohbug/webpack-plugin`

[![npm](https://img.shields.io/npm/v/@ohbug/webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/webpack-plugin)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/webpack-plugin?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/webpack-plugin)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[English](./README.md) | 简体中文

## 安装

```
yarn add @ohbug/webpack-plugin --dev
```

## 使用

```javascript
const OhbugWebpackPlugin = require('@ohbug/webpack-plugin')

const config = {
  // ...
  plugins: [
    new OhbugWebpackPlugin({
      apiKey: 'YOUR_API_KEY',
      appVersion: 'YOUR_APP_VERSION'
    })
  ]
}
```

## Options

```typescript
interface Options {
  apiKey: string
  appVersion: string
  appType?: string
  url?: string
}
```

### apiKey

这里作为客户端的唯一标识。

### appVersion

您应该提供 app 的版本号/标识符，以便于定位问题出现的时机。

### appType

如果您的 app 的代码库包含不同的入口，但向同一个服务上报，则可能需要添加 `appType` 表示问题来源的入口类型。

### url

上传服务器的 URL
