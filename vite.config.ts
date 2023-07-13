import { defineConfig, Plugin } from 'vite'

export default defineConfig({
  clearScreen: false,
  define: {
    __DEV__: 'true',
    __BROWSER__: 'true'
  },
  optimizeDeps: {
    exclude: []
  }
})
