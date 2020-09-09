# CSS 技巧 

## 两种盒模型说一下?
每个 HTML 元素都可以看做一个盒子, 盒模型是在设计和布局时使用

盒模型由四部分: margin border padding content

盒模型有两种: 
1. content-box

设置的宽高都是对于 content 的


2. border-box

设置的宽高都是对于 content + padding + border

**深入问题:** 外边距重叠

>如果父元素的 margin-top 或 margin-bottom 没有其中对应的部分而子元素设置了 margin-top 或 margin-bottom 就会出现外边距重叠

**解决方案:** 在父元素加点内容就好了

## 如何实现垂直居中?

>七种方式实现垂直居中

1. table 自带垂直居中

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<style>
.parent{
  border: 1px solid red;
  height: 600px;
}

.child{
  border: 1px solid green;
}
</style>
<body>
  <table class="parent">
    <tr>
      <td class="child">
      一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字
      </td>
    </tr>
  </table>
</body>
</html>
```

2. 100% 高度的 after before 加上 inline-block 

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<style>
.parent{
  border: 3px solid green;
  height: 600px;
  text-align: center;
}

.child{
  border: 3px solid black;
  display: inline-block;
  width: 300px;
  vertical-align: middle;
}

.parent:before{
  outline: 3px solid red;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.parent:after{
  outline: 3px solid red;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
</style>
<body>
  <div class="parent">
	<div class="child">  
    一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字
    </div>
  </div>
</body>
</html>
```
3. div 转换为 table

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<style>
div.table{
  display: table;
  border: 1px solid red;
  height: 600px;
}

div.tr{
  display: table-row;
  border: 1px solid green;
}

div.td{
  display: table-cell;
  border: 1px solid blue;
  vertical-align: middle;
}
.child{
  border: 10px solid black;
}
</style>
<body>
  <div class="table">
      <div class="td">
        <div class="child">
          一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字
        </div>
    </div>
  </div>
</body>
</html>
```

4. 用绝对定位

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<style>
.parent{
  height: 600px;
  border: 1px solid red;
  position: relative;
}
.child{
  border: 1px solid green;
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  height: 100px;
  margin-top: -50px;
}
</style>
<body>
  <div class="parent">
    <div class="child">
      一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字
    </div>
  </div>
</body>
</html>
``` 

5. translate: -50%

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<style>
.parent{
  height: 600px;
  border: 1px solid red;
  position: relative;
}
.child{
  border: 1px solid green;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>
<body>
  <div class="parent">
    <div class="child">
      一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字
    </div>
  </div>
</body>
</html>
```
6. margin auto;

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<style>
.parent{
  height: 600px;
  border: 1px solid red;
  position: relative;
}
.child{
  border: 1px solid green;
  position: absolute;
  width: 300px;
  height: 200px;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
<body>
  <div class="parent">
    <div class="child">
      一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字
    </div>
  </div>
</body>
</html>
```

7. flex

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<style>
.parent{
  height: 600px;
  border: 3px solid red;
  
  display: flex;
  justify-content: center;
  align-items: center;
}
.child{
  border: 3px solid green;
  width: 300px;
}
</style>
<body>
  <div class="parent">
    <div class="child">
      一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字一串文字
    </div>
    
  </div>
</body>
</html>
```

**深入问题:** 为什么 CSS 水平居中容易实现, 二垂直居中不容易实现

**解决方案:** CSS 回溯机制

## flex 怎么用? 常用属性有哪些?

- 在要 flex 的父元素上用
- 常用属性
    - flex-direction 主轴方向
    - flex-wrap 是否换行
    - justify-content 项目在主轴的对齐方式
    - align-content 项目在交叉轴的对齐方式
    
    
## BFC 是什么?

- 块级格式化上下文, 普通流, 就是一个封闭的盒子, 里面的元素无论怎么动就不会影响外面的元素

触发BFC:
1. body 根元素
2. 浮动元素: float 除 none
3. 绝对定位: position: absolute/fixed
4. display: inline-block table-cells flex
5. overflow 除了 visible 以外的值 

BFC 特性及应用
1. 同一个 BFC 下外边距会发生折叠
2. BFC 可以包含浮动的元素(清除浮动)
3. BFC 可以阻止元素被浮动元素覆盖
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<style>
.div1{
	width: 100px;
	height: 100px;
	background: red;
	float: left;
}
.div2{
	width: 200px;
	height: 200px;
	background: green;
	overflow: hidden; /*形成了 BFC*/
}
</style>
<body>
<div class="div1"></div>
<div class="div2"></div>
</body>
</html>
```

## CSS 选择器优先级?

1. 越具体优先级越高
2. 写在后面覆盖写在前面的
3. important! 最高, 少用

## 清除浮动说一下?

- 法一: clear 属性的空元素, 在元素最后加一个空 div
- 法二: 浮动元素加 overflow 属性
- 法三: 浮动元素的容器添加浮动
- 法四: 伪元素 .clearfix 添加到父容器上, 子元素会自动清除浮动

```css
.clearfix:after{
  content:'';
  display: block;
  clear: both;
}
```

## link 标签和 import 标签的区别

- link 属于 html 标签, 而 @import 是 css 提供的
- 页面被加载时, link 同时会被加载, 而 @import 引用的 css 是等到页面加载结束后加载
- link 没有兼容性, @import 在 ie5+ 才能识别
- link 方式优先 @import

## transition 和 animation 的区别

大部分属性都是相同的, 主要区别是 transition 需要触发一个事件才能改变属性, 而 animation 不需要触发任何事件的情况下
才会随时间改变属性值, 并且 transition 为 2 帧, 而 animation 是 1 帧

## 关于 JS 动画和 CSS 动画的差异

渲染线程为 main thread 和 compositer thread, 如果 css 动画只改变, transform 和 opacity, 这是整个 css 动画得以在 
compositer thread 完成, 而动画会在 main thread 完成, 然后再 compositer thread 进行操作

- 功能涵盖方面, JS 比 CSS 大
- 实现难度不一, CSS 比 JS 容易
- CSS 动画有天然事件支持
- CSS3 有兼容性问题

## 重绘和重排

DOM 的变化影响到了宽高, 浏览器重新计算元素的几何属性, 其他元素的几何属性也会受到影响, 浏览器需要重构渲染, 过程为重排

浏览器将受到影响的部分重新绘制在屏幕上的过程称为重绘

>引起重绘和重排的原因有

- 添加或者删除可见的 DOM 元素
- 元素尺寸位置的变化
- 浏览器页面初始化
- 浏览器窗口大小发生改变, 重排一定导致重绘, 重绘不一定导致重排

>减少重绘重排的方法有

- 不在布局信息改变时做 DOM 查询
- 使用 csstext, className 一次性改变属性
- 使用 fragment
- 对于多次重排的元素, 比如说使用动画, 使用决定定位, 使其不受其他元素影响

## src 和 href 的区别

src 用于替代这个元素, href 用于建立这个标签与外部资源的联系

当解析 href 这个属性指定 web 资源时, html 的解析和渲染不会停下, css 文件的加载时同时进行的

当解析 src 时浏览器会停下去等 src 解析完再去解析下面的代码, 这就是为什么要将 js 的文件加载放在 body 最后的原因

## display:none, opacity: 0, visibility: hidden 的优劣和适用场景

1. display: none (不占空间, 不能点击)(场景, 显示出原来这里不存在的结构)
2. visibility: hidden (占据空间, 不能点击)(场景, 显示不会导致页面结构发生变动, 不会撑开)
3. opacity: 0 (占据空间, 可以点击)(场景, 可以根据 transition 搭配)

## css 可继承属性

- 所有元素可继承

> visibility cursor

- 内联元素可继承

> letter-spacing word-spacing white-space line-height color font font-family font-szie font-style font-variant font-weight
>text-decoration text-transform direction

- 块级元素可继承

> text-indent text-align

- 列表元素可继承

> list-style list-style-type list-style-position list-style-image

