# `@ohbug/plugin-perfume`

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
init({ apiKey: 'demo_apiKey' }, enhancer)
```
