import { defineExtension } from '@ohbug/core'
import Vue from 'vue'

import { install } from './install'

export const extension = defineExtension({
  name: 'OhbugVue',
  setup: (client) => {
    if (!Vue)
      throw new Error('Ohbug @ohbug/vue reference to `Vue` was undefined')

    return install(client, Vue)
  },
})
