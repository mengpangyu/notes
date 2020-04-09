# React 的函数组件

## 创建方式

```jsx harmony
const Hello1 = (props) => {
  return <div>{props.message}</div>
}

const Hello2 = props => <div>{props.message}</div>

function Hello3(props){
  return <div>{props.message}</div>
}
```

- 实现一个简单的 +1 
```jsx harmony
import React,{useState} from 'react';
const  App  = props => {
  const [n,setN] = useState(0)
  const onClick = () => {
    setN(n+1)
  }
  return (
    <div>
      {n}
      <button onClick={onClick}>+1</button>
    </div>
  )
}
export default App;
```
>消除了 this

## 面临的两个问题

- 函数组件没有 state
    - Hooks API 推出的 useState 可以解决
- 函数组件没有生命周期
    - Hooks API 推出的 useEffect 可以解决

### useEffect

```jsx harmony
// 模拟 componentDidMount
useEffect(()=>{console.log('第一次渲染')}, [])

// 模拟 componentDidUpdate 
useEffect(()=>{console.log('属性任意变更')})
useEffect(()=>{console.log('n变了')},[n])

// 模拟 componentWillUnmount
useEffect(()=>{
  console.log('第一次渲染')
  return ()=>{
    console.log('组件要死了')
  }
})
```

## 其他的生命周期怎么模拟

- constructor
    - 函数组件执行的时候, 就相当于 constructor
- shouldComponentUpdate 
    - React.memo 和 useMemo 可以解决
- render 
    - 函数组件返回值就是 render 的返回值


## 自定义 Hooks

```jsx harmony
import React,{useState,useEffect} from 'react';
const useUpdate = (fn,dep) => {
  const [count,setCount] = useState(0)
  useEffect(()=>{
    setCount(x=>x+1)
  },[dep])
  useEffect(()=>{
    if(count > 1){
      fn()
    }
  },[count,fn])
}
const  App  = props => {
  const [n,setN] = useState(0)
  const onClick = () => {
    setN(n+1)
  }
  useUpdate(()=>{
    console.log('第一次不变,剩下的变了')
  },n)
  return (
    <div>
      {n}
      <button onClick={onClick}>+1</button>
    </div>
  )
}
export default App;
```


## 总结

**能用函数组件就用函数组件**