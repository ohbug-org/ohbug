# `@ohbug/core`

[![npm](https://img.shields.io/npm/v/@ohbug/core.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/core)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/core?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/core)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[English](./README.md) | 简体中文

## 简介

ohbug 的核心模块，负责管理 ohbug 的工作流程。
```
// work flow
init => capture => collect => hub => report
```

## 安装

```
yarn add @ohbug/core
```

## API

### init

用于 capture、report、异步任务、destroy、插件挂载的注册。

需注意的是这里的 init 仅用于初始化环境以及注册任务，具体的任务内容下放给各端单独实现。

对于大部分情况而言，您无须使用它，直接使用 ohbug 提供的对应平台的接入包。

```typescript
interface Init {
  config: Config  
  platform: Platform
  version: string
  handleCapture: () => void
  handleReport: (event: Event<any>) => void
  handleAsync: () => void
  handleDestroy?: () => void
  enhancer?: (config: Config) => Enhancer
}
```

### applyPlugin

用于接受 plugin。

```javascript
import { applyPlugin } from '@ohbug/core'
import ohbugPluginPerfume from '@ohbug/plugin-perfume'
import { init } from '@ohbug/browser'

const enhancer = applyPlugin(ohbugPluginPerfume)
init({ apiKey: 'YOUR_API_KEY' }, enhancer)
```

### capture

用于执行所有的 capture。

```javascript
import { capture } from '@ohbug/core'

function scriptCapture() {
  // ...
}
function networkCapture() {
  // ...
}
function actionCapture() {
  // ...
}
capture(scriptCapture, networkCapture, actionCapture)
```

### collect

用于收集 event 并触发 `hub.addEvent`。

```typescript
type Execution = 'sync' | 'async'
function collect<T = Window>(event: any, execution?: Execution): void
```

execution 参数默认为 `sync` 用于控制 report 的时机。

当 execution 为 `sync` 时将同步地触发 report 上报 event。

当 execution 为 `async` 时将触发 `handleAsync` 并进入异步队列，达成设定的上报时机时上报 event。

### report

用于触发 `handleReport` 以及上报相关的生命周期。

```typescript
type Execution = 'sync' | 'async'
function report<T = Window>(event: Event<any>, execution: Execution): void
```

### createEvent

将任意信息封装为 ohbug 使用的 event。

```typescript
function createEvent<D, T = Window>(type: string, detail: D, category?: "error" | "message" | "feedback" | "other"): Event<D>
```

### captureMessage

用于自定义信息的上报。

```typescript
function captureMessage<T = Window>(message: string): void
```
