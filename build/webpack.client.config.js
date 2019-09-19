const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const autoprefixer = require("autoprefixer")
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const util = require("./util.js")

const resolve = file => path.resolve(__dirname, file)
let isProd = process.env.NODE_ENV === "production";

const config = merge(base, {
    entry: {
        app: resolve('../src/entry/entry-client.js')
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    "style-loader",
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
    plugins: [
        // strip dev-only code in Vue source
        
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        new miniCssExtractPlugin({
            filename: isProd ? '[name].[chunkhash].css' : '[name].css',
            chunkFilename: isProd ?  '[id].[chunkhash].css': '[id].css',
        }),
        new VueSSRClientPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
})

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!vue-ssr-server-bundle.json'],
        })
    )
//     config.plugins.push(
//         // auto generate service worker
//         new SWPrecachePlugin({
//             cacheId: 'vue-hn',
//             filename: 'service-worker.js',
//             minify: true,
//             dontCacheBustUrlsMatching: /./,
//             staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
//             runtimeCaching: [
//                 {
//                     urlPattern: '/',
//                     handler: 'networkFirst'
//                 },
//                 {
//                     urlPattern: /\/(top|new|show|ask|jobs)/,
//                     handler: 'networkFirst'
//                 },
//                 {
//                     urlPattern: '/item/:id',
//                     handler: 'networkFirst'
//                 },
//                 {
//                     urlPattern: '/user/:id',
//                     handler: 'networkFirst'
//                 }
//             ]
//         })
//     )
}

module.exports = config
