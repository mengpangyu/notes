# 列表

当不需要在一个很长的序列中查找元素, 或者对其进行排序时, 列表显得尤为重要, 如果数据结构非常复杂就没必要使用列表了

列表是一组有序的数据, 每个列表中的数据称为元素, JS 中列表中的元素可以是任意类型

## 实现列表类

列表构造函数

```js
const list = () =>{
  this.listSize = 0
  this.pos = 0
  this.dataStore = []
  this.clear = clear 
  this.find = find
  this.toString = toString
  this.insert = insert
  this.append = append
  this.remove = remove
  this.front = front
  this.end = end 
  this.prev = prev
  this.next = next
  this.hasNext = hasNext
  this.hasPrev = hasPrev
  this.length = length
  this.currPos = currPos
  this.moveTo = moveTo
  this.getElement = getElement
  this.contains = contains
}
```

### append: 给列表添加元素

```js
const append = function(element){
  this.dataStore[this.listSize++] = element
}
```

### remove: 从列表删除元素

删除元素的前提是找到元素, 所以先创建 find 方法

```js
const find = function(element){
  for(let i=0;i<this.dataStore.length;i++){
    if(this.dataStore[i] === element){
      return i 
    } 
  } 
  return -1
}
```

### find: 从列表找到某一元素

```js
const remove = function(element){
  const foundAt = this.find(element)
  if(foundAt > -1){
    this.dataStore.splice(foundAt,1) 
    --this.listSize
    return true
  }
  return false
}
```

### length: 列表中有多少个元素

```js
const length = function(){
  return this.listSize
}
```

### toString: 显示列表中的元素

```js
const toString = function(){
  return this.dataStore
}
```
### insert: 向列表中插入一个元素

```js
const insert = function(element,after){
  const insertPos = this.find(after)
  if(insertPos > -1){
    this.dataStore.splice(insertPos+1,0,element) 
    ++this.listSize 
    return true
  }
  return false
}
```

### clear: 情况列表中所有元素

```js
const clear = function(){
  delete this.dataStore
  this.dataStore.length = 0
  this.listSize = this.pos = 0
}
```

### contains: 判断给定值是否在列表中

```js
const contains = function(element){
  for(let i = 0; i < this.dataStore.length; i++) {
    if(this.dataStore[i] === element){
      return true 
    } 
  }
  return false
}
```

### 遍历列表

```js
const front = function() {
  this.pos = 0 
}
const end = function() {
  this.pos = this.listSize - 1 
}
const prev = function() {
  --this.pos
}
const next = function() {
  if(this.pos < this.listSize){
    ++this.pos 
  }
}
const currPos = function() {
  return this.pos
}
const moveTo = function(position) {
  this.pos = position
}
const getElement = function() {
  return this.dataStore[this.pos]
}
const hashNext = function(position) {
  return this.pos < this.listSize
}
const hashPrev = function(position) {
  return this.pos >= 0
}
```










