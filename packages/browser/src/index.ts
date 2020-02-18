import { captureMessage } from '@ohbug/core'
import init from './init'
import feedback from './feedback'

export { init, captureMessage, feedback }

export {
  UncaughtErrorDetail,
  ResourceErrorDetail,
  UnhandledrejectionErrorDetail,
  UnknownErrorDetail,
  AjaxErrorDetail,
  FetchErrorDetail,
  WebsocketErrorDetail
} from './handler'
