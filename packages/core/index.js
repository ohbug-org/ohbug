'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/core.umd.prod.js')
} else {
  module.exports = require('./dist/core.umd.js')
}
