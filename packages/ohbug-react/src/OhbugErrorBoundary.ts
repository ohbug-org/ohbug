import type { OhbugBaseDetail, OhbugClient } from '@ohbug/types'
import React from 'react'

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

export function createOhbugErrorBoundary(client: OhbugClient, react: typeof React) {
  return class OhbugErrorBoundary extends react.Component<ErrorBoundaryProp, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProp) {
      super(props)
      this.state = {
        error: null,
        info: null,
      }
    }

    componentDidCatch(error: Error, info: any) {
      const detail: ReactErrorDetail = {
        name: error.name,
        message: error.message,
        stack: error.stack,
        errorInfo: info,
      }

      const event = client.createEvent<ReactErrorDetail>({
        category: 'error',
        type: 'react',
        detail,
      })
      client.notify(event)

      this.setState({
        error: null,
        info: null,
      })
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
}
