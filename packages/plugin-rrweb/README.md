# `@ohbug/plugin-rrweb`

Package [rrweb](https://github.com/rrweb-io/rrweb), to "screen recording".

## Installation

```
yarn add @ohbug/plugin-rrweb
```

## Usage

```javascript
import { applyPlugin } from '@ohbug/core'
import ohbugPluginRrweb from '@ohbug/plugin-rrweb'
import { init } from '@ohbug/browser'

const enhancer = applyPlugin(ohbugPluginRrweb)
init({ apiKey: 'YOUR_API_KEY' }, enhancer)
```
