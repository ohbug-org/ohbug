import { createExtension } from '@ohbug/core'
import createProvider from './createProvider'

export const extension = createExtension({
  name: 'OhbugAngular',
  init: (client, ErrorHandler) => createProvider(client, ErrorHandler),
})
