const path = require("path");

let isProd = process.env.NODE_ENV === "production";

function resolve(_path) {
    return path.resolve(__dirname, _path);
}

module.exports = {
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

        }
    },
}