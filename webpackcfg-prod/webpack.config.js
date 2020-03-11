const { resolve } = require('path');
// import xxx.css 时将css单独打包为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// html的压缩和拷贝
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 定义nodejs环境变量：决定使用browserslist的哪个环境(css兼容性处理)
process.env.NODE_ENV = 'production';

// 复用loader
const commonCssLoader = [
  // css 单独打包
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // CSS兼容性处理
	// 还需要在package.json中定义browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [require('postcss-preset-env')()]
    }
  }
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
		// 处理css
        test: /\.css$/,
        use: [...commonCssLoader]
      },
      {
		// 处理less
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader']
      },
      /*
        正常来讲，一个文件只能被一个loader处理。
        当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
          先执行eslint 在执行babel
      */
      {
		// js语法检查
        // 在package.json中eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行eslint-loader
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
		  // 自动修复
          fix: true
        }
      },
      {
		// js兼容性处理
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage', // js的新api兼容性的按需加载
                corejs: {version: 3},
                targets: {
                  chrome: '60',
                  firefox: '50'
                }
              }
            ]
          ]
        }
      },
      {
        test: /\.(jpg|png|gif)/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
		  // 解决html-loader用es6的import与本loader使用commonjs的冲突问题
          esModule: false
        }
      },
      {
		// 处理html中的图片
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        exclude: /\.(js|css|less|html|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
	// 单独打包css
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    }),
	// 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
	// 压缩html
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  // js的压缩
  mode: 'production'
};
