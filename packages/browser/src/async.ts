import { getGlobal, Queue } from '@ohbug/utils'
import { getOhbugObject, createEvent } from '@ohbug/core'

/**
 * async event 流程
 * 1. 注册异步事件
 * 2. 向队列内 push event
 * 3. 异步事件触发时上报队列中所有 event
 * 4. 清空队列
 */
function async() {
  const global = getGlobal<Window>()
  const ohbugObject = getOhbugObject<Window>()
  const queue = new Queue()
  ohbugObject._asyncQueue = queue

  if (global.addEventListener) {
    global.addEventListener('unload', () => {
      // report
      const event = createEvent('NEMETRIC', queue.get(), 'other')
      ohbugObject._report && ohbugObject._report(event, 'async')
      queue.clear()
    })
  }
}

export default async
