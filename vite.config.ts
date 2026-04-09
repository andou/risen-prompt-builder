import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/risen-prompt-builder/',
  plugins: [vue(), tailwindcss()],
})
