import { schema } from '../src/config'

describe('@ohbug/core/config', () => {
  describe('schema', () => {
    test('has the required properties { validate, defaultValue, message }', () => {
      Object.keys(schema).forEach((key) => {
        const value = schema[key]
        expect(value).toHaveProperty('defaultValue')
        expect(value).toHaveProperty('message')
        expect(value).toHaveProperty('validate')
        expect(typeof value.message).toBe('string')
        expect(typeof value.validate).toBe('function')
      })
    })
  })
})
