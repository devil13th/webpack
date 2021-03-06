const { resolve } = require('path');



// import xxx.css 时将css单独打包为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// html的压缩和拷贝
const HtmlWebpackPlugin = require('html-webpack-plugin');
//该插件功能是打包前先清空目标文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
//复制静态文件
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: './main.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // loader的配置
      {
        // 处理less资源
        test: /\.less$/,
        use: [
          // css 单独打包
          { 
            loader: MiniCssExtractPlugin.loader,
            // url引用图片位置的公共路径
            options:{
              publicPath: '../'
            }
          },
          { loader: "css-loader"},
          { loader: "less-loader"},
        ]
      },
      {
        // 处理css资源
        test: /\.css$/,
        use: [
          // css 单独打包
          { 
            loader: MiniCssExtractPlugin.loader,
            options:{
              publicPath: '../'
            }
          },
          { loader: "css-loader"},
        ]
      },
      // 处理js 兼容性
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: [
            'stage-3','es2015', 'react',
            [
              
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ],
          // 开启babel缓存
          // 第二次构建时，会读取之前的缓存
          cacheDirectory: true
        }
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024, // 单位字节
          name: '[hash:10].[ext]',
          // 关闭es6模块化
          esModule: false,
          outputPath: 'imgs'
        }
      },
      {
        // 处理html中img资源
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        // 处理其他资源
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    // 清理文件夹build
    new CleanWebpackPlugin(__dirname+'/build'),
    // plugins的配置
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // 单独打包css文件
    new MiniCssExtractPlugin({
      // 对输出的文件进行重命名
      filename:'css/built.css'
    })
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    hot: true
  }
};
