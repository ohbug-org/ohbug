const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')
const args = require('minimist')(process.argv.slice(2))
const { targets: allTargets } = require('./utils')

const formats = args.formats || args.f
const targets = args._.length ? args._ : allTargets

async function build(target) {
  try {
    if (target !== 'ohbug-types') {
      const pkgDir = path.resolve(`packages/${target}`)

      await fs.remove(`${pkgDir}/dist`)

      const env = 'production'
      await execa(
        'rollup',
        [
          '-c',
          '--environment',
          [
            `NODE_ENV:${env}`,
            `TARGET:${target}`,
            formats ? `FORMATS:${formats}` : ``,
          ].join(','),
        ],
        {
          stdio: 'inherit',
        }
      )
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

async function buildAll(t) {
  for (const target of t) {
    // eslint-disable-next-line no-await-in-loop
    await build(target)
  }
}

;(async () => {
  await buildAll(targets)
})()
