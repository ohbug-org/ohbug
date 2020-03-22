import path from 'path'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const name = path.basename(packageDir)
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildOptions || {}

const tsPlugin = ts({
  check: process.env.NODE_ENV === 'production',
  tsconfig: resolve('tsconfig.json')
})
const extensions = ['.js', '.ts']
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/
}

const configs = {
  esm: {
    format: `es`
  },
  umd: {
    format: `umd`
  },
  global: {
    format: `iife`
  },
  cjs: {
    format: `cjs`
  }
}

const input = resolve('src/index.ts')
const defaultFormats = ['esm', 'umd']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')
const packageFormats = inlineFormats || packageOptions.formats || defaultFormats
const external = ['perfume.js', 'rrweb', 'react']

function createConfig(isProduction = false) {
  const output = packageFormats.map(format => {
    const target = {
      file: resolve(`dist/${name}.${format}${isProduction ? '.prod' : ''}.js`),
      format: configs[format].format
    }
    if (format === 'umd' || format === 'global') {
      target.name = packageOptions.name
    }
    return target
  })
  const plugins = [tsPlugin, nodeResolve({ extensions }), commonjs(commonjsOptions), json()]
  if (isProduction) {
    plugins.push(terser())
  }
  return {
    input,
    output,
    plugins,
    external
  }
}

const NODE_ENV = process.env.NODE_ENV

const packageConfigs = [createConfig()]
if (NODE_ENV === 'production') packageConfigs.push(createConfig(true))

export default packageConfigs
