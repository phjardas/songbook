import { execSync } from 'node:child_process';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
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
  build: {
    outDir: 'build',
    rolldownOptions: {
      output: {
        codeSplitting: {
          // Firebase changes far less often than the app, so a separate chunk stays cached across deploys.
          groups: [{ name: 'firebase', test: /node_modules[\\/](@firebase|firebase)[\\/]/ }],
        },
      },
    },
  },
  test: {
    environment: 'node',
  },
});
