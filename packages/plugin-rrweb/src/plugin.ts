import { record } from 'rrweb'
import { eventWithTime } from 'rrweb/typings/types'
import { OhbugPlugin } from '@ohbug/types'

class Plugin implements OhbugPlugin {
  private readonly rrwebEvents: eventWithTime[] = []

  private stop: (() => void) | undefined

  private stopped: boolean = false

  public capture() {
    const { rrwebEvents } = this
    this.stop = record({
      emit(event) {
        rrwebEvents.push(event)
      }
    })
  }

  public state() {
    const { rrwebEvents, stop, stopped } = this
    if (!stopped) {
      stop && stop()
      this.stopped = true

      return {
        rrwebEvents
      }
    }
    return {}
  }
}

export default Plugin
