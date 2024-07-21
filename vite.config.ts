/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      exclude: [
        '**/.eslintrc.cjs',
        'vite.config.ts',
        'vitest.config.ts',
        'dist',
        '**/App.tsx',
        '**/main.tsx',
        '**/types',
        '**/constants',
        '**/redux',
        '**/context',
      ],
    },
  },
});
