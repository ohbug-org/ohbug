# `@ohbug/vue`

[![npm](https://img.shields.io/npm/v/@ohbug/vue.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/vue)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/vue?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/vue)

English | [简体中文](./README-zh_CN.md)

## Installation

```
pnpm instal @ohbug/browser @ohbug/vue
```

## Usage

```javascript
import Vue from 'vue'
import Ohbug from '@ohbug/browser'
import OhbugVue from '@ohbug/vue'

const client = Ohbug.setup({ apiKey: 'YOUR_API_KEY' })

Vue.createApp(App)
  .use(OhbugVue(client))
  .mount('#app')
```
