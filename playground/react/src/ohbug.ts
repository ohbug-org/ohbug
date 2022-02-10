import React from 'react'
import Ohbug from '@ohbug/browser'
import OhbugReact from '@ohbug/react'

export const client = Ohbug.init({ apiKey: 'YOUR_API_KEY' })
export const OhbugErrorBoundary = client.use(OhbugReact, React)
