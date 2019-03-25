'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const config = require('../config')
const utils = require('./utils')
const path = require('path')

module.exports = {
  entry: {
    app: ['./app/client/src/app.js','webpack-hot-middleware/client'],
  },
  output: {
      path: config.build.assetsRoot,
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      publicPath: process.env.NODE_ENV === 'production'
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath
  },
  // externals: {
  //   'vue': 'Vue',
  //   'vue-router': 'VueRouter',
  //   'axios': 'axios',
  // },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'assets': utils.resolve('app/client/src/assets'),
      'views': utils.resolve('app/client/src/views'),
      'static': utils.resolve('app/client/static'),
      'components': utils.resolve('app/client/src/components')
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'        
      },
      {
        test: /\.js$/,
        use: {
            loader: 'babel-loader',
            // options: {
            //     presets: ['@babel/preset-env'],
            //     compact: false
            // }
        },
        include: utils.resolve('app/client/src'),
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        }        
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/client/index.html',
      inject: true
    }),    
    new VueLoaderPlugin()
  ]
}