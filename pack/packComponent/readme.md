# webpack 打包组件

日常开发中通常会将一些公共的功能封装成组件，本文讲解如何打包一个组件

# 打包组件

## ipt2.js 
ipt2是一个自己编写的记录日志的组件,依赖第三方库jquery ,功能如下：
```
import $ from "jquery";
function csl(x) {
  console.log("ipt2:" + x);
  $(document).append($(`<div>${x}</div>`));
}

export { csl as csl };

```
## ipt1.js 
ipt1封装了ipt2,也是本例中需要向外暴露的组件,代码如下
```
import { csl } from "./ipt2";
function alt(x) {
  csl(x);
  console.log("ipt1", x);
}

export default alt;

```

依赖关系如下
ipt1.js -> ipt2.js -> jquery

最终的组件是ipt1

## package.json
组件的名称时mycomponent,入口文件是dist/main.js
```
{
  "name": "mycomponent",
  "version": "1.0.0",
  "main": "dist/main.js",
  "scripts": {
    "build": "webpack"
  },
  "license": "MIT",
  "dependencies": {
    "jquery": "^3.6.0"
  }
}

```



## 打包组件


webpack.config.js

```
const path = require("path");
module.exports = {
  //mode:生产模式production(会压缩代码)  开发模式development(不会压缩代码)
  mode: "development",
  //单个入口文件
  entry: {
    main: "./ipt1.js",
    "main.min": "./ipt1.js",
  },
  //多个入口文件路径
  // entry: ['./main.js','./main2.js'],

  //打包后的文件路径 (webpack4默认dist目录下)
  output: {
    filename: "./[name].js", //默认dist目录下
    library: "mycomponent",
    libraryTarget: "umd", //将你的library暴露为所有的模块定义下都可运行的方式,如amd、cmd等
    libraryExport: "default", //库导出时添加了.default导出,即下载该库后,import x from XX,直接导入即可,而不需要添加XX.default
  },
  externals: { // 第三方的库不进行打包
    jquery: "jQuery",
  },
};

```

执行`webpack`进行打包。

# 打包应用 

创建myapp应用,添加main.js

## main.js
```
import alt from "mycomponent";

alt("a1");
alt("a2");
alt("a3");
alt("a4");
alt("a5");
```

这里引用了上面我们自己写的组件mycomponent。

我们应用的依赖如下：
```
myapp/main.js -> mycomponent.ipt1 -> mycomponent.ipt2 -> jquery
```


## index.html 
创建页面index.html,代码如下

```
<html>
  <head>
    <meta charset="utf-8"/>
  </head>
  <body>

    <div id="root"></div>
    <script>
      var globalVar = {
        a:1,
        b:2
      }
    </script>
    
    <script type="text/javascript" src="dist/main.js"></script>
    
  </body>
</html>

```




## webpack.config.js
```
const path = require("path");
module.exports = {
  //mode:生产模式production(会压缩代码)  开发模式development(不会压缩代码)
  mode: "development",
  //单个入口文件
  entry: {
    main: "./main.js",
    "main.min": "./main.js",
  },
  //多个入口文件路径
  // entry: ['./main.js','./main2.js'],

  //打包后的文件路径 (webpack4默认dist目录下)
  output: {
    filename: "./[name].js", //默认dist目录下
  },
};

```

在打包应用之前我们要把mycomponent组件拷贝到应用的node_modules目录下,将mycomponent组件文件夹拷贝到myapp的node_modules目录下,注意：mycomponent目录下的node_modules不要拷贝，也就是jquery是不需要拷贝进来的。



最后使用webpack将myapp进行打包后打开index.html查看即可。





