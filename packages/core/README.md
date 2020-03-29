# `@ohbug/core`

[![npm](https://img.shields.io/npm/v/@ohbug/core.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/core)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/core?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/core)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

English | [简体中文](./README-zh_CN.md)

## Introduction

ohbug's core module is responsible for managing ohbug's workflow.
```
// workflow
init => capture => collect => hub => report
```

## Installation

```
yarn add @ohbug/core
```

## API

### init

Register for capture, report, asynchronous tasks, destroy, plugin mount.

It should be noted that the init here is only used to initialize the environment and register tasks, and the specific task content is delegated to each end to implement separately.

In most cases, you don't need to use it, just use the access package of the corresponding platform provided by ohbug.

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

Used to accept plugins.

```javascript
import { applyPlugin } from '@ohbug/core'
import ohbugPluginPerfume from '@ohbug/plugin-perfume'
import { init } from '@ohbug/browser'

const enhancer = applyPlugin(ohbugPluginPerfume)
init({ apiKey: 'YOUR_API_KEY' }, enhancer)
```

### capture

Used to perform all captures.

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

Used to collect events and trigger `hub.addEvent`.

```typescript
type Execution = 'sync' | 'async'
function collect<T = Window>(event: any, execution?: Execution): void
```

The execution parameter defaults to `sync` to control the timing of the report.

When execution is `sync`, the report event will be triggered synchronously.

When execution is `async`, `handleAsync` will be triggered and enter the asynchronous queue, and event will be reported when the set reporting timing is reached.

### report

Used to trigger `handleReport` and trigger life cycle.

```typescript
type Execution = 'sync' | 'async'
function report<T = Window>(event: Event<any>, execution: Execution): void
```

### createEvent

Encapsulates arbitrary information as an event used by ohbug.

```typescript
function createEvent<D, T = Window>(type: string, detail: D, category?: "error" | "message" | "feedback" | "other"): Event<D>
```

### captureMessage

Used to report custom information.

```typescript
function captureMessage<T = Window>(message: string): void
```
