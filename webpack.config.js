const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: './source/js/index.js',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        compress: true,
        port: 3000
    },
    module: {
        rules: [
            // Config for .js files
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            // Config for SCSS files
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { 
                            loader: 'css-loader', 
                            // Minify css
                            options: { 
                                minimize: true 
                            } 
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    // For vendor prefixes
                                    autoprefixer({
                                        browsers:['ie >= 8', 'last 4 version']
                                    })
                                ]
                            }
                        },
                        'sass-loader'
                    ],
                    fallback: 'style-loader'
                }) 
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: './source/index.html'
        }),
        // Clear build folder before build
        new CleanWebpackPlugin('build/*.*')
    ]
}