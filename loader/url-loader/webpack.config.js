module.exports = {
  mode:"development", 
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      },
      {
        // url-loader 只能处理CSS中的图片，而不能处理html中的img 标签的图片
        //test: /\.(png|jpg)$/,
        test: /\.(png|gif|jpg|svg|jpeg)$/i, //匹配所有图片,后缀忽略大小写
        use: [          
          {
            loader: 'url-loader',
            options: {
              limit: 8192,//byte为单位,超过此单位将拷贝到相应目录下(默认是dist) , 如果没超过次大小将用data:image/jpg;base64...的形式引入图片
              outputPath:"img" //超过limit设置大小的图片将放到文件夹  dist/img
            }
          }
        ]
      }
    ]
  }
};
