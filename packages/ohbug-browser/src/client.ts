import type { OhbugClient, OhbugConfig } from '@ohbug/types'
import { Client } from '@ohbug/core'
import { getGlobal } from '@ohbug/utils'

import { extension } from './extension'
import { notifier } from './notifier'

const platform = 'browser'
const version = '__VERSION__'

interface BrowserClient {
  _client: OhbugClient | null
  init: (config: OhbugConfig) => OhbugClient
}

function createClient(config: OhbugConfig) {
  const global = getGlobal<Window>()

  const client = new Client({ config, device: { platform, version }, notifier })
  global.__OHBUG__ = { client }
  client.use(extension)
  console.log(
    `%c @ohbug/browser %c Detected Ohbug v${version} %c`,
    'background:#333; padding: 2px 1px; color: #FFF',
    'background:#FF6F61; padding: 2px 1px; color: #FFF',
    'background:transparent'
  )
  return client
}

export const BrowserClient: BrowserClient = {
  _client: null,
  init(config: OhbugConfig) {
    if (BrowserClient._client) {
      BrowserClient._client._logger?.log('init() has been called. Ignored.')
      return BrowserClient._client
    }

    BrowserClient._client = createClient(config)
    return BrowserClient._client
  },
}
