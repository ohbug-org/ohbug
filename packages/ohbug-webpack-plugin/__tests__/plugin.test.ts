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
  uploads,
} from './helpers'

const apiKey = 'YOUR_API_KEY'
const appVersion = 'YOUR_APP_VERSION'

describe('@ohbug/webpack-plugin', () => {
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
    expect(
      () =>
        // @ts-ignore
        // eslint-disable-next-line no-new
        new OhbugWebpackPlugin({})
    ).toThrowError(/"apiKey" is required!/)
  })

  it(`"appVersion" is required`, () => {
    expect(() => {
      // @ts-ignore
      // eslint-disable-next-line no-new
      new OhbugWebpackPlugin({
        apiKey,
      })
    }).toThrowError(/"appVersion" is required!/)
  })

  it('should works', async () => {
    const compiler = createCompiler()
    new OhbugWebpackPlugin({
      apiKey,
      appVersion,
      url,
    }).apply(compiler)

    await compile(compiler)
    const files = fs.readdirSync(uploads).length
    expect(files).toBe(1)
  })
})
