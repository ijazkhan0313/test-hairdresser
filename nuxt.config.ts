// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
// import path from 'path'
// @ts-ignore

export default defineNuxtConfig({
  ssr: false,

  runtimeConfig: {
    public: {
      noise_src: '/masking/Quellrauschen_loopbar_+10dB.mp3',

      /* We avoid using m4a because chrome has issues playing it
       *
      forest_src: '/sounds/forest.m4a',
      meadow_src: '/sounds/meadow.m4a',
      tropics_src: '/sounds/tropics.m4a',
      lagoon_src: '/sounds/lagoon.m4a', */

      forest_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Forest.mp3',
      meadow_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Meadow.mp3',
      tropics_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Tropics.mp3',
      lagoon_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Lagoon.mp3',

      forest_48_mp3_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Forest.mp3',
      meadow_48_mp3_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Meadow.mp3',
      lagoon_48_mp3_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Lagoon.mp3',
      tropics_48_mp3_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Tropics.mp3',

      forest_48_flac_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Forest.flac',
      meadow_48_flac_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Meadow.flac',
      lagoon_48_flac_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Lagoon.flac',
      tropics_48_flac_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Tropics.flac',

      apiUrl: process.env.VUE_APP_BACKEND_HOST_ADDRES || 'http://localhost:8000/api'

    },
    private: {
      apiUrl: process.env.VUE_APP_BACKEND_HOST_ADDRES || 'http://localhost:8000/api' // Only available on the server side
    }

  },

  plugins: [
    { src: '~/plugins/AudioVisual.client', mode: 'client' },
    { src: '~/plugins/PiniaPlugin', mode: 'client' },
    { src: '~/plugins/vue-video-background.client', ssr: false, mode: 'client' },
    { src: '~/plugins/toastr.client', ssr: false, mode: 'client' },
    { src: '~/plugins/axios' }
  ],

  //     '@nuxtjs/tailwindcss',
  //     'nuxt-headlessui'
  //
  // ],
  // headlessui: {
  //     prefix: 'Headless'
  // },
  app: {
    pageTransition: {
      name: 'slide-right',
      mode: 'out-in'
    }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    ['@nuxtjs/eslint-module', { lintOnStart: false }]
  ],

  i18n: {
    strategy: 'prefix',
    locales: ['en', 'de'], // used in URL path prefix
    defaultLocale: 'de', // default locale of your project for Nuxt pages and routings
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts'
  },

  css: ['~/assets/css/style.css'],

  vite: {
    // enable big integer literals
    // see: https://stackoverflow.com/a/76802679/10043870
    build: {
      target: ['esnext']
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
        supported: {
          bigint: true
        }
      }
    }
  },

  devtools: {
    timeline: {
      enabled: true
    }
  },

  compatibilityDate: '2024-09-24'
})
