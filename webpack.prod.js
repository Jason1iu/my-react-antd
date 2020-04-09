const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const TextReplaceWebpackPlugin = require("text-replace-html-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    plugins: [
        new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(['dist', '../server/src/main/resources/static/*.worker.*']),
        new HtmlWebPackPlugin({
            template: "./public/index.prod.html",
            title: 'react+antd前端界面汇总',
            contextPath: '[[${#servletContext.contextPath}]]',
            minify: false,
            inject: true,
            favicon: false,
            hash: true,
            // header: ``,
            metas: [
                '<meta name="csrfHeaderName" th:content="${_csrf.headerName}">',
                '<meta name="csrfToken" th:content="${_csrf.token}">',
                '<meta name="contextPath" th:content="${#servletContext.contextPath}">'
            ],
        }),
        new TextReplaceWebpackPlugin({
            replacementArray: [
                {
                    regex: /href=\"([^\"]*)\"/ig,
                    replace: 'th:href="@{$1}"'
                },
                {
                    regex: /src=\"([^\"]*)\"/ig,
                    replace: 'th:src="@{$1}"'
                },
            ]
        }),
        new FileManagerPlugin({
            onEnd: [{
                copy: [
                    {
                        source: path.resolve(__dirname, 'dist/**'),
                        destination: path.join(__dirname, '../server/src/main/resources/static'),
                    },
                    {
                        source: path.join(__dirname, '../server/src/main/resources/static/index.html'),
                        destination: path.join(__dirname, '../server/src/main/resources/templates/index.html'),
                    },
                ],
            },
            {
                delete: [
                    path.join(__dirname, '../server/src/main/resources/static/index.html'),
                    path.join(__dirname, '../server/src/main/resources/static/iconfont'),
                    path.join(__dirname, '../server/src/main/resources/static/js/*.LICENSE.txt'),
                ],
            },
            ],
        }),
    ],
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: false // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: { removeAll: true },
                    minifyFontValues: false,
                    canPrint: true
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            // automaticNameDelimiter: '-', // 文件名的连接符
            // name: true,
            cacheGroups: {
                antd: {
                    test: /[\\/]node_modules[\\/]antd[\\/]/,
                    enforce: true,
                    name: 'antd',
                    priority: -10
                },
                ant_design: {
                    test: /[\\/]node_modules[\\/]@ant[\\-]design[\\/]/,
                    enforce: true,
                    name: 'ant_design',
                    priority: -10
                },
                rc: {
                    test: /[\\/]node_modules[\\/]rc[\\-](.+)[\\/]/,
                    enforce: true,
                    name: 'rc',
                    priority: -10
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    priority: -40
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    enforce: true,
                    priority: -100,
                    reuseExistingChunk: true
                }
                // antv: {//使用antv
                //     test: /[\\/]node_modules[\\/]@antv[\\/]/,
                //     enforce: true,
                //     name: 'antv',
                //     priority: -10
                // },
                // react_regl_corejs_moment_d3: {//使用d3
                //     test: /[\\/]node_modules[\\/]react(.*)|regl|core[\\-]js|moment|d3(.*)[\\/]/,
                //     enforce: true,
                //     name: 'react_regl_corejs_moment_d3',
                //     priority: -10
                // },
                // pdfjs: {//使用pdfjs
                //     test: /[\\/]node_modules[\\/]pdfjs(.*)[\\/]/,
                //     enforce: true,
                //     name: 'pdfjs',
                //     priority: -10
                // },
            },
        },
    },
    /** 如果打包出来的js包比较大，会警告处理 */
    performance: {
        hints: false, // 枚举
        maxAssetSize: 250000, // 512K 整数类型（以字节为单位）
        maxEntrypointSize: 250000, // 整数类型（以字节为单位）
    },
});