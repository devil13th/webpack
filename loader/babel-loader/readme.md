# JS兼容性处理

使用babel-loader对JS进行兼容性处理

> npm install babel-loader @babel/core @babel/preset-env --save-dev

webpack配置

```
{
	test: /\.js$/,
	exclude: /node_modules/,
	loader: 'babel-loader',
    options: {
        // 预设：指示babel做怎么样的兼容性处理
        presets: [
			'@babel/preset-env'
        ]
    }
 }
```

babel-loader可以将ES6语法糖解析成ES5的语法，例如将const转为var,箭头函数转为了普通函数。但是不能转换新的API，例如Promise

![](jssuitable.png)

为了解决这个问题我们要安装@babel/polyfill

> npm install @babel/polyfill --save-dev

然后在main.js中直接引入
```
import '@babel/polyfill'
```
这种方式可以将ES6的API解析成ES5，但是它会将所有的兼容性问题全都引入进来了，比如只用了`Promise`，我们只想对Promise这个API转换，但是`@babel/polyfill`会将所有的ES6API的解析都引入进来，所以编译出来的文件很大，还有一个问题就是`@babel/polyfill`与`babel-loader`正好相反，它只能解析ES6的API但是不能解析ES6的语法糖。

如果要做到按需加载，则使用`core-js`，首先要安装`core-js`

> npm install core-js --save-dev

webpack配置

```
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
```

注意，配置后去掉main.js中引入的`@babel/polyfill`

```
// import '@babel/polyfill'
```



## 总结

先安装`babel-loader` `@babel/core` `@babel/preset-env` `core-js` `@babel/polyfill`

> npm install babel-loader @babel/core @babel/preset-env core-js --save-dev

然后配置webpack

```
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
```