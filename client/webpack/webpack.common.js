const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const VENDOR_LIBS = [
  'axios',
  'classnames',
  'google-map-react',
  'jwt-decode',
  'lodash',
  'lokka',
  'lokka-transport-http',
  'material-ui',
  'moment',
  'prop-types',
  'react',
  'react-dom',
  'react-dropzone',
  'react-redux',
  'react-router',
  'react-router-dom',
  'react-social-icons',
  'redux',
  'redux-thunk',
  'uuid',
  'validator',
];

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      Path.resolve(__dirname, '../src/index.js'),
    ],
    vendor: VENDOR_LIBS,
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(['build'], { root: Path.resolve(__dirname, '..') }),
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
};
