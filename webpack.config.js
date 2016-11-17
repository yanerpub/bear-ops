const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: ['vue', 'vuex', 'vue-router', 'vue-resource']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js'),
        new webpack.HotModuleReplacementPlugin()
    ]
}