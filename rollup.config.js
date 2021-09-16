import path from 'path'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import ts from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'

require('dotenv').config()

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const name = path.basename(packageDir)
const resolve = (p) => path.resolve(packageDir, p)
// eslint-disable-next-line import/no-dynamic-require
const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildOptions || {}
const configs = {
  umd: {
    file: resolve(`dist/${name}.umd.js`),
    format: `umd`,
    name: packageOptions.name,
  },
  es: {
    file: resolve(`dist/${name}.es.js`),
    format: `es`,
  },
}
const url = process.env.URL

function createConfig(input, output, plugins = [], external = []) {
  const tsPlugin = ts({
    check: process.env.NODE_ENV === 'production',
    tsconfig: resolve('tsconfig.json'),
  })
  const extensions = ['.js', '.ts']
  const commonjsOptions = {
    ignoreGlobal: true,
    include: /node_modules/,
    extensions,
  }

  return {
    input,
    output,
    plugins: [
      replace({
        preventAssignment: true,
        __VERSION__: pkg.version,
        __URL__: url,
      }),
      tsPlugin,
      nodeResolve({ extensions }),
      commonjs(commonjsOptions),
      json(),
      terser(),
      ...plugins,
    ],
    external,
  }
}

const input = resolve('src/index.ts')
const defaultFormats = ['es', 'umd']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')
const packageFormats = inlineFormats || packageOptions.formats || defaultFormats
const external = ['react']
const packageConfigs = packageFormats.map((format) =>
  createConfig(input, configs[format], [], external)
)

export default packageConfigs
