import { getOhbugObject, getSelector } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'

import * as types from '../types'

const { RESOURCE_ERROR } = types

export interface ResourceErrorDetail extends OhbugBaseDetail {
  outerHTML: string
  src: string
  tagName: string
  id: string
  className: string
  name: string
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
  nodeType: number
  selector: string
}

export function resourceErrorHandler(error: ErrorEvent) {
  const target = (error.target || error.srcElement) as any
  const { outerHTML } = target

  const selector = getSelector(error)

  const detail: ResourceErrorDetail = {
    outerHTML,
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
    type: RESOURCE_ERROR,
    detail,
  })
  client.notify(event)
}
