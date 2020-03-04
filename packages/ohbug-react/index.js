'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/ohbug-react.umd.prod.js')
} else {
  module.exports = require('./dist/ohbug-react.umd.js')
}
