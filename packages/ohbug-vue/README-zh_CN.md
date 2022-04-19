# `@ohbug/vue`

[![npm](https://img.shields.io/npm/v/@ohbug/vue.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/vue)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/vue?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/vue)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[English](./README.md) | 简体中文

## 安装

```
yarn add @ohbug/browser @ohbug/vue
```

## 使用

```javascript
import Vue from 'vue'
import Ohbug from '@ohbug/browser'
import OhbugVue from '@ohbug/vue'

const client = Ohbug.setup({ apiKey: 'YOUR_API_KEY' })
client.use(OhbugVue, Vue)
```
