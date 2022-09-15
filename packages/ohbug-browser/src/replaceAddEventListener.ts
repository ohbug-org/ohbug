import { getGlobal, replace } from '@ohbug/utils'

const global = getGlobal<Window>()
const access = 'addEventListener' in global
const EventTargetProto = EventTarget?.prototype
const EventTargetOriginal = access
  ? { addEventListener: EventTarget.prototype.addEventListener }
  : {}

export function replaceAddEventListener() {
  EventTargetProto.addEventListener = replace(
    EventTargetProto,
    'addEventListener',
    origin =>
      function call(type: string, listener: any, options: any) {
        const wrappedListener = function(...args: any[]) {
          // eslint-disable-next-line no-useless-catch
          try {
            return listener.apply(this, args)
          }
          catch (err) {
            throw err
          }
        }
        return origin.call(this, type, wrappedListener, options)
      },
  )
}

export function removeReplaceAddEventListener() {
  if (access && EventTargetOriginal.addEventListener) {
    const EventTargetProto = EventTarget?.prototype
    EventTargetProto.addEventListener = EventTargetOriginal.addEventListener
  }
}
