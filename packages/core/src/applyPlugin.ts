import { OhbugPlugin, Config } from '@ohbug/types'

const applyPlugin = (plugins: OhbugPlugin[]) => (config: Config) =>
  plugins.map(
    Plugin =>
      // @ts-ignore
      new Plugin(config)
  )

export default applyPlugin
