import webpack from 'webpack'
import path from 'path'
import { Server } from 'http'
import express, { Express } from 'express'
import multer from 'multer'
import rimraf from 'rimraf'

const upload = multer({ dest: path.resolve(__dirname, './uploads/') })

export function compile(compiler: webpack.Compiler) {
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err)
      }

      return resolve(stats)
    })
  })
}

export function createCompiler(options: webpack.Configuration = {}) {
  const compiler = webpack(
    Array.isArray(options)
      ? options
      : {
          mode: 'production',
          cache: false,
          entry: `${__dirname}/fixtures/index.js`,
          devtool: 'source-map',
          output: {
            path: `${__dirname}/dist`,
            filename: '[name].[chunkhash].js',
            chunkFilename: '[id].[name].[chunkhash].js',
          },
          ...options,
        }
  )
  return compiler
}

export const uploads = path.resolve(__dirname, './uploads')
const port = 10086
export const url = `http://localhost:${port}/upload`

let server: Server | null
let app: Express | null
export const createTestServer = (): Promise<void> =>
  new Promise((resolve) => {
    app = express()

    app.post('/upload', upload.single('file'), (_: any, res: any) => {
      res.end('good')
    })

    const target = app.listen(port, () => {
      server = target
      // eslint-disable-next-line no-console
      console.log(`createTestServer at port: ${port}`)
      resolve()
    })
  })

export const closeTestServer = () =>
  new Promise((resolve) => {
    if (server) server.close(resolve)
    server = null
    app = null
  })

export const clearUploads = () => {
  rimraf(`${uploads}/*`, () => {})
}
