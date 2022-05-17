import type { OhbugClient } from '@ohbug/types'
import type { Plugin } from 'vue'
import { install } from './install'

export type { VueErrorDetail } from './install'

export default function createVueClient(client: OhbugClient): Plugin {
  return {
    install: (app) => {
      install(client, app)
    },
  }
}
