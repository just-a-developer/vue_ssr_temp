const path = require("path");
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

let isProd = process.env.NODE_ENV === "production";

function resolve(_path) {
    return path.resolve(__dirname, _path);
}

module.exports = {
    mode: isProd ? "production" : "development",
    devtool: isProd ? false : "#cheap-module-source-map",
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/dist/",
        filename: "[name].[chunkhash].js"
    },
    resolve: {
        extensions: [".js", ".vue", ".json", ".sass", ".scss"],
        alias: {
            "public": path.resolve(__dirname, "../public"),
            "@": resolve("../src"),
            "@css": resolve("../src/assets/styles"),
            "@img": resolve("../public/imgs"),
            "@view": resolve("../src/views"),
            "@store": resolve("../src/store"),
            "@cp": resolve("../src/components"),
            "@cont": resolve("../src/controller"),
            "@lib": resolve("../src/lib")
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    // miniCssExtractPlugin.loader,
                    // 'style-loader',
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: isProd
        ? [
            new VueLoaderPlugin(),
            new UglifyJSPlugin({
                sourceMap: true
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new miniCssExtractPlugin({
                filename: 'common.[contenthash:8].css'
            }),
        ]
        : [
            new VueLoaderPlugin(),
            new FriendlyErrorsPlugin()
        ],

    externals: {}
}