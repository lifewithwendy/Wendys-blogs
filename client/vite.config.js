import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {//configuring a proxy for the server to connect front end to backend
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
