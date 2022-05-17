import { describe, expect, test, vi } from 'vitest'
import { parseUrl, replace } from '../src/mixin'

describe('@ohbug/utils/mixin', () => {
  vi.useFakeTimers()

  describe('replace', () => {
    test('if name does not exist with source, nothing should be done', () => {
      const source = { foo: { name: 'fooo' } }
      const name = 'foo1'
      replace(source, name, () => ({ name: 'bar' }))

      expect(source.foo.name).toBe('fooo')
    })

    test('the source should be changed according to the requirements of the behavior', () => {
      const source = { foo: { name: 'fooo' } }
      const name = 'foo'
      replace(source, name, () => ({ name: 'bar' }))

      expect(source.foo.name).toBe('bar')
    })

    test('should be return the original', () => {
      const source = { foo: { name: 'fooo' } }
      const name = 'foo'
      const original = replace(source, name, () => ({ name: 'bar' }))

      expect(source.foo.name).toBe('bar')
      expect(original).toEqual({ name: 'fooo' })
    })
  })

  describe('parseUrl', () => {
    const target = 'http://localhost:1234/bar'
    const expectResult = {
      host: 'localhost:1234',
      path: '/bar',
      protocol: 'http',
      relative: '/bar',
    }

    test('URL should be parsed correctly', () => {
      expect(parseUrl(target)).toEqual(expectResult)
    })

    test('should do fault tolerance', () => {
      // @ts-expect-error 需要支持传入 string 以外的兜底
      expect(parseUrl(undefined)).toEqual({})
      // @ts-expect-error 需要支持传入 string 以外的兜底
      expect(parseUrl(1)).toEqual({})
    })
  })
})
