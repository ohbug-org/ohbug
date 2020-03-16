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
export const getSelector = (event: Event) => {
  const immutableTarget = (event.target || event.srcElement) as any
  let target = (event.target || event.srcElement) as any
  // 获取出错元素在同级元素的 index
  // 储存错误元素前元素
  const elements = []
  for (
    let i = 0;
    target && target.nodeType === Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_TYPE_NODE;
    target = target.previousSibling
  ) {
    i && elements.push(target)
    i += 1
  }
  // error.path 只有 chrome 实现，需要 polyfill
  // @ts-ignore
  const path = typeof event.path === 'undefined' ? getPath(event.target as Node) : event.path
  const { outerHTML } = immutableTarget
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
}
