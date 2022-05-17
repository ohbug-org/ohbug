import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'

import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({ plugins: [WindiCSS(), react(), vue()] })
