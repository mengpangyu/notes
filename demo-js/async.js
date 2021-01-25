const getData = () => new Promise(resolve => setTimeout(() => resolve("data"), 1000));

// async function text() {
//   const data = await getData();
//   console.log(`data ${data}`);
//   const data2 = await getData();
//   console.log(`data2 ${data2}`);
//   return () => console.log("hja");
// }
//
// text().then(res => res());

function* testG() {
  const data = yield getData();
  console.log(`data ${data}`);
  const data2 = yield getData();
  console.log(`data2 ${data2}`);
  return "success";
}

//
// const gen = testG();
//
// const dataPromise = gen.next();
//
// dataPromise.value.then(value1 => {
//   const data2Promise = gen.next(value1); // 只有下个 next 传入值上个 data 才能获取值
//   data2Promise.value.then(value2 => {
//     gen.next(value2); // 同理
//   });
// });

// 实现

function asyncToGenerator(generatorFunc) {
  // 返回一个函数, 接收一个 generator 迭代器
  return function () {
    const gen = generatorFunc.apply(this, arguments);
    // 返回一个 promise
    return new Promise((resolve, reject) => {
      // key 有两种值 'next' 'throw'
      // arg 是传入 next 的值
      function step(key, arg) {
        let generatorResult;
        // 需要处理一下错误
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          // 如果出错, 那么就 reject 异常
          return reject(error);
        }
        // value 是返回的 promise, done 是否完成
        const {value, done} = generatorResult;
        if (done) {
          return resolve(value);
        } else {
          // Promise.resolve 只有 value 为 promise 的时候才能调用 then
          return Promise.resolve(value).then(val => step("next", val), err => step("throw", err));
        }
      }

      step("next");
    });
  };
}


const promise = asyncToGenerator(testG)();

promise.then(res => console.log(res));
