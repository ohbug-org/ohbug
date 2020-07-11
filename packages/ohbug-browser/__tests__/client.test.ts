import { Client } from '@ohbug/core'
import { BrowserClient } from '../src/client'
jest.mock('@ohbug/core')

const mockClient = jest.fn()
;(Client as jest.Mock).mockImplementation((...args) => {
  mockClient(...args)
})

const apiKey = 'API_KEY_TEST'

describe('@ohbug/browser/client', () => {
  it('should execute init inside core package', () => {
    BrowserClient.init({ apiKey })

    expect(mockClient).toBeCalledTimes(1)
  })
})
