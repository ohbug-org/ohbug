import type { OhbugConfig } from '@ohbug/types'
import { describe, expect, test } from 'vitest'
import { schema } from '../src/config'

describe('@ohbug/core/config', () => {
  describe('schema', () => {
    test('has the required properties { validate, defaultValue, message }', () => {
      Object.keys(schema).forEach((key) => {
        const value = schema[key as (keyof OhbugConfig)]
        expect(value).toHaveProperty('defaultValue')
        expect(value).toHaveProperty('message')
        expect(value).toHaveProperty('validate')
        expect(typeof value.message).toBe('string')
        expect(typeof value.validate).toBe('function')
      })
    })
  })
})
