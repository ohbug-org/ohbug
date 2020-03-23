# `@ohbug/vue`

[![npm](https://img.shields.io/npm/v/@ohbug/vue.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/vue)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/vue?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/vue)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[English](./README.md) | 简体中文

## 安装

```
yarn add @ohbug/vue
```

## 使用

```javascript
import OhbugVue from '@ohbug/vue'

Vue.use(OhbugVue, {
  apiKey: 'YOUR_API_KEY',
  appVersion: 'YOUR_APP_VERSION'
})
```

## Config

```typescript
interface Config {
  apiKey: string
  appVersion?: string
  appType?: string
  beforeReport?: (event: Event<any>) => Event<any>
  reported?: (event: Event<any>) => void
}
```

### apiKey

这里作为客户端的唯一标识。

### appVersion

您应该提供 app 的版本号/标识符，以便于定位问题出现的时机。

### appType

如果您的 app 的代码库包含不同的入口，但向同一个服务上报，则可能需要添加 `appType` 表示问题来源的入口类型。

### beforeReport

用于上报前对收集到的信息做一定处理。

### reported

用于上报后的特定操作。

## 插件

### 例子

基于 [perfume.js](https://github.com/Zizzamia/perfume.js) 封装的插件使用。

```
yarn add @ohbug/plugin-perfume
```

```javascript
import { applyPlugin } from '@ohbug/core'
import ohbugPluginPerfume from '@ohbug/plugin-perfume'
import OhbugVue from '@ohbug/vue'

const enhancer = applyPlugin(ohbugPluginPerfume)

Vue.use(
  OhbugVue,
  {
    apiKey: '9612114ecfdd1cd322ca0188be729f1e9065e36bc0d0ec6acccaf87d21f57bc0',
    appVersion: '1.0.0'
  },
  enhance
)
```
