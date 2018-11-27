const path = require('path');
const { argv } = require('yargs');
const isDevelopment = argv.mode === 'development';
const webpack = require('webpack');

// plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { default: ImageminPlugin } = require('imagemin-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
const cssNano = require('cssnano');
const postcssOptions = {
  ident: 'postcss',
  plugins: [
    !isDevelopment ? postcssImport : () => {},
    !isDevelopment ? cssNano : () => {},
    autoprefixer({
      browsers: [ 'last 2 versions' ],
    }),
    postcssPresetEnv({
      stage: 3,
      browsers: ['last 5 versions', '> 5%'],
      features: {
        'custom-media-queries': true,
      },
    }),
  ],
};

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve('dist'),
    filename: isDevelopment ? 'js/bundle.js' : 'js/bundle.min.js',
    publicPath: './',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          !isDevelopment ? MiniCssExtractPlugin.loader : {
            loader: 'style-loader',
            options: {
              sourceMap: true,
              convertToAbsoluteUrls: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: postcssOptions,
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          !isDevelopment ? MiniCssExtractPlugin.loader : {
            loader: 'style-loader',
            options: {
              sourceMap: true,
              convertToAbsoluteUrls: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: postcssOptions,
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '../images',
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
          'img-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '../fonts',
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      },
    ],
  },
  devServer: {
    watchContentBase: true,
    contentBase: path.join(__dirname, '/dist'),
    port: 3000,
    overlay: true,
    open: true,
    historyApiFallback: true,
    publicPath: '/',
  },
  devtool: isDevelopment ? 'source-map' : false,
  performance: {
    hints: false,
  },
  plugins: [
    !isDevelopment
      ? new CleanWebpackPlugin([ 'dist' ], {
        root: __dirname,
        verbose: true,
        dry: false,
      })
      : () => {},
    new CopyWebpackPlugin([ {
      from: './src/images/favicon.ico',
      to: 'images',
    } ]),
    !isDevelopment
      ? new MiniCssExtractPlugin({
        filename: 'css/bundle.css',
      })
      : () => {},
    !isDevelopment
      ? new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
      })
      : () => {},
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
      '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      title: 'Shopping list',
      publicPath: './',
    }),
    new HtmlBeautifyPlugin({
      config: {
        html: {
          'end_with_newline': true,
          'indent_size': 2,
          'indent_with_tabs': false,
          'indent_inner_html': false,
          'preserve_newlines': true,
          'unformatted': ['p', 'i', 'b', 'span'],
        },
      },
      replace: [ ' type="text/javascript"' ],
    }),
  ],
};
