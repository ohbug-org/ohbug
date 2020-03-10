'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/webpack-plugin.cjs.prod.js')
} else {
  module.exports = require('./dist/webpack-plugin.cjs.js')
}
