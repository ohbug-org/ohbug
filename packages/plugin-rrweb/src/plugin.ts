import * as rrweb from 'rrweb'

function plugin() {
  const rrwebEvents: any = []
  let _stop: (() => void) | undefined
  let hasStopped = false

  function capturer() {
    _stop = rrweb.record({
      emit(event) {
        rrwebEvents.push(event)
      }
    })
  }

  function collector() {
    if (!hasStopped) {
      _stop && _stop()
      hasStopped = true

      return {
        rrwebEvents
      }
    }
  }

  return {
    capturer,
    collector
  }
}

export default plugin
