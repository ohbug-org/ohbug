// script
import uncaughtErrorHandler from './uncaughtErrorHandler'
import resourceErrorHandler from './resourceErrorHandler'
import unhandledrejectionErrorHandler from './unhandledrejectionErrorHandler'
import unknownErrorHandler from './unknownErrorHandler'
import type { UncaughtErrorDetail } from './uncaughtErrorHandler'
import type { ResourceErrorDetail } from './resourceErrorHandler'
import type { UnhandledrejectionErrorDetail } from './unhandledrejectionErrorHandler'
import type { UnknownErrorDetail } from './unknownErrorHandler'
// network
import ajaxErrorHandler from './ajaxErrorHandler'
import fetchErrorHandler from './fetchErrorHandler'
import websocketErrorHandler from './websocketErrorHandler'
import type { AjaxErrorDetail } from './ajaxErrorHandler'
import type { FetchErrorDetail } from './fetchErrorHandler'
import type { WebsocketErrorDetail } from './websocketErrorHandler'

export {
  uncaughtErrorHandler,
  resourceErrorHandler,
  unhandledrejectionErrorHandler,
  unknownErrorHandler,
  ajaxErrorHandler,
  fetchErrorHandler,
  websocketErrorHandler,
}

export type {
  UncaughtErrorDetail,
  ResourceErrorDetail,
  UnhandledrejectionErrorDetail,
  UnknownErrorDetail,
  AjaxErrorDetail,
  FetchErrorDetail,
  WebsocketErrorDetail,
}
