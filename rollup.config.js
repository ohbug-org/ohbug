import path from 'path'
import ts from 'rollup-plugin-typescript2'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const name = path.basename(packageDir)
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildOptions || {}
require('dotenv').config()

const tsPlugin = ts({
  check: process.env.NODE_ENV === 'production',
  tsconfig: resolve('tsconfig.json'),
  tsconfigOverride: {
    compilerOptions: {
      declaration: true
    },
    exclude: ['**/__tests__']
  }
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
  }
}

const input = resolve('src/index.ts')
const defaultFormats = ['esm', 'umd']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')
const packageFormats = inlineFormats || packageOptions.formats || defaultFormats

function createConfig() {
  const output = packageFormats.map(format => {
    const target = {
      file: resolve(`dist/${name}.${format}.js`),
      format: configs[format].format,
      intro: `const BASE_URL = '${process.env.BASE_URL_DEVELOPMENT}'`
    }
    if (format === 'umd' || format === 'global') {
      target.name = packageOptions.name
    }
    return target
  })
  const plugins = [tsPlugin, nodeResolve({ extensions }), commonjs(commonjsOptions)]
  return {
    input,
    output,
    plugins
  }
}

function createProductionConfig() {
  const output = packageFormats.map(format => {
    const target = {
      file: resolve(`dist/${name}.${format}.prod.js`),
      format: configs[format].format,
      intro: `const BASE_URL = '${process.env.BASE_URL_PRODUCTION}'`
    }
    if (format === 'umd') {
      target.name = packageOptions.name
    }
    return target
  })
  const plugins = [tsPlugin, nodeResolve({ extensions }), commonjs(commonjsOptions), terser()]
  return {
    input,
    output,
    plugins
  }
}

const NODE_ENV = process.env.NODE_ENV

const packageConfigs = [createConfig()]
if (NODE_ENV === 'production') packageConfigs.push(createProductionConfig())

export default packageConfigs
