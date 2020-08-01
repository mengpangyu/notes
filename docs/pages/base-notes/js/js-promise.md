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

## 手写一个 promise

```js
class Promise {
    constructor(executor) {
      // 参数校检
      if (typeof executor !== 'function') {
        throw new TypeError(`Promise resolver ${executor} is not a function`)
      }
  
      this.initValue()
      this.initBind()
  
      try {
        executor(this.resolve, this.reject)
      } catch (e) {
        this.reject(e)
      }
    }
  
    // 绑定 this
    initBind() {
      this.resolve = this.resolve.bind(this)
      this.reject = this.reject.bind(this)
    }
  
    // 初始化值
    initValue() {
      this.value = null // 终值
      this.reason = null // 拒因
      this.state = Promise.PENDING // 状态
      this.onFulfilledCallbacks = [] // 成功回调
      this.onRejectedCallbacks = [] // 失败回调
    }
  
    resolve(value) {
      // 成功后的一系列操作(状态的改变, 成功回调的执行)
      if (this.state === Promise.PENDING) {
        this.state = Promise.FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach(fn => fn(this.value))
      }
    }
  
    reject(reason) {
      // 失败后的一系列操作(状态的改变, 失败回调的执行)
      if (this.state === 'pending') {
        this.state = Promise.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn(this.reason))
      }
    }
  
    then(onFulfilled, onRejected) {
      // 参数校检
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
  
      // 实现链式调用, 且改变了后面then的值, 必须通过新的实例
      let promise2 = new Promise((resolve, reject) => {
        if (this.state === Promise.FULFILLED) {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              Promise.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        }
  
        if (this.state === Promise.REJECTED) {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              Promise.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        }
  
        if (this.state === Promise.PENDING) {
          this.onFulfilledCallbacks.push(value => {
            setTimeout(() => {
              try {
                const x = onFulfilled(value)
                Promise.resolvePromise(promise2, x, resolve, reject)
              } catch (e) {
                reject(e)
              }
            })
          })
  
          this.onRejectedCallbacks.push(reason => {
            setTimeout(() => {
              try {
                const x = onRejected(this.reason)
                Promise.resolvePromise(promise2, x, resolve, reject)
              } catch (e) {
                reject(e)
              }
            })
          })
        }
      })
  
      return promise2
    }
  }
  
  Promise.PENDING = 'pending'
  Promise.FULFILLED = 'fulfilled'
  Promise.REJECTED = 'reject'
  Promise.resolvePromise = function(promise2, x, resolve, reject) {
    // x 与 promise 相等
    if (promise2 === x) {
      reject(new TypeError('Chaining cycle detected for promise'))
    }
  
    let called = false
    if (x instanceof Promise) {
      // 判断 x 为 Promise
      x.then(
        value => {
          Promise.resolvePromise(promise2, value, resolve, reject)
        },
        reason => {
          reject(reason)
        }
      )
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      // x 为对象或函数
      try {
        const then = x.then
        if (typeof then === 'function') {
          then.call(
            x,
            value => {
              if (called) return
              called = true
              Promise.resolvePromise(promise2, value, resolve, reject)
            },
            reason => {
              if (called) return
              called = true
              reject(reason)
            }
          )
        } else {
          if (called) return
          called = true
          resolve(x)
        }
      } catch (e) {
        if (called) return
        called = true
        reject(e)
      }
    } else {
      resolve(x)
    }
  }
```