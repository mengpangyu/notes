# 精华技巧(必知必会)

:::tip 答题思路
是什么, 怎么做, 解决了什么问题, 优缺点, 怎样解决缺点
:::

## HTML

### 你是如何理解 HTML 语义化?

1. 是什么: 语义化标签是一种写 HTML 标签的方法论/方式
2. 怎么做: 实现方法是遇到标题就使用 h1 到 h6, 遇到段落就用 p, 遇到文章就用 article, 主要内容使用 main, 边栏用 aside, 导航用 nav
3. 解决了什么问题: 明确了 html 的书写规范
4. 优点是:
   1. 利于 SEO
   2. 适合人类阅读, 利于团队维护
5. 缺点: 没有
6. 怎么解决缺点: 无需解决

### HTML5 有哪些新标签

不要提不熟悉的标签, 可能会成为下一个题目

- 文章相关: header main footer nav section article figure mark
- 多媒体相关: video audio svg canvas
- 表单相关: type=email type=tel

### Canvas 和 SVG 的区别是什么

看博客再进一步优化和总结, 写一篇博客

1. Canvas 主要是用笔刷来绘制 2D 图形的
2. SVG 主要是用标签来绘制不规则矢量图的
3. 相同点
   1. 都是主要用来画 2D 图形的
4. 不同点
   1. Canvas 画的是位图, SVG 画的是矢量图
   2. SVG 节点过多时渲染较慢, Canvas 性能较好, 但写起来复杂
   3. SVG 支持分层和事件, Canvas 不支持, 但可以使用库实现

## CSS

### BFC 是什么

1. 是什么: 块级格式化上下文
2. 怎么做:
   1. html 根元素
   2. float 不为 none
   3. overflow 值不为 visible
   4. 绝对定位: position 为 absolute 和 fixed
   5. display: inline-block 和 flex 等
3. 解决了什么问题:
   1. 清除浮动
   2. 防止 margin 合并
   3. 防止浮动引起的高度塌陷
4. 优点: 就是第三点
5. 缺点: 有副作用
6. 怎样解决缺点: display: flow-root 会形成一个无副作用的 BFC 元素

:::tip 注意
使用 overflow, position, float 都有副作用, 都会改变元素的布局状态
:::

### 如何实现垂直居中

1. table 自带垂直居中

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>JS Bin</title>
    <style>
      .parent {
        border: 1px solid red;
        height: 600px;
      }

      .child {
        border: 1px solid green;
      }
    </style>
  </head>
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
    <meta charset="utf-8" />
    <title>JS Bin</title>
  </head>
  <style>
    .parent {
      border: 3px solid green;
      height: 600px;
      text-align: center;
    }

    .child {
      border: 3px solid black;
      display: inline-block;
      width: 300px;
      vertical-align: middle;
    }

    .parent:before {
      outline: 3px solid red;
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
    .parent:after {
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
    <meta charset="utf-8" />
    <title>JS Bin</title>
  </head>
  <style>
    div.table {
      display: table;
      border: 1px solid red;
      height: 600px;
    }
    div.td {
      display: table-cell;
      border: 1px solid blue;
      vertical-align: middle;
    }
    .child {
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
    <meta charset="utf-8" />
    <title>JS Bin</title>
  </head>
  <style>
    .parent {
      height: 600px;
      border: 1px solid red;
      position: relative;
    }
    .child {
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
    <meta charset="utf-8" />
    <title>JS Bin</title>
  </head>
  <style>
    .parent {
      height: 600px;
      border: 1px solid red;
      position: relative;
    }
    .child {
      border: 1px solid green;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
    <meta charset="utf-8" />
    <title>JS Bin</title>
  </head>
  <style>
    .parent {
      height: 600px;
      border: 1px solid red;
      position: relative;
    }
    .child {
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
    <meta charset="utf-8" />
    <title>JS Bin</title>
  </head>
  <style>
    .parent {
      height: 600px;
      border: 3px solid red;

      display: flex;
      justify-content: center;
      align-items: center;
    }
    .child {
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

### 选择器优先级如何确定

- 选择器越具体, 优先级越高
- 相同优先级, 出现在后面的, 覆盖前面的
- 属性后面加 !important 优先级最高, 但要少用, 使用多了, 就不是 important 了

### 如何清除浮动

- 法一: clear 属性的空元素, 在元素最后加一个空 div, 加上样式, clear: both: 属性指定一个元素是否必须移动(清除浮动后)到在它之前的浮动元素下面, 在最底层加一个空的有高度的 div, 利用 clear: both 实现浮动
- 法二: 浮动元素加 overflow: hidden 属性, 会形成 BFC
- 法三: 浮动元素的容器添加浮动
- 法四: 伪元素添加到父容器上, .clearfix 子元素会自动清除浮动, 伪类元素也是和法一同理

```css
.clearfix:after {
  content: ""; /* 伪类元素内容为空 */
  height: 0;
  display: block; /* 因为block元素才能有高度 */
  clear: both;
}
```

### 两种盒模型(box-sizing)的区别

- content-box: width 指定的是 content 区域宽度, 而不是实际宽度

> 实际宽度 = width + padding + border

- border-box: width 指定左右边框外侧的距离

> 实际宽度 = width

相同点: 都是指定宽度, 不同点: border-box 更好用

## JS

### 数据类型有哪些(8 种)

Number, String, Null, Undefined, Object, Boolean, Bigint, Symbol

> 拓展延伸: 为什么要有 Bigint

答: JS 数字默认使用 64 位双精度浮点来存储数据, 数据范围在 -(2^53-1) ~ (2^53-1) 之间, 超出这个范围会自动四舍五入导致数据不准确

### 原型链是什么

:::tip 答题思路
大概念转换为小概念, 抽象化成具体举例
:::

- 先介绍下原型是什么

> 使用`__xxx__`表示不容易晕

假设有一个普通对象 `a={}`, 这个 a 会有一个隐藏属性, 叫做 `__xxx__`, 这个属性会指向 Object.prototype 属性, a 就知道自己的原型是谁了

```js
const a = {};
a.__xxx__ === Object.prototype; // 原型
```

此时, 我们说 a 的原型是 Object.prototype, 或者说 Object.prototype 为 a 的原型

而这个 `__xxx__` 属性的唯一作用就是用来指向 a 的原型的

如果没有 `__xxx__` 属性, a 就不知道自己的原型是谁了

- 再介绍下原型链

假设有一个数组对象 `a=[]`, 这个 a 也有一个隐藏属性, 叫做 **xxx**, 这个属性会指向 Array.prototype

```js
const a = [];
a.__xxx__ === Array.prototype;
```

此时, 可以说 a 的原型是 Array.prototype, 然而与上面不同的是, Array.prototype 也有一个隐藏属性`__xxx__`, 指向 Object.prototype

```js
Array.prototype.__xxx__ === Object.prototype;
```

这样一来, a 就有两层原型: a 的原型是 Array.prototype, a 的原型的原型是 Object.prototype

于是就通过隐藏属性`__xxx__`形成了一条链条

```js
a ===> Array.prototype ===> Object.prototype
```

- 怎么做(原型链改写)

看起来只要改写 a 的隐藏属性`__xxx__`就可以改变 a 的原型, 但这不是推荐的写法, 推荐的写法是

```js
const a = Object.create(原型);
// 或
const a = new 构造函数();
```

- 解决了什么问题

1. 可以实现继承, a 是 Array 的实例, a 拥有 Array.prototype 里的属性
2. Array 继承了 Object
3. a 是 Object 的间接实例, a 拥有 Object.prototype 里的属性

- 优点: 简单, 优雅
- 缺点: 跟 class 相比, 不支持私有属性
- 怎么解决缺点: 使用 class(ES6 才有)

### this 是什么

> 使用 fn.call 第一个参数来判断 this(唯一原则)

this 是 call() 的第一个参数, 没有 call 调用是语法糖

```js
function f1() {
  console.log("this", this);
}

f1() === f1.call(undefined);
```

### JS 的 new 做了什么？

1. 创建临时对象
2. 绑定原型
3. 指定 this = 临时对象
4. 执行构造函数
5. 返回临时对象

```js
function MyNew(Con, ...args) {
  const obj = create(Con);
  const result = Con.apply(obj, args);
  return result instanceof Object ? result : obj;
}
```

### 什么是立即执行函数

- 是什么: 声明一个匿名函数, 然后立即执行它, 这种做法就是立即执行函数
- 怎么做:

```js
(function() {
  console.log("匿名执行");
})();
```

- 解决了什么问题: 创建局部作用域
- 优点: 兼容性好
- 缺点: 代码丑, 逻辑不清晰
- 怎样解决缺点: 使用 ES6 的 block+let 语法

```js
{
  let a = "局部变量";
  console.log(a);
}
console.log(a); // 找不到
```

### JS 的闭包是什么? 怎么用?

- 是什么: 是 JS 的一种语法特性, 闭包=函数+自由变量, 「函数」和「函数内部能访问到的变量」的总和，就是一个闭包。
- 怎么做:

```js
const add2 = (function() {
  var count = 1;
  return function add() {
    // 访问了外部变量的函数
    count += 1;
  };
})();
```

以上代码是一个完整的闭包应用

:::tip 注意

1. 闭包不是 count, 闭包也不是 add, 闭包是 count+add 组成的整体
2. 闭包!=闭包的应用, 面试官问[闭包]的时候, 要回答[闭包的应用]

:::

- 解决了什么问题:
  - 使用局部变量, 避免污染全局环境
  - 提供对局部变量的间接访问, 不能修改局部变量
  - 维持变量, 使其不被垃圾回收
- 优点: 简单, 好用
- 缺点: 使用不当可能导致内存泄露
- 怎样解决缺点: 慎用少用闭包

正是由于 JS 的函数内部可以使用函数外部的变量，所以这段代码正好符合了闭包的定义。而不是 JS 故意要使用闭包。

必会链接: [https://zhuanlan.zhihu.com/p/22486908](https://zhuanlan.zhihu.com/p/22486908)
