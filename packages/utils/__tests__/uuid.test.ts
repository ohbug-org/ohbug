import { getUUID } from '../src/uuid'

describe('utils uuid', () => {
  it('should get unique uuid', () => {
    const uuid = getUUID()
    const uuid2 = getUUID()
    expect(uuid).toEqual(uuid2)
  })
})
