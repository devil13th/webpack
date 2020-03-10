


//拷贝首页，并添加js引用 、压缩、替换文本等功能
const HtmlWebpackPlugin = require('html-webpack-plugin');
//该插件功能是打包前先清空目标文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
//复制静态文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  //mode:生产模式production  开发模式development
  mode:"development", 
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    public: '127.0.0.1:7890',
    port : "7890",
    open: true,// 自动打开浏览器
    //hot: true,// 开启热更新  
    contentBase: __dirname+'/dist',//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    
  },
  module: {
    rules:[
       /*
        js兼容性处理：babel-loader @babel/core 
          1. 基本js兼容性处理 --> @babel/preset-env
            问题：只能转换基本语法，如promise高级语法不能转换
          2. 全部js兼容性处理 --> @babel/polyfill  
            问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
          3. 需要做兼容性处理的就做：按需加载  --> core-js
      */  
     {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: [
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
          ]
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(__dirname+'/dist'),
    //拷贝模板并添加js引用 替换模板变量
    new HtmlWebpackPlugin({
      filename:'./index.html', //通过模板生成的文件名
      template:'./index.html',//模板路径
      inject:true, //是否自动在模板文件添加 自动生成的js文件链接的位置 允许插件修改哪些内容，true/'head'/'body'/false,
      title:'Devil13th - React',
      sss:"我是 webpack 配置文件中配置的变量,在HtmlWebpackPlugin插件中进行配置 hello world !",

      //minify属性详解：https://github.com/kangax/html-minifier#options-quick-reference
      minify:{
        removeComments:true ,//是否压缩时 去除注释
        minifyCSS:true,//是否压缩style 样式(在index.html中的样式非外部样式)
        minifyJS:true,//是否压缩直接出现在页面中的js
      }
    })
   
  ]
  

};



