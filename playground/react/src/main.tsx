import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { OhbugErrorBoundary } from './ohbug'

ReactDOM.render(
  <React.StrictMode>
    <OhbugErrorBoundary>
      <App />
    </OhbugErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)
