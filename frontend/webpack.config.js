const prod = process.env.NODE_ENV === 'production'

const path = require('path')

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '../static/')
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json']
        },
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: 'css-loader'
      }
    ]
  },
  devtool: prod ? undefined : 'source-map',
  plugins: []
}
