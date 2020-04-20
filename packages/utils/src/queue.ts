import { OhbugEvent, OhbugQueue } from '@ohbug/types'

export class Queue implements OhbugQueue {
  private events: OhbugEvent<any>[] = []

  public enqueue(event: OhbugEvent<any>) {
    this.events.push(event)
  }

  public dequeue() {
    return this.events.shift()
  }

  public head() {
    return this.events[0]
  }

  public tail() {
    return this.events[this.events.length - 1]
  }

  public size() {
    return this.events.length
  }

  public isEmpty() {
    return this.events.length === 0
  }

  public clear() {
    this.events = []
  }

  public forEach(
    callback: (value: OhbugEvent<any>, index?: number, array?: OhbugEvent<any>[]) => void
  ) {
    this.events.forEach((event, index, array) => {
      callback(event, index, array)
    })
  }

  public get() {
    return this.events
  }
}
