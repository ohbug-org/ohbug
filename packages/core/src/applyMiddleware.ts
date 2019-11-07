import { Config } from './config'
import { Enhancer } from './enhancer'

function applyMiddleware(...middlewares: any[]): (config: Config) => Enhancer {
  return (config: Config) =>
    middlewares.reduce<Enhancer>(
      (previous, middleware) => {
        const { capturer, collector } = middleware({ config })
        return {
          capturers: [...previous.capturers, capturer],
          collectors: [...previous.collectors, collector]
        }
      },
      {
        capturers: [],
        collectors: []
      }
    )
}

export default applyMiddleware
