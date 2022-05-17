import { defineExtension } from '@ohbug/core'
import { getUUID } from './uuid'

export const extension = defineExtension({
  name: 'OhbugExtensionUUID',
  onEvent: (event) => {
    const uuid = getUUID()
    event.setUser({ uuid })
    return event
  },
})
