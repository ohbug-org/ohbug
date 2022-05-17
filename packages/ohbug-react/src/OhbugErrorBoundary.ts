import type { OhbugBaseDetail, OhbugClient } from '@ohbug/types'
import React from 'react'
import { EventTypes } from '@ohbug/core'

export interface ReactErrorDetail extends OhbugBaseDetail {
  name: string
  stack?: string
  errorInfo: any
}

interface ErrorBoundaryProp {
  client: OhbugClient
  FallbackComponent?: React.ReactElement
  children?: React.ReactNode
}
interface ErrorBoundaryState {
  error: any
}
export class OhbugErrorBoundary extends React.Component<
ErrorBoundaryProp,
ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProp) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch(error: Error, info: any) {
    const { client } = this.props
    const detail: ReactErrorDetail = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      errorInfo: info,
    }

    const event = client.createEvent<ReactErrorDetail>({
      category: 'error',
      type: EventTypes.REACT,
      detail,
    })
    client.notify(event)
    this.setState({ error })
  }

  render() {
    const { error } = this.state
    const { FallbackComponent, children } = this.props
    if (error) {
      if (FallbackComponent) return FallbackComponent
      return null
    }
    return children
  }
}
