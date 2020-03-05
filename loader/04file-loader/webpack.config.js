


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
     
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 从下往上执行loader  先执行css-loader在执行style-loader
        // css-loader 是编译css文件
        // style-loader 是在html中加入style标签，引入已编译的css
        use: [ 
          { loader: "style-loader" },
          { loader: "css-loader"}
        ],
        exclude:/node_modules/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          'less-loader'
        ]
        
      },
      {
        // 问题：默认处理不了html中img图片
        // 处理图片资源 - css 中通过url引用的图片
        test: /\.(png|gif|jpg|svg|jpeg)$/i, //匹配css中的图片,后缀忽略大小写
        // 使用一个loader
        // 需要下载 url-loader file-loader, url-loader 是依赖于file-loader的
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb，就会被base64处理
          // 优点: 减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
          // 解析时会出问题：[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          // 给图片进行重命名
          // [hash:10]取图片的hash的前10位
          // [ext]取文件原来扩展名
          name: '[hash:10].[ext]',
          // 打包后的路径
          outputPath: 'imgs'
        },
        
      },
      // html-loader 处理html中img图片，负责引入img,从而能被url-loader进行处理
      {
        test: /\.html$/,
        use: [
          { loader: "html-loader" }
        ],
        exclude:/node_modules/
      },

      // 打包其他资源(除了html/js/css资源以外的资源)
      {
        // 排除css/js/html资源
        exclude: /\.(css|js|html|less|png|gif|jpg|svg|jpeg)$/,
        loader: 'file-loader',
        options: {
          // 问题：因为file-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
          // 解析时会出问题：[object Module]
          // 解决：关闭file-loader的es6模块化，使用commonjs解析
          esModule: false,
          name: '[hash:10].[ext]',
          // 输出文件夹
          outputPath: 'media'
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
    }),
    //拷贝静态资源   
    //注意： 该拷贝文件所在文件夹尽量不要和style-loader匹配到同一文件夹 否则代码中import 'xx.css' 修改时不能及时应用,必须重启webpack才能让修改生效
    new CopyWebpackPlugin([
      {
        from: __dirname + '/static/d.css',
        to: __dirname + '/dist/style'
      }
    ]),
  ]
  

};



