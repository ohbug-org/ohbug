import { OhbugPlugin, OhbugConfig } from '@ohbug/types'

const applyPlugin = (plugins: OhbugPlugin[]) => (config: OhbugConfig) =>
  // @ts-ignore
  plugins.map(Plugin => new Plugin(config))

export default applyPlugin
