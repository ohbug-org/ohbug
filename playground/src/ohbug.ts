import Ohbug from '@ohbug/browser'
import { OhbugErrorBoundary } from '@ohbug/react'

export const client = Ohbug.setup({
  apiKey: 'f8b38e2ea956e6d295aefcc88e0bbd6739021fd07eebe420e71a4ac4d70f43eb',
  appType: 'react',
  appVersion: __APP_VERSION__,
})
export { OhbugErrorBoundary }
