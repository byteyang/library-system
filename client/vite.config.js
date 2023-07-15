import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import externals from 'rollup-plugin-external-globals'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        externals({
          'vue': 'Vue',
          'element-plus': 'ElementPlus',
        }),
      ],
    },
  },
  plugins: [vue()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
      },
    },
  },
})
