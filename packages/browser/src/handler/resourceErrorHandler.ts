import { types, Event, createEvent, BaseDetail } from '@ohbug/core'

const { RESOURCE_ERROR } = types

function getParentNode(node: Node, path: Node[]) {
  if (node.parentNode) {
    path.push(node.parentNode)
    getParentNode(node.parentNode, path)
  }
}
function getPath(node: Node) {
  const path: Node[] = []
  path.push(node)
  getParentNode(node, path)
  return path
}

export interface ResourceErrorDetail extends BaseDetail {
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
  immutableTarget: any,
  collector: (event: Event<ResourceErrorDetail>) => void
) {
  let target = (error.target || error.srcElement) as Node | null
  // resourceError
  const { outerHTML } = immutableTarget
  const selector = (function() {
    // 获取出错元素在同级元素的 index
    // 储存错误元素前元素
    const elements = []
    for (
      let i = 0;
      target &&
      target.nodeType === Node.ELEMENT_NODE &&
      target.nodeType !== Node.DOCUMENT_TYPE_NODE;
      target = target.previousSibling
    ) {
      i && elements.push(target)
      i += 1
    }
    // error.path 只有 chrome 实现，需要 polyfill
    // @ts-ignore
    const path = typeof error.path === 'undefined' ? getPath(error.target as Node) : error.path
    return path
      .reverse()
      .map(
        (node: Element) =>
          (node.localName || '') +
          (node.id ? `#${node.id}` : '') +
          (node.className ? `.${node.className}` : '') +
          (node.outerHTML === outerHTML ? `:nth-child(${elements.length})` : '')
      )
      .filter((v: string): boolean => Boolean(v))
      .join(' > ')
  })()
  const event = createEvent<ResourceErrorDetail>(RESOURCE_ERROR, {
    outerHTML,
    src: immutableTarget && immutableTarget.src,
    tagName: immutableTarget && immutableTarget.tagName,
    id: immutableTarget && immutableTarget.id,
    className: immutableTarget && immutableTarget.className,
    name: immutableTarget && immutableTarget.name,
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
    nodeType: immutableTarget && immutableTarget.nodeType,
    selector
  })
  collector(event)
}

export default resourceErrorHandler
