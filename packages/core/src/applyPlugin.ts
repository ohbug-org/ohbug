import { Plugin, Config, Enhancer } from '@ohbug/types'

function applyPlugin(...plugins: Plugin[]): (config: Config) => Enhancer {
  return (config: Config) =>
    plugins.reduce<Enhancer>(
      (previous, plugin) => {
        const { capture, collect } = plugin({ config })
        const captures = [...previous.captures]
        const collects = [...previous.collects]
        if (capture) {
          captures.push(capture)
        }
        if (collect) {
          collects.push(collect)
        }
        return {
          captures,
          collects
        }
      },
      {
        captures: [],
        collects: []
      }
    )
}

export default applyPlugin
