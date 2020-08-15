# `@ohbug/webpack-plugin`

[![npm](https://img.shields.io/npm/v/@ohbug/webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/webpack-plugin)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/webpack-plugin?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/webpack-plugin)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

English | [简体中文](./README-zh_CN.md)

## Installation

```
yarn add @ohbug/webpack-plugin --dev
```

## Usage

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

Your project API key.

### appVersion

The version number of your app. Conveniently locate the problem version.

### appType

The type of your app. If your app's codebase contains different entries, but reports to the same service, you may need to add `appType` to indicate the type of entry for the source of the problem.

### url

The url of the upload server
