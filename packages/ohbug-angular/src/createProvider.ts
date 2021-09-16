import { ErrorHandler } from '@angular/core'
import type { OhbugBaseDetail, OhbugClient } from '@ohbug/types'
import { ANGULAR } from '@ohbug/core'

export interface AngularErrorDetail extends OhbugBaseDetail {
  stack?: string
}

function createProvider(
  client: OhbugClient,
  errorHandler: ErrorHandler
): {
  provide: ErrorHandler
  useClass: any
} {
  class OhbugErrorHandler implements ErrorHandler {
    handleError(err: Error): void {
      const detail: AngularErrorDetail = {
        message: err.message,
        stack: err.stack,
      }
      const event = client.createEvent<AngularErrorDetail>({
        category: 'error',
        type: ANGULAR,
        detail,
      })
      client.notify(event)
    }
  }

  return {
    provide: errorHandler,
    useClass: OhbugErrorHandler,
  }
}

export default createProvider
