import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  hooks: {
    'build:prepare': (ctx) => {
      if (ctx.pkg) {
        ctx.options.replace.__VERSION__ = ctx.pkg.version ?? '0.1.0'
      }
    },
  },
})
