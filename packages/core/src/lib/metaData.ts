export function addMetaData(map: Map<string, any>, section: string, data: any) {
  return map.set(section, data)
}

export function getMetaData(map: Map<string, any>, section: string) {
  return map.get(section)
}

export function deleteMetaData(map: Map<string, any>, section: string) {
  return map.delete(section)
}
