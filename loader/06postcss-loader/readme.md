# CSS 兼容性设置

需要postcss-loader 和 postcss-preset-env插件，先安装

> npm install postcss-loader postcss-preset-env --save-dev

添加webpack配置

```
module: {
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
        { loader: "css-loader"},
        

        /*
          css兼容性处理：postcss --> postcss-loader postcss-preset-env

          帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式

          "browserslist": {
              // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
              "development": [
                "last 1 chrome version", // 最近的一个chrome版本   last 1 最近的一个版本
                "last 1 firefox version",
                "last 1 safari version"
              ],
              // 生产环境：默认是看生产环境
              "production": [
                ">0.2%",  // 大于99.8%的浏览器
                "not dead", // 不要已经死掉的浏览器 ， 例如IE10
                "not op_mini all" // 不要兼容opmini浏览器
              ]
            }
        */
        // 使用loader的默认配置
        // 'postcss-loader',
        // 修改loader的配置
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss', // 固定写法
            plugins: () => [
              //使用 postcss的插件
              require('postcss-preset-env')()
            ]
          }
        }
      ],
      exclude:/node_modules/
    }
  ]
}
```



在package.json中配置browerslist属性

```
"browserslist": {
  // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
  "development": [
    "last 1 chrome version", // 最近的一个chrome版本   last 1 最近的一个版本
    "last 1 firefox version",
    "last 1 safari version"
  ],
  // 生产环境：默认是看生产环境
  "production": [
    ">0.2%",  // 大于99.8%的浏览器
    "not dead", // 不要已经死掉的浏览器 ， 例如IE10
    "not op_mini all" // 不要兼容opmini浏览器
  ]
}
```

注：如果要打开开发环境需要在webpack.config.js中配置环境变量

```
// 设置nodejs环境变量 -- 让postcss-loader的开发环境生效
process.env.NODE_ENV = "development"
```



添加一个div并添加样式

app.css

```
.csssuitable{
  background:url("../img/big.png");
  border:1px solid green;
  display:flex;
  backface-visibility:hidden;
}

```

index.html

```
<html>
  <body>ss</h1>
    <div class="csssuitable"></div>
    <div id="example"></div>
  </body>
</html>

```

使用webpack打包后浏览界面并检查元素可以发现样式已变成兼容的