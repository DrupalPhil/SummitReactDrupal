const path = require('path');
const isDevMode = process.env.NODE_ENV !== 'production';

const config = {
  entry: {
    main: ['./js/src/index.jsx'],
  },
  devtool: (isDevMode) ? false : 'source-map',
  mode: (isDevMode) ? 'development' : 'production',
  output: {
    path: isDevMode
      ? path.resolve(__dirname, 'js/dist_dev')
      : path.resolve(__dirname, 'js/dist'),
        filename: '[name].min.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{loader: 'babel-loader'}],
        include: path.join(__dirname, 'js/src'),
        exclude: [/node_modules\/(?!(swiper|dom7)\/).*/, /\.test\.js(x)?$/],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

module.exports = config;
