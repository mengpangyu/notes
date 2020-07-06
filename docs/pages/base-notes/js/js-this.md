# this

## 判断 this?

1. 由 new 调用? 绑定到新创建的对象

```js
const str = new Array[1,2,3]
// 其中 this 为 str
```

2.由 call 或者 apply 调用? 绑定到指定的对象

```js
const obj1 = {name:'chauncey',count:11}
function foo(){
	console.log(this.count)
}
foo.call(obj1)
```

3. 由上下文调用? 绑定到那个上下文对象上

```js
const foo = () =>{
 console.log(this)
}
```
:::tip 注意
箭头函数里没有 this, 所以 foo 的上下文为 window 对象
:::

4. 默认: 在严格模式下绑定到 undefined, 否则绑定到全局对象
