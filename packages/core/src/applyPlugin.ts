import { OhbugPlugin, Config } from '@ohbug/types'

const applyPlugin = (plugins: OhbugPlugin[]) => (config: Config) =>
  // @ts-ignore
  plugins.map(Plugin => new Plugin(config))

export default applyPlugin
