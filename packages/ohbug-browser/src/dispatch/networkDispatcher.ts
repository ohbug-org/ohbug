import { EventTypes } from '@ohbug/core'

import {
  ajaxErrorHandler,
  fetchErrorHandler,
  unknownErrorHandler,
  websocketErrorHandler,
} from '../handle'

export function networkDispatcher(type: string, detail: any) {
  try {
    switch (type) {
      case EventTypes.AJAX_ERROR:
        ajaxErrorHandler(detail)
        break
      case EventTypes.FETCH_ERROR:
        fetchErrorHandler(detail)
        break
      case EventTypes.WEBSOCKET_ERROR:
        websocketErrorHandler(detail)
        break
      default:
        break
    }
  }
  catch (error) {
    unknownErrorHandler(error)
  }
}
