import Ohbug from '@ohbug/browser'
import { OhbugErrorBoundary } from '@ohbug/react'
import OhbugExtensionRrweb from '@ohbug/extension-rrweb'

export const client = Ohbug.setup({
  apiKey: '5c00f9696c97880bed9dc701168fa734e5f063132ba5a9df6775678b67b91db8',
  appType: 'react',
  appVersion: __APP_VERSION__,
  maxActions: 0,
})
client.use(OhbugExtensionRrweb)
export { OhbugErrorBoundary }
