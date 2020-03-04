'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/plugin-perfume.umd.prod.js')
} else {
  module.exports = require('./dist/plugin-perfume.umd.js')
}
