'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/ohbug-webpack-plugin.cjs.prod.js')
} else {
  module.exports = require('./dist/ohbug-webpack-plugin.cjs.js')
}
