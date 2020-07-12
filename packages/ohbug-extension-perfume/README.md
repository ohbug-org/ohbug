# `@ohbug/extension-perfume`

[![npm](https://img.shields.io/npm/v/@ohbug/extension-perfume.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/extension-perfume)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/extension-perfume?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/extension-perfume)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Package [perfume.js](https://github.com/Zizzamia/perfume.js), to collect performance information.

## Installation

```
yarn add perfume.js @ohbug/extension-perfume
```

## Usage

```javascript
import Ohbug from '@ohbug/browser'
import OhbugExtensionPerfume from '@ohbug/extension-perfume'

const client = Ohbug.init({ apiKey: 'YOUR_API_KEY' })
client.use(OhbugExtensionPerfume)
```
