import { getGlobal, getOhbugObject, getSelector } from '@ohbug/utils'

const global = getGlobal<Window>()

function listener(e: MouseEvent) {
  if (e.target) {
    const { client } = getOhbugObject<Window>()
    const { tagName, id, className, name, src, nodeType }
      = e.target as any

    if ((tagName as string).toUpperCase() !== 'HTML' && (tagName as string).toUpperCase() !== 'BODY') {
      const selector = getSelector(e)

      client.addAction(
        'click node',
        {
          tagName,
          id: id || undefined,
          className: className || undefined,
          name: name || undefined,
          src: src || undefined,
          nodeType: nodeType || undefined,
          selector: selector || undefined,
        },
        'click',
      )
    }
  }
}

export function captureClick() {
  global?.document?.addEventListener?.('click', listener)
}

export function removeCaptureClick() {
  global?.document?.removeEventListener?.('click', listener)
}
