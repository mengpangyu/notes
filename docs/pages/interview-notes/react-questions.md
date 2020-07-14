# React 技巧

## 受控组件与非受控组件

```jsx harmony
<FInput value={x} onChange={fn}/> // 受控组件
<FInput defaultValue={x} ref={input}/> // 非受控组件
```

区别: 

- 受控组件的状态由开发者维护
- 非受控组件的状态由组件自身维护(不受开发者控制)

## React 有哪些生命周期函数? 分别有什么用? (Ajax 请求放在哪个阶段)

- componentDidMount
- componentDidUpdate
- shouldComponentUpdate
- componentDidUnmount

ajax 放在 componentDidMount

## React 如何实现组件通信?

- 父子靠 props
- 爷孙靠两次 props
- 任意组件靠 Redux(Hooks)

## shouldComponentUpdate 有什么用?

- 用于没有在必要更新UI的时候返回 false

## 什么是高阶组件?

- 高阶组件就是一个函数, 且该函数接收一个组件作为参数, 并返回一个新的组件
- React Redux 的 connect 就是一个高阶组件, 比如 connect(mapState)(MyComponent) 接收 MyComponent, 
返回一个具有新状态的 MyComponent 组件

## React diff 的原理是什么?

>diff策略

1. Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
2. 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。
3. 对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。

以上三个策略, React 分别对 tree diff, component diff 和 element diff 进行算法优化, 事实也证明这三个提前策略是
喝了且准确的, 他保证了整体界面建构的性能

>tree diff

基于策略一, React 对树的算法进行了简明的优化, 对树进行分层比较, 两棵树只会对同一层次的节点进行比较

React 通过 updateDepth 对 Virtual DOM 树进行层级控制, 当发现节点不存在, 那么该节点和其子节点就会删除, 不会用于进一步比较

>component diff

React 是基于组件构建应用的, 对于组件间的比较所采取的策略也是简介高效

如果同一类型组件, 安装原策略比较 Virtual DOM tree

如果不是, 则将该组件判断为 dirty component, 从而替换整个组件下所有节点

对于同一类型组件, 有可能 Virtual DOM 没有任何变化, 如果确切知道这点可以节省大量的 diff 运算时间, 因此 React 允许
用户通过 shouldComponentUpdate 来判断该组件是否需要 diff

>element diff 

当节点处于同一层级, React diff 提供了三种节点操作, 分别为, INSERT_MARKUP(插入), MOVE_EXISTING(移动) 和 REMOVE_NODE(删除)

- INSERT_MARKUP: 新的 component 类型不在老集合里, 即要对新节点执行插入
- MOVE_EXISTING: 在老集合里有新 component 类型, 且 element 是可更新的类型, generateComponentChildren 已调用 receiveComponent, 这种情况下
pervChild = nextChild, 就需要移动操作, 可以复用以前的 DOM 节点
- REMOVE_NODE: 在老 component 类型, 在新集合里有, 但对应的 element 不同贼不能直接复用和更新, 需要执行删除操作, 或者老 component 不在新集合里的, 也要执行删除操作


## Redux 是什么?

Redux 是 JavaScript 状态容器, 提供可预测化的状态管理, 重点是状态管理

- action: 数据从应用传到 store 的有效载体, 一般来说会通过 store.dispatch() 传入
- reducer: 制定了应用状态的变化如何响应 actions 并发送到 store 的, 就相当于对 actions 的描述
- store: 把 actions reducer 连到一起的对象
    - getState(): 获取 state
    - dispatch(action) 更新 state
    - subscribe(listener) 注册监听器
    - subscribe(listener) 返回的函数注销监听器
    - store 只有一个, 如果分析处理逻辑, 使用 reducer
- 单向数据流: 所有的数据都遵循相同的生命周期, 这样可以让应用变得更加可控, 避免使用多个重复数据

## connect 的原理是什么?

react-redux 提供的一个 api, connect 的作用是把组件和 store 连接起来, 产生一个新的组件, connect 是高阶组件

provider 可以让你整个 app 访问到 redux store 的数据

