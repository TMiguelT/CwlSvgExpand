const path = require("path");

var config = {
    devtool: "source-map",

    entry: "./index.ts",

    output: {
        path: path.resolve("."),
        filename: "[name].bundle.js"
    },

    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.ts?$/,
                exclude: ["node_modules"],
                use: ["awesome-typescript-loader"]
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".js"],
        modules: ["node_modules", path.resolve(__dirname, '..')]
    }
};

module.exports = config;
