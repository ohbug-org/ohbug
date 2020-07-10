import { createExtension } from '@ohbug/core'
import type { VueConstructor } from 'vue'

import { install } from './install'

export const extension = createExtension({
  name: 'OhbugVue',
  init: (client, Vue: VueConstructor) => {
    if (!Vue) {
      throw new Error('Ohbug @ohbug/vue reference to `Vue` was undefined')
    }
    return install(client, Vue)
  },
})
