/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    open: true,
  },
  test: {
    globals: true,
    //* This is where you choose what browser-like environment you want to use.
    environment: 'jsdom',
    //* This is the path to the setup files which run before each test file.
    // setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/setupTests.ts'],
    },
  },
});
