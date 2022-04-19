import { defineExtension } from '@ohbug/core'
import createProvider from './createProvider'

export const extension = defineExtension({
  name: 'OhbugAngular',
  setup: (client, ErrorHandler) => createProvider(client, ErrorHandler),
})
