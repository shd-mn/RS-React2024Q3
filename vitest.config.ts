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
        'vitest.config.ts',
        'dist',
        '.next',
        'next.config.mjs',
        'next-env.d.ts',
        '**/types',
        '**/layout.tsx',
      ],
    },
    css: false,
  },
});
