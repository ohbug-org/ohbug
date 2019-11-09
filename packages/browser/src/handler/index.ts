// script
import uncaughtErrorHandler from './uncaughtErrorHandler'
import resourceErrorHandler from './resourceErrorHandler'
import unhandledrejectionErrorHandler from './unhandledrejectionErrorHandler'
import unknownErrorHandler from './unknownErrorHandler'
// network
import ajaxErrorHandler from './ajaxErrorHandler'
import fetchErrorHandler from './fetchErrorHandler'
import websocketErrorHandler from './websocketErrorHandler'

export {
  uncaughtErrorHandler,
  resourceErrorHandler,
  unhandledrejectionErrorHandler,
  unknownErrorHandler,
  ajaxErrorHandler,
  fetchErrorHandler,
  websocketErrorHandler
}
