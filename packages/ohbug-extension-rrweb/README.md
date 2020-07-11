# `@ohbug/extension-rrweb`

[![npm](https://img.shields.io/npm/v/@ohbug/plugin-rrweb.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/plugin-rrweb)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/plugin-rrweb?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/plugin-rrweb)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Package [rrweb](https://github.com/rrweb-io/rrweb), to "screen recording".

## Installation

```
yarn add rrweb @ohbug/extension-rrweb
```

## Usage

```javascript
import Ohbug from '@ohbug/browser'
import ohbugPluginRrweb from '@ohbug/extension-rrweb'

const client = Ohbug.init({ apiKey: 'YOUR_API_KEY' })
client.use(ohbugPluginRrweb)
```
