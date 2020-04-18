# 深入 Vue 动画原理

## transition 动画初体验

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
  <script src="https://cdn.bootcss.com/vue/2.6.11/vue.min.js"></script>
</head>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
<body>
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
<script>
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
</script>
</body>
</html>
```

可以看到动画插入在 `transition` 组件里, 当元素添加或删除时
1. 添加或删除 class 类名
2. 如果有钩子函数, 那么在一定的时机执行

## 过渡的 class 类名

1. v-enter: 过渡的开始, 在元素插入前生效
2. v-enter-active: 正在过渡的状态
3. v-enter-to: 在元素插入下一帧生效, 此时 v-enter 删除(一般不需要)
4. v-leave: 元素离开过渡开始状态
5. v-leave-active: 元素正在离开过渡状态
6. v-leave-to: 元素离开的结束状态

## animation 动画初体验

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
  <script src="https://cdn.bootcss.com/vue/2.6.11/vue.min.js"></script>
</head>
<style>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
<body>
<div id="example-2">
  <button @click="show = !show">Toggle show</button>
  <transition name="bounce">
    <p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
  </transition>
</div>
<script>
new Vue({
  el: '#example-2',
  data: {
    show: true
  }
})
</script>
</body>
</html>
```

还可以使用第三方库: animation.css

## JavaScript 钩子

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
  <script src="https://cdn.bootcss.com/vue/2.6.11/vue.min.js"></script>
</head>
<body>
<div id="example-2">
  <button @click="show = !show">Toggle show</button>
  <transition  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled" name="bounce">
    <p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
  </transition>
</div>
<script >
new Vue({
  el: '#example-2',
  data: {
    show: true
  },
  methods: {
  // --------
  // 进入中
  // --------

  beforeEnter: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },

  // --------
  // 离开时
  // --------

  beforeLeave: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
})
</script>
</body>
</html>
```

>使用 Velocity(一个 JS 动画库) 来做动画

## 多个元素过渡

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
  <script src="https://cdn.bootcss.com/vue/2.6.11/vue.min.js"></script>
</head>
<style>
.fade-enter-active,
.fade-leave-active{
  transition: all 1s;
}
.fade-enter{
  opacity: 0;
  background: red;
}
.fade-leave-to{
  opacity: 0;
  background: red;
}
</style>
<body>
<div id="example4">
  <transition name="fade">
    <button key="on" @click="status='on'" v-if="status === 'off'">on</button>
    <button @click="status='off'" v-else key="off">off</button>
  </transition>
</div>
<script >
new Vue({
  el: '#example4',
  data: {
    status: 'on'
  }
})
</script>
</body>
</html>
```

:::tip 注意
key 必须加再有动画, 要不 Vue 只会渲染内容不会渲染 Button

利用 mode="out-in/in-out(不常用)" 来改变动画
:::

## 列表过渡动画

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
  <script src="https://cdn.bootcss.com/vue/2.6.11/vue.min.js"></script>
</head>
<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
<body>
<div id="list-demo" class="demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>
<script >
new Vue({
  el: '#list-demo',
  data: {
    items: [1,2,3,4,5,6,7,8,9],
    nextNum: 10
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
  }
})
</script>
</body>
</html>
```

:::tip 注意
tag="p" 的意思是把 span 用 p 包起来, 但是不能直接在 transition-group 里写, 所以写成 tag="p"

不能删除 key, 别问为什么

transition-group 里面必须加  v-for 的元素
:::