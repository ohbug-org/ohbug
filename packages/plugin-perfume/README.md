# `@ohbug/plugin-perfume`

[![npm](https://img.shields.io/npm/v/@ohbug/plugin-perfume.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/plugin-perfume)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/plugin-perfume?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/plugin-perfume)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Package [perfume.js](https://github.com/Zizzamia/perfume.js), to collect performance information.

## Installation

```
yarn add @ohbug/plugin-perfume
```

## Usage

```javascript
import { applyPlugin } from '@ohbug/core'
import ohbugPluginPerfume from '@ohbug/plugin-perfume'
import { init } from '@ohbug/browser'

const enhancer = applyPlugin(ohbugPluginPerfume)
init({ apiKey: 'YOUR_API_KEY' }, enhancer)
```
