import { createExtension } from '@ohbug/core'
import { getUUID } from './uuid'

export const extension = createExtension({
  name: 'OhbugExtensionUUID',
  created: (event) => {
    const uuid = getUUID()
    console.log(event)
    event.setUser({
      uuid,
    })
    return event
  },
})
