'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/ohbug-extension-perfume.cjs.prod.js')
} else {
  module.exports = require('./dist/ohbug-extension-perfume.cjs.js')
}
