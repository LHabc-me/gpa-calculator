import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      vuetify({
        autoImport: true
      }),
      Pages(),
      Layouts()
    ]
  }
})
