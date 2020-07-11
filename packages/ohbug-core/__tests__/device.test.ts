import { isObject } from '@ohbug/utils'

import { Client } from '../src/client'
import { getValues, device } from './utils'
import { createDevice } from '../src/device'

describe('@ohbug/core/device', () => {
  describe('createDevice()', () => {
    it('should be create a device', () => {
      const client = new Client(getValues())
      const _device = createDevice(client)
      expect(isObject(_device)).toBe(true)
      expect(_device.platform).toEqual(device.platform)
      expect(_device.version).toBe(device.version)
    })
  })
})
