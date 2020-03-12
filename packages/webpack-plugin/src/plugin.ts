import { Compiler, compilation } from 'webpack'
import { uploadSourceMap } from '@ohbug/cli'
import { LOG_PREFIX } from './constants'

export interface Config {
  apiKey: string
  appVersion: string
  appType?: string
}
export interface Options extends Config {
  publicPath?: string
}
export interface Asset extends Config {
  path: string
}

class OhbugWebpackPlugin implements Options {
  apiKey: string
  appVersion: string
  appType?: string
  publicPath?: string

  constructor(options: Options) {
    this.apiKey = options.apiKey
    this.appVersion = options.appVersion
    this.appType = options.appType
    this.publicPath = options.publicPath

    this.validate()
  }

  validate(): void {
    if (typeof this.apiKey !== 'string' || this.apiKey.length < 1) {
      throw new Error(`${LOG_PREFIX} "apiKey" is required!`)
    }
    if (typeof this.appVersion !== 'string' || this.appVersion.length < 1) {
      throw new Error(`${LOG_PREFIX} "appVersion" is required!`)
    }
  }

  getConfig(): Config {
    const config: Config = {
      apiKey: this.apiKey,
      appVersion: this.appVersion
    }
    if (this.appType) config.appType = this.appType
    return config
  }

  getAssets(compiler: Compiler, compilation: compilation.Compilation): Asset[] | undefined {
    const { chunks } = compilation.getStats().toJson()
    const outputPath = compilation.getPath(compiler.outputPath, {})

    return chunks?.reduce((result, chunk) => {
      const filename = chunk.files.find(file => /\.js\.map$/.test(file))
      if (!filename) {
        return result
      }
      const path = compiler.outputFileSystem.join(outputPath, filename)

      return [...result, { path, ...this.getConfig() }]
    }, [])
  }

  apply(compiler: Compiler) {
    const plugin = (compilation: compilation.Compilation, cb: () => void) => {
      const assets = this.getAssets(compiler, compilation)

      if (assets?.length) {
        assets.forEach(asset => {
          uploadSourceMap(asset)
        })
      }

      cb()
    }

    if (compiler.hooks && compiler.hooks.afterEmit) {
      compiler.hooks.afterEmit.tapAsync('OhbugWebpackPlugin', plugin)
    } else {
      compiler.plugin('after-emit', plugin)
    }
  }
}

export default OhbugWebpackPlugin
