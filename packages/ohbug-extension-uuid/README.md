# `@ohbug/extension-uuid`

[![npm](https://img.shields.io/npm/v/@ohbug/extension-uuid.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/extension-uuid)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/extension-uuid?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/extension-uuid)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Installation

```
yarn add @ohbug/extension-uuid
```

## Usage

```javascript
import Ohbug from '@ohbug/browser'
import OhbugExtensionUUID from '@ohbug/extension-uuid'

const client = Ohbug.setup({ apiKey: 'YOUR_API_KEY' })
client.use(OhbugExtensionUUID)
```
