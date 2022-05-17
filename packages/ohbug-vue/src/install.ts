import { EventTypes } from '@ohbug/core'
import type { OhbugBaseDetail, OhbugClient } from '@ohbug/types'
import type { App, ComponentPublicInstance } from 'vue'

export interface VueErrorDetail extends OhbugBaseDetail {
  name: string
  stack?: string
  errorInfo: string
  component?: string
  file?: string
  props?: Record<string, any>
}

const getComponent = (instance: ComponentPublicInstance | null) => {
  if (instance?.$root === instance)
    return { component: 'Root' }

  const options = instance?.$options
  const component = options?.name
  const file = options?.__file

  return {
    component,
    file,
  }
}

export function install(client: OhbugClient, Vue: App) {
  const prev = Vue.config.errorHandler

  const handler = (error: Error, instance: ComponentPublicInstance | null, info: string) => {
    const { component, file } = getComponent(instance)

    const detail: VueErrorDetail = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      errorInfo: info,
      component,
      file,
      props: instance ? instance.$options.propsData : undefined,
    }
    const event = client.createEvent<VueErrorDetail>({
      category: 'error',
      type: EventTypes.VUE,
      detail,
    })

    client.notify(event)

    if (typeof console !== 'undefined' && typeof console.error === 'function')
      console.error(error)
    if (typeof prev === 'function') prev(error, instance, info)
  }

  // @ts-expect-error type is not assignable
  Vue.config.errorHandler = handler
}
