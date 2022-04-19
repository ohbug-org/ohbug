import Ohbug from '@ohbug/browser'
import { OhbugErrorBoundary } from '@ohbug/react'

export const client = Ohbug.setup({
  apiKey: 'YOUR_API_KEY',
  appType: 'react',
})
export { OhbugErrorBoundary }
