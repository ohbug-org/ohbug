import type { OhbugConfig, OhbugSchema } from '@ohbug/types'

interface ConfigAndErrors {
  config: Record<keyof OhbugConfig, any>
  errors: Record<keyof OhbugConfig, string>
}
export function verifyConfig(config: OhbugConfig, schema: OhbugSchema) {
  const keys = Object.keys(schema) as (keyof OhbugConfig)[]
  return keys.reduce<ConfigAndErrors>(
    (accumulator, key) => {
      const configValue = config[key]
      const { defaultValue, message, validate } = schema[key]

      const valid = validate(configValue)
      if (valid) {
        accumulator.config[key] = configValue
      } else {
        accumulator.config[key] = defaultValue
        accumulator.errors[key] = message
      }

      return accumulator
    },
    { config: {} as ConfigAndErrors['config'], errors: {} as ConfigAndErrors['errors'] }
  )
}
