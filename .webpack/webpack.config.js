const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const resolve = (relativePath) => path.resolve(__dirname, '../', relativePath);

const webpackCommonConfig = {
    entry: {
        eams: '@/pages/eams',
    },
    output: { path: resolve('./dist') },
    resolve: {
        alias: {
            '@': resolve('./src'),
            '~': resolve('./'),
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
                exclude: /node_modules/,
            },
            {
                test: /\.(le|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
                include: [/src/],
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: { javascriptEnabled: true },
                        },
                    },
                ],
                include: [/node_modules[\\/]antd/, /node_modules[\\/]@ant-design[\\/]pro-(layout|utils)/],
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
                    test: /node_modules/,
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
        ...[{ chunk: 'eams' }].map(
            ({ chunk, ...options }) =>
                new HtmlWebpackPlugin({
                    template: resolve('./public/index.html'),
                    filename: `${chunk}.html`,
                    chunks: [chunk],
                    title: '数字校园',
                    ...options,
                })
        ),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolve('./public'),
                    to: 'assets',
                },
            ],
        }),
        new AntdDayjsWebpackPlugin(),
    ],
};

module.exports = webpackCommonConfig;
