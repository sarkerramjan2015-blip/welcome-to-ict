import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      sourcemap: 'hidden',
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalizedId = id.replace(/\\/g, '/');

            if (id.includes('node_modules')) {
              if (
                id.includes('react-router-dom') ||
                id.includes('react-router') ||
                id.includes('react-dom') ||
                id.includes('react-helmet-async') ||
                id.includes('react-fast-compare') ||
                id.includes('scheduler') ||
                id.includes('shallowequal') ||
                id.includes('invariant') ||
                /node_modules[\\/]react[\\/]/.test(id)
              ) {
                return 'react';
              }
              if (id.includes('firebase') || id.includes(`${path.sep}idb${path.sep}`) || normalizedId.includes('/node_modules/idb/')) return 'firebase';
              if (id.includes('motion')) return 'motion';
              if (id.includes('lucide-react')) return 'icons';
              if (id.includes('pdfjs-dist')) return 'pdf';
              if (id.includes('@emailjs/browser')) return 'emailjs';
              if (id.includes('html2canvas')) return 'canvas';
            }

            if (normalizedId.includes('/src/data/chapters/') || normalizedId.endsWith('/src/data/ict-syllabus.ts')) {
              return 'study-data';
            }
          },
        },
      },
    },
  };
});
