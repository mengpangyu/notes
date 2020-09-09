# Html 技巧

## 答题技巧

1. 遇到比较抽象的题目具体化, 遇到具体的问题抽象化
2. 抽象题目搜知乎, 代码题目搜 StackOverflow 或 博客
3. [xxx]的原理, 直接看别人的博客

## 你是如何理解 HTML 语义化?

写的HTML结构，是用相对应的有一定语义的英文字母（标签）表示的，标记的，因为HTML本身就是标记语言

举例法: 
平时写的代码都是语义化
标题写 h1 ~ h6, 文章写 article, 画板用 canvas, 头部写 header, 底部写 footer, 导航 nav, 章节 setion

HTML 语义化好处: 
1. 没有 css 情况下, 页面也可以显示很好的内容结构
2. 增加用户体验
3. 有利于 SEO
4. 方便其他谁卓解析
5. 便于团队维护开发, 增加可读性, 减少差异化

HTML 开发阶段:
1. 荒野阶段: 后台开发写 HTML, table 布局结构
2. 美工阶段: DIV + CSS 不够语义化
3. 前端阶段: 正确的语义化标签, 专业

## meta viewport 是做什么用的, 怎么写?

meta 标签主要用于描述页面的一些信息, 它是 HTML 的元数据

meta 标签提供三个参数, name http-equiv content scheme(H5不支持) charset(H5新增, 设置编码格式)
>content 是对另外两个参数的描述

- viewport 是 meta 标签的 name 属性中可选值中的一个，指 web 页面上用户可见的区域，用于移动端页面设计
- viewport meta 标签是最早由 Apple 的 Safari IOS 中引入的, 为解决 PC 端在移动端显示过于难看的问题
- width 视口的宽度 device-width
- initial-scale 初始化缩放比例 1.0 不进行缩放
- maximum-scale 用户最大缩放比例, 1.0 不允许用户缩放
- user-scalable 是否允许用户进行缩放, no 不允许用户缩放
- height 视口的高度, 用的很少

我一般写这个标签会抄淘宝的 meta viewport

## 你用过哪些 HTML 5 标签?

标签型: header footer article section p h1~h6 nav aside  
功能型: video audio canvas figure

功能型的标签会继续深入:
 
- canvas
```js
let c=document.getElementById("myCanvas");
let ctx=c.getContext("2d");
ctx.fillStyle="#FF0000";
ctx.fillRect(0,0,150,75); // x 距离 y 距离 宽 高
```
- audio
    - controls 控制音频
    - src 路径

- video
    - controls 用户可以控制视频
    - src 路径
    - autoplay 自动播放
    - poster 视频封面 

- figure
    - 使用 figure 标记文档中一个图像
    - figcaption 来定义标题

## H5 是什么?

- 就是 HTML5 页面, 是用 HTML5 的新标签加 CSS 加 JS 去制作的一个很好看的页面
- 只不过前几年在手机端大量出现好看的宣传页面, 这是用 遵从 HTML5 做的, 所以人们一直叫 H5 页面
- 这样是错误的, H5 本身就不存在, 应该叫做 Html5 页面 

## Doctype 作用? 严格模式与混杂模式如何区分? 他们有何意义?

Doctype 声明于文档最前面, 告诉浏览器以何种方式来渲染页面

严格模式的排版和 JS 运作模式一样, 以最严格的标准运行

混杂模式, 向后兼容, 模拟老式浏览器, 防止浏览器无法兼容页面

## iframe 标签特性

1、创建比一般的 DOM 元素慢了 1-2 个数量级
iframe 的创建比其它包括 scripts 和 css 的 DOM 元素的创建慢了 1-2 个数量级，使用 iframe 的页面一般不会包含太多 iframe，所以创建 DOM 节点所花费的时间不会占很大的比重。但带来一些其它的问题：onload 事件以及连接池（connection pool）

2、阻塞页面加载
及时触发 window 的 onload 事件是非常重要的。onload 事件触发使浏览器的 “忙” 指示器停止，告诉用户当前网页已经加载完毕。当 onload 事件加载延迟后，它给用户的感觉就是这个网页非常慢。

window 的 onload 事件需要在所有 iframe 加载完毕后（包含里面的元素）才会触发。在 Safari 和 Chrome 里，通过 JavaScript 动态设置 iframe 的 SRC 可以避免这种阻塞情况

3、唯一的连接池
浏览器只能开少量的连接到 web 服务器。比较老的浏览器，包含 Internet Explorer 6 & 7 和 Firefox 2，只能对一个域名（hostname）同时打开两个连接。这个数量的限制在新版本的浏览器中有所提高。Safari 3+ 和 Opera 9+ 可同时对一个域名打开 4 个连接，Chrome 1+, IE 8 以及 Firefox 3 可以同时打开 6 个

绝大部分浏览器，主页面和其中的 iframe 是共享这些连接的。这意味着 iframe 在加载资源时可能用光了所有的可用连接，从而阻塞了主页面资源的加载。如果 iframe 中的内容比主页面的内容更重要，这当然是很好的。但通常情况下，iframe 里的内容是没有主页面的内容重要的。这时 iframe 中用光了可用的连接就是不值得的了。一种解决办法是，在主页面上重要的元素加载完毕后，再动态设置 iframe 的 SRC。

4、不利于 SEO
搜索引擎的检索程序无法解读 iframe。另外，iframe 本身不是动态语言，样式和脚本都需要额外导入。综上，iframe 应谨慎使用。


