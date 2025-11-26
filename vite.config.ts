import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/assets': path.resolve(__dirname, './src/assets'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/containers': path.resolve(__dirname, './src/containers'),
      '@/redux': path.resolve(__dirname, './src/redux'),
      '@/types': path.resolve(__dirname, './src/types'),
    },
  },
});
