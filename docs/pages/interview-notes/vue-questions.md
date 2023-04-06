# Vue 技巧

## watch 和 computed 和 methods 区别是什么?

- 思路: 先翻译单词, 在阐述作用, 最后强行找不同
- 要点:

  - computed 和 methods 相比
    - **computed 有缓存**, 如果 computed 属性依赖没有变化, 那么 computed 属性就不会重新计算, methods 则是看到一次计算一次
  - watch 和 computed 相比

    - computed 是计算出一个属性, 而 watch 则可能是做**别的事情(如上报数据)**

:::tip
计算属性是由 data 中的已知值，得到的一个新值。 这个新值只会根据已知值的变化而变化，其他不相关的数据的变化不会影响该新值。 计算属性不在 data 中，计算属性新值的相关已知值在 data 中。 别人变化影响我自己。 watch：监听数据的变化

监听 data 中数据的变化 监听的数据就是 data 中的已知值 我的变化影响别人

1.watch 擅长处理的场景：一个数据影响多个数据
2.computed 擅长处理的场景：一个数据受多个数据影响
:::

## Vue 有哪些生命周期钩子函数? 分别有什么用?

- beforeCreated: 刚刚被创建, 属性计算之前
- created: 创建完成, 属性已绑定, DOM 未生成, \$el 不存在
- beforeMount: 模板挂载之前
- mounted: 模板挂载之后
- beforeUpdate: 组件更新之前
- updated: 组件更新之后
- activated: 组件被激活使用
- deactivated: 组件被移出使用
- beforeDestory: 组件销毁前
- destoryed: 组件销毁后

:::tip 注意
beforeCreate: 可加 loading 事件

created: 结束 loading, 做一些初始化, 函数自执行

mounted: 发起请求, 获取数据, 配合路由钩子做一些事

beforeDestroy: 确认删除么?

destroyed: 当前组件已被删除
:::

## Vue 如何实现组件间的通信?

- 父子组件: 使用 v-on 通过事件通信
- 爷孙组件: 使用两次 v-on 通过爷爷爸爸通信, 爸爸儿子通信实现爷孙通信
- 任意组件: 使用 eventBus = new Vue() 来通信, eventBus.$on 和 eventBus.$emit 是主要 API
- 任意组件: 使用 Vuex 通信

## Vue 数据响应式怎么做到的?

- 使用 Object.definedProperty 把这些属性全部转为 getter/setter
- Vue 不能检测对象属性的添加或删除, 解决方案是手动调用 Vue.set 或者 this.\$set

:::danger 危险
如果面试官问 Vue 的双向绑定是啥?

v-model 就是双向绑定
:::

[自己写的一篇博客](https://zhuanlan.zhihu.com/p/99487325)

## Vue.set 是做什么用的?

- Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对属性执行 **getter/setter** 转化，所以属性必须在 **data 对象上存在才能让 Vue 将它转换为响应式的**
- 对于已经创建的实例，Vue **不允许动态添加根级别的响应式属性**
- 但是可以用 Vue.set(对象,属性,值) 或 this.\$set() 来设置

## Vuex 你怎么用的?

- 基本概念: Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**
- 解决问题: 处理复杂的数据通信
- 核心概念及作用:
  - State: **唯一数据源**
  - Getter: **store 的计算属性**, 用于对 state 派生出一些状态, **有缓存**
  - Mutation: **相当于 methods**, 对 state 里的状态加上一些外来参数的一些操作, **必须是同步函数**
  - Action: **类似 Mutation**, Action 提交的是 mutation，而不是直接变更状态, **可以包含任意异步操作**
  - Module: 将 store 分割成模块（module）, **分解庞大的单一状态树**

## VueRouter 怎么用的?

- 基本概念: Vue Router 是 Vue.js 官方的**路由管理器**
- 核心概念名字及作用:
  - Hash 模式: 默认模式, 利用锚点实现路由跳转
  - History 模式: 就是用到一个 Html5 新加的 API, 利用 **history.pushState** 来改变路由但是不跳转页面, [自己写的一篇路由博客](https://zhuanlan.zhihu.com/p/124939557), 会再刷新页面的时候请求服务器, 需要做处理
  - 导航守卫: 路由跳转过程中的一些钩子函数, 全局的、单个路由独享的、组件内的三种
    - **全局路由钩子:** beforeEach(to,from, next)、beforeResolve(to,from, next)、afterEach(to,from)
    - **独享路由钩子:** beforeEnter(to,from, next)
    - **组件内路由钩子:** beforeRouteEnter(to,from, next)、beforeRouteUpdate(to,from, next)、beforeRouteLeave(to,from, next)
  - 路由懒加载: 分割路由对应的不同组件, `import('./Foo.vue') // 返回 Promise`
- 常用 API:
  - router-link: 组件支持用户在具有路由功能的应用中(点击)导航, 通过 **to 属性指定目标地址, 默认渲染成带有正确链接的 a 标签**
  - router-view: **渲染路径匹配到的视图组件**, 可内嵌自己的 router-view
  - this.\$router.push: 这个方法会向 **history 栈添加一个新的记录,** 所以, 当用户点击浏览器后退按钮时, 则回到之前的 URL
  - this.\$router.replace: 跟 router.push 很像, 唯一的不同就是, **它不会向 history 添加新记录**, 而是跟它的方法名一样 —— 替换掉当前的 history 记录
  - this.\$route.params: **表示当前的参数**即冒号后面的东西组成的对象

## Hash 和 History 模式的区别?

- History 设置的 URL 可以是与当前的 URL 同源的任意 URL, 而 Hash 只可以设置 # 号后的内容, 只能设置与当前 URL 同文档的 URL
- History 设置新的 URL 可以和以前一样, 也会加入新的路由栈中, 而 Hash 设置的新值必须与原来的不一样才能出发动作记录到栈中
- History 可以添加任意类型的数据到记录中, 而 Hash 只能添加短字符串
- History 可以额外设置 title 属性供后续使用

## React 和 Vue 为什么要在写列表组件时写 key, 作用是什么

> Vue: key 的作用是为了在数据变化时强制更新组件, 以避免原地复用带来的副作用

**Vue diff 算法根据属性**

- Vue 官网提到了如果不加 key 的话就是默认使用就地更新的策略, 即当元数据项的顺序改变时, Vue 不会移动 DOM 元素来顺应
  数据项的更新, 而是就地更新每个元素, 确保他们在每个位置的索引位置正确
- 就地更新是更高效的, 但是会出现副作用, 只适用于不依赖子组件或临时 DOM 状态的列表(简单列表渲染)
- Vue 官方也建议尽可能的使用 key, 除非遍历的列表非常简单, 因为 key 是识别节点的一个通用机制
- key 主要用在 Vue 的虚拟 DOM 算法, 在新旧 nodes 对比时识别 VNodes, 如果不使用 key, Vue 会最大限度的减少动态元素
  并且尝试修改/复用相同类型
- key 的使用场景: 完整触发组件声明周期钩子, 触发过渡效果

> React: key 的作用是为了优化 diff 算法,

**React diff 算法自顶向下**

- React 官网提到了在不使用 key 的情况下, 在列表后面插入节点是很容易的, 但是在列表前面插入节点就会使整个列表重新删除在创建, 这样是低效的
- 所以 React 建议加上 key 属性, 这样 React 在 diff 就可以比对 key 属性来判断是否需要删除或插入
- key 最好不要使用下标, 因为当基于下标重新排序时, 组件 state 可能会遇到一些问题, 由于组件实例时基于他们的 key 来决定是否更新及复用, 如果 key
  是一个下标, 那么修改顺序时会修改当前的 key, 导致非受控组件的 state(比如输入框) 可能相互篡改导致无法预期的变动
- key 也不要使用 Math.random(), 不稳定

:::tip 注意
更确切的说应该是 diff 算法在你的复杂列表稳定的时候才能明显提高性能, 因为节点可以重用, 但是对于列表频繁更新的场景, 节点不能重用,
但是 diff 可以省略一部分逻辑, 因此性能也会更好, 但是两者的性能优化不在同一个维度, 一个是创建和更新节点(渲染器)的优化,
一个是 DOM diff 算法(核心引擎)的优化
:::

## 聊聊 Redux 和 Vuex 的设计思想

相同点:

- 两者都是处理全局状态的工具库, 大都是 store 保存状态, dispatch(action), reducer(mutation), 生成 newState

不同点:

- 最大的区别处理异步的不同, Vuex 里多了异步的操作, action 之后 commit(mutation) 之前处理异步, redux 里面则通过中间件处理异步(redux-chunk,redux-saga)

## Vue 中的 Object.definedProperty 有什么缺陷/为什么 Vue3 采用了 Proxy, 抛弃了 Object.definedProperty

1. Object.definedProperty 无法监控到数组下标变化, 导致通过数组下标添加元素, 不能实现响应
2. Object.definedProperty 只能劫持对象的属性, 从而需要对每个对象, 每个属性进行遍历, 如果属性值是对象, 还需要深度遍历,
3. Proxy 可以劫持整个对象, 并返回一个新对象
4. Proxy 不仅可以代理对象, 还可以代理数组, 还可以代理动态增加的属性
5. Proxy 作为新标准收到浏览器厂商的重点持续性能优化, 也就是传说中的新标准的性能红利

## 双向绑定和 Vuex 是否冲突

严格模式使用 Vuex 时, 当用户输入时 v-model 会视图修改属性值, 但这个修改不是在 mutation 中修改的, 所以会抛出一个
错误, 当需要在组件中使用 Vuex 的 state 时, 有两种解决方案

1. input 绑定 value(vuex 中的 state), 然后监听 input 的 change 或者 input 事件, 在时间回调中调用 mutation 修改
   value 的值
2. 使用带有 setter 的双向绑定计算属性

## 在 Vue 中, 子组件为何不能修改父组件传递的 Prop?

一个父组件下不只有一个子组件, 使用这份 Prop 数据的也不知一个子组件, 如果每个子组件都能修改 props 的话, 将会导致修改数据的
源头不止一处

所以我们需要将修改数据的源头统一为父组件, 子组件要修改要委托父组件帮它, 从而保证父数据修改源唯一

## Vue 的父组件和子组件生命周期钩子执行顺序是什么?

1. 加载渲染过程: 父 beforeCreate => 父 created => 父 beforeMount => 子 beforeCreate => 子 created =>
   子 beforeMount => 子 mounted => 父 mounted
2. 子组件更新过程: 父 beforeUpdate => 子 beforeUpdate => 子 updated => 父 updated
3. 父组件更新过程: 父 beforeUpdate => 父 updated
4. 销毁过程: 父 beforeDestroy => 子 beforeDestroy => 子 destroyed => 父 destroyed

## Vue 渲染大量数据时应该怎么优化?

1. 添加加载动画, 优化用户体验
2. 利用服务器渲染 SSR, 在服务端渲染组件
3. 避免浏览器处理大量 DOM, 比如懒加载, 异步渲染组件, 使用分页
4. 对于固定费响应式数据, 使用 Object.freeze 冻结

## Vue 如何优化首页的加载速度? 首页白屏是什么问题引起的? 解决方案?

> 白屏原因: 单页面应用的 html 靠 js 生成, 因为首屏需要加载很大的 js 文件, 所以当网速差的时候会产生一定程度的白屏

解决方案:

1. 优化 webpack 减少模块打包体积, code-split 按需加载
2. 服务端渲染, 在服务端实现渲染好首页
3. 首页加 loading 或骨架屏
4. cdn, 减少请求, gzip, 浏览器缓存
5. 异步渲染
6. service worker

## Vue 如何对数组方法进行变异?

拦截 prototype 进行方法创建

## nextTick 原理

在改变 state 的时候不会立即改变, 而是进入一个队列里, 然后把重复的操作去掉, 然后把最后的结果 push 进去
nextTick 后就可以看到改变的新 state, 内部使用 setImmediate, channelMessage, promise, setTimeout 实现

## v-if, v-show, v-html 的原理是什么, 它是如何封装的?

- v-if 会调用 addIfCondition 方法, 生成 vnode 的时候会忽略对应节点, render 就不会渲染
- v-show 会生成 vnode, render 的时候也会渲染成真实节点, 只是在 render 过程中在节点的属性修改 show 属性值, 也就是常说的 display
- v-html 通过 addProp 添加 innerHtml 属性, 归根结底设置 innerHtml 为 v-html 的值

## 对 SPA 的理解, 优缺点

SPA 仅在 Web 页面初始化时加载相应的 HTML, JS 和 CSS, 一旦加载完成, SPA 不会因为用户的操作而进行页面重新加载或跳转
, 取而代之的利用路由记住实现 HTML 内容的变化, UI 与用户交互

优点:

1. 用户体验好, 快, 内容的改变不需要重新加载整个页面, 避免了不必要跳转和重复渲染
2. SPA 相对服务器压力较小
3. 前后端职责分离, 架构清晰, 前端进行交互逻辑, 后端负责数据处理

缺点:

1. 初次加载耗时过多, 可能出现白屏
2. 路由管理不能使用浏览器的前进后退管理, 所有页面切换需要自己建立栈管理
3. SEO 难度较大, 所有内容都在一个页面上显示

## Class 和 Style 如何实现动态绑定

对象语法:

```vue
<div :class="{active: isActive, 'text-danger': hasError"></div>
data:{ isActive: true, hasError: false}
```

数组语法:

```vue
<div :class="[isActive ? activeClass : '', errorClass]"></div>
data:{ activeClass: 'active', errorClass: 'text-danger'}
```

## 对 keep-alive 的了解

是 Vue 内置的一个组件, 可以使用被包含的组件保留状态, 避免重新渲染

- 一般结合路由和动态组件一起使用, 用于缓存组件
- 提供 include 和 exclude 属性, 两者都支持字符串和正则表达式, include 表示只有名称匹配的组件才会被缓存,
  exclude 表示任何名称匹配都不会缓存, 其中 exclude 的优先级比 include 高
- 对两个钩子函数, activated 和 deactivated, 当组件被激活时, 触发钩子函数 activated, 当组件被移出时, 触发钩子函数
  deactivated

## 为什么 Vue 里的 data 是一个函数

因为组件用来复用的, JS 对象都是引用关系, 如果组件中 data 是一个对象, 那么这样作用域没有隔离, 子组件中的 data 属性
值会相互影响, 如果组件时一个 data 函数, 那么每个实例可以维护一份呗返回对象的独立拷贝, 组件间的 data 也不会相互影响,
而 new Vue 的实例是不会被复用的, 因此不存在引用对象的问题

## v-model 的原理

v-model 主要用在 input, textarea, select 等元素上的创建双向数据绑定, 本质上是语法糖

v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件

- text 和 textarea 元素使用 value 和 input 事件
- checkbox 和 radio 使用 checked 属性和 change 事件
- select 字段将 value 作为 prop 并将 change 作为事件

```vue
<<input type="text" :value="something" @input="something = $event.target.value">
```

## Vue 组件通讯

1. props / \$emit 父子组件通讯

2. ref 与 $parent / $children 父子组件通讯

- ref: 如果普通的 DOM 元素上使用, 引用指向的是 DOM 元素, 如果用在组件上, 引用指向组件实例
- $parent / $children 访问父/子

3. EventBus($emit/$on), 适用于父子, 隔代, 兄弟之间通讯

通过一个空的 Vue 实例作为事件中心, 用它来触发和监听事件, 从而实现任何组件的通信

4. $attrs / $listeners 使用与隔代组件通讯

- $attrs: 包含了父作用域中不被 prop 所识别的特性绑定(class和style除外), 当一个组件没有声明任何 prop 时, 这里会包含所有
父作用域绑定, 并可以通过 $attr 传入内部组件, 配合 inheritAttr 使用
- $listener: 包含了父作用域中的 v-on 事件监听器, 可通过 @$listener 传入内部组件

5. provide / inject 适用于隔代组件通讯

祖先组件中通过 provider 来提供变量, 然后在子孙组件中通过 inject 来注入变量, provide/inject 主要解决了跨级组件间
的通信问题, 不过他的使用场景, 主要是子组件的状态, 跨级组件间建立了一种主动提供和依赖注入的关系

6. Vuex 适用于全局通信

是一个专为 Vue.js 应用程序开发的状态管理模式, 每一个 Vuex 应用的核心就是 store, Vuex 状态存储是响应式的, 改变 store 中状态
唯一的途径就是提交 mutation

## 使用过 Vue SSR 么

> Vue.js 是构建客户端应用程序的框架, 默认情况下浏览器输出 Vue 组件, 进行生成 DOM 和操作 DOM, 然而, 也可以将同一个组件渲染为服务端
> 的 HTML 字符串, 他们直接发送到浏览器, 最后将服务器渲染的页面为用户服务

优点:

- 更好的 SEO, SPA 页面通过 AJAX 获取, 而搜索引擎爬取工具并不会等待 AJAX 异步完成后再抓取页面内容, 所以 SPA 总是
  抓取不到 AJAX 获取的内容的, 而 SSR 由服务器直接返回, 所以搜索引擎可以爬取
- 更快的内容到达: SPA 会等待所有的 Vue 编译后才会显示页面, 而 SSR 会在服务器写好页面后直接返回

缺点:

- 更多的开发条件限制, 服务端渲染只支持 beforeCreate 和 created 两个钩子函数, 这回导致一些外部扩展库需要特殊处理,
  才能在服务端渲染程序运行, 而且服务端渲染程序需要 Node.js 的加持
- 更多的服务器负载

## Vue-router 路由模式有几种

1. hash: 使用 URL hash 来做路由, 支持所有浏览器
2. history: HTML5 新增的 history 的 pushstate API
3. abstract: 支持所有 JS 运行环境, 如 Node.js 服务器, 如果发现没有浏览器的 API, 那么就会强制进入这个模式

## Vue-router 常用的 hash 和 history 原理

> hash 模式

最前的前端路由就是由 location.hash 来实现的, #后面的就表示路径的 hash 值

- URL 中的 hash 值只是客户端的一种状态, 也就是说向服务端发出请求时, hash 部分会被吃掉
- hash 值的改变, 都会在浏览器的访问记录历史中增加一条记录, 因此我们能通过浏览器的嗯回退, 前进按钮控制 hash 的切换
- 可以通过 a 标签, 并设置 href 属性, 当用户点击这个标签后, URL 的 hash 值会发生改变, 可以使用 JS 对 location.hash 赋值,
  改变 URL 的 hash 值
- 可以通过 hashChange 事件来监听 hash 值的变化, 从而对页面进行跳转

> history 模式

HTML5 提供了 History API 来实现 URL 的变化, 其中主要的有两个

1. history.pushState(): 在 history 里新增一个记录
2. history.replaceState(): 替换当前的记录

- pushState 和 replaceState 两个 API 来实现 URL 的变化
- 可以使用 pushState 来监听 url 的变化, 从而对页面进行跳转
- 这两个方法不会触发 popstate 事件, 需要手动触发页面跳转

## 什么是 MVVM

Model-View-ViewModel 是一个软件架构的设计模式, 基于 MVC

- View 层:

视图层, HTML 和 CSS 来构建

- Model 层

数据模型, 反之后端进行各种业务逻辑的数据操作

- ViewModel 层

前端来维护的视图数据层, 双向绑定, 当用户操作 DOM 的时候会会直接更新视图, 开发者不需要在维护, 只需要管理数据拿给用户就好

## Vue 如何实现双向绑定

1. 实现一个监听器 Observer: 对数据对象进行遍历, 包括子属性对象的属性, 利用 Object.defineProperty() 对属性加上 setter 和
   getter, 这样的话, 给这个对象的某个赋值, 就会触发 setter, 那么就能监听到数据变化

2. 实现一个解析器 Compile: 解析 Vue 模板指令, 将模板中的变量都替换成数据, 然后初始化渲染页面视图, 并将每个指令对应的 节点
   绑定更新数据, 添加监听数据的订阅者, 一旦数据有变动, 收到通知, 调用更新函数进行数据更新

3. 实现一个 Watcher: Watcher 订阅者是 Observer 和 Compile 之间的桥梁, 主要任务是订阅 Observer 中的属性值变化的消息,
   当收到属性变化的消息时, 触发解析器 Compile 中对应的更新函数

4. 实现一个订阅器 Dep: 订阅器从用 发布-订阅 设计模式, 用来收集订阅者 Watcher, 对监听器 Observer 和订阅者 Watcher 进行统一管理

## Vue3 了解哪些

1. 监测机制的改变

Proxy 来取代 Object.defineProperty()

2. 插槽改为函数的方式, 这样只会影响子组件的重新渲染, 提升了渲染的性能

3. 对象式的组件声明方式

Vue2 中的组件使用过声明的方式传入一系列的 options, 和 TS 的结合需要通过一些装饰器的方式来做, 虽然能实现功能, 但比较麻烦

Vue3 改变了组件的声明方式, 改成了类式的写法, 这样使得和 TS 的结合变的容易

Vue3 的源码也用 TS 来写, 使得对外暴露的 api 更容易结合 TS

4. 其他改变

- 支持自定义渲染器
- 支持 Fragment (多个根节点) 和 Protal (在 DOM 其他部分渲染组件内容) 组件
- 基于 treeShaking 优化, 提供了更多的内置功能
