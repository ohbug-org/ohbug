import { BrowserClient } from './client'
import * as types from './types'

export type {
  UncaughtErrorDetail,
  ResourceErrorDetail,
  UnhandledrejectionErrorDetail,
  UnknownErrorDetail,
  AjaxErrorDetail,
  FetchErrorDetail,
  WebsocketErrorDetail,
} from './handle'

export { BrowserClient as Client, types }
export default BrowserClient
