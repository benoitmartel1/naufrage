module.exports = {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  pwa: { workbox: false },
  loading: false,
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Naufrages',
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
  },

  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/transition.css',
    '~/assets/css/main.scss',
  ],

  modules: [],

  router: {
    base: process.env.NODE_ENV === 'dev' ? '/naufrage/' : '',
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty',
      }
    },
  },

  server: {
    host: 'localhost',
    port: 3000,
  },
  dev: process.env.NODE_ENV === 'dev',
  env: {
    isDev: process.env.NODE_ENV === 'dev',
  },
}
