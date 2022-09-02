import Ohbug from '@ohbug/browser'
import { OhbugErrorBoundary } from '@ohbug/react'
import OhbugExtensionRrweb from '@ohbug/extension-rrweb'

export const client = Ohbug.setup({
  apiKey: '2714c5cc067e104ea76f6074f38ab721e011b469ef7f2e12daabff8debe24ca2',
  appType: 'react',
  appVersion: __APP_VERSION__,
})
client.use(OhbugExtensionRrweb)
export { OhbugErrorBoundary }
