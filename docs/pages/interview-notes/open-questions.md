# 开放题和刁钻题

## 什么是 XSS? 如何预防?

含义: XSS(Cross Site Scripting), 即跨站脚本攻击, 是一种常见于web应用程序中的计算机安全漏洞

预防: 只要我们使用HTML编码将浏览器需要渲染的信息编码后, 浏览器在渲染DOM元素的时候, 会自动解码需要渲染的信息, 将上述信息解析成字符串而不是JS脚本, 这就是我们防御XSS攻击的核心想法
    
- 获取用户的输入, 不用innerHtml,用innerText
- 对用户的输入进行过滤, 如对& < > " ' /等进行转义
    
## 什么是 CSRF? 如何预防?

含义:  CSRF (Cross Site Request Forgery), 跨站请求伪造, 是利用后台有规律的接口，例如 localhost/deleteAriticle.php?id=3&username=xiaoxiao ，攻击者在被攻击的网站页面嵌入这样的代码，当用户xiaoxiao访问该网站的时候，会发起这条请求。服务器会删除id为3的数据

预防:
 
- 客户端: 对于数据库的修改请求, 全部使用POST提交, 禁止使用GET请求
- 服务端: 一般的做法是在表单里面添加一段隐藏的唯一的token(请求令牌)

## 你遇到最难的问题? 

开放性问题, 讲究一波三折

举个例子:
:::tip 注意 例子1
做 PointUI 的轮子时, 单元测试配置 karma.config 时一直打不开浏览器进行测试, 
该开始从网上搜了解决方案, 试了都不成功, 重写下载了 node_modules 好几次, 还是不行, 后来找答案到想放弃写单元测试了, 然后纠结了半天,
还是继续在网上找答案, 因为单元测试会为以后的代码重构打很好的基础, 后来经过好几次的排错, 终于在 Stack Overflow 上找出了正解
:::

:::tip 注意 例子2
在做小猫记账的时候, 做统计页面引入 Echarts, 后来在数据动态变化的时候 Echarts 一直渲染不成功, 后来以为是钩子函数的问题, 换了好几次钩子函数, 
还是不行, 网上搜了一些方法也没有作用, 后来突然有了灵感, 是不是 Echarts 的问题, 后来网上尝试着搜了一下, 确实有 Echarts 的及时渲染问题, 所以我靠这个解决了统计页面的 Echart 渲染问题
:::

## 你在团队的突出贡献是什么?

- 目前还是学生, 所有项目都是自己开发

## 最近关注什么新技术? 

- 多看 阮一峰 尤雨溪 还有其他的前端大佬

## 有没有看过一些源码, 看了之后有什么记忆深刻的地方, 有什么收获?

- 这个问题等看了源码会写

## 刁钻题目(其实就是 JS 的 bug)

### 代码
```js
[1,2,3].map(parseInt) // 1 NaN NaN
```
:::danger 危险
具体步骤是这样的, 所以会出现上述结果

parInt('1',0)

parInt('2',1)

parInt('3',2)
:::

### 代码
```js
var a = {name: 'a'}
a.x = a = {}
// a.x = undefined 
```
![代码解析](image/open-questions-1.png)

### (a ==1 && a== 2 && a==3) 可能为 true 吗？

- 利用 == (两个等于号, 两头参数不一样的话就会自动调用 valueOf 方法)会调用 valueOf() 的特性

```js
let a = {
 value: 1,
 valueOf(){
   return this.value++
 }
}
a == 1 && a == 2 && a == 3 // true
```

- 利用 a 会读取 window.a 的特性

```js
var value = 1; 
Object.defineProperty(window, 'a', {
 get(){
     return value++;
 }
})
a ==1 && a== 2 && a==3 // true
// 或者 
a ===1 && a=== 2 && a===3 // true
```

## 超纲题

### JS 垃圾回收

- 什么是垃圾
    - 不再需要, 即为垃圾
    - 所有变量都有生命周期
    - 没有被引用的对象可能是垃圾(双引用)
    - 三个对象互相引用, 那也有可能是垃圾(环)


>举例子

#### 全局变量引用一个对象

```js
let user = {
  name: 'John'
}
```

![单个对象引用](./image/open-questions-3.png)

当把 user 重写
```js
user = null
```

![单个对象引用改变](./image/open-questions-4.png)

#### 两个变量引用一个对象


```js
let user = {
  name: "John"
};

let admin = user;
```

![多个对象引用](./image/open-questions-5.png)

当把 user 重写
```js
user = null
```

这样的话, 对象还是存在的, 它还被 admin 引用的, 所以不会被垃圾回收

#### 引用环

```js
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});
```

![引用环](./image/open-questions-6.png)

去除两个引用

```js
delete family.father;
delete family.mother.husband;
```

![引用环去除](./image/open-questions-7.png)

你会看到 family 和 mother 都消除了对 father 的引用, 所以

![垃圾回收father](./image/open-questions-8.png)

### 引用环的孤岛

继续引用环的代码
```js
family = null
```

![引用环的孤岛](./image/open-questions-9.png)

可以看到, 虽然孤岛里的都有相互引用, 但是与他们连接的 family 断开了连接, 所以这个引用孤岛也要被垃圾回收

:::tip 注意
1. 如果全局变量基本不会消除
2. 局部变量, 在执行后就消除
3. 如果存在双引用, 删除一个, 其中一个还有
4. 环引用, 只要存在相互引用, 就不会消除
5. 不合群就消除, 需要有桥梁连接外界
:::

>如何捡垃圾? --- 垃圾回收算法

1. 标记清除算法

全局作用域开始把所有用到的对象都标记一下, 一直标记到没有被引用的变量王为止

![标记清除算法](./image/open-questions-2.png)

- 缺点: 时间太长, 每一个都要标记遍历

- 优化: 
    - 新生代和老一代
    - 增量收集
    - 空闲时间收集

>前端的特性: 有 DOM 进程和 JS 进程, 如果把 DOM 元素指为 null, 那么也应该删除 DOM 元素

```js
div.remove()
div.onclick = null // 这句兼容 IE
div = null
```

2. 标记压缩算法

和“标记－清除”相似, 不过在标记阶段后它将所有活动对象紧密的排在堆的一侧(压缩), 消除了内存碎片, 不过压缩是需要花费计算成本的

3. 引用计数算法

引用计数，就是记录每个对象被引用的次数，每次新建对象、赋值引用和删除引用的同时更新计数器，如果计数器值为0则直接回收内存

4. 分代回收

- 新生代 = 生成空间 + 2 * 幸存区 复制算法
- 老年代 标记-清除算法

对象在生成空间创建, 当生成空间满之后进行 minor gc, 将活动对象复制到第一个幸存区, 并增加其“年龄” age, 当这个幸存区满之后再将此次生成空间和这个幸存区的活动对象复制到另一个幸存区, 如此反复, 当活动对象的 age 达到一定次数后将其移动到老年代: 当老年代满的时候就用标记-清除或标记-压缩算法进行major gc

### EventLoop(事件循环) Node.js 的概念

- 事件: 操作系统给浏览器触发的一个行为
- 操作系统轮询键盘
- 当 JS 执行异步任务时, 发了一个消息给 C++, 执行轮询来监听 AJAX 到底变化了没, 变了就给 JS 发回去事件

#### EventLoop 阶段

1. timers: 执行异步函数
2. I/O callback
3. poll(EventLoop大部分时间在的阶段): 等待异步时间
4. check: 主要存 setImmediate API
5. close callback **nextTick 当前阶段马上执行**


![EventLoop](./image/open-questions-10.png)

举例一个面试题

![EventLoop Example](./image/open-questions-11.png)

>宏任务 和 微任务

1. Event Loop 
    - Node.js: timers poll check
    - chrome(一会:宏任务, 马上:微任务)
2. Node.js
    - setTimeout ==> timer
    - setImmediate ==> check
    - nextTick ==> 当前队列的后面
3. Chrome
    - setTimeout ==> 一会
    - then(fn) ==> 马上
    
**一定要画图解题**

#### 总结

EventLoop 是一个阶段, 分为 Node.js 和 Chrome

- Node.js:
    1. timers: setTimeout
    2. poll: 等待
    3. check: setImmediate
    4. 附加 nextTick 强行来说是微任务, 在当前的阶段后面执行
- Chrome:
    1. 宏(一会) 
    2. 微(马上)


![总结](./image/open-questions-12.png)

## 个性化题目

- PWA
- echarts.js / d3.js
- three.js
- flutter
- SSR

写个 HelloWorld 就行