const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const autoprefixer = require("autoprefixer")
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const util = require("./util.js")

const resolve = file => path.resolve(__dirname, file)

let config = merge(base, {
    target: 'node',
    entry: resolve('../src/entry/entry-server.js'),
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    util.generateLoader("vue-style", { sourceMap: true }),
                    util.generateLoader("css", { sourceMap: true }),
                    util.generateLoader("postcss", { 
                        sourceMap: true,
                        plugins: [autoprefixer({})]
                    }),
                    util.generateLoader("sass", { sourceMap: true }),
                ]
            },
        ]
    },
    // https://webpack.js.org/configuration/externals/#externals
    // https://github.com/liady/webpack-node-externals
    externals: nodeExternals({
        // do not externalize CSS files in case we need to import it from a dep
        whitelist: /\.css$/
    }),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueSSRServerPlugin()
    ]
})

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['vue-ssr-server-bundle.json'],
        })
    )
}

module.exports = config
