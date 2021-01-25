// // 实现一个完整的 promise
// class Promise {
//   constructor(executor) {
//     // 参数校检
//     if (typeof executor !== 'function') {
//       throw new TypeError(`Promise resolver ${executor} is not a function`)
//     }

//     this.initValue()
//     this.initBind()

//     try {
//       executor(this.resolve, this.reject)
//     } catch (e) {
//       this.reject(e)
//     }
//   }

//   // 绑定 this
//   initBind() {
//     this.resolve = this.resolve.bind(this)
//     this.reject = this.reject.bind(this)
//   }

//   // 初始化值
//   initValue() {
//     this.value = null // 终值
//     this.reason = null // 拒因
//     this.state = Promise.PENDING // 状态
//     this.onFulfilledCallbacks = [] // 成功回调
//     this.onRejectedCallbacks = [] // 失败回调
//   }

//   resolve(value) {
//     // 成功后的一系列操作(状态的改变, 成功回调的执行)
//     if (this.state === Promise.PENDING) {
//       this.state = Promise.FULFILLED
//       this.value = value
//       this.onFulfilledCallbacks.forEach(fn => fn(this.value))
//     }
//   }

//   reject(reason) {
//     // 失败后的一系列操作(状态的改变, 失败回调的执行)
//     if (this.state === 'pending') {
//       this.state = Promise.REJECTED
//       this.reason = reason
//       this.onRejectedCallbacks.forEach(fn => fn(this.reason))
//     }
//   }

//   then(onFulfilled, onRejected) {
//     // 参数校检
//     if (typeof onFulfilled !== 'function') {
//       onFulfilled = function(value) {
//         return value
//       }
//     }

//     if (typeof onRejected !== 'function') {
//       onRejected = function(reason) {
//         throw reason
//       }
//     }

//     // 实现链式调用, 且改变了后面then的值, 必须通过新的实例
//     let promise2 = new Promise((resolve, reject) => {
//       if (this.state === Promise.FULFILLED) {
//         setTimeout(() => {
//           try {
//             const x = onFulfilled(this.value)
//             Promise.resolvePromise(promise2, x, resolve, reject)
//           } catch (e) {
//             reject(e)
//           }
//         })
//       }

//       if (this.state === Promise.REJECTED) {
//         setTimeout(() => {
//           try {
//             const x = onRejected(this.reason)
//             Promise.resolvePromise(promise2, x, resolve, reject)
//           } catch (e) {
//             reject(e)
//           }
//         })
//       }

//       if (this.state === Promise.PENDING) {
//         this.onFulfilledCallbacks.push(value => {
//           setTimeout(() => {
//             try {
//               const x = onFulfilled(value)
//               Promise.resolvePromise(promise2, x, resolve, reject)
//             } catch (e) {
//               reject(e)
//             }
//           })
//         })

//         this.onRejectedCallbacks.push(reason => {
//           setTimeout(() => {
//             try {
//               const x = onRejected(this.reason)
//               Promise.resolvePromise(promise2, x, resolve, reject)
//             } catch (e) {
//               reject(e)
//             }
//           })
//         })
//       }
//     })

//     return promise2
//   }
// }

// Promise.PENDING = 'pending'
// Promise.FULFILLED = 'fulfilled'
// Promise.REJECTED = 'reject'
// Promise.resolvePromise = function(promise2, x, resolve, reject) {
//   // x 与 promise 相等
//   if (promise2 === x) {
//     reject(new TypeError('Chaining cycle detected for promise'))
//   }

//   let called = false
//   if (x instanceof Promise) {
//     // 判断 x 为 Promise
//     x.then(
//       value => {
//         Promise.resolvePromise(promise2, value, resolve, reject)
//       },
//       reason => {
//         reject(reason)
//       }
//     )
//   } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
//     // x 为对象或函数
//     try {
//       const then = x.then
//       if (typeof then === 'function') {
//         then.call(
//           x,
//           value => {
//             if (called) return
//             called = true
//             Promise.resolvePromise(promise2, value, resolve, reject)
//           },
//           reason => {
//             if (called) return
//             called = true
//             reject(reason)
//           }
//         )
//       } else {
//         if (called) return
//         called = true
//         resolve(x)
//       }
//     } catch (e) {
//       if (called) return
//       called = true
//       reject(e)
//     }
//   } else {
//     resolve(x)
//   }
// }

// console.log(1)
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(()=>{
//     console.log(3)
//     resolve('dd')
//   })
// }).then(data=>{
//   return p1
// }).then(data => console.log(data)).then(data=>console.log(data))
// console.log(2)

// Promise 标准解读
// 1. 只有一个 then 方法, 没有 catch, race, all 方法, 甚至没有构造函数
// 2. then 方法返回一个新的 Promise
// 3. 不同的 Promise 的实现需要可以相互调用
// 4. Promise 的初始态为 pending, 可以转换为 fulfilled 或 rejected, 状态确定就不能转换

try{
  export default MyPromise
}catch(e){}

function Promise(executor){
  const self = this
  self.status = 'pending'
  self.onResolvedCallback = []
  self.onRejectedCallback = []
  function resolve(value){
    if(value instanceof MyPromise){
      return value.then(resolve,reject)
    }
    setTimeout(()=>{
      if(self.status === 'pending'){
        self.status = 'resolved'
        self.data = value
        for(let i=0;i<self.onResolvedCallback.length;i++){
          self.onResolvedCallback[i](value)
        }
      }
    })
  }
  function reject(reason){
    setTimeout(()=>{
      if(self.status === 'pending'){
        self.status = 'rejected'
        self.data = reason
        for(let i=0;i<self.onRejectedCallback.length;i++){
          self.onRejectedCallback[i](reason)
        }
      }
    })
  }
  try{
    executor(resolve,reject)
  }catch(reason){
    reject(reason)
  }
}

function resolvePromise(promise2,x,resolve,reject){
  const then 
  const thenCalledOrThrow = false
  if(promise2 === x){
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  if(x instanceof Promise){
    if(x.status === 'pending'){
      x.then((v)=>{
        resolvePromise(promise2,v,resolve,reject)
      },reject)
    }else{
      x.then(resolve,reject)
    }
    return 
  }
  if(x!==null && typeof x==='object' || typeof x==='function'){
    try{
      then = x.then
      if(typeof then === 'function'){
        then.call(x,function rs(y){
          if(thenCalledOrThrow) return
          thenCalledOrThrow = true
          return resolvePromise(promise2,y,resolve,reject)
        },function rj(r){
          if(thenCalledOrThrow) return
          thenCalledOrThrow = true
          return reject(r)
        })
      }else{
        resolve(x)
      }
    }catch(e){
      if(thenCalledOrThrow) return
      thenCalledOrThrow = true
      return reject(e)
    }
  }else{
    resolve(x)
  }
}

MyPromise.prototype.then = function(onResolved,onRejected){
  const self = this
  const promise2
  onResolved = typeof onResolved === 'function' ? onResolved : function(v){return v}
  onRejected = typeof onRejected === 'function' ? onRejected : function(r){throw r}
  if(self.status === 'resolved'){
    return promise2 = new MyPromise((resolve,reject)=>{
      setTimeout(()=>{
        try{
          const x = onResolved(self.data)
          resolvePromise(promise2,x,resolve,reject)
        }catch(reason){
          reject(reason)
        }
      })
    })
  }
  if(self.status === 'rejected'){
    return promise2 = new MyPromise((resolve,reject)=>{
      setTimeout(()=>{
        try{
          const x = onRejected(self.data)
          resolvePromise(promise2,x,resolve,reject)
        }catch(reason){
          reject(reason)
        }
      })
    })
  }
  if(self.status === 'pending'){
    return promise2 = new MyPromise((resolve,reject)=>{
      self.onResolvedCallback.push(value=>{
        try{
          const x = onResolved(value)
          resolvePromise(promise2,x,resolve,reject)
        }catch(r){
          reject(r)
        }
      })
      self.onRejectedCallback.push((reason)=>{
        try {
          const x = onRejected(reason) 
          resolvePromise(promise2,x,resolve,reject)
        } catch (r) {
          reject(r) 
        }
      })
    })
  }
}
MyPromise.prototype.catch = function(onRejected){
  return this.then(null,onRejected)
}
MyPromise.deferred = MyPromise.defer = function(){
  const dfd = {}
  dfd.promise = new MyPromise((resolve,reject)=>{
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}