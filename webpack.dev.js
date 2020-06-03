const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common.js');
const WebpackCDNPlugin = require('webpack-cdn-plugin');

const webpackDevConfig = {
    // 开发模式。
    mode: 'development',
    output: { filename: '[name]-[hash].js' },
    devtool: 'inline-source-map',
    plugins: [
        // 抽取CSS
        new MiniCssExtractPlugin({ filename: '[name]-[hash].min.css' }),
        new WebpackCDNPlugin({
            modules: [{ name: 'antd', style: 'dist/antd.css', cssOnly: true }],
            prod: false,
            publicPath: '/node_modules',
        }),
    ],
    // 静态服务器配置
    devServer: {
        host: '0.0.0.0',
        port: '9090',
        // 模块热替换
        hot: true,
        // 允许gzip
        compress: true,
        // 动态请求转发
        proxy: {
            '/api': {
                target: 'https://nei.netease.com/api/apimock-v2/ec1c48031cd790750f64146ff6e8024c/',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        },
    },
};

module.exports = merge(webpackCommonConfig, webpackDevConfig);
