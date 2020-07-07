import { OhbugConfig } from '@ohbug/types'

export function getConfigErrorMessage(
  errors: Record<keyof OhbugConfig, string>,
  config: OhbugConfig
) {
  return new Error(
    `Invalid configuration\n${Object.keys(errors)
      .map(
        (key: keyof OhbugConfig) => `- ${key} ${errors[key]}, got ${JSON.stringify(config[key])}`
      )
      .join('\n')}
            `
  )
}
