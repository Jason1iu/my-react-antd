const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',//inline-source-map
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            memoryLimit: 1024
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            template: "./public/index.dev.html",
            title: 'react+antd前端界面汇总',
            filename: 'index.html'
        }),
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\//,
                    to: function (context) {
                        const spath = context.parsedUrl.pathname;
                        const i = spath.indexOf('/js/');
                        if (i > 0)
                            return spath.slice(i);
                        const i1 = spath.indexOf('/css/');
                        if (i1 > 0)
                            return spath.slice(i1);
                        return '/index.html';
                    }
                }
            ]
        },
        disableHostCheck: true,
        port: 8084,
        compress: false,
        inline: true,
        hot: true,
        proxy: {
            /*'/api': {
                target: 'http://localhost:3000/', // 使用 json-server作为mock-server
                pathRewrite: { '^/api': '/' },
                changeOrigin: true,
            } */
            '/api': {
                target: 'http://localhost:8080',
                secure: false,
                changeOrigin: true,
                //pathRewrite: { '^/api': '/dev/api' },
                auth: 'admin:ApiPassword'
            },
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE,PUT,HEADER',
            'Access-Control-Max-Age': 3600,
            'Access-Control-Allow-Headers': 'x-requested-with,Authorization,Content-Type',
            'Access-Control-Allow-Credentials': true
        },
    },
});