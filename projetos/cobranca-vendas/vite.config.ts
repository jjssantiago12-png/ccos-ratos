import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // false: registramos a SW no main.tsx via virtual:pwa-register em vez do script
      // injetado padrão — o script padrão só chama .register() e nunca recarrega a
      // página quando uma versão nova é ativada, então quem já tinha o app aberto
      // ficava preso na versão antiga até fechar e abrir de novo manualmente.
      injectRegister: false,
      strategies: 'generateSW',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        navigateFallback: '/index.html',
        // Dexie é a fonte de verdade offline — não cachear respostas do Supabase
        // no service worker pra não criar uma segunda camada de dado desatualizado.
      },
      includeAssets: ['icons/icon-maskable.png'],
      manifest: {
        name: 'Cobrança Vendas — Yago Modas',
        short_name: 'Cobrança',
        description: 'Cobrança de vendas consignadas, com ranking de inadimplência e cobrança via WhatsApp.',
        theme_color: '#0f0f0f',
        background_color: '#0f0f0f',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        lang: 'pt-BR',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
