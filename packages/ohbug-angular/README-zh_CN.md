# `@ohbug/angular`

[![npm](https://img.shields.io/npm/v/@ohbug/angular.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/angular)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/angular?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/angular)

[English](./README.md) | 简体中文

## 安装

```
pnpm instal @ohbug/browser @ohbug/angular
```

## 使用

```jsx
// app.module.ts
import Ohbug from '@ohbug/browser'
import { ErrorHandler } from '@angular/core'
import OhbugAngular from '@ohbug/angular'

const client = Ohbug.setup({ apiKey: 'YOUR_API_KEY' })

@NgModule({
  // others
  providers: [OhbugAngular(client, ErrorHandler)],
})
export class AppModule {}
```
