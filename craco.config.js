const path = require('path')

module.exports = {
  webpack: {
    alias: {
      path: 'path-browserify'
    },
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        path: require.resolve('path-browserify'),
        fs: false,
        os: require.resolve('os-browserify/browser')
      }
      return webpackConfig
    }
  }
}
