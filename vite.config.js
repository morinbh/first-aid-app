import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Changed from react-refresh
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate'
    })
  ]
})