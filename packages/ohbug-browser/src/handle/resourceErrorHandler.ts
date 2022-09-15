import { getOhbugObject, getSelector } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { EventTypes } from '@ohbug/core'

export interface ResourceErrorDetail extends OhbugBaseDetail {
  src: string
  tagName: string
  id: string
  className: string
  name: string
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
  nodeType: number
  selector: string
}

export function resourceErrorHandler(e: ErrorEvent) {
  const target = (e.target || e.srcElement) as any

  const selector = getSelector(e)

  const detail: ResourceErrorDetail = {
    src: target && target.src,
    tagName: target && target.tagName,
    id: target && target.id,
    className: target && target.className,
    name: target && target.name,
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
    nodeType: target && target.nodeType,
    selector,
  }
  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<ResourceErrorDetail>({
    category: 'error',
    type: EventTypes.RESOURCE_ERROR,
    detail,
  })
  client.notify(event)
}
