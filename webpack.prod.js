const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const TextReplaceWebpackPlugin = require("text-replace-html-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebPackPlugin({
            template: "./public/index.prod.html",
            title: 'react+antd前端界面汇总',
            contextPath: '[[${#servletContext.contextPath}]]',
            minify: false,
            inject: true,
            favicon: false,
            hash: true,
            header: ``,
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
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.bundle.js|\.bundle.css/,
            filename: '[path]'
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
                ],
            },
            ],
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
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
            automaticNameDelimiter: '-', // 文件名的连接符
            name: true,
            cacheGroups: {
                antd: {
                    test: /[\\/]node_modules[\\/](antd.*|@ant\\-design)[\\/]/,
                    name: "antd",
                    priority: -9,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -10,
                    reuseExistingChunk: true
                },
                common: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
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