import { types, collector } from '@ohbug/core'
import {
  ajaxErrorHandler,
  fetchErrorHandler,
  websocketErrorHandler,
  unknownErrorHandler
} from '../handler'

const { AJAX_ERROR, FETCH_ERROR, WEBSOCKET_ERROR } = types

function networkDispatcher(type: string, detail: any) {
  try {
    switch (type) {
      case AJAX_ERROR:
        ajaxErrorHandler(detail, collector)
        break
      case FETCH_ERROR:
        fetchErrorHandler(detail, collector)
        break
      case WEBSOCKET_ERROR:
        websocketErrorHandler(detail, collector)
        break
      default:
        break
    }
  } catch (error) {
    unknownErrorHandler(error, collector)
  }
}

export default networkDispatcher
