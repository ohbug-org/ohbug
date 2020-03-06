'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/webpack-plugin.umd.prod.js')
} else {
  module.exports = require('./dist/webpack-plugin.umd.js')
}
