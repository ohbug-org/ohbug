const defaultPresets =
  process.env.BABEL_ENV === 'es'
    ? ['@babel/typescript']
    : ['@babel/preset-env', '@babel/typescript']

const productionPlugins = ['']

module.exports = {
  presets: defaultPresets,
  env: {
    cjs: {
      plugins: productionPlugins
    },
    es: {
      plugins: productionPlugins
    },
    production: {
      plugins: productionPlugins
    },
    'production-umd': {
      plugins: productionPlugins
    },
    'production-iife': {
      plugins: productionPlugins
    }
  }
}
