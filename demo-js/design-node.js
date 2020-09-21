// 工厂模式

function factoryMode() {
  function Person() {}

  Person.prototype.make = function(who, ...args) {
    if (typeof this[who] === 'function') {
      const func = this[who]
      function temp() {}
      // 把工厂对象的原型换到工厂上, 所有的物品都是出自工厂而不是各自的实例
      temp.prototype = Person.prototype
      func.prototype = new temp()
      return new func(...args)
    }
  }

  Person.prototype.extends = function(obj) {
    for (let key in obj) {
      this[key] = obj[key]
    }
  }

  Person.prototype.extends({
    boy: function(name) {
      console.log(`I am a boy and name is ${name}`)
    },
    girl: function(name) {
      console.log(`I am a girl and name is ${name}`)
    },
  })
  const person = new Person()
  person.make('boy', 'bob')
}

// 单例模式

// 全局变量可被修改, 有安全问题
function instanceMode() {
  let instance = null
  function createInstance() {
    if (instance) return instance
    instance = this
    this.name = 'chauncey'
    this.age = 11
  }
  const p1 = new createInstance()
  const p2 = new createInstance()
  console.log(p1 === p2)
}

// 观察者

function observerMode() {
  const EventBus = {
    events: [], // 事件队列
    addEvent: function(eventName, callback) {
      // 添加事件
      if (!this.events[eventName]) {
        this.events[eventName] = []
      }
      const obj = callback
      this.events[eventName].push(obj)
    },
    publishEvent: function(eventName, ...args) {
      // 触发事件
      if (!this.events[eventName]) throw Error('没有注册此事件')
      for (let i = 0; i < this.events[eventName].length; i++) {
        const callback = this.events[eventName][i]
        callback.call(eventName, eventName, ...args)
      }
    },
  }
  EventBus.addEvent('click', (word) => {
    console.log('hello', word)
  })
  EventBus.addEvent('keyup', (word) => {
    console.log('hello', word)
  })
  EventBus.addEvent('keyup', (word) => {
    console.log('hello', word)
  })
  EventBus.publishEvent('click')
  EventBus.publishEvent('keyup')
}

// 策略模式

function strategyMode() {
  const strategy = {
    slow: function() {
      console.log('慢速')
    },
    quick: function() {
      console.log('快速')
    },
    normal: function() {
      console.log('常速')
    },
  }
  function Run(to, from) {
    this.to = to
    this.from = from
  }
  Run.prototype.speed = function() {
    console.log(`${this.from} to ${this.to}`)
  }
  const r = new Run(0, 20)
  r.speed()
}

function Animal() {}
Animal.prototype.say = function() {
  console.log('hello')
}

function Dog() {
  Animal.call(this)
}
Dog.prototype = new Animal()
console.dir(new Dog())
