const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const resolve = (relativePath) => path.resolve(__dirname, relativePath);

const webpackCommonConfig = {
    entry: {

    },
    output: { path: resolve('./dist') },
    resolve: {
        alias: {
            '@pages': resolve('./src/pages'),
            '@components': resolve('./src/components'),
            '@lib': resolve('./src/lib'),
            '@util': resolve('./src/util'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: ['thread-loader', 'babel-loader?cacheDirectory=true'],
                exclude: /node_modules/,
            },
            {
                test: /\.(le|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 第三方依赖
                vendor: {
                    priority: 1,
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'initial',
                    minChunks: 1,
                },
                // 抽取公共代码
                common: {
                    chunks: 'initial',
                    name: 'common',
                    minChunks: 3,
                },
            },
        },
    },
    plugins: [
        // 打包HTML并注入CSS、JS
        ...[
            
        ].map(
            ({ chunk, ...options }) =>
                new HtmlWebpackPlugin({
                    template: resolve('./src/common.html'),
                    filename: `${chunk}.html`,
                    chunks: [chunk],
                    ...options,
                })
        ),
        new AntdDayjsWebpackPlugin(),
    ],
    externals: {
        axios: 'axios',
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-router-dom': 'ReactRouterDOM',
    },
};

module.exports = webpackCommonConfig;
