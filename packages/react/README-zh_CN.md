# `@ohbug/react`

[![npm](https://img.shields.io/npm/v/@ohbug/react.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/react)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/react?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/react)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[English](./README.md) | 简体中文

## 安装

```
yarn add @ohbug/browser @ohbug/react
```

## 使用

```jsx
import React from 'react'
import Ohbug from '@ohbug/browser'
import OhbugReact from '@ohbug/react'

const client = Ohbug.init({ apiKey: 'YOUR_API_KEY' })
const OhbugErrorBoundary = client.use(OhbugReact, React)

function App() {
  return (
    <div className="App">
      <OhbugErrorBoundary>
        <HelloWorld />
      </OhbugErrorBoundary>
    </div>
  )
}
```
