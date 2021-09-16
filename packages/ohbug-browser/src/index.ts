import { BrowserClient } from './client'

export type {
  UncaughtErrorDetail,
  ResourceErrorDetail,
  UnhandledrejectionErrorDetail,
  UnknownErrorDetail,
  AjaxErrorDetail,
  FetchErrorDetail,
  WebsocketErrorDetail,
} from './handle'

export { BrowserClient as Client }
export default BrowserClient
