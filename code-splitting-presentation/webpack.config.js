const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJsPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'production',
    entry: ['@babel/polyfill', resolve(__dirname, './app/index.js')],
    output: {
        filename: '[name]-[contenthash].js',
        path: resolve(__dirname, './build'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, './app/index.html'),
            inject: true,
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                removeComments: true,
                removeEmptyAttributes: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css',
        }),
        new GenerateSW({
            cacheId: 'my-test-app',
            importWorkboxFrom: 'local',
            skipWaiting: true,
            clientsClaim: true,
            exclude: [/\.map$/, /^manifest.*\.js(?:on)?$/, /\.html$/],
        }),
        new BundleAnalyzerPlugin(),
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
            ],
        }],
    },
    optimization: {
        minimizer: [
            new TerserJsPlugin({
                cache: true,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'shared',
                    chunks: 'all'
                }
            }
        }
    },
};
