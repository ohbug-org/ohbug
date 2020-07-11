import { createExtension } from '@ohbug/core'

import { handleCapture } from './capture'
import { handleDestroy } from './destroy'

export const extension = createExtension({
  name: 'OhbugBrowser',
  init: () => {
    handleCapture()
    handleDestroy()
  },
})
