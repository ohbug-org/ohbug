import { Plugin, Config, Enhancer } from '@ohbug/types'

function applyPlugin(...plugins: Plugin[]): (config: Config) => Enhancer {
  return (config: Config) =>
    plugins.reduce<Enhancer>(
      (previous, plugin) => {
        const { capturer, collector } = plugin({ config })
        const capturers = [...previous.capturers]
        const collectors = [...previous.collectors]
        if (capturer) {
          capturers.push(capturer)
        }
        if (collector) {
          collectors.push(collector)
        }
        return {
          capturers,
          collectors
        }
      },
      {
        capturers: [],
        collectors: []
      }
    )
}

export default applyPlugin
