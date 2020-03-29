// script
import uncaughtErrorHandler, { UncaughtErrorDetail } from './uncaughtErrorHandler'
import resourceErrorHandler, { ResourceErrorDetail } from './resourceErrorHandler'
import unhandledrejectionErrorHandler, {
  UnhandledrejectionErrorDetail
} from './unhandledrejectionErrorHandler'
import unknownErrorHandler, { UnknownErrorDetail } from './unknownErrorHandler'
// network
import ajaxErrorHandler, { AjaxErrorDetail } from './ajaxErrorHandler'
import fetchErrorHandler, { FetchErrorDetail } from './fetchErrorHandler'
import websocketErrorHandler, { WebsocketErrorDetail } from './websocketErrorHandler'

export {
  uncaughtErrorHandler,
  resourceErrorHandler,
  unhandledrejectionErrorHandler,
  unknownErrorHandler,
  ajaxErrorHandler,
  fetchErrorHandler,
  websocketErrorHandler
}

export {
  UncaughtErrorDetail,
  ResourceErrorDetail,
  UnhandledrejectionErrorDetail,
  UnknownErrorDetail,
  AjaxErrorDetail,
  FetchErrorDetail,
  WebsocketErrorDetail
}
