const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const resolve = (relativePath) => path.resolve(__dirname, relativePath);

const webpackCommonConfig = {
    entry: {
        index: '@/pages/index',
        'system-admin': '@/pages/system-admin',
    },
    output: { path: resolve('./dist') },
    resolve: {
        alias: {
            '@': resolve('./src'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', 'wasm'],
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
            { chunk: 'index', title: '导航页' },
            { chunk: 'system-admin', title: '系统管理员' },
        ].map(
            ({ chunk, ...options }) =>
                new HtmlWebpackPlugin({
                    template: resolve('./src/common.html'),
                    filename: `${chunk}.html`,
                    chunks: [chunk],
                    ...options,
                })
        ),
        new CopyWebpackPlugin([
            {
                from: resolve('./src/resources'),
                to: 'static',
                cache: true,
            },
        ]),
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
