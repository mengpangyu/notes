# JavaScript 技巧

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

- Promise 用法

```js
function fn() {
  return new Promise((resolve, reject) => {
    resolve(success) //成功时调用
    reject(error) //失败时调用
  })
}
fn()
  .then(success, fail)
  .then(success2, fail2)
```

- Promise.all 用法

```js
Promise.all([promise1, promise2]).then(success1, fail1)
```

promise1 和 promise2 都成功才会调用 success1

> 实现 Promise.all

```js
const all = (promiseArr) => {
  return new Promise((resolve, reject) => {
    let result = []
    let completed = 0
    promiseArr.forEach((promise, index) => {
      promise
        .then((data) => {
          result[index] = data
          completed += 1
          if (completed === promiseArr.length) {
            resolve(result)
          }
        })
        .catch((err) => reject(err))
    })
  })
}
```

- Promise.race 用法

```js
Promise.race([promise1, promise2]).then(success1, fail1)
```

promise1 和 promise2 只有一个成功就会调用 success1

> 实现 Promise.race

```js
function race(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => promise.then(resolve, reject))
  })
}
```

## 手写函数防抖和函数节流

- 防抖: 接外卖, 一直来一直等, 如果五分钟没来, 那就去送

```js
const 接外卖 = (fn, delay) => {
  let timer
  return (...args) => {
    if (timer) clearTimeout(timer)
    console.log('接单')
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

const 送外卖 = () => {
  console.log('没单了，可以送了')
}

const 我是接外卖返回的函数 = 接外卖(送外卖, 5000)

div.onclick = () => {
  我是接外卖返回的函数()
}
```

:::tip
有些地方认为节流函数不是立刻执行的，而是在冷却时间末尾执行的（相当于施法有吟唱时间），那样说也是对的。
:::

- 节流: 相当于游戏 CD, 等 CD 好了才能再次施放

```js
const 技能CD = (fn, delay) => {
  let timer = true
  return (...args) => {
    if (!timer) return console.log('CD还没好')
    timer = false
    setTimeout(() => {
      timer = true
      fn.apply(this, args)
    }, delay)
  }
}

const 放技能 = () => {
  console.log('技能可以放了')
}

const 我是技能CD返回的函数 = 技能CD(放技能, 5000)

div.onclick = () => {
  我是技能CD返回的函数()
}
```

## 手写 AJAX

- 大佬版

```js
function ajax(options) {
  return new Promise((resolve, reject) => {
    let method = options.method || 'GET'
    let params = options.params
    let data = options.data
    let url =
      options.url +
      (params
        ? `?${Object.keys(params)
            .map((key) => key + '=' + params[key])
            .join('&')}`
        : '')
    let async = options.async === false ? false : true
    let success = options.success
    let fail = options.fail
    let headers = options.headers
    let xhr
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        success && success(xhr.responseText)
        resolve(xhr.responseText)
      }
    }
    xhr.onerror = (err) => {
      fail && fail(err)
      reject(err)
    }
    xhr.open(method, url, async)
    if (headers) {
      Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]))
    }
    method === 'GET' ? xhr.send() : xhr.send(data)
  })
}
```

- 完整版

```js
const request = new XMLHttpRequest()
request.open('GET', '/a/b/c?name=ff', true)
request.onreadystatechange = function() {
  if (request.readyState === 4 && request.status === 200) {
    console.log(request.responseText)
  }
}
request.send()
```

- 简化版

```js
const request = new XMLHttpRequest()
request.open('GET', '/a/b/c?name=ff', true)
request.onload = () => console.log(request.responseText)
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
fn = () => {}
//this => 外面的 this
```

## 闭包/立即执行函数是什么?

- 闭包

函数和函数内部能访问到的变量的总和，就是一个闭包

函数嵌套的时候往往会产生闭包

jQuery 的设计思想就是把\$出的元素一直用闭包的功能返回下去,这样就实现了链式调用

```js
function f1() {
  let local = 0
  function f2() {
    local++
    return local
  }
}
```

:::warning 面试
优点:

- 可以不被垃圾回收
- 一般不会导致命名冲突
- 可以一直维护一个变量, 让他做一些事情

缺点:

- 闭包变量不会消失的话内存消耗会很大
- 会涉及到跨作用域访问, 每次会导致性能上损耗

:::

- 立即执行函数

顾名思义就是立马执行的函数

在 ES5 的时候只有 var 声明变量,然而众所周知 var 声明会提升,当我们有了声明一个局部变量的需求时

避免变量污染,我们就可以用立即执行函数来声明

> 举个著名的面试题

```js
var liList = ul.getElementsByTagName('li')
for (var i = 0; i < 6; i++) {
  liList[i].onclick = function() {
    alert(i) //总是6
  }
}
```

> 下面用立即执行函数解决这个问题

```js
var liList = ul.getElementsByTagName('li')
for (var i = 0; i < 6; i++) {
  !(function(ii) {
    liList[ii].onclick = function() {
      alert(ii) // 0、1、2、3、4、5
    }
  })(i)
}
```

## 什么是 JSONP ,什么是 CORS, 什么是跨域?

- 跨域

在 ajax 访问数据时,不能访问与自己不同源的域名,这是浏览器为了信息安全考虑
跨域就是可以成功访问到其他不同源的域名去拿取自己需要的数据

> 同域是指:

1. 同协议: http 或 https
2. 同域名: 一级域名相同
3. 同端口: 端口相同

- JSONP

HTML 中 script 标签可以加载其他不同源网站的内容,所以可以用 script 来请求后端发来的数据
但是必须在请求的时候在前端声明一个函数,在后端接收到这个函数后,对函数进行包裹

| 优点               | 缺点                                        |
| ------------------ | ------------------------------------------- |
| 兼容 IE 的跨域方法 | 由于 script 标签,不能像 ajax 那样有精确状态 |
| 可以实现跨域       | 不知道状态码,响应头是什么                   |
|                    | jsonp 不支持 post 方式的请求                |

- CORS(跨域资源共享)

Access-Control-Allow-Origin: 允许跨域访问的网站

## async/await 怎么用,如何捕获异常?

await 操作符用于等待一个 Promise 对象。它只能在异步函数 async function 中使用
如果一个 Promise 被传递给一个 await 操作符，await 将等待 Promise 正常处理完成并返回其处理结果

async 与 await 组合使用, 用于说明一个函数是处理异步函数

```js
function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x)
    }, 2000)
  })
}

async function f1() {
  var x = await resolveAfter2Seconds(10)
  console.log(x) // 10
}
f1()
```

捕获异常

```js
async function f3() {
  try {
    var z = await Promise.reject(30)
  } catch (e) {
    console.log(e) // 30
  }
}
f3()
```

## 如何实现浅拷贝

1. ES6: object.assign()

```js
let a = { name: 'hello' }
let b = Object.assign({}, a)
b.name = 'hi'
console.log(a)
```

2. 展开运算符

```js
let a = { name: 'hello' }
let b = { ...a }
b.name = 'he'
console.log(a)
```

3. 自己实现 for in

```js
function shallowCopy(obj) {
  let newObj = {}
  for (let key in obj) {
    newObj[key] = obj[key]
  }
  return newObj
}
let a = { name: 'hello' }
let b = shallowCopy(a)
console.log(b)
```

concat() slice() 方法也可实现数组浅拷贝

## 如何实现深拷贝?

- 递归
- 判断对象类型
- 检查循环引用(环)
- 需要忽略原型

1. 用 JSON

```js
let a = { name: 'hello' }
let b = JSON.parse(JSOn.stringify(a))
console.log(b)
```

:::tip 注意
JSON 深拷贝只可以拷贝 JSON 对应的类型, 函数就不可以拷贝
:::

2. 自己实现 for in 加递归

- 解决数组

```js
function deepClone(target) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
}
```

- 解决循环引用, 加入 WeakMap(因为 WeakMap 是弱引用, 利于垃圾回收)

```js
function deepClone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) return map.get(target)
    map.set(target, cloneTarget)
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key], map)
    }
    return cloneTarget
  } else {
    return target
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
  let index = -1
  const length = array.length
  while (++index < length) {
    iteratee(array[index], index)
  }
  return array
}
```

新的优化性能的深拷贝

```js
function clone(target, hash = new WeakMap()) {
  if (typeof target === 'object') {
    const isArray = Array.isArray(target)
    let cloneTarget = isArray ? [] : {}
    if (hash.get(target)) {
      return hash.get(target)
    }
    hash.set(target, cloneTarget)
    const keys = isArray ? undefined : Object.keys(target)
    forEach(keys || target, (value, key) => {
      if (keys) {
        key = value
      }
      cloneTarget[key] = clone(target[key], hash)
    })
    return cloneTarget
  } else {
    return target
  }
}
```

当遍历数组时, 直接用 foreach 遍历
当遍历对象时, 先取出对象的 keys 然后把 keys 的 value 当 key 用, 在到对象上遍历

- 判断是否为对象加上 null 和 function 两种特殊情况

```js
function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}
if (!isObject(target)) {
  return target
}
```

- 获取多种数据类型, ES6 出现了多种数据类型, 所以一个深拷贝里可能会有很多种数据类型, 可以用 toString 来获取他们的类型

> 由于很多引用类型重写了 toString 方法, 所以得从他们的原型调用 toString 方法

```js
function getType(target) {
  return Object.prototype.toString.call(target)
}
```

- 研究多种引用类型的深拷贝

上述条件只说明了 Array 和 Object 的引用类型, 那么还有 Map 和 Set 两种类型没有说明
在声明克隆的引用类型时, 其实上面的声明方法是一个语法糖, 真正的声明方法是

```js
const cloneTarget = new Object() // 这种方法不会原型丢失
```

所以我们就可以用 Constructor 来创建一个通用声明的函数

```js
function getInit(target) {
  const Ctor = target.constructor
  return new Ctor()
}
```

接下来是四种引用类型的完整深拷贝代码

```js
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const numberTag = '[object Number]'
const regexpTag = '[object RegExp]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'

function getInit(target) {
  const Ctor = target.constructor
  return new Ctor()
}

function getType(target) {
  return Object.prototype.toString.call(target)
}

function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}

function forEach(array, iteratee) {
  let index = -1
  const length = array.length
  while (++index < length) {
    iteratee(array[index], index)
  }
  return array
}

function clone(target, hash = new WeakMap()) {
  // 克隆原始类型
  const deepTag = [mapTag, setTag, arrayTag, objectTag]

  if (!isObject(target)) {
    return target
  }
  // 初始化
  const type = getType(target)
  let cloneTarget
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target)
  }
  // 防止循环引
  if (hash.get(target)) {
    return hash.get(target)
  }
  hash.set(target, cloneTarget) // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(clone(value, hash))
    })
    return cloneTarget
  }
  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, hash))
    })
    return cloneTarget
  }
  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target)
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value
    }
    cloneTarget[key] = clone(target[key], hash)
  })
  return cloneTarget
}
```

- 克隆其他类型

```js
function cloneOtherType(target, type) {
  const Ctor = target.constructor
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target)
    case regexpTag:
      return cloneReg(target)
    case symbolTag:
      return cloneSymbol(target)
    default:
      return null
  }
}

function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target))
}

function cloneReg(target) {
  const reFlags = /\w*$/
  const result = new target.constructor(target.source, reFlags.exec(target))
  result.lastIndex = target.lastIndex
  return result
}
```

## 如何用正则实现 .trim()

```js
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/, '')
}

function trim(string) {
  return string.replace(/^\s+|\s+$/g, '')
}
```

## 不同 class 如何实现继承? 用 class 如何实现?

- 不用 class 实现

```js
function Animal(color) {
  this.color = color
}
Animal.prototype.move = function() {}
function Dog(color, name) {
  Animal.call(this, color)
  this.name = name
}
Dog.prototype = new Animal() // 防止原型重复引用
Dog.prototype.constructor = Dog
Dog.prototype.say = function() {
  console.log('汪')
}
let dog = new Dog('黄色', '阿黄')
```

- 用 class 实现

```js
class Animal {
  constructor(color) {
    this.color = color
  }
  move() {}
}
class Dog extends Animal {
  constructor(color, name) {
    super(color)
    this.name = name
  }
  say() {}
}
```

## 如何实现数组去重?

- 使用 Set

```js
new Set([1, 1, 2, 2, 3, 3, 4, 5])
```

:::tip 注意
无法去除空对象
:::

- 使用 for 嵌套 for, 然后 splice 去重(ES5 最常用)

```js
function unique(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1)
        j-- //元素去除所以索引也要变化, j-- 为了紧跟继续遍历
      }
    }
  }
  return arr
}
```

- indexOf 去重

```js
function unique(arr) {
  if (!Array.isArray(arr)) {
    return console.log('type error')
  }
  let array = []
  for (let i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i])
    }
  }
  return array
}
```

- 利用 sort() 去重

```js
function unique(arr) {
  if (!Array.isArray(arr)) {
    return console.log('type error')
  }
  arr = arr.sort()
  let array = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      array.push(arr[i])
    }
  }
  return array
}
```

:::tip 注意
影响了数组顺序
:::

- 利用 includes 去重

和 indexOf 一个道理, 只不过换了一个 API

```js
function unique(arr) {
  if (!Array.isArray(arr)) {
    return console.log('type error')
  }
  let array = []
  for (let i = 0; i < arr.length; i++) {
    if (!array.includes(arr[i])) {
      array.push(arr[i])
    }
  }
  return array
}
```

- 利用 hasOwnProperty 去重

利用 hasOwnProperty 判断是否存在对象属性

```js
function unique(arr) {
  let obj = {}
  return arr.filter(function(item) {
    return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    // filter 返回的就是数组, 带上类型是防止转换
  })
}
```

- 利用 filter 去重

```js
function unique(arr) {
  return arr.filter(function(item, index, arr) {
    return arr.indexOf(item) === index
    // arr.indexOf 只会匹配第一次相同的索引, 所以可以实现去重
  })
}
```

- 利用 reduce 去重

```js
function unique(arr) {
  return arr.reduce((all, item, index, arr) => {
    if (arr.indexOf(item) === index) all.push(item)
    return all
  }, [])
}
```

- 利用递归去重

```js
function unique(arr) {
  var array = arr
  var len = array.length

  array.sort(function(a, b) {
    //排序后更加方便去重
    return a - b
  })

  function loop(index) {
    if (index >= 1) {
      if (array[index] === array[index - 1]) {
        array.splice(index, 1)
      }
      loop(index - 1) //递归loop，然后数组去重
    }
  }
  loop(len - 1)
  return array
}
```

- 利用 Map 数据结构去重

```js
function unique(arr) {
  let map = new Map()
  let array = new Array() // 数组用于返回结果
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      // 如果有该key值
      map.set(arr[i], true)
    } else {
      map.set(arr[i], false) // 如果没有该key值
      array.push(arr[i])
    }
  }
  return array
}
```

## 展平数组

- flat

```js
let arr = [1, 2, [3, 4], [5, 6, [7, 8, 9]]]
let newArr = arr.flat(Infinity)
```

- join, split

```js
// join 没有参数的话默认是保留逗号来结合数组元素
let newArr = arr
  .join()
  .split(',')
  .map(Number)
```

- toString()

```js
let newArr = arr
  .toString()
  .split(',')
  .map(Number)
```

- for 循环

```js
const flatter = (arr) => {
  const result = []
  arr.forEach((element) => {
    if (Array.isArray(element)) {
      result.push(...flatter(element))
    } else {
      result.push(element)
    }
  })
  return result
}
```

## 打乱数组

```js
Array.prototype.shuffle = function() {
  const arr = this
  let len = arr.length
  let index, temp
  while (len) {
    index = Math.floor(Math.random() * len--)
    temp = arr[index]
    arr[index] = arr[len]
    arr[len] = temp
  }
  return arr
}
```

## 判断数组

- instanceof

```js
arr instanceof Array
```

- constructor

```js
arr.constructor === Array
```

- 判断是否有数组的方法

```js
!!arr.push && !!arr.concat
```

- toString

```js
Object.prototype.toString.call(arr) === '[object Array]
```

- Array.isArray

```js
Array.isArray(arr)
```

## 看到可以放弃的题目

- `1 == ''` 放弃: 我从来不用三个等于,一直用两个等于

## 手写一个 Promise(高级前端)

- 解决 fulfill: 指一个 promise 成功时进行的一系列操作, 状态的改变, 回调的执行
- 拒绝 reject: 指一个 promise 失败时进行的一系列操作
- 终值 eventual value: 指的是 promise 被解决时传递给解决回调的值
- 据因 reason: 拒绝原因, 指在 promise 被拒绝时传递给拒绝回调的值
- Promise: 是一个拥有 then 方法的对象或函数, 其行为符合本规范
- thenable: 定义了 then 方法的对象或函数
- 值: 任何 JS 的合法值, undefined, thenable, promise
- 异常: 适用 throw 语句抛出的一个值

```js
class myPromise {
  constructor(fn) {
    // 判断参数类型
    if (typeof fn !== 'function') {
      throw new Error('我需要一个函数')
    }
    // 初始化需要用到的值
    this.initValue()
    // 修改 this 绑定
    this.initBind()
    // 给 fn 处理回调
    try {
      fn(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  initValue() {
    this.value = null
    this.reason = null
    this.state = 'padding'
    // 下面两个变量是为了异步中套异步使得状态为 padding, 将异步方法存起来等下次在调用
    this.resolveCallbacks = []
    this.rejectCallbacks = []
  }

  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  resolve(value) {
    if (this.state === 'padding') {
      this.state = 'fulfilled'
      this.value = value
      this.resolveCallbacks.forEach((fn) => fn(this.value))
    }
  }

  reject(reason) {
    if (this.state === 'padding') {
      this.state = 'rejected'
      this.reason = reason
      this.rejectCallbacks.forEach((fn) => fn(this.reason))
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function(value) {
        return value
      }
    }
    if (typeof onRejected !== 'function') {
      onRejected = function(reason) {
        throw reason
      }
    }
    // 实现链式调用
    return new myPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolve(x)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolve(x)
          } catch (e) {
            reject(e)
          }
        })
      }
      // 当异步中还有异步状态可能就来不及更新为 padding 所以把所有的方法存到数组内, 下次调用在执行
      if (this.state === 'padding') {
        this.resolveCallbacks.push((value) => {
          setTimeout(() => {
            try {
              const x = onFulfilled(value)
              resolve(x)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.rejectCallbacks.push((reason) => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolve(x)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })
  }
}
```

## 类的创建和继承

### 原型链继承

```js
// Animal 自身的方法
function Animal(name) {
  this.name = name || 'Animal'
  this.sleep = function() {
    console.log(`${this.name} is sleeping`)
  }
}

// Animal 上的方法
Animal.prototype.eat = function(food) {
  console.log(`${this.name} is eat ${food}`)
}
function Cat() {}
Cat.prototype = new Animal()
Cat.prototype.name = 'cat'
```

利用 new 继承, 基于原型链, 既是父类的实例, 也是子类的实例, 无法实现多继承

### 构造继承

```js
// Animal 自身的方法
function Animal(name) {
  this.name = name || 'Animal'
  this.sleep = function() {
    console.log(`${this.name} is sleeping`)
  }
}
// Animal 上的方法
Animal.prototype.eat = function(food) {
  console.log(`${this.name} is eat ${food}`)
}
function Cat() {
  Animal.call(this)
  this.name = name || 'cat'
}
```

可以实现多继承, 但是只能实现父类的属性方法, 不能实现原型的方法

### 组合继承

```js
// Animal 自身的方法
function Animal(name) {
  this.name = name || 'Animal'
  this.sleep = function() {
    console.log(`${this.name} is sleeping`)
  }
}
// Animal 上的方法
Animal.prototype.eat = function(food) {
  console.log(`${this.name} is eat ${food}`)
}

function Cat() {
  Animal.call(this)
  this.name = name || 'cat'
}
Cat.prototype = new Animal()
Cat.prototype.constructor = Cat
```

可以继承实例属性方法, 也可以继承原型属性/方法, 但是调用两次父类构造函数, 生成两份实例

### 寄生组合继承

通过寄生方式, 砍掉父类的实例属性, 这样在调用父类的构造的时候, 就不会初始化两次实例方法

```js
// Animal 自身的方法
function Animal(name) {
  this.name = name || 'Animal'
  this.sleep = function() {
    console.log(`${this.name} is sleeping`)
  }
}
// Animal 上的方法
Animal.prototype.eat = function(food) {
  console.log(`${this.name} is eat ${food}`)
}

function Cat() {
  Animal.call(this)
  this.name = name || 'cat'
}
;(function() {
  let Super = function() {}
  Super.prototype = Animal.prototype
  Cat.prototype = new Super()
})()
```

这种方法较为推荐

## 说说前端事件流

事件流描述的是从页面中接收事件的顺序, DOM 级事件流包括以下阶段

- 事件捕获阶段
- 处于目标阶段
- 事件冒泡阶段

## 图片懒加载和预加载

- 预加载: 提前加载图片, 当用户需要查看时刻直接从本地缓存中渲染
- 懒加载: 主要目的为了前端优化, 减少请求数或延迟数

## clientHeight, scrollHeight, scrollTop, offsetTop, clientTop 区别

- clientHeight: 表示可视区域高度, 不包含 border 和滚动条
- offsetHeight: 表示可视区域的高度, 包含了 border 和滚动条
- scrollHeight: 表示所有区域高度, 包含因为滚动条被隐藏的部分
- clientTop: 表示边框 border 的厚度, 在未指定的情况下为 0
- scrollTop: 滚动后被隐藏的高度, 获取对象相对于 offsetParent 属性指定的父坐标距离顶端的高度

## Commonjs, AMD 和 CMD

- CommonJS: 服务端的模块化, Nodejs
- AMD: 异步模块定义, 解决多个文件依赖关系, requireJS 实现了 AMD
- CMD: 推崇就近依赖, seaJS 实现了 CMD

## 实现一个 once 函数

```js
const once = (callback) => {
  let tag = true
  return () => {
    if (tag) {
      callback()
      tag = false
    }
  }
}
```

## JS 监听对象属性的改变

> ES5 利用 defineProperty(Vue2 响应式)

```js
const obj = { name: 'meng', age: 11 }
const key = 'name'
let value = obj[key]
Object.defineProperty(obj, key, {
  value: 'value', // 属性值设置, 用来新增属性
  configurable: true, // 控制是否能改和删除 key
  writable: true, // 控制是否能改 value
  enumerable: true, // 控制是否在迭代中显示
  set(newValue) {
    console.log('set value')
    value = newValue
  },
  get() {
    console.log('get value')
    return value
  },
})
obj.name = 'chauncey'
console.log(obj.name)
```

如果 id 不在 user 对象中, 则不能监听 id 的变化

> ES6 用 Proxy(Vue3 响应式)

```js
const person = {
  firstName: 'meng',
  lastName: 'xiang',
}
const p = new Proxy(person, {
  get(target, property) {
    if (property === 'fullName') {
      return `${target.firstName}-${target.lastName}`
    }
    return property in target ? target[property] : `No such property as, ${property}`
  },
  set(target, property, value) {
    if (property === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError(`${value} is not a Number`)
      }
      if (value < 0) throw new TypeError(`${value} must > 0`)
      target[property] = value
    }
  },
})
```

即使有属性在 user 中不存在, 通过 user.id 来定义也可以同样监听这个属性

## 实现一个私有变量

> Ojbect.defineProperty

```js
obj = {
  name: 'chauncey',
  getName() {
    return this.name
  },
}
Object.defineProperty(obj, 'name', {
  // 不可枚举, 不可配置, 默认就是
  get() {
    return undefined
  },
})
```

> 通过函数

```js
function product() {
  let name = 'chauncey'
  this.getName = function() {
    return name
  }
}
const obj = new product()
```

> 通过 class

```js
class Person {
  #name = 'chauncey'
  getName() {
    return this.#name
  }
}
```

## setTimeout, setInterval 和 requestAnimationFrame 的区别

RAF 不需要设置时间间隔, 它采用的是系统时间间隔, 不会因为前面的任务而受影响

- RAF 会把每一帧的所有 DOM 操作集中起来, 再一次重绘或回流中完成
- 在隐藏或不可见的元素中, RAF 将不会执行重绘或回流, 意味着更少的 CPU 的使用量
- RAF 是专为浏览器动画提供的 API, 在运行时浏览器会自动优化方法调用
- RAF 是根据屏幕刷新率来调整动画的帧数, 所以比 setTimeout 和 setInterval 更加流畅

## 手写 bind

bind 函数可以指定 this 的指向, 可以手写一个 bind 函数

> ES6 写法

```js
Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== 'function') return
  let fn = this
  return function(...rest) {
    return fn.apply(context, [...args, ...rest])
  }
}
```

> ES5 写法

```js
Function.prototype.myBind = function() {
  if (typeof this !== 'function') return
  let args = Array.prototype.slice.call(arguments) // slice 方法的应用就是实现深拷贝
  const context = args.splice(0, 1)[0] // 把第一个参数也就是 this 的指向上下文留下, splice 会改变原数组
  const fn = this // bind 把 this 保存
  return function() {
    let rest = Array.prototype.slice.call(arguments)
    return fn.apply(context, args.concat(rest)) // 利用 bind 函数的 this 调用 apply 实现委托给上下文
  }
}
```

这样写有错误, 需要把原型留下, 因为在 new 的时候会直接走 bind 的 this, 而忽略 new 的 this

修改:

```js
Function.prototype.myBind = function() {
  if (typeof this !== 'function') return
  let args = Array.prototype.slice.call(arguments) // slice 方法的应用就是实现深拷贝
  const context = args.splice(0, 1)[0] // 把第一个参数也就是 this 的指向上下文留下, splice 会改变原数组
  const fn = this // bind 把 this 保存
  const middleFun = function() {} // 定义一个空函数来当做中间人, 可以实现继承原型链
  const callback = function() {
    let rest = Array.prototype.slice.call(arguments)
    return fn.apply(this instanceof context ? this : context, args.concat(rest)) // 利用 bind 函数的 this 调用 apply 实现委托给上下文
  }
  if (this.prototype) {
    middleFun.prototype = this.prototype
  }
  callback.prototype = new middleFun()
  return callback
}
```

## Ajax 解决浏览器缓存问题

- 发送请求前加 anyAjaxObj.setRequestHeader('If-Modified-Since','0')
- 发送请求前加 anyAjaxObj.setRequestHeader('Cache-Control','no-cache')
- URL 后面加随机数: fresh= Math.random()
- URL 后加时间戳: nowtime= new Date().getTime()
- jQuery 直接: \$.ajaxSetup({cache:false})

## 说一下虚拟 DOM

用 JS 表示 DOM 树的结构, 用这个树建立真正的 DOM 树, 插入到文档中, 当状态变更的时候, 重新构造一棵新的对象树
, 然后用新的树和旧的树比较, 如果两棵树有差异, 然后就把差异应用到真正的 DOM 树中, 本质上就是在 JS 和 DOM 之间做了一个缓存

## Set 实现并集, 交集, 差集

```js
let set1 = new Set([1, 2, 3])
let set2 = new Set([4, 3, 2])

let intersect = new Set([...set1].filter((value) => set2.has(value)))
let union = new Set([...set1, ...set2])
let difference = new Set([...set1].filter((value) => !set2.has(value)))
console.log(intersect)
console.log(union)
console.log(difference)
```

### WeakSet

WeakSet 对象允许你将弱引用对象储存在一个集合中

与 Set 区别:

- WeakSet 只能存储对象引用, 不能存值, Set 可以
- weakSet 弱引用的, 垃圾回收机制不考虑 WeakSet 对该对象的应用, 如果没有其他的变量或属性引用这个对象值, 那么这个对象就会被垃圾回收掉
- WeakSet 无法遍历, 也没有办法拿到它包含的所有元素

### 总结 Set, WeakSet, Map, WeakMap

- Set
  - 成员唯一, 无序且不重复
  - [value,value], 键值与键名是一致的, (或者说只有键值, 没有键名)
  - 可以遍历: add, delete, has
- WeakSet
  - 成员都是对象
  - 成员都是弱引用, 可以被垃圾回收, 可以用来保存 DOM 节点, 不容易造成内存泄露
  - 不能遍历, 方法有 add, delete, has
- Map
  - 本质上是键值对的集合, 类似集合
  - 可以遍历, 方法很多可以跟各种数据格式转换
- WeakMap
  - 只接受对象作为键名, 不接受其他类型作为键名
  - 键名是弱引用, 键值可以是任意的, 键名所指向的对象可以被垃圾回收, 此时键名是无效的
  - 不能遍历, 方法有 get, set, has, delete

## Object.prototype.toString.call(), instanceof, Array.isArray() 区别和优劣

1. Object.prototype.toString.call()

每一个继承 Object 的对象都有 toString 方法, 如果 toString 方法没有重写的话, 会返回 `[Object type]`, 其中 type 为对象的 类型
, 但当除了 Object 类型的对象外, 其他类直接使用 toString 方法时, 会直接返回都是内容的字符串, 所以我们需要 call 或者 apply 方法来改变
toString 的上下文

```js
const arr = [1, 2]
Object.prototype.toString.call(arr) // [object Array]
```

`Ojbect.prototype.toString.call()` 常用判断浏览器内置对象

2. instanceof

instanceof 的内部机制是通过判断对象的原型链中是不是能找到类型的 prototype

但 instanceof 只能用来判断对象的类型, 原始类型不可以, 并且所有对象的 instanceof Object 都是 true

```js
[] instanceof Array // true
[] instanceof Object // true
```

3. Array.isArray()

ES6 新语法, 用来判断是否为数组

当检测 Array 时, `Array.isArray()` 优于 `instanceof`, 因为 `Array.isArray()` 可以检查出 `iframs`

## 全局作用域中, const let 声明不在 window 上到底在哪里?

```js
let a = 2
const b = 3
console.log(new Function()) // script 中
```

## 下面代码打印结果

```js
var a = 10
;(function() {
  console.log(a)
  a = 5
  console.log(window.a)
  var a = 20
  console.log(a)
})()
// undefined 10 20
```

在函数内已经声明了 a, 变量提升, 所以一开始 undefined, 然后 a = 5, 是给函数内部的 a 赋值, 所以 window.a 还是 10
最后 a 赋值给 20, 打印 20

## 为什么 for 循环的性能远远高于 forEach 的性能

- for 循环没有任何额外的函数调用栈和上下文
- forEach 函数实际上是 arr.forEach((currentValue,index,arr),thisValue)

不是普通的 for 语法糖, 还有诸多上下文和参数考虑, 可能拖慢性能

## 以下代码结果

```js
// example 1
var a = {},
  b = '123',
  c = 123
a[b] = 'b'
a[c] = 'c'
console.log(a[b]) // c, b 默认为 123, c 会覆盖 b

// example 2
var a = {},
  b = Symbol('123'),
  c = Symbol('123')
a[b] = 'b'
a[c] = 'c'
console.log(a[b]) // b, symbol 是唯一的

// example 3
var a = {},
  b = { key: '123' },
  c = { key: '456' }
a[b] = 'b'
a[c] = 'c'
console.log(a[b]) // c, 对象做为键, 会调用 toString, 所以 c 会覆盖 b
```

本题考查的是对象键名的转换

- 对象的键名只能是字符串和 Symbol 类型
- 其他类型的键名会被转换为字符串
- 对象转字符串会默认调用 toString 方法

## input 搜索如何防抖, 如何处理中文输入

防抖就是送外卖

处理中文输入, elementui 的源码,

- compositionstart: 触发于一段文字输入之前
- compositionupdate: 每打一个拼音字母触发
- compositiononend: 打好的中文输入完触发

## var, let, const 区别

- var: 会在栈内存里分配内存空间, 等到实际语句执行的时候, 在存储对应的变量, 如果传的是引用类型, 那么就会在栈内存一个指向堆内存的指针
- let: 不会预分配内存空间, 而且在分配空间时, 做一个检查, 如果已有相同变量名, 那么就报错
- const: 不会预分配内存空间, 存储的变量不会修改, 存储对象指针不会修改, 但可以修改对象里得属性

## 下面代码打印结果

```js
// 定义一个构造函数 Foo
function Foo() {
  Foo.a = function() {
    console.log(1)
  }
  this.a = function() {
    console.log(2)
  }
}

// 给 Foo 的原型上挂载一个方法
Foo.prototype.a = function() {
  console.log(3)
}

// 给 window 对象上挂在一个函数 Foo
Foo.a = function() {
  console.log(4)
}

//  调用 window 上的函数
Foo.a() // 4

// 创建了 Foo 构造函数的实例, 这时候给 window 的 Foo 改变了方法, obj 成了 this
let obj = new Foo()

// 调用 obj 实例的函数 a
obj.a() // 2

// 再次调用 window 上的方法, 就为 1
Foo.a() // 1
```

## 判断以下代码结果

```js
String('11') == new String('11') // == 会隐式转换 new String('11').toString() true
String('11') === new String('11') // === 是全等, 类型不同 false
// true false
```

```js
var name = 'Tom'
;(function() {
  console.info('name', name)
  console.info('typeof name', typeof name)
  if (typeof name == 'undefined') {
    var name = 'Jack'
    console.log('Goodbye ' + name)
  } else {
    console.log('Hello ' + name)
  }
})()

// var 穿透了块作用域, name 提升至 if() 之前, 为 undefined
```

```js
function wait() {
  return new Promise((resolve) => setTimeout(resolve, 10 * 1000))
}

async function main() {
  console.time()
  const x = wait()
  const y = wait()
  const z = wait()
  await x
  await y
  await z
  console.timeEnd()
}
main()
// 三个方法都是异步执行, 所以加起来最大的时间为 10 * 1000 ms,
async function two() {
  console.time()
  const x = await wait()
  const y = await wait()
  const z = await wait()
  console.timeEnd()
}
// 改成下面这样就是为同步执行, 执行时间从上到下, 一个 10 * 1000ms, 所以结果为 30 * 1000ms
```

## setTimeout, Promise, Async/Await 的区别

1. setTimeout

```js
console.log('script start')
setTimeout(function() {
  console.log('setTimeout')
})
console.log('script end')
// script start => script end => setTimeout
```

2. Promise

Promise 本身是同步的立即执行函数, 当在 executor 中执行 resolve 或 reject 的时候, 此时是异步操作, 会先执行
then / catch 等, 当主栈完成后, 才会执行 resolve / reject 中存放的方法

```js
console.log('script start')
let promise1 = new Promise(function(resolve) {
  console.log('promise1')
  resolve()
  console.log('promise1 end')
}).then(function() {
  console.log('promise2')
})
setTimeout(function() {
  console.log('settimeout')
})
console.log('script end')
// 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout
```

3. async / await

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}

console.log('script start')
async1()
console.log('script end')

// 输出顺序：script start->async1 start->async2->script end->async1 end
```

async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。

- 宏任务
  - setTimeout
  - setInterval
  - setImmediate
  - I/O
  - UI 渲染
- 微任务
  - process.nextTick
  - promise
  - MutationObserver

## 说说浏览器和 Node 的事件循环区别

看完这三个链接就明白了

[浏览器与 Node 的事件循环(Event Loop)有何区别?](https://juejin.im/post/5c337ae06fb9a049bc4cd218#heading-12)

[node 官网](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/)

[html#event-loop](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)

[路西法的文章, 写的不错](https://juejin.im/post/6844903971228745735#comment)

> 浏览器

- 执行一次 task(宏任务)
- 执行完 microtask(微任务)

> Node

- timers 定时器: 本阶段执行 setTimeout() 和 setInterval() 的回调
- pending callbacks: 执行延迟到下一个循环的 I/O 回调
- idle, prepare: 仅系统内部使用
- poll: 轮询, 检索新的 I/O 事件, 执行与 I/O 相关的回调(几乎所情况下, 除了关闭的回调, 他们有计时器和 setImmediate() 排定的之外)
  , 其余情况 node 将在此阻塞
- check: setImmediate() 回调在这里执行
- close callbacks: 关闭的回调函数: 一些准备关闭的回调, 例如 socket.on('close',...)

微任务和宏任务在 Node 的执行顺序

Node 10 之前: 执行完一个阶段所有任务, 执行 nextTick 任务, 然后在执行完微任务队列的所有内容

Node 11 之后: 和浏览器行为统一, 执行一个宏任务就执行完微任务任务队列

## 手写 JSONP

客户端:

```js
const jsonp = ({ url, params, callbackName }) => {
  const generateURL = () => {
    let dataStr = ''
    for (let key in params) {
      dataStr += `${key}=${params[key]}&`
    }
    dataStr += `callback=${callbackName}`
    return `${url}?${dataStr}`
  }
  return new Promise((resolve, reject) => {
    // 初始化回调函数名称
    callbackName = callbackName || Math.random().toString.replace('.', '')
    // 创建 script 元素并加入到当前文档中
    let scriptEle = document.createElement('script')
    scriptEle.src = generateURL()
    document.body.appendChild(scriptEle)
    // 绑定到 window 上，为了后面调用
    window[callbackName] = (data) => {
      resolve(data)
      // script 执行完了，成为无用元素，需要清除
      document.body.removeChild(scriptEle)
    }
  })
}
const res = jsonp({
  url: 'http://localhost:3000/',
  params: '',
  callbackName: 'meng',
})
console.log(res)
res.then(
  (data) => {
    console.log(data)
  },
  (err) => console.log(err)
)
```

服务端:

```js
const http = require('http')
const url = require('url')
http
  .createServer((req, res) => {
    const query = url.parse(req.url, true).query
    res.write(`${query.callback}('hello')`)
    res.end()
  })
  .listen(3000)
```

## 手写 new

- 首先接收一个构造函数和不定量的参数
- 创建一个空对象 obj 来继承构造函数的 prototype
- obj 绑定到构造函数上并传入剩余参数
- 判断构造函数返回是否为对象, 如果为对象, 那么返回, 否则使用创建的 obj

```js
function createNew(Con, ...args) {
  let obj = Object.create(Con) // obj.__proto__ = Con.prototype
  let result = Con.apply(obj, args) // 将 obj 绑定到 Con 上
  return result instanceof Object ? result : obj // 判断返回值是否为对象
}
```

::: tip 注意

1. new 通过构造函数创建出来的实例可以访问构造函数中的属性也可以访问原型链上的属性, 通过 new 操作符, 实例与构造函数通过原型链连接起来
2. 构造函数如果返回原始值, 那么这个值毫无意义, 于是就可以使用新建的对象
3. 构造函数如果返回对象, 那么这个返回值就可以正常使用,导致 new 操作没有作用
   :::

## 手写 instanceof

用来检测一个对象是否在其原型链中存在一个构造函数的 prototype 属性

```js
function instanceOf(left, right) {
  let proto = left.__proto__
  let prototype = right.prototype
  while (true) {
    if (proto === null) return false
    if (proto === prototype) return true
    proto = proto.__proto__
  }
}
```

## 手写 call

核心要点:

1. 将函数设为对象的属性
2. 执行并删除这个函数
3. 指定 this 到这个函数并传入给定参数执行函数
4. 如果不传参数, 默认为 window

```js
Function.prototype.myCall = function(content = window) {
  content.fn = this
  let args = [...arguments].slice(1)
  let result = content.fn(...args)
  delete content.fn
  return result
}
```

## 手写 apply

与 call 同理, 只不过参数为数组

```js
Function.prototype.myApply = function(content = window) {
  content.fn = this
  let result
  if (arguments[1]) {
    result = content.fn(...arguments[1])
  } else {
    result = content.fn()
  }
  delete content.fn
  return result
}
```

## 手写 reduce

```js
Array.prototype.myReduce = function(fn, base) {
  if (typeof fn !== 'function') throw new TypeError('arguments[0] must be a function')

  const initArr = this
  const arr = initArr.concat()
  let index, result

  if (arguments.length === 2) {
    arr.unshift(base)
    index = 0
  } else {
    index = 1
  }
  if (arr.length === 1) result = arr[0]

  while (arr.length > 1) {
    result = fn.call(null, arr[0], arr[1], index, initArr)
    index++
    arr.splice(0, 2, result)
  }
  return result
}
```

## 手写 map

```js
// 利用 reduce, 传入初始值, index 就为 0, 那么就可以从 0 开始遍历数组, Arg 是 map 第二个参数, 表示回调 fn 时候的 this
Array.prototype.myMap1 = function(fn, Arg) {
  var res = []
  this.reduce((prev, curr, index, array) => {
    res.push(fn.call(Arg, curr, index, array))
  }, 0)
  return res
}

// 利用 for 循环直接实现 map 遍历且返回新的数组
Array.prototype.myMap2 = function(fn) {
  var newArr = []
  for (var i = 0; i < this.length; i++) {
    newArr.push(fn(this[i], i, this)) //this指向调用newMap方法的数组
  }
  return newArr
}
```

## 手写 fill

```js
// value 为填充值, start 开始索引, end 结束索引
Array.prototype.myFill = function(value, start = 0, end = this.length) {
  for (let i = start; i < end; i++) {
    this[i] = value
  }
}
```

## 手写 filter

```js
Array.prototype.myFilter = function(fn, Arg) {
  if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`)
  const arr = this
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const value = fn.call(Arg, arr[i], i, arr)
    value && result.push(arr[i])
  }
  return result
}
```

## 手写 find 和 findIndex

```js
// find
Array.prototype.myFind = function(fn, start = 0, end = this.length) {
  for (let i = start; i < end; i++) {
    if (fn.call(this, arr[i], i, this)) {
      return arr[i]
    }
  }
}

// findIndex
Array.prototype.myFindIndex = function(fn, start = 0, end = this.length) {
  for (let i = start; i < end; i++) {
    if (fn.call(this, this[i], i, this)) {
      return i
    }
  }
  return -1
}
```

## 手写 sleep

- Promise 实现

```js
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
sleep(1000).then(() => {
  console.log(' end')
})
```

- async 实现封装

```js
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
    console.log('start sleep')
  })
}
async function test() {
  await sleep(1000)
  console.log('sleep end')
}
test()
```

- 通过 generate 来实现

generate 函数是一个生成器函数, 他返回一个 Generator 对象, yield 是每个区域, next.value 可以获取它的值
async await 其实是 generator 的语法糖

```js
function* sleep(ms) {
  yield new Promise((resolve) => {
    console.log('start sleep')
    setTimeout(resolve, ms)
  })
}
sleep(1000)
  .next()
  .value.then(() => console.log('sleep end'))
```

## 函数柯里化

柯里化 (Currying) 把接收多个参数的函数变成接收一个单一参数 (最初函数的第一个函数参数) 的函数, 并且返回接收余下的参数且返回结果的新函数的技术

```js
function curry(fn, args) {
  const length = fn.length
  const args = args || []
  return function() {
    let newArgs = args.concat(Array.prototype.slice.call(arguments))
    if (newArgs.length < length) {
      // 参数个数不够, 在递归去加参数
      return curry.call(this, fn, newArgs)
    } else {
      // 参数个数够了, 就调用这个函数
      return fn.apply(this, newArgs)
    }
  }
}

function multiFn(a, b, c) {
  console.log(a * b * c)
  return a * b * c
}

const multi = curry(multiFn)
multi(2)(3)(4)
// multi(2, 3, 4)
// multi(2)(3, 4)
// multi(2, 3)(4)
```

## 模块加载机制

- ES6 之前的模块引入方式和区别

ES6 之前模块引入主要是 CommonJS 和 AMD 两种。

1. 首先，CommonJS 导出值是**浅拷贝**，一旦输出某个值，模块内部的变化就影响不到这个值。而 ES6 导出是采用实时绑定的方式，是将其内存地址导出，导入是动态加载模块取值，并且变量总是绑定其所在的模块，不能重新赋值。
2. ES6 模块化导入是异步导入，CommonJS 导入是同步导入。这跟 ES6 模块通常用于 web 端，而 CommonJS 用于服务器端有关。
3. CommonJS 导入支持动态导入 require(`${path}/xx.js`)，ES6 模块化导入不支持，目前已有草案。
4. ES6 模块化会编译成 require/exports 来执行的。

## 如何实现一个倒计时

```js
// 利用 requestAnimationFrame
const element = document.getElementById('el')
let start

function step(timestamp) {
  if (start === undefined) start = timestamp
  const elapsed = timestamp - start

  element.innerText = 10 - Math.floor(elapsed / 1000)
  if (parseInt(element.innerText) < 1) {
    element.innerText = '生日快乐'
  }
  if (elapsed < 10000) {
    // Stop the animation after 10 seconds
    window.requestAnimationFrame(step)
  }
}
window.requestAnimationFrame(step)

// 利用 setTimeout

let timerId
let time = 10
function run() {
  clearTimeout(timerId)
  if (time <= 0) {
    countdown.innerHTML = '生日快乐'
    return
  }
  countdown.innerHTML = time--
  timerId = setTimeout(run, 1000)
}
run()
```

## XMLHttpRequest 和 JSONP 应用场景和错误处理

1. XMLHttpRequest 用于浏览器与服务端异步请求数据从而实现对页面的无刷新修改, 支持 GET/POST 请求, 一般用于非跨域的场景, 如果需要跨域请求数据, 那么
   需要 CORS 头设置支持, JSONP 用于跨域请求,只支持 GET 请求
2. XMLHttpRequest 异常判断一般通过该对象的 readystate 和 http 状态码 status 来判断, JSONP 根据 onerror 和 timer 超时判断

## XMLHttpRequest 对象的状态分类

> readyState

- 0: XML 初始化但未调用 open() 方法
- 1: 载入, 已经调用 open() 方法, 但未发送请求
- 2: 载入完成, 请求发送完成
- 3: 交互: 可以收到的部分响应数据
- 4: 完成: 已经接收到了全部数据, 并且连接已关闭

> status

- 1xx: 信息类, 可以进一步请求
- 2xx: 成功
- 3xx: 重定向
- 4xx: 客户端 错误
- 5xx: 服务端错误

## JS 中 falsy 值

undefined, null, false, NaN, '', 0, -0
