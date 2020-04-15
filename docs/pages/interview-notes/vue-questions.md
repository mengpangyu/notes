# Vue 面试题

## watch 和 computed 和 methods 区别是什么?

- 思路: 先翻译单词, 在阐述作用, 最后强行找不同
- 要点:
    - computed 和 methods 相比
        - **computed 有缓存**, 如果 computed 属性依赖没有变化, 那么 computed 属性就不会重新计算, methods 则是看到一次计算一次
    - watch 和 computed 相比
        - computed 是计算出一个属性, 而 watch 则可能是做**别的事情(如上报数据)**
        
## Vue 有哪些生命周期钩子函数? 分别有什么用?

- beforeCreated: 刚刚被创建, 属性计算之前
- created: 创建完成, 属性已绑定, DOM 未生成, $el 不存在
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
- Vue 不能检测对象属性的添加或删除, 解决方案是手动调用 Vue.set 或者 this.$set

:::danger 危险
如果面试官问 Vue 的双向绑定是啥?

v-model 就是双向绑定
:::

[自己写的一篇博客](https://zhuanlan.zhihu.com/p/99487325)

## Vue.set 是做什么用的?

- Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对属性执行 **getter/setter** 转化，所以属性必须在 **data 对象上存在才能让 Vue 将它转换为响应式的**
- 对于已经创建的实例，Vue **不允许动态添加根级别的响应式属性**
- 但是可以用 Vue.set(对象,属性,值) 或 this.$set() 来设置

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
    - History 模式: 就是用到一个 Html5 新加的 API, 利用 **history.pushState** 来改变路由但是不跳转页面, [自己写的一篇路由博客](https://zhuanlan.zhihu.com/p/124939557)
    - 导航守卫: 路由跳转过程中的一些钩子函数, 全局的、单个路由独享的、组件内的三种
        - **全局路由钩子:** beforeEach(to,from, next)、beforeResolve(to,from, next)、afterEach(to,from)
        - **独享路由钩子:** beforeEnter(to,from, next)
        - **组件内路由钩子:** eforeRouteEnter(to,from, next)、beforeRouteUpdate(to,from, next)、beforeRouteLeave(to,from, next)
    - 路由懒加载: 分割路由对应的不同组件, `import('./Foo.vue') // 返回 Promise`
- 常用 API: 
    - router-link: 组件支持用户在具有路由功能的应用中(点击)导航, 通过 **to 属性指定目标地址, 默认渲染成带有正确链接的 a 标签**
    - router-view: **渲染路径匹配到的视图组件**, 可内嵌自己的 router-view
    - this.$router.push: 这个方法会向 **history 栈添加一个新的记录,** 所以, 当用户点击浏览器后退按钮时, 则回到之前的 URL
    - this.$router.replace: 跟 router.push 很像, 唯一的不同就是, **它不会向 history 添加新记录**, 而是跟它的方法名一样 —— 替换掉当前的 history 记录
    - this.$route.params: **表示当前的参数**即冒号后面的东西组成的对象