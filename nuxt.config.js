module.exports = {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  loading: false,
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Val-Jalbert -- Boucherie',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: '/js/howler.core.min.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/transition.css',
    '~/assets/css/main.scss',
  ],

  buildModules: ['@nuxtjs/style-resources'],
  router: {
    base: '/vj/',
  },
  components: true,

  styleResources: {
    scss: ['~/assets/style/variables.scss', '~/assets/style/mixins.scss'],
  },

  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty',
      }
    },
  },

  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  dev: process.env.NODE_ENV === 'dev',
  env: {
    isDev: process.env.NODE_ENV === 'dev',
  },
}
