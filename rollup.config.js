import path from 'path'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import ts from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'

require('dotenv').config()

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const name = path.basename(packageDir)
const resolve = (p) => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildOptions || {}
const configs = {
  umd: {
    file: resolve(`dist/${name}.umd.js`),
    format: `umd`,
    name: packageOptions.name,
  },
  esm: {
    file: resolve(`dist/${name}.esm.js`),
    format: `es`,
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: `cjs`,
  },
}
const input = resolve('src/index.ts')
const defaultFormats = ['esm', 'umd']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')
const packageFormats = inlineFormats || packageOptions.formats || defaultFormats
const external = ['react']
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
  }

  return {
    input,
    output,
    plugins: [
      replace({
        __VERSION__: pkg.version,
        __URL__: url,
      }),
      tsPlugin,
      nodeResolve({ extensions }),
      commonjs(commonjsOptions),
      json(),
      ...plugins,
    ],
    external,
  }
}

function createMinifiedConfig(input, output, plugins = [], external = []) {
  const { terser } = require('rollup-plugin-terser')
  return createConfig(
    input,
    { ...output, file: output.file.replace(/\.js$/, '.min.js') },
    [terser(), ...plugins],
    external
  )
}

const packageConfigs = packageFormats.map((format) =>
  createConfig(input, configs[format], [], external)
)
if (process.env.NODE_ENV === 'production') {
  packageFormats.forEach((format) => {
    if (format === 'umd' || format === 'esm') {
      packageConfigs.push(
        createMinifiedConfig(input, configs[format], [], external)
      )
    }
  })
}

export default packageConfigs
