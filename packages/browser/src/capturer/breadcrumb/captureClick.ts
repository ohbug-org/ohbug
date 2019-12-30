import { getGlobal, getSelector } from '@ohbug/utils'
import { getHub } from '@ohbug/core'

const global = getGlobal<Window>()

function captureClick() {
  const hub = getHub<Window>()

  global.document.addEventListener('click', e => {
    if (e.target) {
      const { tagName, id, className, name, src, outerHTML, nodeType } = e.target as any
      const selector = getSelector(e)

      const timestamp = new Date().getTime()
      hub.addBreadcrumb({
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
          selector
        }
      })
    }
  })
}

export default captureClick
