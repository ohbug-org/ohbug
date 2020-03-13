# `@ohbug/webpack-plugin`

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
}
```

### apiKey

Your project API key.

### appVersion

The version number of your app. Conveniently locate the problem version.

### appType

The type of your app. If your app's codebase contains different entries, but reports to the same service, you may need to add `appType` to indicate the type of entry for the source of the problem.
