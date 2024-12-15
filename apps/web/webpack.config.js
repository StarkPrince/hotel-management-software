const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devtool: 'source-map',
    mode: 'development',
    plugins: [
        new NodePolyfillPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            fs: false,
        },
    },
};
