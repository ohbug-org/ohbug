import { replace } from '../src/mixin'

describe('utils mixin', () => {
  jest.useFakeTimers()

  describe('replace', () => {
    it('if name does not exist with source, nothing should be done', () => {
      const source = {
        foo: {
          name: undefined
        }
      }
      const name = 'foo1'
      replace(source, name, () => ({
        name: 'bar'
      }))

      expect(source.foo.name).toBeUndefined()
    })

    it('the source should be changed according to the requirements of the behavior', () => {
      const source = {
        foo: {
          name: undefined
        }
      }
      const name = 'foo'
      replace(source, name, () => ({
        name: 'bar'
      }))

      expect(source.foo.name).toBe('bar')
    })
  })
})
