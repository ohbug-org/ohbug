# `@ohbug/redux-middleware`

[![npm](https://img.shields.io/npm/v/@ohbug/redux-middleware.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/redux-middleware)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/redux-middleware?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/redux-middleware)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[English](./README.md) | 简体中文

## 安装

```
yarn add @ohbug/browser @ohbug/redux-middleware
```

## 使用

```js
import Ohbug from '@ohbug/browser'
import { createStore, applyMiddleware } from "redux"
import createOhbugMiddleware from '@ohbug/redux-middleware'
import reducer from "./reducer"

Ohbug.init({ apiKey: 'YOUR_API_KEY' })

const store = createStore(
  reducer,
  applyMiddleware(createOhbugMiddleware())
)
```

## API

```typescript
import type { Action, MiddlewareAPI } from 'redux'
type CreateOhbugMiddlewareOption = (action: Action, store: MiddlewareAPI) => Action | false
```

### 示例

```typescript
import type { Action, MiddlewareAPI } from 'redux'
function before(action: Action, store: MiddlewareAPI) {
  if (action.type === 'foo') {
    // 你可以过滤某些敏感信息，这些信息不会被收集
    // 只需要返回 false
    return false
  } else if (action.type === 'bar') {
    // 如果你要在处理后再收集数据 
    return {
      type: action.type,
      payload: store.getState() + action.payload
    }
  }
  return action
}

// ...
const store = createStore(
  reducer,
  applyMiddleware(createOhbugMiddleware(before))
)
```
