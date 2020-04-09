# JavaScript 面试题

## ES 6 语法知道哪些?

举例法
- let
- const 
- 箭头函数
- Promise
- 展开操作符
- 参数可设默认值
- import export
- 等等

## Promise、Promise.all、Promise.race 分别怎么用?

- Promise用法

```js
function fn(){
 return new Promise((resolve, reject)=>{
     resolve(success) //成功时调用 
     reject(error) //失败时调用 
 })
}
fn().then(success, fail).then(success2, fail2)
```

- Promise.all用法

```js
Promise.all([promise1, promise2]).then(success1, fail1)
```
promise1和promise2都成功才会调用success1

- Promise.race用法

```js
Promise.race([promise1, promise2]).then(success1, fail1)
```
promise1和promise2只有一个成功就会调用success1


## 手写函数防抖和函数节流

- 防抖

```js
 // 节流（一段时间执行一次之后，就不执行第二次）
function throttle(fn, delay){
 let canUse = true
 return function(){
     if(canUse){
         fn.apply(this, arguments)
         canUse = false
         setTimeout(()=>canUse = true, delay)
     }
 }
}
const throttled = throttle(()=>console.log('hi'))
throttled() //hi
throttled() //在canUse变为true之前只能调用一次throttled函数
```
:::tip
有些地方认为节流函数不是立刻执行的，而是在冷却时间末尾执行的（相当于施法有吟唱时间），那样说也是对的。
:::

- 节流 

```js
// 防抖（一段时间会等，然后带着一起做了）
function debounce(fn, delay){
 let timerId = null
 return function(){
     const context = this
     if(timerId){window.clearTimeout(timerId)}
     timerId = setTimeout(()=>{
         fn.apply(context, arguments)
         timerId = null
     },delay)
 }
}
const debounced = debounce(()=>console.log('hi'))
debounced()
debounced()
```

## 手写 AJAX

- 完整版

```js
const request = new XMLHttpRequest()
request.open('GET', '/a/b/c?name=ff', true);
request.onreadystatechange = function () {
if(request.readyState === 4 && request.status === 200) {
 console.log(request.responseText);
}};
request.send();
```

- 简化版


```js
const request = new XMLHttpRequest()
request.open('GET', '/a/b/c?name=ff', true)
request.onload = ()=> console.log(request.responseText)
request.send()
```

## 这段代码的 this 是什么?

```js
fn()
//this => window/global
obj.fn()
//this => obj
fn.call(xx)
//this => xx
fn.apply(xx)
//this => xx
fn.bind(xx)
//this => xx
new Fn()
//this => 新的对象
fn = ()=> {}
//this => 外面的 this
```

## 闭包/立即执行函数是什么?

- 闭包

函数和函数内部能访问到的变量的总和，就是一个闭包

函数嵌套的时候往往会产生闭包

jQuery的设计思想就是把$出的元素一直用闭包的功能返回下去,这样就实现了链式调用

```js
function f1(){
  let local = 0
  function f2(){
    local++
    return local  
  }
}
```

- 立即执行函数

顾名思义就是立马执行的函数

在ES5的时候只有var声明变量,然而众所周知var声明会提升,当我们有了声明一个局部变量的需求时

避免变量污染,我们就可以用立即执行函数来声明

>举个著名的面试题

```js
var liList = ul.getElementsByTagName('li')
for(var i=0; i<6; i++){
  liList[i].onclick = function(){
    alert(i) //总是6
  }
}
```

>下面用立即执行函数解决这个问题

```js
var liList = ul.getElementsByTagName('li')
for(var i=0; i<6; i++){
  !function(ii){
    liList[ii].onclick = function(){
      alert(ii) // 0、1、2、3、4、5
    }
  }(i)
}
```

## 什么是 JSONP ,什么是 CORS, 什么是跨域?

- 跨域

在ajax访问数据时,不能访问与自己不同源的域名,这是浏览器为了信息安全考虑
跨域就是可以成功访问到其他不同源的域名去拿取自己需要的数据

>同域是指:
1. 同协议: http 或 https
2. 同域名: 一级域名相同
3. 同端口: 端口相同

- JSONP

HTML中script标签可以加载其他不同源网站的内容,所以可以用script来请求后端发来的数据
但是必须在请求的时候在前端声明一个函数,在后端接收到这个函数后,对函数进行包裹

|优点|缺点|
|---|---|
|兼容IE的跨域方法|由于script标签,不能像ajax那样有精确状态|
|可以实现跨域| 不知道状态码,响应头是什么|
||jsonp不支持post方式的请求|


- CORS(跨域资源共享)

Access-Control-Allow-Origin: 允许跨域访问的网站


## async/await 怎么用,如何捕获异常?




## 如何实现深拷贝?
