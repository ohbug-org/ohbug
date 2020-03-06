import http from 'http'
import { createReadStream } from 'fs'
import FormData from 'form-data'
import { Asset } from './plugin'
import { TIMEOUT, LOG_PREFIX } from './constants'

export const upload = (asset: Asset) => {
  if (!asset.sourceMap) throw new Error(`${LOG_PREFIX} No ".map" file matches!`)

  const form = new FormData()
  form.append('apiKey', asset.apiKey)
  form.append('sourceFile', asset.sourceFile)
  form.append('sourceMap', asset.sourceMap)
  form.append('file', createReadStream(asset.sourceMapPath))

  if (asset.appVersion) form.append('appVersion', asset.appVersion)
  if (asset.appType) form.append('appType', asset.appType)

  const request = http.request({
    method: 'POST',
    host: 'localhost',
    port: 3001,
    path: '/v1/uploadSourceMap',
    headers: form.getHeaders()
  })

  form.pipe(request)

  request.on('error', error => {
    throw error
  })

  request.setTimeout(TIMEOUT, () => {
    console.error(`${LOG_PREFIX} Connection timed out`)
    request.abort()
  })
}
