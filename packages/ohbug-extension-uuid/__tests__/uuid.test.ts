import { getUUID } from '../src/uuid'

describe('@ohbug/extension-uuid', () => {
  test('should get unique uuid', () => {
    const uuid = getUUID()
    const uuid2 = getUUID()
    expect(uuid).toEqual(uuid2)
  })
})
