import * as React from 'react'
import { OhbugConfig, OhbugBaseDetail, OhbugPlugin } from '@ohbug/types'
import { createEvent, collect } from '@ohbug/core'
import { init } from '@ohbug/browser'

interface Options extends OhbugConfig {}
export interface ReactErrorDetail extends OhbugBaseDetail {
  name: string
  stack?: string
  errorInfo: any
}

interface ErrorBoundaryProp {
  FallbackComponent: React.ReactElement
}
interface ErrorBoundaryState {
  error: any
  info: any
}

function install(
  options: Options,
  plugins?: OhbugPlugin[]
): new (props: ErrorBoundaryProp, state: ErrorBoundaryState) => React.Component<
  ErrorBoundaryProp,
  ErrorBoundaryState
> {
  init(options, plugins)

  class OhbugErrorBoundary extends React.Component<ErrorBoundaryProp, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProp) {
      super(props)
      this.state = {
        error: null,
        info: null
      }
    }

    static getDerivedStateFromError(error: Error) {
      return { error }
    }

    componentDidCatch(error: Error, info: any) {
      const detail: ReactErrorDetail = {
        name: error.name,
        message: error.message,
        stack: error.stack,
        errorInfo: info
      }

      const event = createEvent<ReactErrorDetail>('react', detail)
      collect(event)
    }

    render() {
      const { error } = this.state
      if (error) {
        const { FallbackComponent } = this.props
        if (FallbackComponent) return FallbackComponent
        return null
      }
      return this.props.children
    }
  }

  return OhbugErrorBoundary
}

export default install
