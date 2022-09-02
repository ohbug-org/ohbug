import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import OhbugUnplugin from '@ohbug/unplugin/vite'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  define: { __APP_VERSION__: JSON.stringify(pkg.version) },
  plugins: [
    react(),
    OhbugUnplugin({
      apiKey: '2714c5cc067e104ea76f6074f38ab721e011b469ef7f2e12daabff8debe24ca2',
      appVersion: pkg.version,
      appType: 'react',
    }),
  ],
  build: { sourcemap: true },
  server: { port: 4000 },
})
