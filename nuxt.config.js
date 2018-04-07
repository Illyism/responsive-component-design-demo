module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Reponsive Component Design Demos',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Responsive compoennt design demos' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#eee' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      config.resolve.mainFields = ['module', 'main']
    },
    postcss: [require('postcss-nested')()],
  },

  modules: ['@nuxtjs/pwa'],

  plugins: ['~/plugins/components', '~/plugins/match-media'],

  css: ['modern-normalize/modern-normalize.css', '~/assets/main.css'],

  manifest: {
    name: 'Responsive Web Design Demos',
    short_name: 'Responsive Web Design',
    lang: 'en',
    background_color: '#111111',
    theme_color: '#8652e7',
    display: 'standalone',
    description: 'Demos for my Responsive Web Design talk',
  },

  generate: {
    subFolders: false,
  },
}
