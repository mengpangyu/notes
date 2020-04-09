# Promise

## 基础例子

```js
function fn(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      let n = parseInt(Math.random()*6+1)
      resolve()
    },1000)
  })
}
fn().then(
(x)=>{console.log('出现的数字是'+x)},
()=>{console.log('失败了')}
)
```

- resolve: 成功后回调
- reject: 失败后回调
- 学习先知其然, 而后在知其所以然, 不能着急


## await、async

```js
function fn(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      let n = parseInt(Math.random()*6+1)
      resolve()
    },1000)
  })
}

async function test(){
  let n = await fn()
  console.log(n)
}

test()
```
- test 函数是异步的, 必须用 async 标记
- await 必须放在一个 async 函数里
- await 可以接一个 Promise

