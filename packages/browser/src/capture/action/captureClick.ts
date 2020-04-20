import { getGlobal, getSelector } from '@ohbug/utils'
import { getHub } from '@ohbug/core'

const global = getGlobal<Window>()

function listener(e: MouseEvent) {
  if (e.target) {
    const hub = getHub<Window>()
    const { tagName, id, className, name, src, outerHTML, nodeType } = e.target as any
    const selector = getSelector(e)

    const timestamp = new Date().getTime()
    hub.addAction({
      type: 'click',
      timestamp,
      data: {
        tagName,
        id,
        className,
        name,
        src,
        outerHTML,
        nodeType,
        selector,
      },
    })
  }
}

function captureClick() {
  global.document.addEventListener('click', listener)
}

export function removeCaptureClick() {
  global.document.removeEventListener('click', listener)
}

export default captureClick
