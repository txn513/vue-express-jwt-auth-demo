'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const utils = require('./utils')
const config = require('../config')
const env = config.dev.env

// const HOST = '0.0.0.0'
// const PORT = 8030


module.exports = merge(baseConfig, {
  mode: 'development',

  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  devtool: "inline-source-map",
  // devServer: {
  //   clientLogLevel: 'warning',
  //   // hot: true,
  //   contentBase: 'dist',
  //   compress: true,
  //   host: HOST,
  //   port: PORT,
  //   open: true,
  //   overlay: { warnings: false, errors: true },
  //   publicPath: '/',
  //   quiet: true,
  //   watchOptions: {
  //     poll: true
  //   },
  //   proxy: {
  //     '/api': {
  //         target: 'http://localhost:9000',//后端接口地址
  //         changeOrigin: true,//是否允许跨越
  //         pathRewrite: {
  //             '^/api': '',//重写,
  //         }
  //     }
  //   }
  // },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})