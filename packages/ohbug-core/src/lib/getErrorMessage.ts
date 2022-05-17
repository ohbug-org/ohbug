import type { OhbugConfig } from '@ohbug/types'

export function getConfigErrorMessage(
  errors: Record<keyof OhbugConfig, string>,
  config: OhbugConfig,
) {
  return new Error(`Invalid configuration\n${Object.keys(errors)
    .map((key) => {
      return `- ${key} ${errors[key as keyof OhbugConfig]}, got ${JSON.stringify(config[key as keyof OhbugConfig])}`
    })
    .join('\n')}
      `)
}

export function getErrorMessage(message: string, data: any) {
  return new Error(`Invalid data\n- ${message}, got ${JSON.stringify(data)}`)
}
