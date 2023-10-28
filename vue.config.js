var webpack = require('webpack');
const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/scrabbleapp/dist/' : './',
    pages: {
        index: {
          entry: 'src/main.js',
          title: 'Steph\'s Scrabble App'
        }
    },
    configureWebpack: {
      plugins: [
          new webpack.DefinePlugin({
              'process.env': {
                  PACKAGE_VERSION: '"' + version + '"'
              }
          })
      ]
  },
}