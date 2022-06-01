import type { OhbugMetadata } from '@ohbug/types'

export function addMetadata(map: OhbugMetadata, section: string, data: any) {
  if (!section) return

  map[section] = data
}

export function getMetadata(map: OhbugMetadata, section: string) {
  if (map[section])
    return map[section]

  return undefined
}

export function deleteMetadata(map: OhbugMetadata, section: string) {
  if (map[section])
    return delete map[section]

  return undefined
}
