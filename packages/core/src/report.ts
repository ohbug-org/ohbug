import { logger } from '@ohbug/utils'
import { getConfig, getOhbugObject } from './config'
import { Event, Execution } from './interface'

function timingSelector(
  report: (event: Event<any>, execution: Execution) => void,
  event: Event<any>,
  execution: Execution
): void {
  const ohbugObject = getOhbugObject<Window>()

  if (execution === 'sync') {
    report(event, execution)
  } else if (execution === 'async') {
    if (ohbugObject._asyncQueue) {
      ohbugObject._asyncQueue.enqueue(event)
    }
  }
}

/**
 * Used to control the timing of reporting events and the related life cycle.
 *
 * @param event
 * @param execution
 */
function report<T = Window>(event: Event<any>, execution: Execution) {
  const config = getConfig<T>()
  try {
    if (config) {
      let result = event
      const ohbugObject = getOhbugObject<T>()
      if (ohbugObject._report) {
        if (config.beforeReport) {
          result = config.beforeReport(event)
        }
        timingSelector(ohbugObject._report, result, execution)
        if (config.reported) {
          config.reported(result)
        }
      }
    }
  } catch (e) {
    logger.error(`Ohbug: Report failed`, e)
  }
}

export default report
