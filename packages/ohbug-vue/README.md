# `@ohbug/vue`

[![npm](https://img.shields.io/npm/v/@ohbug/vue.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/vue)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/vue?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/vue)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

English | [简体中文](./README-zh_CN.md)

## Installation

```
yarn add @ohbug/vue
```

## Usage

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

Your project API key.

### appVersion

The version number of your app. Conveniently locate the problem version.

### appType

The type of your app. If your app's codebase contains different entries, but reports to the same service, you may need to add `appType` to indicate the type of entry for the source of the problem.

### beforeReport

Used to do some processing on the collected information before reporting.

### reported

Used to perform specific operations after reporting.

## Plugin

### Example

Use of plugin based on [perfume.js](https://github.com/Zizzamia/perfume.js) package.

```
yarn add @ohbug/plugin-perfume
```

```jsx
import { applyPlugin } from '@ohbug/core'
import ohbugPluginPerfume from '@ohbug/plugin-perfume'
import OhbugVue from '@ohbug/vue'

const enhancer = applyPlugin(ohbugPluginPerfume)

Vue.use(
  OhbugVue,
  {
    apiKey: 'YOUR_API_KEY',
    appVersion: '1.0.0'
  },
  enhance
)
```
