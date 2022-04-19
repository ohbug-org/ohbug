import { Client } from '@ohbug/core'
import { BrowserClient } from '../src/client'

jest.mock('@ohbug/core')

const mockClient = jest.fn()
;(Client as jest.Mock).mockImplementation((...args) => {
  mockClient(...args)
})

const apiKey = 'API_KEY_TEST'

describe('@ohbug/browser/client', () => {
  test('should execute init inside core package', () => {
    BrowserClient.setup({ apiKey })

    expect(mockClient).toBeCalledTimes(1)
    expect(mockClient.mock.calls[0][0].config).toEqual({ apiKey })
  })
})
