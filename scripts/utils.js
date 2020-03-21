const fs = require('fs')

const targets = fs
  .readdirSync('packages')
  .filter(f => {
    if (!fs.statSync(`packages/${f}`).isDirectory()) {
      return false
    }
    const pkg = require(`../packages/${f}/package.json`)
    if (pkg.private && !pkg.buildOptions) {
      return false
    }
    return true
  })
  .sort((a, b) => {
    const pkgA = require(`../packages/${a}/package.json`)
    const pkgB = require(`../packages/${b}/package.json`)

    const orderA = pkgA.buildOptions.order || 99
    const orderB = pkgB.buildOptions.order || 99
    return orderA - orderB
  })

module.exports = {
  targets
}
