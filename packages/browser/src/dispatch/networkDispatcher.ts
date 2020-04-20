import { types, collect } from '@ohbug/core'
import {
  ajaxErrorHandler,
  fetchErrorHandler,
  websocketErrorHandler,
  unknownErrorHandler,
} from '../handle'

const { AJAX_ERROR, FETCH_ERROR, WEBSOCKET_ERROR } = types

function networkDispatcher(type: string, detail: any) {
  try {
    switch (type) {
      case AJAX_ERROR:
        ajaxErrorHandler(detail, collect)
        break
      case FETCH_ERROR:
        fetchErrorHandler(detail, collect)
        break
      case WEBSOCKET_ERROR:
        websocketErrorHandler(detail, collect)
        break
      default:
        break
    }
  } catch (error) {
    unknownErrorHandler(error, collect)
  }
}

export default networkDispatcher
