import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// Importing the catalog runs its duplicate part number / slug check, so a clash fails the build.
import './src/data/pieces.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
