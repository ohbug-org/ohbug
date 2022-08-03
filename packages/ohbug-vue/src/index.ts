import type { OhbugClient } from '@ohbug/types'
import type { Vue } from './types'
import { install } from './install'
export type { VueErrorDetail } from './install'

export default function createVueClient(client: OhbugClient) {
  return {
    install: (app: Vue) => {
      install(client, app)
    },
  }
}
