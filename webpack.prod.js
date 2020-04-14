const OptimizeCSSAssertsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common.js');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

function JsdeliverCdn(moduleName, version, options) {
    let cdn = {
        axios: {
            var: 'axios',
            path: 'dist/axios.min.js',
        },
    };

    if (typeof moduleName !== 'string') {
        throw new TypeError("Expected 'moduleName' to be a string");
    }
    if (typeof version !== 'string') {
        throw new TypeError("Expected 'version' to be a string");
    }
    if (!(moduleName in cdn)) {
        return null;
    }

    return {
        name: moduleName,
        var: cdn[moduleName].var,
        url: `//cdn.jsdelivr.net/npm/${moduleName}@${version}/${cdn[moduleName].path}`,
        version,
    };
}

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
                exclude: /node_module/,
                parallel: true,
                terserOptions: { compress: { pure_funcs: ['console.debug'] } },
            }),
        ],
    },
    plugins: [
        // 清理之前的打包结果
        new CleanWebpackPlugin(),
        // 将部分包替换为CDN
        new CdnWebpackPlugin({ resolver: JsdeliverCdn }),
        // 抽取CSS
        new MiniCssExtractPlugin({ filename: '[chunkhash:8].min.css' }),
        // gzip压缩
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css)$/,
            exclude: /node_module/,
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            generateStatsFile: true,
            openAnalyzer: false,
        }),
    ],
};

module.exports = smp.wrap(merge(webpackCommonConfig, webpackProdConfig));
