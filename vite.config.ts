import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Add this section:
    allowedHosts: [
      '.trycloudflare.com' // Allows any subdomain of trycloudflare.com
    ]
  }
})
