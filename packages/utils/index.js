'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/ohbug-utils.umd.prod.js')
} else {
  module.exports = require('./dist/ohbug-utils.umd.js')
}
