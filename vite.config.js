import { execSync } from 'node:child_process';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

process.env.VITE_GIT_SHA ??= execSync('git rev-parse --short HEAD').toString().trim();

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Keep the old file name: installed clients poll /service-worker.js for updates.
      filename: 'service-worker.js',
      registerType: 'prompt',
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,webmanifest}'],
        navigateFallback: '/index.html',
      },
    }),
  ],
  // ponytail: Firebase 5 references Node's global; drop with the Firebase upgrade.
  define: { global: 'globalThis' },
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'node',
  },
});
