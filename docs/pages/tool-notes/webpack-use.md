# webpack 初体验

## 安装与基本使用

```shell
npm install -D webpack

yarn add -D webpack
```
具体操作看[官方文档](https://webpack.js.org/),这里只说明一些重点知识

## npm i -D 和 npm i -S 的区别?

- \-D 包是给开发者用的
- \-S 是线上部署的时候用的

## 配置文件里 entry 和 output 是什么?

- entry 表示项目入口
- output 表示项目打包出口

## style-loader、css-loader、file-loader 分别有什么用?

- style-loader 创建 style 标签, 挂载到 DOM 上
- css-loader 处理各种 css 文件
- file-loader 用到文件路径时, 可以处理文件

## 如何抽离公共资源?

- 如果一个文件重复使用了模块, 那么就可以对这个模块的入口单独来进行抽离
- 只需要在 entry 和 output 来多加一个文件处理

## 插件和 loader 的区别?

- 插件时进行一些对宏观的功能, 比如自动生成 html, 或者清理 dist 文件
- loader 进行一些文件的处理

## html-webpack-plugin 的作用?

- 自动生成一个 html, 把打包好的文件放到 html 中

## clean-webpack-plugin 的作用?

- 清理 dist 里的文件, 使得在打包时文件不会越来越大





