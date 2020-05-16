import { getGlobal, warning, replace } from '@ohbug/utils'
import { types, getHub } from '@ohbug/core'
import { networkDispatcher } from '../../dispatch'
import { AjaxErrorDetail } from '../../handle'

const global = getGlobal<Window>()
const { AJAX_ERROR } = types
const access = 'XMLHttpRequest' in global

let xhrOriginal = access
  ? {
      open: XMLHttpRequest.prototype.open,
      send: XMLHttpRequest.prototype.send,
    }
  : {}
/**
 * capture AJAX_ERROR
 */
function captureAjaxError() {
  warning(
    access,
    'Ohbug: Binding `AJAX` monitoring failed, the current environment did not find the object `XMLHttpRequest`'
  )
  if (!access) return

  const hub = getHub<Window>()

  const desc = {
    method: '',
    url: '',
  }

  const xhrProto = XMLHttpRequest.prototype

  xhrOriginal.open = replace(
    xhrProto,
    'open',
    (origin) =>
      function (...args: any[]) {
        desc.method = args[0]
        desc.url = args[1]
        return origin.apply(this, args)
      }
  )

  xhrOriginal.send = replace(
    xhrProto,
    'send',
    (origin) =>
      function (...args: any[]) {
        this.addEventListener('readystatechange', function () {
          if (this.readyState === 4) {
            if (desc.url !== '__URL_REPORT__') {
              const detail: AjaxErrorDetail = {
                req: {
                  url: desc.url,
                  method: desc.method,
                  data: args[0] || {},
                },
                res: {
                  status: this.status,
                  statusText: this.statusText,
                  response: this.response,
                },
              }

              const timestamp = new Date().toISOString()
              hub.addAction({
                type: 'ajax',
                timestamp,
                data: detail,
              })

              if (!this.status || this.status >= 400) {
                networkDispatcher(AJAX_ERROR, detail)
              }
            }
          }
        })
        return origin.apply(this, args)
      }
  )
}

export function removeCaptureAjaxError() {
  if (access && xhrOriginal.open && xhrOriginal.send) {
    const xhrProto = XMLHttpRequest.prototype
    xhrProto.open = xhrOriginal.open
    xhrProto.send = xhrOriginal.send
  }
}

export default captureAjaxError
