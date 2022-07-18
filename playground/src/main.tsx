import type { FC } from 'react'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import ReactApp from './App'
import { OhbugErrorBoundary, client } from './ohbug'

const FallbackComponent: FC = () => {
  return <div>Ohbug Error FallbackComponent</div>
}
const container = document.getElementById('root')
const root = createRoot(container!)
root.render(createElement(
  OhbugErrorBoundary,
  { client, FallbackComponent: createElement(FallbackComponent) },
  createElement(ReactApp),
))
