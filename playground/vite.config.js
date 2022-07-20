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
      apiKey: 'f8b38e2ea956e6d295aefcc88e0bbd6739021fd07eebe420e71a4ac4d70f43eb',
      appVersion: pkg.version,
      appType: 'react',
    }),
  ],
  build: { sourcemap: true },
  server: { port: 4000 },
})
