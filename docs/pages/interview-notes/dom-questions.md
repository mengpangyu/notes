# DOM 技巧

## 事件委托

- 错误版

```js
ul.addEventListener('click', function(e){
  if(e.target.tagName.toLowerCase() === 'li'){
    fn() // 执行某个函数
  }
})
```
bug 在于如果点击 li 里的 span 那么就没法触发 fn

- 高级版

```js
function delegate(element, eventType, selector, fn){
  element.addEventListener(eventType, e=>{
    let el = e.target
    while(!el.matches(selector)){
      if(element === el){
        el = null
        break
      }
      el = el.parentNode
    }
    el && fn.call(el, e, el)
  })
  return element
}
```
:::tip 注意
解释一下上面代码是什么意思?

四个参数, 监听事件的元素, 事件类型, 委托元素, 回调
当点击元素里包含委托元素, 就直接返回回调
当点击元素里不包含委托元素, 那么就看它的爸爸元素是否包含
如果点击元素不包含委托元素, 那么监听事件元素和点击元素相同的话就直接返回 null
:::

## 用 mouse 事件写一个可拖拽的 div

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<style>
#div{
	height: 100px;
	width: 100px;
	border: 1px solid red;
	position:absolute;
	top: 0;
	left: 0;
}
</style>
<body>
<div id='div'></div>
<script >
let position = null
let enMove = false

div.addEventListener('mousedown',(e)=>{
	enMove = true
	position = [e.clientX, e.clientY]
})

document.addEventListener('mousemove',(e)=>{
	if(enMove===false){return}
	const x= e.clientX
	const y = e.clientY
	const deltaX= x - position[0]
	const deltaY= y-position[1]
	const left = parseInt(div.style.left || 0)	
	const top = parseInt(div.style.top || 0)
	
	div.style.left = deltaX + left + 'px'
	div.style.top = deltaY + top + 'px'
	position = [x,y]
	console.log(position)
})

document.addEventListener('mouseup',(e)=>{
	enMove = false
})
</script>
</body>
</html>
```
:::tip 注意
本面试有几个重点要把握? 

1. 要清楚的知道移动的距离, 是谁减谁
2. 鼠标移动和抬起事件要给 document
3. px 单位记得加
:::
