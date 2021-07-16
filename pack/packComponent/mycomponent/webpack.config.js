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
  externals: {
    jquery: "jQuery",
  },
};
