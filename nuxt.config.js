module.exports = {
  /*
  ** Headers of the page
  */
  head: {},
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  plugins: [
    {
      src: "~/plugins/svd-vue-components"  }
  ],
  build: {
    postcss: {
      plugins: {
        "postcss-custom-properties": false
      }
    },
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    {
      src: "~assets/scss/app.scss",
      lang: "scss"
    }
  ]
}
