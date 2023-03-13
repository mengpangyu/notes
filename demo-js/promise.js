// ES6实现
class Promise {
  PENDING = "pending";
  FULFILLED = "fulfilled";
  REJECTED = "rejected";

  constructor(fn) {
    // if (typeof fn !== 'function') {
    //   throw new TypeError('except a function params');
    // }
    // 初始化需要用到的值
    this.initValue();
    // 修改 this 绑定
    this.initBind();
    // 给 fn 处理回调
    try {
      fn(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  initValue() {
    this.value = null;
    this.reason = null;
    this.state = this.PENDING;
    // 下面两个变量是为了异步中套异步使得状态为 pending, 将异步方法存起来等下次在调用
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
  }

  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  resolve(value) {
    if (this.state === this.PENDING) {
      this.state = this.FULFILLED;
      this.value = value;
      this.resolveCallbacks.forEach((fn) => fn());
    }
  }

  reject(reason) {
    if (this.state === this.PENDING) {
      this.state = this.REJECTED;
      this.reason = reason;
      this.rejectCallbacks.forEach((fn) => fn());
    }
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      reject(new TypeError("Chaining cycle"));
    }
    if ((x && typeof x === "object") || typeof x === "function") {
      let used;
      try {
        const then = x.then;
        if (typeof then === "function") {
          then.call(
            x,
            (y) => {
              if (used) return;
              used = true;
              this.resolvePromise(promise2, y, resolve, reject);
            },
            (r) => {
              if (used) return;
              used = true;
              reject(r);
            }
          );
        } else {
          if (used) return;
          used = true;
          resolve(x);
        }
      } catch (e) {
        if (used) return;
        used = true;
        reject(e);
      }
    } else {
      resolve(x);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    // 实现链式调用
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === this.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.state === this.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.state === this.PENDING) {
        // 当异步中还有异步状态可能就来不及更新为 padding 所以把所有的方法存到数组内, 下次调用在执行
        // 比如在Promise加入setTimeout, 在setTimeout中在执行resolve, 这样如果在resolve之前执行then, 那么状态就是padding, 会拿不到想要的结果, 存储调用方法会避免这种情况发生
        this.resolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.rejectCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });
    return promise2;
  }
}




// 有专门的测试脚本可以测试所编写的代码是否符合PromiseA+的规范。

// 首先，在promise实现的代码中，增加以下代码:

// Promise.defer = Promise.deferred = function () {
//     let dfd = {};
//     dfd.promise = new Promise((resolve, reject) => {
//         dfd.resolve = resolve;
//         dfd.reject = reject;
//     });
//     return dfd;
// }
// 安装测试脚本:

// npm install -g promises-aplus-tests
// 如果当前的promise源码的文件名为promise.js

// 那么在对应的目录执行以下命令:

// promises-aplus-tests promise.js
// promises-aplus-tests中共有872条测试用例。以上代码，可以完美通过所有用例。

// 对上面的代码实现做一点简要说明(其它一些内容注释中已经写得很清楚):

// onFulfilled 和 onFulfilled的调用需要放在setTimeout，因为规范中表示: onFulfilled or onRejected must not be called until the execution context stack contains only platform code。使用setTimeout只是模拟异步，原生Promise并非是这样实现的。

// 在 resolvePromise 的函数中，为何需要usedd这个flag,同样是因为规范中明确表示: If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored. 因此我们需要这样的flag来确保只会执行一次。

// self.onFulfilled 和 self.onRejected 中存储了成功的回调和失败的回调，根据规范2.6显示，当promise从pending态改变的时候，需要按照顺序去指定then对应的回调。

Promise.defer = Promise.deferred = function() {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;


// ES5实现
// /**
//  * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
//  * 2. executor 接受两个参数，分别是 resolve 和 reject
//  * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
//  * 4. promise 的状态一旦确认，就不会再改变
//  * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled,
//  *      和 promise 失败的回调 onRejected
//  * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
//  *      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
//  *      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
//  * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
//  * 8. promise 可以then多次，promise 的then 方法返回一个 promise
//  * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
//  * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
//  * 11.如果 then 返回的是一个promise,那么需要等这个promise，那么会等这个promise执行完，promise如果成功，
//  *   就走下一个then的成功，如果失败，就走下一个then的失败
//  */

// const PENDING = "pending";
// const FULFILLED = "fulfilled";
// const REJECTED = "rejected";
// function Promise(executor) {
//   let self = this;
//   self.status = PENDING;
//   self.onFulfilled = []; //成功的回调
//   self.onRejected = []; //失败的回调
//   //PromiseA+ 2.1
//   function resolve(value) {
//     if (self.status === PENDING) {
//       self.status = FULFILLED;
//       self.value = value;
//       self.onFulfilled.forEach((fn) => fn()); //PromiseA+ 2.2.6.1
//     }
//   }

//   function reject(reason) {
//     if (self.status === PENDING) {
//       self.status = REJECTED;
//       self.reason = reason;
//       self.onRejected.forEach((fn) => fn()); //PromiseA+ 2.2.6.2
//     }
//   }

//   try {
//     executor(resolve, reject);
//   } catch (e) {
//     reject(e);
//   }
// }

// Promise.prototype.then = function(onFulfilled, onRejected) {
//   //PromiseA+ 2.2.1 / PromiseA+ 2.2.5 / PromiseA+ 2.2.7.3 / PromiseA+ 2.2.7.4
//   onFulfilled =
//     typeof onFulfilled === "function" ? onFulfilled : (value) => value;
//   onRejected =
//     typeof onRejected === "function"
//       ? onRejected
//       : (reason) => {
//           throw reason;
//         };
//   let self = this;
//   //PromiseA+ 2.2.7
//   let promise2 = new Promise((resolve, reject) => {
//     if (self.status === FULFILLED) {
//       //PromiseA+ 2.2.2
//       //PromiseA+ 2.2.4 --- setTimeout
//       setTimeout(() => {
//         try {
//           //PromiseA+ 2.2.7.1
//           let x = onFulfilled(self.value);
//           resolvePromise(promise2, x, resolve, reject);
//         } catch (e) {
//           //PromiseA+ 2.2.7.2
//           reject(e);
//         }
//       });
//     } else if (self.status === REJECTED) {
//       //PromiseA+ 2.2.3
//       setTimeout(() => {
//         try {
//           let x = onRejected(self.reason);
//           resolvePromise(promise2, x, resolve, reject);
//         } catch (e) {
//           reject(e);
//         }
//       });
//     } else if (self.status === PENDING) {
//       self.onFulfilled.push(() => {
//         setTimeout(() => {
//           try {
//             let x = onFulfilled(self.value);
//             resolvePromise(promise2, x, resolve, reject);
//           } catch (e) {
//             reject(e);
//           }
//         });
//       });
//       self.onRejected.push(() => {
//         setTimeout(() => {
//           try {
//             let x = onRejected(self.reason);
//             resolvePromise(promise2, x, resolve, reject);
//           } catch (e) {
//             reject(e);
//           }
//         });
//       });
//     }
//   });
//   return promise2;
// };

// function resolvePromise(promise2, x, resolve, reject) {
//   let self = this;
//   //PromiseA+ 2.3.1
//   if (promise2 === x) {
//     reject(new TypeError("Chaining cycle"));
//   }
//   if ((x && typeof x === "object") || typeof x === "function") {
//     let used; //PromiseA+2.3.3.3.3 只能调用一次
//     try {
//       let then = x.then;
//       if (typeof then === "function") {
//         //PromiseA+2.3.3
//         then.call(
//           x,
//           (y) => {
//             //PromiseA+2.3.3.1
//             if (used) return;
//             used = true;
//             resolvePromise(promise2, y, resolve, reject);
//           },
//           (r) => {
//             //PromiseA+2.3.3.2
//             if (used) return;
//             used = true;
//             reject(r);
//           }
//         );
//       } else {
//         //PromiseA+2.3.3.4
//         if (used) return;
//         used = true;
//         resolve(x);
//       }
//     } catch (e) {
//       //PromiseA+ 2.3.3.2
//       if (used) return;
//       used = true;
//       reject(e);
//     }
//   } else {
//     //PromiseA+ 2.3.3.4
//     resolve(x);
//   }
// }
