import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
// configure-pages supplies the deployed path; local development remains at /.
const basePath = (process.env.PAGES_BASE_PATH ?? '').replace(/^\/+|\/+$/g, '');
const base = basePath ? `/${basePath}/` : '/';
export default defineConfig({
  base,
  plugins: [react(), VitePWA({
    registerType: 'prompt',
    scope: base,
    includeAssets: ['apple-touch-icon.png'],
    manifest: {
      id: base,
      name: 'QuantApp',
      short_name: 'QuantApp',
      description: 'Study mathematics, quantitative finance, programming and machine learning.',
      lang: 'en',
      theme_color: '#141618',
      background_color: '#141618',
      display: 'standalone',
      start_url: base,
      scope: base,
      icons: [
        { src: `${base}icon-192.png`, sizes: '192x192', type: 'image/png' },
        { src: `${base}icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,woff,woff2,ttf}'],
      navigateFallback: `${base}index.html`,
      cleanupOutdatedCaches: true,
    },
  })],
});
