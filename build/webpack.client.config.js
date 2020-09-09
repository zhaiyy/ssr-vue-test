const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const path = require('path')
const webpack = require('webpack')

const entryPath = path.join(__dirname, '../src/entry-client.js')

module.exports = merge(baseConfig, {
    mode: 'production',
    entry: entryPath,
    optimization: {
      splitChunks : {
        name: "manifest",
        minChunks: Infinity
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': process.env,
        'process.env.VUE_ENV': '"client"' // 增加process.env.VUE_ENV
      }),
      // 此插件在输出目录中
      // 生成 `vue-ssr-client-manifest.json`。
      new VueSSRClientPlugin()
    ]
  })