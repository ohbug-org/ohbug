import { promises as fs } from 'fs'
import { join } from 'path'
import { defineConfig } from 'tsup'
import type { Plugin } from 'esbuild'

const replaceVersion = (): Plugin => {
  return {
    name: 'replaceVersion',
    async setup(build) {
      const pkg = JSON.parse(await fs.readFile(
        join(build.initialOptions.tsconfig!, '../package.json'),
        { encoding: 'utf-8' },
      ))
      build.onLoad({ filter: /version/ }, async(args) => {
        const source = await fs.readFile(args.path, 'utf8')
        const contents = source.replace('__VERSION__', pkg.version)
        return { contents }
      })
    },
  }
}

export default defineConfig(options => ({
  entry: ['./src/index.ts'],
  clean: true,
  dts: true,
  format: ['esm', 'cjs', 'iife'],
  minify: !options.watch,
  esbuildPlugins: [replaceVersion()],
}))
