const glob = require('glob');
const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (_, argv) => ({
    target: 'web',
    entry: resolve(__dirname, './src/index.tsx'),
    output: {
        filename: '[name].[chunkhash].js',
        path: resolve(__dirname, './dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.less$/,
                exclude: [/\.module.less$/],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: resolve(__dirname, './public'), to: resolve(__dirname, './dist') }
            ]
        }),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, './src/index.ejs')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css'
        })
    ],
    resolve: {
        extensions: ['.css', '.less', '.js', '.json', '.ts', '.tsx'],
        modules: [resolve(__dirname, './src'), resolve(__dirname, './node_modules')],
        plugins: [new TsconfigPathsWebpackPlugin()]
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all'
        }
    }
});
