import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic', // Enable the new JSX transform
    }),
  ],
  server: {
    proxy: {
      '/auth': 'http://localhost:3000',
      '/todos': 'http://localhost:3000',
    },
  },
});
