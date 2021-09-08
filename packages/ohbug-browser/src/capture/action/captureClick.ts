import { getGlobal, getOhbugObject, getSelector } from '@ohbug/utils'

const global = getGlobal<Window>()

function listener(e: MouseEvent) {
  if (e.target) {
    const { client } = getOhbugObject<Window>()
    const { tagName, id, className, name, src, outerHTML, nodeType } =
      e.target as any
    const selector = getSelector(e)

    client.addAction(
      'click node',
      {
        tagName,
        id,
        className,
        name,
        src,
        outerHTML,
        nodeType,
        selector,
      },
      'click'
    )
  }
}

export function captureClick() {
  global?.document?.addEventListener?.('click', listener)
}

export function removeCaptureClick() {
  global?.document?.removeEventListener?.('click', listener)
}
