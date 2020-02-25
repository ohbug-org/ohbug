# Ohbug

Ohbug 是一套灵活的 JavaScript 监控模块。

## 简介

Ohbug 是一套集 行为监控、异常监控、自定义行为监控 于一体的JavaScript 监控模块。

通过灵活的插件系统，可以实现性能监控、特定信息的采集、黑科技“录屏“等功能。

将支持 小程序、NodeJS、React Native 等 JavaScript 平台。

## 安装

```
yarn add @ohbug/core @ohbug/browser
```

## 使用

```javascript
import { init } from '@ohbug/browser'

init({ appid: 'demo_appid' })
```

## Config

```typescript
interface Config {
  appid: string
  beforeReport?: (event: Event<any>) => Event<any>
  reported?: (event: Event<any>) => void
}
```

### appid

这里作为客户端的唯一标识。

### beforeReport

用于上报前对收集到的信息做一定处理。

### reported

用于上报后的特定操作。


## 插件系统

### 简介

主要有两个用途
1. 捕获更多自定义信息
2. 在已有的信息基础上附加特定信息

### 使用
基于 [perfume.js](https://github.com/Zizzamia/perfume.js) 封装的插件使用
```
yarn add @ohbug/plugin-perfume
```

```javascript
import { applyPlugin } from '@ohbug/core'
import ohbugPluginPerfume from '@ohbug/plugin-perfume'
import { init } from '@ohbug/browser'

const enhancer = applyPlugin(ohbugPluginPerfume)
init({ appid: 'demo_appid' }, enhancer)
```

### 自制插件

示例
```javascript
// capturer 用于自定义信息的捕获
// 使用 createEvent 封装捕获到的信息
// 使用 collector 传递信息给 Ohbug 用于上报
const capturer = ({ createEvent, collector }) => {}

// collector 用于对已有信息进行二次处理
// 返回任意格式 object，最终这些信息将出现在 `event.state` 中
const collector = event => {
  console.log(event)

  return {
    user: 'user_1'
  }
}

const myPlugin = config => {
  return { capturer, collector }
}
```

### 插件列表

- [plugin-perfume](https://github.com/ohbug-org/ohbug/tree/master/packages/plugin-perfume) 用于性能信息监控
- [plugin-rrweb](https://github.com/ohbug-org/ohbug/tree/master/packages/plugin-rrweb) 用于还原异常出现时的场景

## License

This project is licensed under the terms of the [Apache License 2.0](https://github.com/ohbug-org/ohbug/blob/master/LICENSE).
