var os = require ('os')
var _ = require('lodash')

/* use os & lodash to acquire internet ip */
var ip = _(os.networkInterfaces())
  .values()
  .flatten()
  .filter({ family: 'IPv4', internal: false })
  .map('address')
  .first()

module.exports = {
  css: [
    '~/assets/vincenzo.scss'
  ],
  plugins: [
    '~plugins/buefy',
    '~plugins/vee-validate'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: 'http://' + ip + ':4000/api',
    errorHandler (errorReason, { error }) {
      error('Request Error: ' + errorReason)
    },
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'labella-vincenzo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Label printing software' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css' }
    ],
    htmlAttrs: {
      class: 'has-navbar-fixed-top'
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    /* temp fix for bulma warnings */
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
  }
}
