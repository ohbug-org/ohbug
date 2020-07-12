import { createExtension } from '@ohbug/core'
import { getUUID } from './uuid'

export const extension = createExtension({
  name: 'OhbugExtensionUUID',
  created: (event) => {
    const uuid = getUUID()
    event.setUser({
      uuid,
    })
    return event
  },
})
