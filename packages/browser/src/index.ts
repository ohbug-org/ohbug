import { captureMessage } from '@ohbug/core'
import init from './init'

export { init, captureMessage }

export {
  UncaughtErrorDetail,
  ResourceErrorDetail,
  UnhandledrejectionErrorDetail,
  UnknownErrorDetail,
  AjaxErrorDetail,
  FetchErrorDetail,
  WebsocketErrorDetail
} from './handle'
