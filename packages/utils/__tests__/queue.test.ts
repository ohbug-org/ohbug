import { Queue } from '../src/queue'
import type { OhbugEvent } from '@ohbug/types'

describe('utils queue', () => {
  const event = { type: 'test' } as OhbugEvent<any>
  const queue = new Queue()
  queue.enqueue(event)

  afterEach(() => {
    queue.clear()
    queue.enqueue(event)
  })

  it('call queue.enqueue()', () => {
    expect(queue.get()).toEqual([event])
  })

  it('call queue.dequeue()', () => {
    queue.dequeue()

    expect(queue.get()).toEqual([])
  })

  it('call queue.head()', () => {
    expect(queue.head()).toEqual(event)
  })

  it('call queue.tail()', () => {
    const event2 = { type: 'test2' } as OhbugEvent<any>
    queue.enqueue(event2)
    expect(queue.tail()).toEqual(event2)
  })

  it('call queue.size()', () => {
    expect(queue.size()).toEqual(1)
    queue.enqueue({ type: 'test2' } as OhbugEvent<any>)
    expect(queue.size()).toEqual(2)
  })

  it('call queue.isEmpty()', () => {
    expect(queue.isEmpty()).toEqual(false)
    queue.clear()
    expect(queue.isEmpty()).toEqual(true)
  })

  it('call queue.clear()', () => {
    queue.clear()
    expect(queue.get()).toEqual([])
  })

  it('call queue.forEach()', () => {
    const mockFn = jest.fn()
    queue.forEach((value, index, array) => {
      mockFn(value, index, array)
    })
    expect(mockFn).toBeCalledWith(event, 0, queue.get())
  })

  it('call queue.get()', () => {
    expect(queue.get()).toEqual([event])
  })
})
