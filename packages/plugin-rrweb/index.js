'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/plugin-rrweb.umd.prod.js')
} else {
  module.exports = require('./dist/plugin-rrweb.umd.js')
}
