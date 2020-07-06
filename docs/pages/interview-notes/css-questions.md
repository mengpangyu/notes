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

```css
.clearfix:after{
  content:'';
  display: block;
  clear: both;
}
```
- 把 .clearfix 加到父容器上, 里面的子元素的浮动就会清除 
