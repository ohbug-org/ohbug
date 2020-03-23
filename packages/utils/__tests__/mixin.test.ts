import { replace, parseUrl } from '../src/mixin'

describe('utils mixin', () => {
  jest.useFakeTimers()

  describe('replace', () => {
    it('if name does not exist with source, nothing should be done', () => {
      const source = {
        foo: {
          name: 'fooo'
        }
      }
      const name = 'foo1'
      replace(source, name, () => ({
        name: 'bar'
      }))

      expect(source.foo.name).toBe('fooo')
    })

    it('the source should be changed according to the requirements of the behavior', () => {
      const source = {
        foo: {
          name: 'fooo'
        }
      }
      const name = 'foo'
      replace(source, name, () => ({
        name: 'bar'
      }))

      expect(source.foo.name).toBe('bar')
    })

    it('should be return the original', () => {
      const source = {
        foo: {
          name: 'fooo'
        }
      }
      const name = 'foo'
      const original = replace(source, name, () => ({
        name: 'bar'
      }))

      expect(source.foo.name).toBe('bar')
      expect(original).toEqual({
        name: 'fooo'
      })
    })
  })

  describe('parseUrl', () => {
    const target = `http://localhost:1234/bar`
    const expect_result = {
      host: 'localhost:1234',
      path: '/bar',
      protocol: 'http',
      relative: '/bar'
    }

    it('URL should be parsed correctly', () => {
      expect(parseUrl(target)).toEqual(expect_result)
    })

    it('should do fault tolerance', () => {
      // @ts-ignore
      expect(parseUrl(undefined)).toEqual({})
      // @ts-ignore
      expect(parseUrl(1)).toEqual({})
    })
  })
})
