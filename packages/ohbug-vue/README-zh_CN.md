# `@ohbug/vue`

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
