import type { OhbugClient, OhbugConfig, OhbugSDK } from '@ohbug/types'
import { Client } from '@ohbug/core'

import { getGlobal } from '@ohbug/utils'

import { device } from './device'
import { version } from './version'
import { extension } from './extension'
import { notifier } from './notifier'

interface OhbugBrowserClient {
  __client: OhbugClient | null
  setup: (config: OhbugConfig) => OhbugClient
}

function createClient(config: OhbugConfig) {
  const global = getGlobal<Window>()

  const sdk: OhbugSDK = {
    platform: 'ohbug-browser',
    version,
  }
  const client = new Client({ sdk, config, device, notifier })
  global.__OHBUG__ = { client }
  client.use(extension)
  client.__logger.info(
    `%c @ohbug/browser %c Detected Ohbug v${version} %c`,
    'background:#333; padding: 2px 1px; color: #FFF',
    'background:#FF6F61; padding: 2px 1px; color: #FFF',
    'background:transparent',
  )
  return client
}

export const BrowserClient: OhbugBrowserClient = {
  __client: null,
  setup(config: OhbugConfig) {
    if (BrowserClient.__client) {
      BrowserClient.__client.__logger?.warn('init() has been called. Ignored.')
      return BrowserClient.__client
    }

    BrowserClient.__client = createClient(config)
    return BrowserClient.__client
  },
}
