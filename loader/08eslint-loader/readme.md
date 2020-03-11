# JS语法检查eslint

使用`eslint-loader`对语法进行检查,而`eslint-loader`依赖于`eslint`

> npm install eslint-loader eslint --save-dev

配置webpack

```
rules:[
    /*
      语法检查： eslint-loader  eslint
        注意：只检查自己写的源代码，第三方的库是不用检查的
        设置检查规则：
          package.json中eslintConfig中设置~
            "eslintConfig": {
              "extends": "airbnb-base"
            }
          airbnb --> eslint-config-airbnb-base  eslint-plugin-import eslint
    */
   {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {
      // 自动修复eslint的错误
      fix: true
    }
  }
]
```

设置检查规则，在package.json中进行配置

```
"eslintConfig": {
    "extends": "airbnb-base",
    "env": {
      "browser": true
    }
  }
```

设置完成后可以用webpack命令进行编译，发现检查出来的错误，如果需要自动修复则在loader的配置中加入`fix:true` (上面代码中已加入改配置)
