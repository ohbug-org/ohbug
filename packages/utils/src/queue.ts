import { Event, Queue as IQueue } from '@ohbug/types'

export class Queue implements IQueue {
  private events: Event<any>[] = []

  public enqueue(event: Event<any>) {
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

  public forEach(callback: (value: Event<any>, index?: number, array?: Event<any>[]) => void) {
    this.events.forEach((event, index, array) => {
      callback(event, index, array)
    })
  }

  public get() {
    return this.events
  }
}
