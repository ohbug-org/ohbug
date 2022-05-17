import Ohbug from '@ohbug/browser'
import OhbugVue from '@ohbug/vue'

export const client = Ohbug.setup({
  apiKey: 'YOUR_API_KEY',
  appType: 'vue',
})
export { OhbugVue }
