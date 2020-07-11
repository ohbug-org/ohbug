import { createExtension } from '@ohbug/core'
import React from 'react'

import { createOhbugErrorBoundary } from './OhbugErrorBoundary'

export const extension = createExtension({
  name: 'OhbugReact',
  init: (client, react: typeof React) => {
    if (!react) {
      throw new Error('Ohbug @ohbug/react reference to `React` was undefined')
    }
    return createOhbugErrorBoundary(client, react)
  },
})
