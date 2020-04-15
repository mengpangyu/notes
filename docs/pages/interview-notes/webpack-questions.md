# webpack 面试题


## webpack 与 grunt、gulp 的不同?

三者都是前端构建工具, grunt 和 gulp 早期流行, 
现在 webpack 是主流

- **grunt 和 gulp 是基于任务和流**, 找到一类文件, 对其进行链式操作, 更新流上的数据
- **webpack 基于入口**, 用 loader 处理不同文件, 用 plugin 来扩展功能


## 与webpack类似的工具还有哪些? 谈谈你为什么最终选择(或放弃)使用webpack?

同样基于入口的打包工具: webpack rollup parcel

从应用场景看: 
- **webpack** 适用于大型复杂的前端站点建构
- **rollup** 适用于基础库的打包, 如 vue、react
- **parcel** 适用于简单的实验性项目， 他满足低门槛的快速看到效果

>parcel 的打包给出的调试信息有限, 一旦打包出错很难调试

## 有哪些常见的 Loader? 他们是解决什么问题的?

- file-loader: 把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader: 和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- source-map-loader: 加载额外的 Source Map 文件，以方便断点调试
- image-loader: 加载并且压缩图片文件
- babel-loader: 把 ES6 转换成 ES5
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
- style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
- eslint-loader：通过 ESLint 检查 JavaScript 代码

## 有哪些常见的 Plugin? 他们是解决什么问题的?

- define-plugin; 定义环境变量
- commons-chunk-plugin: 提取公共代码
- html-webpack-plugin: 自动生成一个 html 文件, 把所有的 js 和 css 加载进去

## Loader 和 Plugin 的不同?

- 作用:
    - Loader 是加载器, Webpack **只能解析 js 文件**, 如果想解析其他文件, 就要用到 Loader
    - Plugin 是插件, **可扩展 Webpack 的功能**, 让 Webpack 有更好的灵活性, 比如说 html-webpack-plugin
- 用法:
    - Loader 在 `module.rules` 中配置, 作为**模块的解析规则存在**, 每一项都是一个对象, 描述了匹配的文件后缀, 使用什么加载
    - Plugin 在 `plugins` 单独配置, 类型数组, 每一项都是一个 plugin, 参数都**通过构造函数传入(new html-webpack-plugin())** 


## 如何按需加载代码?

- 组件库的按需加载: 在 .babelrc 配置或 babel-loade 的参数进行设置, **组件库已经有了解决方案** [elementUI](https://link.zhihu.com/?target=https%3A//github.com/ElementUI/babel-plugin-component), [ant-design](https://link.zhihu.com/?target=https%3A//github.com/ant-design/babel-plugin-import)
- 单页面应用的按需加载: 通过 **import(\*)** 语句来控制加载时机, 会将 import(*)中引入的模块作为一个新的入口在生成一个chunk

## 如何提高构建速度

1. 多入口情况下, 使用 **CommonsChunkPlugin** 来提取公共代码
2. 通过 **externals** 配置来提取常用库
3. 利用 **DllPlugin** 和 **DllReferencePlugin** 预编译资源模块, 通过 **DllPlugin** 来对那些我们引用但是绝对不会修改的 npm 包来进行预编译, 再通过 **DllReferencePlugin** 将预编译的模块加载进来
4. 使用 Happypack 实现多线程加速编译
5. 使用 **webpack-uglify-parallel** 来提升 **uglifyPlugin** 的压缩速度, 原理上 **webpack-uglify-parallel** 采用了多核并行压缩来提升压缩速度
6. 使用 **Tree-shaking(最好别说)** 和 **Scope Hoisting** 来剔除多余代码


## Webpack 的构建流程是什么? 从读取配置到输出文件这个过程尽量说全

Webpack 的运行流程是一个串行的过程: 
1. **初始化参数:** 从配置文件和 Shell 语句中读取与合并参数, 得出最终的参数
2. **开始编译:** 用上一步得到的参数初始化 Compiler 对象, 加载所有配置的插件, 执行对象的 run 方法开始执行编译
3. **确定入口:** 根据配置中的 entry 找出所有的入口文件
4. **编译模块:** 从入口文件出发, 调用所有配置的 Loader 对模块进行翻译, 再找出依赖该模块的模块, 循环往复知道所有模块都处理完
5. **完成模块编译:** 第四部完成后得到每个模块之间的依赖关系, 和翻译后的内容
6. **输出资源:** 根据入口和模块的依赖关系, 组装成一个个包含多个模块的 Chunk, 再把每个 Chunk 转换为一个单独的文件加入都输出列表
7. **输出完成:** 确定好输出内容后, 根据配置确定输出的路径和文件名, 把文件内容写入文件系统

## 是否写过 Loader 和 Plugin? 描述一下编写 loader 或 plugin 的思路?

Loader 就相当于把浏览器不认识的文件翻译成新的可以认识的文件内容

每个 Loader 制作一种转义工作, 每个 Loader 拿到源文件内容, 可以通过返回值得方式将处理后的内返回给 Webpack, 可以调用 **this.callback()**
还可以通过 this.async() 生成一个 **callback** 函数

此外 Webpack 还为开发者准备了开发 loader 的工具函数集 --> **loader-utils**

相对于Loader而言, Plugin的编写就灵活了许多,  webpack在运行的生命周期中会广播出许多事件, Plugin 可以监听这些事件, 在合适的时机通过 Webpack 提供的 API 改变输出结果


## 如何利用 Webpack 来优化前端性能? (提高性能和体验)

用webpack优化前端性能是指优化webpack的输出结果, 让打包的最终结果在浏览器运行快速高效

- **压缩代码:** 利用 UglifyJsPlugin 和 ParallelUglifyPlugin 压缩 JS, 用 cssnano 压缩 CSS
- **利用 CDN 加速:** 将引用资源路径改为 CDN 上对应的路径, 利用 output 参数和各 loader 的 publicPath 参数来修改资源路径
- **删除死代码:** 可以通过在启动webpack时追加参数--optimize-minimize来实现
- **提取公共代码**

