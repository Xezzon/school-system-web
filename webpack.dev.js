const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common.js');

const webpackDevConfig = {
    // 开发模式。
    mode: 'development',
    output: { filename: '[name]-[chunkhash].js' },
    plugins: [
        // 抽取CSS
        new MiniCssExtractPlugin({ filename: '[name]-[chunkhash].min.css' }),
    ],
    // 静态服务器配置
    devServer: {
        port: '9090',
        // 允许gzip
        compress: true,
        // 动态请求转发
        proxy: {
            '/': 'http://yapi.demo.qunar.com/mock/79010',
        },
    },
};

module.exports = merge(webpackCommonConfig, webpackDevConfig);
