const path = require('path');
const nodeExternals = require("webpack-node-externals");

module.exports = {
    mode: 'development',
    entry: './server.js',
    devtool: 'inline-source-map',
    watch: true,
    target: 'node',

    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist'),
    },
    externals: [nodeExternals()],
    stats: {
        all: undefined,
        moduleAssets: false,
        dependentModules: false,
        excludeModules: false,
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }
            }
        ]
    }
};