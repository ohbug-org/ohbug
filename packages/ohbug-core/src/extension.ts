import type { OhbugExtension } from '@ohbug/types'

export function defineExtension(extension: OhbugExtension) {
  if (!extension) return {} as OhbugExtension
  return extension
}
