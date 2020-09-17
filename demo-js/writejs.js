// 手写 reduce
Array.prototype.myReduce = function(fn, base) {
  if (typeof fn !== 'function') throw new TypeError('arguments[0] must be a function')

  const initArr = this
  const arr = initArr.concat()
  let index, result

  if (arguments.length === 2) {
    arr.unshift(base)
    index = 0
  } else {
    index = 1
  }
  if (arr.length === 1) result = arr[0]

  while (arr.length > 1) {
    result = fn.call(null, arr[0], arr[1], index, initArr)
    index++
    arr.splice(0, 2, result)
  }
  return result
}

// 手写 map

Array.prototype.myMap = function(fn) {
  var newArr = []
  for (var i = 0; i < this.length; i++) {
    newArr.push(fn(this[i], i, this)) //this指向调用newMap方法的数组
  }
  return newArr
}

Array.prototype.myMap = function(fn, Arg) {
  var res = []
  this.reduce((prev, curr, index, array) => {
    res.push(fn.call(Arg, curr, index, array))
  }, 0)
  return res
}

// 手写 fill

Array.prototype.myFill = function(value, start = 0, end = this.length) {
  for (let i = start; i < end; i++) {
    this[i] = value
  }
}

// 手写 filter

Array.prototype.myFilter = function(fn, Arg) {
  if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`)
  const arr = this
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const value = fn.call(Arg, arr[i], i, arr)
    value && result.push(arr[i])
  }
  return result
}

// 手写 find

Array.prototype.myFind = function(fn, start = 0, end = this.length) {
  for (let i = start; i < end; i++) {
    if (fn.call(this, this[i], i, this)) {
      return this[i]
    }
  }
}

Array.prototype.myFindIndex = function(fn, start = 0, end = this.length) {
  for (let i = start; i < end; i++) {
    if (fn.call(this, this[i], i, this)) {
      return i
    }
  }
  return -1
}

// 实现观察者模式

function observerMode() {
  const eventQueue = new Set() // 事件队列
  const addEvent = (event) => eventQueue.add(event) // 加入事件
  const printObj = () => console.log(`name: ${person.name}`) // 打印事件
  const observer = (obj) =>
    new Proxy(obj, {
      set(obj, prop, value, receiver) {
        const result = Reflect.set(...arguments) // 改变属性
        eventQueue.forEach((event) => event()) // 执行事件
        return result // 返回结果 true / false
      },
    })
  const person = observer({ name: 'chauncey', age: 11 }) // 返回被观察后的对象

  addEvent(printObj) // 加入事件队列

  person.age = 12 // 改变属性执行事件
}
observerMode()
