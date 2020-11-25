module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/scrabbleapp/dist/' : './',
    pages: {
        index: {
          entry: 'src/main.js',
          title: 'Steph\'s Scrabble App'
        }
      }
}