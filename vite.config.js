import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() , svgr()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separate dependencies into chunks
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react';
            }
            if (id.includes('lodash')) {
              return 'lodash';
            }
            if (id.includes('firebase')) {
              return 'firebase';
            }
            return 'vendor'; // Default vendor chunk
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  css: {
    postcss: null,
  },
})
