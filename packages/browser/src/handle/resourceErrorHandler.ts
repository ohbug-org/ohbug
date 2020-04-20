import { types, createEvent } from '@ohbug/core'
import { OhbugEvent, OhbugBaseDetail } from '@ohbug/types'
import { getSelector } from '@ohbug/utils'

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

function resourceErrorHandler(
  error: ErrorEvent,
  collect: (event: OhbugEvent<ResourceErrorDetail>) => void
) {
  const target = (error.target || error.srcElement) as any
  const { outerHTML } = target

  const selector = getSelector(error)

  const event = createEvent<ResourceErrorDetail>(RESOURCE_ERROR, {
    outerHTML,
    src: target && target.src,
    tagName: target && target.tagName,
    id: target && target.id,
    className: target && target.className,
    name: target && target.name,
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
    nodeType: target && target.nodeType,
    selector
  })
  collect(event)
}

export default resourceErrorHandler
