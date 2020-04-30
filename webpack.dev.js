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
        host: '0.0.0.0',
        port: '9090',
        // 允许gzip
        compress: true,
        // 动态请求转发
        proxy: {
            '/api': {
                target: 'http://www.sosoapi.com/pass/mock/17842/',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        },
    },
};

module.exports = merge(webpackCommonConfig, webpackDevConfig);
