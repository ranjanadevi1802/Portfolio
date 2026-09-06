import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'asset-route-rewriter',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url) {
            // Rewrite /public/... to root public assets
            if (req.url.startsWith('/public/')) {
              req.url = req.url.replace(/^\/public/, '')
            }
            // Normalize /images/... to /Images/...
            if (req.url.startsWith('/images/')) {
              req.url = req.url.replace(/^\/images\//, '/Images/')
            }
            // Normalize /RanjanaDevi_Resume to /RanjanaDevi_Resume.pdf
            if (req.url === '/RanjanaDevi_Resume' || req.url.startsWith('/RanjanaDevi_Resume?')) {
              req.url = req.url.replace('/RanjanaDevi_Resume', '/RanjanaDevi_Resume.pdf')
            }
          }
          next()
        })
      }
    }
  ],
  server: {
    watch: {
      ignored: ['**/*.~tmp', '**/*.tmp', '**/.*'],
    },
  },
})

