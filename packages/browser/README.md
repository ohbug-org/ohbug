# `@ohbug/browser`

[![npm](https://img.shields.io/npm/v/@ohbug/browser.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/browser)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/browser?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/browser)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

English | [简体中文](./README-zh_CN.md)

## Installation

```
yarn add @ohbug/browser
```

## Usage

```javascript
import { init } from '@ohbug/browser'

init({ apiKey: 'YOUR_API_KEY' })
```

## API

### init

Here is a description of the config of `init`.

```typescript
interface Config {
  apiKey: string
  appVersion?: string
  appType?: string
  beforeReport?: (event: Event<any>) => Event<any>
  reported?: (event: Event<any>) => void
}
```

#### apiKey

Your project API key.

#### appVersion

The version number of your app. Conveniently locate the problem version.

#### appType

The type of your app. If your app's codebase contains different entries, but reports to the same service, you may need to add `appType` to indicate the type of entry for the source of the problem.

#### beforeReport

Used to do some processing on the collected information before reporting.

#### reported

Used to perform specific operations after reporting.

### captureMessage

Used to report custom information

```javascript
import { captureMessage } from '@ohbug/browser'

captureMessage('error info')
```

### feedback

Used to collect user feedback

```javascript
import { feedback } from '@ohbug/browser'

btn.addEventListener('click', () => {
  feedback()
})
```

## Plugin

### Example

Use of plugin based on [perfume.js](https://github.com/Zizzamia/perfume.js) package.

```
yarn add @ohbug/plugin-perfume
```

```javascript
import { applyPlugin } from '@ohbug/core'
import ohbugPluginPerfume from '@ohbug/plugin-perfume'
import { init } from '@ohbug/browser'

const enhancer = applyPlugin(ohbugPluginPerfume)
init({ apiKey: 'YOUR_API_KEY' }, enhancer)
```

### Custom plugin

Example

```javascript
// capturer Capture of custom information
// Use createEvent to encapsulate captured information
// Use collector to pass information to Ohbug for reporting
const capturer = ({ createEvent, collector }) => {
  a.addEventListener('error', (e) => {
    // do something
    const event = createEvent('TYPE', e)
    collector(event)
  })
}

// collector is used for secondary processing of existing information
// Returns an object in any format, and eventually this information will appear in event.state
const collector = event => {
  return {
    user: 'user_1'
  }
}

const myPlugin = config => {
  return { capturer, collector }
}
```

### List of plugins

- [plugin-perfume](https://github.com/ohbug-org/ohbug/tree/master/packages/plugin-perfume) For performance information monitoring
- [plugin-rrweb](https://github.com/ohbug-org/ohbug/tree/master/packages/plugin-rrweb) Used to restore the scene when an exception occurs
