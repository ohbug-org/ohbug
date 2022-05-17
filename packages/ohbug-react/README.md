# `@ohbug/react`

[![npm](https://img.shields.io/npm/v/@ohbug/react.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/react)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/react?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/react)

English | [简体中文](./README-zh_CN.md)

## Installation

```
pnpm instal @ohbug/browser @ohbug/react
```

## Usage

```jsx
import React from 'react'
import Ohbug from '@ohbug/browser'
import { OhbugErrorBoundary } from '@ohbug/react'

const client = Ohbug.setup({ apiKey: 'YOUR_API_KEY' })

function App() {
  return (
    <div className="App">
      <OhbugErrorBoundary client={client}>
        <HelloWorld />
      </OhbugErrorBoundary>
    </div>
  )
}
```
