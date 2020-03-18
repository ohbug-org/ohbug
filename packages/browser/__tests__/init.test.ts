import initBrowser from '../src/init'
import { init } from '@ohbug/core'
jest.mock('@ohbug/core')

const mockInit = jest.fn()
;(init as jest.Mock).mockImplementation((...args) => {
  mockInit(...args)
})

const apiKey = 'test_id'
const config = { apiKey }

describe('browser init', () => {
  it('should execute init inside core package', () => {
    initBrowser(config)

    expect(mockInit).toBeCalledTimes(1)
  })
})
