import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// Importing the catalog runs its duplicate part number / slug check, so a clash fails the build.
import './src/data/pieces.ts'

// The site is served at jmalerba.dev/projects/garage, which proxies to its own Render site.
// Building into the same folder path keeps asset URLs identical on both hosts.
const BASE = '/projects/garage/'

// https://vite.dev/config/
export default defineConfig({
  base: BASE,
  build: {
    outDir: `dist${BASE}`,
    emptyOutDir: true,
  },
  plugins: [react()],
})
