import { createEvent, collector } from '@ohbug/core'
import { Config, Enhancer, BaseDetail } from '@ohbug/types'
import { init } from '@ohbug/browser'

interface Options extends Config {}
export interface VueErrorDetail extends BaseDetail {
  name: string
  stack?: string
  errorInfo: string
  component: string
  file: string
  props?: {}
}

const getComponent = (vm: any) => {
  if (vm.$root === vm)
    return {
      component: 'Root'
    }

  const options = vm.$options
  const component = options.name
  const file = options.__file

  return {
    component,
    file
  }
}

function install(Vue: any, options: Options, enhancer?: (config: Config) => Enhancer) {
  if (!Vue) throw new Error('Cannot find Vue')

  init(options, enhancer)

  const handler = (error: Error, vm: any, info: string) => {
    const { component, file } = getComponent(vm)

    const detail: VueErrorDetail = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      errorInfo: info,
      component,
      file,
      props: vm ? vm.$options.propsData : undefined
    }
    const event = createEvent<VueErrorDetail>('vue', detail)
    collector(event)

    console.error(error)
  }

  Vue.config.errorHandler = handler
}

export default install
