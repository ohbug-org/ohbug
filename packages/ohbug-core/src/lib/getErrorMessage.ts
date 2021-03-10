import { OhbugConfig } from '@ohbug/types'

export function getConfigErrorMessage(
  errors: Record<keyof OhbugConfig, string>,
  config: OhbugConfig
) {
  return new Error(
    `Invalid configuration\n${Object.keys(errors)
      .map(
        // @ts-ignore
        (key) => `- ${key} ${errors[key]}, got ${JSON.stringify(config[key])}`
      )
      .join('\n')}
      `
  )
}

export function getErrorMessage(message: string, data: any) {
  return new Error(`Invalid data\n- ${message}, got ${JSON.stringify(data)}`)
}
