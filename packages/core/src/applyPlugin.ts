import { Plugin, Config, Enhancer } from '@ohbug/types'

function applyPlugin(...plugins: Plugin[]): (config: Config) => Enhancer {
  return (config: Config) =>
    plugins.reduce<Enhancer>(
      (previous, plugin) => {
        const { capture, state } = plugin({ config })
        const captures = [...previous.captures]
        const states = [...previous.states]
        if (capture) {
          captures.push(capture)
        }
        if (state) {
          states.push(state)
        }
        return {
          captures,
          states
        }
      },
      {
        captures: [],
        states: []
      }
    )
}

export default applyPlugin
