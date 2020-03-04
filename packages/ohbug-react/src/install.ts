import * as React from 'react'
import { Config, BaseDetail } from '@ohbug/types'
import { createEvent, collector } from '@ohbug/core'
import { init } from '@ohbug/browser'

interface Options extends Config {}
export interface ReactErrorDetail extends BaseDetail {
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

function install(options: Options): any {
  init({ apiKey: options.apiKey })

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
      collector(event)
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
