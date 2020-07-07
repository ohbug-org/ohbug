const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')
const { targets: allTargets } = require('./utils')
const args = require('minimist')(process.argv.slice(2))

const formats = args.formats || args.f
const targets = args._.length ? args._ : allTargets

;(async () => {
  await buildAll(targets)
})()

async function buildAll(targets) {
  for (const target of targets) {
    await build(target)
  }
}

async function build(target) {
  try {
    if (target !== 'types') {
      const pkgDir = path.resolve(`packages/${target}`)

      await fs.remove(`${pkgDir}/dist`)

      const env = 'production'
      await execa(
        'rollup',
        [
          '-c',
          '--environment',
          [`NODE_ENV:${env}`, `TARGET:${target}`, formats ? `FORMATS:${formats}` : ``].join(','),
        ],
        {
          stdio: 'inherit',
        }
      )
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
}
