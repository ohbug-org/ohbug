/**
 * @jest-environment node
 */
import fs from 'fs'
import OhbugWebpackPlugin from '../src/plugin'
import {
  createCompiler,
  compile,
  createTestServer,
  closeTestServer,
  clearUploads,
  url,
  uploads
} from './helpers'

const apiKey = 'YOUR_API_KEY'
const appVersion = 'YOUR_APP_VERSION'

describe('webpack-plugin', () => {
  beforeAll(() => {
    clearUploads()
    createTestServer()
  })
  afterAll(() => {
    closeTestServer()
  })
  afterEach(() => {
    clearUploads()
  })

  it(`"apiKey" is required`, () => {
    expect(() => {
      // @ts-ignore
      new OhbugWebpackPlugin({})
    }).toThrowError(/"apiKey" is required!/)
  })

  it(`"appVersion" is required`, () => {
    expect(() => {
      // @ts-ignore
      new OhbugWebpackPlugin({
        apiKey
      })
    }).toThrowError(/"appVersion" is required!/)
  })

  it('should works', done => {
    const compiler = createCompiler()
    new OhbugWebpackPlugin({
      apiKey,
      appVersion,
      url
    }).apply(compiler)

    return compile(compiler).then(() => {
      const files = fs.readdirSync(uploads).length
      expect(files).toBe(1)
      done()
    })
  })
})
