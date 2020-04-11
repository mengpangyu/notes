# React Hooks 各个击破

## useState

- 使用状态
    - const [n,setN] = React.useState(0)
    - const [user,setUser] = React.useState({name:'f'})
    
:::tip 注意
1. 不可局部更新
如果 state 是一个对象, 不能部分 setState
2. 地址要变
setState(obj) 如果 obj 地址不变, 那么 React 就认为数据没有变化
:::

- useState 接受函数

```jsx harmony
const [state,setState] = useState(()=>{return initialState})
// 该函数返回初始 state, 且只执行一次
```

- setState 接受函数

```jsx harmony
setN(i => i + 1)
```

## useReducer

>用来践行 Flux/Redux 的思想

- 创建初始值 initialState
- 创建所有操作 reducer(state,action)
- 传给 useReducer, 得到读和写 API
- 调用写 ({type:'操作类型'})

### 如何使用 Reducer 代替 Redux

- 将数据集中在一个 store 对象
- 将所有操作集中在 reducer
- 创建一个 Context
- 创建对数据的读写 API
- 将第四步的内容放到第三步的 Context
- 用 Context.Provider 将 Context 提供给所有组件
- 各个组件用 useContext 获取读写 API

## useContext

- 上下文
    - 全局变量是全局的上下文
    - 上下文是局部的全局变量
    
- 使用方法
    - 使用 C = createContext(initial) 创建上下文
    - 使用 <C.provider> 圈定作用域
    - 在作用域内使用 useContext(C) 来使用上下文

```jsx harmony
import React, { createContext, useState, useContext } from "react";
import ReactDOM from "react-dom";
const rootElement = document.getElementById("root");
const C = createContext(null);
function App() {
  const [n, setN] = useState(0);
  return (
    <C.Provider value={{ n, setN }}>
      <div className="App">
        <Parent />
      </div>
    </C.Provider>
  );
}

function Parent() {
  const { n, setN } = useContext(C);
  const onClick = () => {
    setN(i => i + 1);
  };
  return (
    <div>
      我是爸爸
      <Child />
      {n}
      <button onClick={onClick}>+1</button>
    </div>
  );
}

function Child() {
  return <div>我是儿子</div>;
}
ReactDOM.render(<App />, rootElement);
```

:::tip 注意
useContext 不是响应式的, 是自顶向下的 DOM diff
:::

## useEffect 

- 对环境的改变即为副作用(**对环境的改变**)

### 用途

- 作为 componentDidMount 使用, [] 作为第二个参数
- 作为 componentDidUpdate 使用, 可指定依赖
- 作为 componentWillUnmount 使用, 通过 return
- 三种状态可同时存在

:::tip 注意
如果出现了多个 useEffect, 那么会按顺序执行
:::

### useLayoutEffect

- 布局副作用
- 特点
    - 总是比 useEffect 先执行
    - 任务最好影响了 Layout
- 为了用户体验, 优先使用 useEffect(优先渲染)

## useMemo

### Memo 

- 使得一个组件在 props 变化的情况下才重新渲染

:::danger 危险
有一个 bug, 当一个组件有一个函数事件的时候, 每次函数都不是同一个函数, 所以一直会执行
:::

所以 useMemo 解决了这个问题

### 特点

- 第一个参数是 ()=>value
- 第二个参数是依赖 [m,n]
- 只有当依赖变化时, 才会重新计算新的 value
- 如果依赖不变, 就重用之前的 value


:::tip 注意
如果 value 是个函数, 那么就要写成 useMemo(()=>(x)=>console.log(x))
于是 React 团队就推出了 **useCallback**
:::

```jsx harmony
import React, {useState, useCallback} from "react";
import ReactDOM from "react-dom";
const rootElement = document.getElementById("root");
function App() {
  const [n,setN] = useState(0)
  const [m,setM] = useState(0)
  const onClick = ()=>{
    setN(n => n+1)
  }
  const onClick2 = useCallback(()=>{
    console.log('mm')
  },[m])
  return (
    <div>
      <div><buton onClick={onClick}> +1的按钮</buton>{n}</div>
      <Child2 data={m} onClick={onClick2}/>
    </div>
  );
}

function Child(props){
  console.log('child')
  return (
    <div onClick={props.onClick}>Child: {props.data}</div>
  )
}

const Child2 = React.memo(Child)

ReactDOM.render(<App />, rootElement);
```

## useRef

- 如果需要一个值, 在组件不断 render 时保持不变
- 初始化: const count = useRef(0)
- 读取: count.current
- current 是为了保证两次 useRef 是同一个值

### forwardRef

- 由于 props 不包含 ref, 所以需要 forwardRef

### useImperativeHandle

- 其实就是 setRef

## 自定义 Hook

- 在使用 React Hooks 的时候尽量用自定义 Hook

## Stale Closure

- 过时闭包, 函数引用的变量是之前的过时变量

## 总结

- React Hooks
    - useState 状态
    - useEffect 副作用
        - useLayoutEffect
    - useContext 上下文
    - useReducer Redux
    - useMemo 记忆
        - useCallback 回调
    - useRef 引用
        - useImperativeHandle
    - 自定义 Hook
        - useDebugValue
