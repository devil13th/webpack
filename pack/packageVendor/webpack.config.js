const path = require('path');
module.exports = {
  //mode:生产模式production(会压缩代码)  开发模式development(不会压缩代码)
  mode:"development", 
  //单个入口文件
  entry: './main.js',
  //多个入口文件路径
  // entry: ['./main.js','./main2.js'],
  
  //打包后的文件路径 (webpack4默认dist目录下)
  output: {
    filename: './bundle.js' //默认dist目录下  
  },



  optimization: {
       
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'verndor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                },
                jquery: {      
                    name: 'chunk-jquery', // 单独将 jquery 拆包      
                    priority: 20, // 权重要大于 commonsUi     
                    test: /[\\/]node_modules[\\/]_?jquery(.*)/,    
                },
                elementUI: {      
                    name: 'chunk-elementUI', // 单独将 elementUI 拆包      
                    priority: 20, // 权重要大于 commonsUi     
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/,    
                },
                echarts: {      
                    name: 'chunk-echarts', // 单独将 elementUI 拆包      
                    priority: 30, // 权重要大于
                    test: /[\\/]node_modules[\\/]_?echarts(.*)/,    
                },
                commonsUi: {
                    name: 'chunk-commons',
                    test: path.join(__dirname,'src/page'), // can customize your rules
                    minChunks: 2,//Math.ceil(pages.length / 3), 当你有多个页面时，获取pages.length，至少被1/3页面的引入才打入common包
                }
            }
        },
        runtimeChunk: {
          name: entrypoint => `runtime~${entrypoint.name}`
        }
    }
};