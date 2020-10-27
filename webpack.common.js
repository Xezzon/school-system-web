const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const resolve = (relativePath) => path.resolve(__dirname, relativePath);

const webpackCommonConfig = {
    entry: {
        index: '@/pages/index',
        admin: '@/pages/admin',
    },
    output: { path: resolve('./dist') },
    resolve: {
        alias: {
            '@': resolve('./src'),
            // 减少重复打包
            'bn.js': path.resolve(process.cwd(), 'node_modules', 'bn.js'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', 'wasm'],
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: ['thread-loader', 'babel-loader?cacheDirectory=true'],
                exclude: /[\\/]node_modules[\\/]/,
            },
            {
                test: /\.(le|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
                exclude: /[\\/]node_modules[\\/]/,
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '~',
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    plugins: [
        // 打包HTML并注入CSS、JS
        ...[
            { chunk: 'index', title: '导航页' },
            { chunk: 'admin', title: '管理员页面' },
        ].map(
            ({ chunk, ...options }) =>
                new HtmlWebpackPlugin({
                    template: resolve('./src/common.html'),
                    filename: `${chunk}.html`,
                    chunks: [chunk],
                    ...options,
                })
        ),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolve('./src/resources'),
                    to: 'static',
                },
            ],
        }),
        new AntdDayjsWebpackPlugin(),
    ],
};

module.exports = webpackCommonConfig;
