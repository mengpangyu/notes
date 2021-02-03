// 永远不要在弘任务中抛出异常,因为弘任务脱离了上下文环境,异常无法被当前作用域截获
// 在微任务中可以抛出异常,没有离开作用域
// 第三方函数在弘任务内调用时,异常无法捕获,但不会影响当前调用栈的执行,但这样不行,不能让第三方函数做这种事,改为reject的方式
const fetch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    });
  });
};

fetch()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("error: " + err);
  });

// 第三方函数抛出异常
function thirdFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("收敛一些");
    });
  });
}

Promise.resolve(true)
  .then((resolve, reject) => {
    // return thirdFunction();
  })
  .catch((error) => {
    console.log("捕获异常" + error);
  });

// generate 与 async await
const timeOut = (time = 0) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time + 200);
    }, time);
  });

function* main() {
  const result1 = yield timeOut(200);
  console.log(result1);
  const result2 = yield timeOut(result1);
  console.log(result2);
  const result3 = yield timeOut(result2);
  console.log(result3);
}

function step(generator) {
  const gen = generator();
  let lastValue;
  return () =>
    Promise.resolve(gen.next(lastValue).value).then((value) => {
      lastValue = value;
      return lastValue;
    });
}

const run = step(main);

function recursive(promise) {
  promise().then((result) => {
    if (result) {
      recursive(promise);
    }
  });
}

//recursive(run);

// async await 捕获异常 try catch
function fetch1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject();
    });
  });
}

async function main1() {
  const result = await fetch1();
  console.log(result);
}

// main1();

// 业务场景
const successRequest = () => Promise.resolve("a");
const failRequest = () => Promise.reject("b");
const classDecorator = (target) => {
  const keys = Object.getOwnPropertyNames(target.prototype);
  console.log("classA keys", keys);
};

@classDecorator
class A {
  sayName() {
    console.log("classA ascoders");
  }
}

class Action {
  async successRequest() {
    const result = await successRequest();
    console.log("successRequest", "处理返回值", result);
  }
  async failRequest() {
    const result = await failRequest();
    console.log("failRequest", "处理返回值", result);
  }
  async allRequest() {
    const result1 = await successRequest();
    console.log("allRequest", "处理返回值 success", result1);
    const result2 = await failRequest();
    console.log("allRequest", "处理返回值 success", result2);
  }
}
const action = new Action();
action.successRequest();
action.failRequest();
action.allRequest();
