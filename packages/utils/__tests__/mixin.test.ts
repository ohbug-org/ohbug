import { debounce, replace } from '../src/mixin'

describe('utils mixin', () => {
  jest.useFakeTimers()

  describe('debounce', () => {
    let func: jest.Mock
    let debouncedFunc: Function

    beforeEach(() => {
      func = jest.fn()
      debouncedFunc = debounce(func, 1000)
    })

    it('execute just once', () => {
      for (let i = 0; i < 100; i++) {
        debouncedFunc()
      }
      jest.runAllTimers()
      expect(func).toBeCalledTimes(1)
    })
  })

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
