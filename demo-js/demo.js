class myPromise {
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('必须接受一个函数')
    }
    this.initValue()
    this.initBind()
    fn(this.resolve, this.reject)
  }

  initValue() {
    this.value = null
    this.reason = null
    this.state = 'padding'
    this.resolveCallbacks = []
    this.rejectCallbacks = []
  }

  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  resolve(value) {
    if (this.state === 'padding') {
      this.state = 'fulfilled'
      this.value = value
      this.resolveCallbacks.forEach(fn => fn(this.value))
    }
  }

  reject(reason) {
    if (this.state === 'padding') {
      this.state = 'rejected'
      this.reason = reason
      this.rejectCallbacks.forEach(fn => fn(this.reason))
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function (value) {
        return value
      }
    }
    if (typeof onRejected !== 'function') {
      onRejected = function (reason) {
        return reason
      }
    }
    let promise2 = new myPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            Promise.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            Promise.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.state === 'padding') {
        this.resolveCallbacks.push(value => {
          setTimeout(() => {
            try {
              const x = onFulfilled(value)
              Promise.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.rejectCallbacks.push(reason => {
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

Promise.resolvePromise = function (promise2, x, resolve, reject) {
  // 如果 相等
  if (promise2 === x) {
    reject(new Error('不能自己调用自己, 这样会形成死循环'))
  }
  // 创建防止重复调用的变量
  let called = false
  // x 是否为 promise
  if (x instanceof Promise) {
    x.then(data => Promise.resolvePromise(promise2, data, resolve, reject),
      reason => reject(reason))
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // x 为对象或函数
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(x, data => {
          // 正在完成当前promise, 则返回
          if (called) return
          called = true
          Promise.resolvePromise(promise2, data, resolve, reject)
        }, reason => {
          if (called) return
          called = true
          reject(reason)
        })
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
console.log(1)
const p1 = new myPromise((resolve, reject) => {
  setTimeout(()=>{
    console.log(3)
    resolve('dd')
  })
}).then(data=>{
  return p1
}).then(data => console.log(data)).then(data=>console.log(data))
console.log(2)
