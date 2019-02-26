const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer')
module.exports = {
    entry: {
        'main': './src/main.js'
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, "dist"),
        // webpack构建输出的临时文件存放到内存中，而且是以publicPath作为相对路径。
        // publicPath并不会影响输出目录
        // 此外，如果指定路径下已经存在了相同文件，webpack会优先使用内存的临时文件
        // publicPath: "/assets/",
        filename: '[name].build.js'
    },

    module:{
      rules: [
          {
              test: /\.(sa|sc|c)ss$/,
              use: [
                  MiniCssExtractPlugin.loader,
                  {
                      loader: 'css-loader'
                  },
                  {
                      loader: 'postcss-loader',
                      options: {
                          ident: 'postcss',
                          plugins: loader => [autoprefixer({ browsers: ['> 0.15% in CN'] })]
                      }
                  },
                  {
                      loader: 'sass-loader'
                  }
              ]
          },
          {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: {
                loader: "url-loader",
                options: {
                    name: "[name]-[hash:5].min.[ext]",
                    limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                    publicPath: "fonts/",
                    outputPath: "fonts/"
                }
            }
          },
          {
              test: /\.js$/,
              use: {
                  loader: 'babel-loader'
              }
          },
          {
              test: /\.vue$/,
              use: {
                  loader: 'vue-loader'
              }
          }
      ]
    },
    devServer: {
        port: 9999,
        host: "0.0.0.0",
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css', // 设置最终输出的文件名
            chunkFilename: '[id].css'
        })
    ]
}
