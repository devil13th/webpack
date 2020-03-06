[toc]

# Mini-css-extract-plugin的使用
该插件的功能是将CSS打包到单独文件，而不像style-loader将css编译成js然后加入到style标签中

1. 安装mini-css-extract-plugin插件

   >  npm install mini-css-extract-plugin --save-dev

2. 引入

   > **const** MiniCssExtractPlugin = require('mini-css-extract-plugin');

3. 使用该插件

```
// 单独打包css文件
new MiniCssExtractPlugin({
	// 对输出的文件进行重命名
	filename:'css/built.css'
}),
```

4. 使用该插件的loader，取代style-loader

因为style-loader是将css打包成js引入到header标签的style标签内，如果单独打包css则去掉该loader并加入mini-css-extract-plugin ( 注意：处理.css文件和.less文件的style-loader都要替换成MiniCssExtractPlugin.loader)

```
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
      },{
        test: /\.less$/,
        use: [
          // 创建style标签，将样式引入
          //'style-loader',

          // 取代style-loader，提取js中的css到单独文件
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          'less-loader'
        ]
        
      },
```