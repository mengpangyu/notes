# React 的 class 组件

## 英语小课堂

|英语 |  翻译 | 英语 | 翻译 | 
|----|----|----|----|
|derived|导出的|property|属性|
|render |渲染|state|状态|
|super class  |超类,父类|mount|挂载|

## 两种方式创建 Class 组件

1. ES5方式(过时)

```jsx harmony
import React from 'react'

const A = React.createClass({
    render(){
        return (<div>hi</div>)
    }
})

export default A
```

2. ES6方式(推荐)

```jsx harmony
import React from 'react'

class B extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<div>hi</div>)
    }
}

export default B
```
:::tip 注意
extends、constructor、super 强行记忆
:::

## Props 外部数据

### 传入 props 给 B 组件

```jsx harmony
class Parent extends React.Component{
    constructor(props){
        super(props)
        this.state = {name:'meng'}
    }
    onClick = () => {}
    render(){
        return <B name={this.state.name}
                onClick={this.onClick}>hi</B>
    }
}
```

外部数据被包装成一个对象
{name:'frank',onClick:...,children:'hi'}
    
### 初始化 Props

```jsx harmony
class Parent extends React.Component{
    constructor(props){
        super(props)
    }
    render(){}
}
```

这是必写规则, this.props 就是外部属性

:::tip 注意
props 应该**外部更新**, 内部不能改
:::

### 相关钩子

:::danger 危险
componentWillReceiveProps 钩子
已被弃用
防止以后工作中出现这类钩子, 能看懂它
:::

### Props 作用

- 接受外部数据
    - 只能读不能写
    - 外部数据由父组件传递

- 接受外部函数
    + 在恰当的时机, 调用该函数
    + 该函数一般是父组件的函数
    

## State 内部数据

### 初始化 State

```jsx harmony
class Parent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: {name: 'chauncey',age:18}
        } 
    }
    render(){}
}
```
    
### 读写 State

- 读
    - this.state
- 写
1. this.setState(newState,fn)
:::tip 注意
setState 不会立马改变 this.state, 会在当前代码运行完后, 
再去更新 this.state, 从而触发 UI 更新
:::

2. this.setState((state,props)=>newState,fn)
    - 利用**函数**的方式更加容易理解
    - fn 会在写入成功后执行
    
3. shallow merge

setState 会自动将 state 合并, 但只能合并一层

## 生命周期钩子

### 类比如下代码

```js
let div = document.createElement('div')
// 这是 div 的 create/construct 过程

div.textContent = 'hi'
// 这是初始化 state

document.body.appendChild(div)
// 这是 div 的 mount 过程

div.textContent = 'hi2'
// 这是 div 的 update 过程

div.remove() 
// 这是 div 的 unmount 过程
```
React 组件也有这些过程, 称之为**生命周期**
- constructor() 在这里初始化 state
- shouldComponentUpdate() return false 阻止更新
- render() 创建虚拟 DOM
- componentDidMount() 组件已经出现在页面
- componentDidUpdate() 组件已经更新
- componentWillUnmount() 组件将死

### constructor

- 初始化 props
- 初始化 state
- 用来写 bind this
- 可省咯, 自动写


### shouldComponentUpdate

- 返回 true 表示不阻止UI更新
- 返回 false 表示阻止UI|更新

:::warning 面试
问: shouldComponentUpdate 有什么用?

答: 它允许我们手动判断是否要进行组件更新, 我们可以根据应用场景灵活的设置返回值, 以避免不必要的更新
:::

**React.pureComponent** 可以代替 shouldComponentUpdate

>PureComponent 会在 render 之前对比新 state 和旧 state 的每一个 key，以及新 props 和旧 props 的每一个 key。
 如果所有 key 的值全都一样，就不会 render；如果有任何一个 key 的值不同，就会 render。

### render

- 展示视图
- 只有一个根元素
- 如果有两个根元素, 就要用 <React.Fragment> 包起来
- `<React.Fragment>` 可以缩写成 `<></>` 

技巧:

- 可以写 `if else` 
- 可以写 `?:` 表达式
- 不能直接写 `for` 循环, 需要用数组
- 可以写 `array.map` (循环)
- 所有循环都必须加 `key`

### componentDidMount

- 在元素插入页面后执行代码, 这个代码依赖 DOM
- 获取 DOM 元素的属性, 就可以在这个钩子里写
- 此处可以发起**加载数据的 AJAX 请求**
- 首次渲染会执行此钩子
- 可以用 ref 来获取 DOM 元素引用

### componentDidUpdate

- 在视图更新后执行代码
- 此处也可以**发起 AJAX 请求, 用于更新数据请求**
- 首次渲染不会执行此钩子
- 在此处 setState 可能引起无限循环, 除非放在 if 里
- 若 shouldComponentUpdate 返回 false, 则不触发此钩子

### componentWillUnmount

- 组件将要被移出页面(到内存)然后被销毁(内存干掉)时执行代码 
- unmount 过得组件不会再次 mount
- 谁污染谁治理

### 总结

**首次渲染:** constructor --> render --> 更新UI --> componentDidMount

**再次渲染:** props 变了 / setState / forceUpdate --> shouldComponentUpdate --> 更新UI --> componentDidUpdate

**销毁:** ... --> componentWillUnmount