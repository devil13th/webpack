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
