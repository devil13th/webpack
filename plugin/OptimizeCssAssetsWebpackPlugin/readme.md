# 压缩CSS

需要使用OptimizeCssAssetsWebpackPlugin插件

> npm install optimize-css-assets-webpack-plugin --save-dev

一般情况下结合`mini-css-extract-plugin`(单独将css打包成.css文件)来使用，步骤如下

1. webpack配置中引入插件


> //单独打包css文件 (单独打包css，而不是用style-loader将css 添加到header的style标签中)
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

2. main.js中引入css文件

   ```
   import './style/app.css';
   import './style/b.css';
   import './style/c.less';
   ```

3. 配置loader

   ```
   rules:[
       {
         // 匹配哪些文件
         test: /\.css$/,
         // 从下往上执行loader  先执行css-loader在执行style-loader
         // css-loader 是编译css文件
         // style-loader 是在html中加入style标签，引入已编译的css
         use: [ 
           // 创建style标签，将样式引入
           //{ loader: "style-loader" },
           // 取代style-loader，提取js中的css到单独文件
           { loader: MiniCssExtractPlugin.loader},
           { loader: "css-loader"}
         ],
         exclude:/node_modules/
       },
       {
         test: /\.less$/,
         use: [
           { loader: MiniCssExtractPlugin.loader},
           'css-loader',
           // 将less文件编译成css文件
           // 需要下载 less-loader和less
           'less-loader'
         ]
       }
     ]
   },
   ```

   

4. 配置webpack插件

    ```
    plugins:[
        // 单独打包css文件
        new MiniCssExtractPlugin({
          // 对输出的文件进行重命名
          filename:'css/built.css'
        }),

        // 压缩css
        new OptimizeCssAssetsWebpackPlugin()
    ]
    ```
