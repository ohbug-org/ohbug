# `@ohbug/angular`

[![npm](https://img.shields.io/npm/v/@ohbug/angular.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/angular)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/angular?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/angular)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

English | [简体中文](./README-zh_CN.md)

## Installation

```
yarn add @ohbug/browser @ohbug/angular
```

## Usage

```jsx
// app.module.ts
import Ohbug from '@ohbug/browser'
import { ErrorHandler } from '@angular/core'

const client = Ohbug.setup({ apiKey: 'YOUR_API_KEY' })
const OhbugProvider = client.use(OhbugAngular, ErrorHandler)

@NgModule({
  // others
  providers: [OhbugProvider],
})
export class AppModule {}
```
