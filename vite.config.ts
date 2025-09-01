import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: { postcss: { plugins: [] } },
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/consent/standalone.tsx'),
      name: 'Consent',
      fileName: () => 'consent.js',
      formats: ['iife'],
    },
  },
});
