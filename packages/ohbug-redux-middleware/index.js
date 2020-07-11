'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/ohbug-redux-middleware.cjs.prod.js')
} else {
  module.exports = require('./dist/ohbug-redux-middleware.cjs.js')
}
