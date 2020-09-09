const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const webpack = require('webpack')

const path = require('path')

const entryPath = path.join(__dirname, '../src/entry-server.js')

module.exports = merge(baseConfig, {
    mode: 'production',
    
    entry: entryPath,
    // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
    target: 'node',
     // 对 bundle renderer 提供 source map 支持
    devtool: 'source-map',
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    output: {
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        allowlist: /\.css$/
      }),
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
          }),
    
        new VueSSRServerPlugin()
    ]
})