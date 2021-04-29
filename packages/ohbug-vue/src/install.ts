import type { OhbugBaseDetail, OhbugClient } from '@ohbug/types'
import type { VueConstructor } from 'vue'

export interface VueErrorDetail extends OhbugBaseDetail {
  name: string
  stack?: string
  errorInfo: string
  component: string
  file: string
  props?: Record<string, any>
}

const getComponent = (vm: any) => {
  if (vm.$root === vm)
    return {
      component: 'Root',
    }

  const options = vm.$options
  const component = options.name
  const file = options.__file

  return {
    component,
    file,
  }
}

export function install(client: OhbugClient, Vue: VueConstructor) {
  const prev = Vue.config.errorHandler

  const handler = (error: Error, vm: any, info: string) => {
    const { component, file } = getComponent(vm)

    const detail: VueErrorDetail = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      errorInfo: info,
      component,
      file,
      props: vm ? vm.$options.propsData : undefined,
    }
    const event = client.createEvent<VueErrorDetail>({
      category: 'error',
      type: 'vue',
      detail,
    })
    client.notify(event)

    if (typeof console !== 'undefined' && typeof console.error === 'function')
      console.error(error)
    if (typeof prev === 'function') prev(error, vm, info)
  }

  // eslint-disable-next-line no-param-reassign
  Vue.config.errorHandler = handler
}
