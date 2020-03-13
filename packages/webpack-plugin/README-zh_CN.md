# `@ohbug/webpack-plugin`

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
      apiKey: '9612114ecfdd1cd322ca0188be729f1e9065e36bc0d0ec6acccaf87d21f57bc0',
      appVersion: '1.0.0'
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

这里作为客户端的唯一标识。

### appVersion

您应该提供 app 的版本号/标识符，以便于定位问题出现的时机。

### appType

如果您的 app 的代码库包含不同的入口，但向同一个服务上报，则可能需要添加 `appType` 表示问题来源的入口类型。
