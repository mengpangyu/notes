# Node 技巧

## 简单实现 Node 的 Events 模块

- 观察者模式或者说订阅者模式, 它定义了对象间的一种一对多的关系, 让多个观察者对象同时监听某一主题对象, 当一个对象发生
  改变时, 所有依赖于它的对象都将得到通知

node 中的 Events 模块就是通过观察者模式实现的:

```js
let events = require('events')
let eventEmitter = new events.EventEmitter()
eventEmitter.on('say', (name) => {
  console.log('hello', name)
})
eventEmitter.emit('say', 'chauncey')
```

eventEmitter 触发 say 事件, 用过 On 接收, 并且输出结果, 这就是一个订阅模式的实现

```js
function Events() {
  this.on = function(eventName, callback) {
    this.handles = this.handles ? this.handles : {}
    this.handles[eventName] = this.handles[eventName] ? this.handles[eventName] : []
    this.handles[eventName].push(callback)
  }
  this.emit = function(eventName, obj) {
    if (this.handles[eventName]) {
      for (var i = 0; i < this.handles[eventName].length; i++) {
        this.handles[eventName][i](obj)
      }
    }
  }
  return this
}
let events = new Events()
events.on('say', (name) => {
  console.log(name)
})
events.emit('say', 'chauncey')
```

因为 new 出来的 events 对象, 所以每个事件监听器都不受其他影响

```js
let events1 = new Events()
let events2 = new Events()
events1.on('say', (name) => {
  console.log(name)
})
events1.emit('say', 'meng')
events2.on('say', (name) => {
  console.log(name)
})
events2.emit('say', 'xiang')
```

## 如何实现 token 加密

1. 需要一个 secret(随机数)
2. 后端利用 secret 和加密算法生成一个字符串
3. 前端每次 request 在 header 中带上 token
4. 后端用同样的算法解密

## Node 中间件

中间件泛指一种特定的设计模式, 一系列的处理单元, 过滤器和处理程序, 以函数的形式存在, 连接在一起, 形成一个异步队列, 来完成对任何数据的预处理和后处理

- body-parser 解析请求体
- koa-logger 打印请求日志
- koa-cors 配置跨域
- koa-router 配置路由

## mysql 和 mongodb 的区别

> 关系型数据库 MySQL

1. 在不同的引擎上有不同的存储方式
2. 查询语句使用传统的 sql 语句, 拥有较为成熟的体系, 成熟度很高
3. 海量数据处理的时候速度较慢
4. 支持事务操作

> 非关系型数据库 MongoDB

1. 存储方式: 虚拟内存 + 持久化
2. 查询语句: 独特的 MongoDB 方式, 和 JavaScript 很像
3. 适合场景: 事件的记录, 内容管理或者博客平台等
4. 架构特点: 可以通过副本集, 以及分片来实现高可用
5. 数据处理: 数据处理是存储在硬盘上的, 只不过需要经常读取的数据会被加载到内存中, 从而达到高速读写
6. 成熟度与广泛度: 新兴数据库, 成熟度较低, 不过使用人数在不断增长
