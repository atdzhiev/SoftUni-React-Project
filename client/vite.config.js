import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test:{
    slowTestThreshold: 2000,
    environment: 'jsdom',
    globals: true,

  }
})
