import { createEvent, collect } from '@ohbug/core'
import { OhbugConfig, OhbugPlugin, OhbugBaseDetail } from '@ohbug/types'
import { init } from '@ohbug/browser'

interface Options extends OhbugConfig {}
export interface VueErrorDetail extends OhbugBaseDetail {
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

function install(Vue: any, options: Options, plugins?: OhbugPlugin[]) {
  if (!Vue) throw new Error('Cannot find Vue')

  init(options, plugins)

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
    collect(event)

    console.error(error)
  }

  Vue.config.errorHandler = handler
}

export default install
