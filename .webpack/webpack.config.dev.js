const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const webpackCommonConfig = require('./webpack.config.js');
const webpack = require('webpack');
const WebpackCDNPlugin = require('webpack-cdn-plugin');

const webpackDevConfig = {
    // 开发模式。
    mode: 'development',
    output: { filename: '[name]-[fullhash].js' },
    devtool: 'inline-source-map',
    plugins: [
        // 抽取CSS
        new MiniCssExtractPlugin({ filename: '[name]-[fullhash].min.css' }),
        new WebpackCDNPlugin({
            modules: [
                { name: 'antd', style: 'dist/antd.css', cssOnly: true },
                { name: 'axios', var: 'axios', path: 'dist/axios.js' },
                { name: 'react', var: 'React', path: 'umd/react.development.js' },
                { name: 'react-dom', var: 'ReactDOM', path: 'umd/react-dom.development.js' },
                { name: 'react-router-dom', var: 'ReactRouterDOM', path: 'umd/react-router-dom.js' },
            ],
            prod: false,
            publicPath: '/node_modules',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    watchOptions: {
        ignored: /node_modules/,
    },
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
            '/api/auth': {
                target: 'http://localhost:40001/mock/48/',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
            '/api/eams': {
                target: 'http://localhost:40001/mock/11/',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
            '/api': {
                target: 'https://yapi.baidu.com/mock/69792',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        },
    },
};

module.exports = merge(webpackCommonConfig, webpackDevConfig);
