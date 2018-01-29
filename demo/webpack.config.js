const path = require("path");

module.exports = {
    devtool: "source-map",

    entry: "./index.js",

    output: {
        path: path.resolve("."),
        filename: "[name].bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                enforce: "pre",
                test: /\.ts?$/,
                exclude: ["node_modules"],
                use: {
                    loader: "awesome-typescript-loader",
                    options: {
                        "useBabel": true
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".js", ".json", ".scss"],
        modules: ["node_modules", path.resolve(__dirname, '..')]
    }
};
