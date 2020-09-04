import type { OhbugMetaData } from '@ohbug/types'

export function addMetaData(map: OhbugMetaData, section: string, data: any) {
  if (!section) return

  return (map[section] = data)
}

export function getMetaData(map: OhbugMetaData, section: string) {
  if (map[section]) {
    return map[section]
  }

  return undefined
}

export function deleteMetaData(map: OhbugMetaData, section: string) {
  if (map[section]) {
    return delete map[section]
  }

  return undefined
}
