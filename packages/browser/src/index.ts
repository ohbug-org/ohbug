import { captureMessage } from '@ohbug/core'
import init from './init'

export { init, captureMessage }

export type {
  UncaughtErrorDetail,
  ResourceErrorDetail,
  UnhandledrejectionErrorDetail,
  UnknownErrorDetail,
  AjaxErrorDetail,
  FetchErrorDetail,
  WebsocketErrorDetail,
} from './handle'
