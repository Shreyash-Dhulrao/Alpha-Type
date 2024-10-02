import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import main from './src/main'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() , svgr()],
  build: {
    outDir: {main}, 
  },
})
