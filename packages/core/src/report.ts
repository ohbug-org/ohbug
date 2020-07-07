import { logger } from '@ohbug/utils'
import { getConfig, getOhbugObject } from './config'
import type { OhbugEvent, OhbugExecution } from '@ohbug/types'

function timingSelector(
  report: (event: OhbugEvent<any>, execution: OhbugExecution) => void,
  event: OhbugEvent<any>,
  execution: OhbugExecution
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
function report<T = Window>(event: OhbugEvent<any>, execution: OhbugExecution) {
  const config = getConfig<T>()
  try {
    if (config) {
      let result = event
      const ohbugObject = getOhbugObject<T>()
      if (ohbugObject._report) {
        if (config.created) {
          result = config.created(event)
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
