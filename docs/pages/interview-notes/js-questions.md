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

- 防抖: 接外卖, 一直来一直等, 如果五分钟没来, 那就去送

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

- 节流: 相当于游戏 CD, 等 CD 好了才能再次施放

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

await 操作符用于等待一个Promise 对象。它只能在异步函数 async function 中使用
如果一个 Promise 被传递给一个 await 操作符，await 将等待 Promise 正常处理完成并返回其处理结果

async 与 await 组合使用, 用于说明一个函数是处理异步函数

```js
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function f1() {
  var x = await resolveAfter2Seconds(10);
  console.log(x); // 10
}
f1();
```

捕获异常

```js
async function f3() {
  try {
    var z = await Promise.reject(30);
  } catch (e) {
    console.log(e); // 30
  }
}
f3();
```

## 如何实现浅拷贝

1. ES6: object.assign()

```js
let a = { name : 'hello' };
let b = Object.assign( { },a );
b.name = 'hi';
console.log(a);
```

2. 展开运算符
 
```js
let a = {name: 'hello'}
let b = {...a}
b.name = 'he'
console.log(a)
```  

3. 自己实现 for in

```js
function shallowCopy(obj){
  let newObj = {}
  for(let key in obj){
    newObj[key] = obj[key]
  }
  return newObj
}
let a = {name: 'hello'}
let b = shallowCopy(a)
console.log(b)
```
  
## 如何实现深拷贝?

- 递归
- 判断对象类型
- 检查循环引用(环)
- 需要忽略原型

1. 用 JSON 

```js
let a = {name: 'hello'}
let b = JSON.parse(JSOn.stringify(a))
console.log(b)
```

:::tip 注意
JSON 深拷贝只可以拷贝JSON对应的类型, 函数就不可以拷贝
:::

2. 自己实现 for in 加递归

- 解决数组
```js
function deepClone(target) { 
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}; 
    for (const key in target) {
      cloneTarget[key] = clone(target[key]); 
    }
    return cloneTarget; 
  } else { 
    return target; 
  }
}; 
```
- 解决循环引用, 加入 WeakMap(因为WeakMap是弱引用, 利于垃圾回收)

```js
function deepClone(target, map = new Map()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}; 
    if (map.get(target)) return map.get(target)  
    map.set(target, cloneTarget); 
    for (const key in target) { 
      cloneTarget[key] = clone(target[key], map); 
    } 
    return cloneTarget; 
  } else {
    return target;
  } 
}
```
:::tip 注意
为什么要用 WeakMap 而不用 Map 呢?

WeakMap 对象是一组键/值对的集合, 其中的键是弱引用的, 其键必须是对象, 而值可以是任意的
使用弱引用会在下一次的垃圾回收中自动回收, 不用自己做处理, 所以当 WeakMap 中的数据占用内存较多时, WeakMap 回比 Map 好用很多
:::

- 解决 for in 带来的性能优化

创建一个遍历函数 foreach, 实现 while 的一个 iteratee 的回调函数
```js
function forEach(array, iteratee) { 
  let index = -1; const length = array.length; 
  while (++index < length) { 
    iteratee(array[index], index); 
  } 
  return array; 
}
```

新的优化性能的深拷贝
```js
function clone(target, hash = new WeakMap()) { 
  if (typeof target === 'object') {
    const isArray = Array.isArray(target); 
    let cloneTarget = isArray ? [] : {}; 
    if (hash.get(target)) { return hash.get(target); }
    hash.set(target, cloneTarget); 
    const keys = isArray ? undefined : Object.keys(target); 
    forEach(keys || target, (value, key) => { 
      if (keys) { key = value; }
      cloneTarget[key] = clone(target[key], hash); 
    }); 
    return cloneTarget; 
  } else {
    return target;
  } 
}
```
当遍历数组时, 直接用 foreach 遍历
当遍历对象时, 先取出对象的 keys 然后把 keys 的 value 当 key 用, 在到对象上遍历

- 判断是否为对象加上 null 和 function 两种特殊情况

```js
function isObject(target) { 
	const type = typeof target; 
	return target !== null && 
		(type === 'object' || type === 'function');
} 
if (!isObject(target)) { 
	return target; 
} 
```

- 获取多种数据类型, ES6 出现了多种数据类型, 所以一个深拷贝里可能会有很多种数据类型, 可以用 toString 来获取他们的类型

>由于很多引用类型重写了 toString 方法, 所以得从他们的原型调用 toString 方法

```js
function getType(target) { 
  return Object.prototype.toString.call(target); 
}
```

- 研究多种引用类型的深拷贝

上述条件只说明了 Array 和 Object 的引用类型, 那么还有 Map 和 Set 两种类型没有说明
在声明克隆的引用类型时, 其实上面的声明方法是一个语法糖, 真正的声明方法是
```js
const cloneTarget  = new Object() // 这种方法不会原型丢失
```
所以我们就可以用 Constructor 来创建一个通用声明的函数

```js
function getInit(target) { 
  const Ctor = target.constructor; 
  return new Ctor(); 
}
```

接下来是四种引用类型的完整深拷贝代码

```js
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function isObject(target) {
  const type = typeof target;
  return target !== null &&
    (type === 'object' || type === 'function');
}

function forEach(array, iteratee) {
  let index = -1; const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

function clone(target, hash = new WeakMap()) {
  // 克隆原始类型
  const deepTag = [mapTag, setTag, arrayTag, objectTag]

  if (!isObject(target)) { return target; }
  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target);
  }
  // 防止循环引
  if (hash.get(target)) { return hash.get(target); }
  hash.set(target, cloneTarget); // 克隆set
  if (type === setTag) {
    target.forEach(value => { cloneTarget.add(clone(value, hash)); });
    return cloneTarget;
  }
  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => { cloneTarget.set(key, clone(value, hash)); });
    return cloneTarget;
  }
  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) { key = value; }
    cloneTarget[key] = clone(target[key], hash);
  });
  return cloneTarget;
}
```

- 克隆其他类型

```js
function cloneOtherType(target, type) {
  const Ctor = target.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return cloneReg(target);
    case symbolTag:
      return cloneSymbol(target);
    default:
      return null;
  }
}

function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}

function cloneReg(target) {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}
```

## 如何用正则实现 .trim()

```js
String.prototype.trim = function(){
  return this.replace(/^\s+|\s+$/,'')
}

function trim(string){
  return string.replace(/^\s+|\s+$/g,'')
} 
```

## 不同 class 如何实现继承? 用 class 如何实现?

- 不用 class 实现
```js
function  Animal(color) {
  this.color = color
}
Animal.prototype.move = function(){}
function Dog(color, name){
  Animal.call(this, color)
  this.name = name
}
function temp() {}
temp.prototype = Animal.prototype
Dog.prototype = new temp() // 这样做的目的是, 不让 Animal 的属性放在 __proto__ 中

Dog.prototype.constructor = Dog
Dog.prototype.say = function(){console.log('汪')}

let dog = new Dog('黄色', '阿黄')
```

- 用 class 实现

```js
class Animal{
 constructor(color){
     this.color = color
 }
 move(){}
}
class Dog extends Animal{
 constructor(color, name){
     super(color)
     this.name = name
 }
 say(){}
}
```

## 如何实现数组去重?

- 计数排序变形

```js

```

- 使用 Set

```js
new Set([1,1,2,2,3,3,4,5])
```

- 使用 WeakMap

```js

```

## 看到可以放弃的题目

- `1 == ''` 放弃: 我从来不用三个等于,一直用两个等于

## 手写一个 Promise(高级前端)




