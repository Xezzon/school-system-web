const OptimizeCSSAssertsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackCDNPlugin = require('webpack-cdn-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common.js');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const smp = new SpeedMeasurePlugin();

const webpackProdConfig = {
    // 生产模式。默认开启 Optimization.minimize、HtmlWebpackPlugin.minify
    mode: 'production',
    output: { filename: '[chunkhash:8].min.js' },
    optimization: {
        minimizer: [
            // 压缩CSS
            new OptimizeCSSAssertsPlugin(),
            // 压缩JS
            new TerserPlugin({
                test: /\.js[x]?$/,
                exclude: /[\\/]node_module[\\/]/,
                parallel: true,
                terserOptions: { compress: { pure_funcs: ['console.debug'] } },
            }),
        ],
    },
    plugins: [
        // 清理之前的打包结果
        new CleanWebpackPlugin(),
        // 将部分包替换为CDN
        /* BUG: 因为HtmlWebpackPlugin未提供每个页面的chunks，所以不能根据chunks注入CDN，导致所有页面被注入的CDN都是一样的 */
        new WebpackCDNPlugin({
            prodUrl: '//cdn.jsdelivr.net/npm/:name@:version/:path',
            modules: [
                { name: 'antd', style: 'dist/antd.min.css', cssOnly: true },
                { name: 'axios', var: 'axios', path: 'dist/axios.min.js' },
                { name: 'opentype.js', var: 'opentype', path: 'dist/opentype.min.js' },
                { name: 'papaparse', var: 'Papa', path: 'papaparse.min.js' },
                { name: 'react', var: 'React', path: 'umd/react.production.min.js' },
                { name: 'react-dom', var: 'ReactDOM', path: 'umd/react-dom.production.min.js' },
                { name: 'react-router-dom', var: 'ReactRouterDOM', path: 'umd/react-router-dom.min.js' },
            ],
            optimize: true,
        }),
        // 抽取CSS
        new MiniCssExtractPlugin({ filename: '[chunkhash:8].min.css' }),
        // gzip压缩
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css)$/,
            exclude: /[\\/]node_module[\\/]/,
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            generateStatsFile: true,
            openAnalyzer: false,
        }),
    ],
};

// module.exports = smp.wrap(merge(webpackCommonConfig, webpackProdConfig));
module.exports = merge(webpackCommonConfig, webpackProdConfig);
