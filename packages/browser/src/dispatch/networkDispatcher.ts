import {
  ajaxErrorHandler,
  fetchErrorHandler,
  websocketErrorHandler,
  unknownErrorHandler,
} from '../handle'
import * as types from '../types'

const { AJAX_ERROR, FETCH_ERROR, WEBSOCKET_ERROR } = types

export function networkDispatcher(type: string, detail: any) {
  try {
    switch (type) {
      case AJAX_ERROR:
        ajaxErrorHandler(detail)
        break
      case FETCH_ERROR:
        fetchErrorHandler(detail)
        break
      case WEBSOCKET_ERROR:
        websocketErrorHandler(detail)
        break
      default:
        break
    }
  } catch (error) {
    unknownErrorHandler(error)
  }
}
