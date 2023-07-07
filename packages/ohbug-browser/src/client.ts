import type { OhbugClient, OhbugConfig, OhbugSDK } from '@ohbug/types'
import { Client } from '@ohbug/core'
import { getGlobal } from '@ohbug/utils'

import { device } from './device'
import { version } from './version'
import { extension } from './extension'
import { notifier } from './notifier'
import { destroy } from './destroy'

interface OhbugBrowserClient {
  __client: OhbugClient | null
  setup: (config: OhbugConfig) => OhbugClient
}

function createClient(config: OhbugConfig, handleDestroy: () => void) {
  const global = getGlobal<Window>()

  const sdk: OhbugSDK = {
    platform: 'ohbug-browser',
    version,
  }
  const client = new Client({ sdk, config, device, notifier, destroy: handleDestroy })

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
    function destroyClient() {
      const global = getGlobal<Window>()

      destroy()
      BrowserClient.__client = null
      // @ts-expect-error noop
      global.__OHBUG__ = undefined
    }

    if (BrowserClient.__client) {
      BrowserClient.__client.__logger?.warn('setup() has been called. Ignored.')
      return BrowserClient.__client
    }

    BrowserClient.__client = createClient(config, destroyClient)
    return BrowserClient.__client
  },
}
