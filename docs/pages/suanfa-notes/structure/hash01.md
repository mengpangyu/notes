# 字典、集合和哈希

## 字典

字典是一种以键值对形式存储的数据结构, JS 中的 Object 类就是以字典的形式设计的

### Dictionary 类

```js
function Dictionary() {
  this.dataStore = [] 
  this.remove = remove
  this.find = find
  this.showAll = showAll
  this.add = add
}
function add(key,value) {
  this.dataStore[key] = value
}
function find(key) {
  return this.dataStore[key]
}
function remove(key) {
  delete this.dataStore[key]
}
function showAll() {
  Object.keys(this.dataStore).forEach((key) => {
    console.log(`${key} => ${this.dataStore[key]}` ) 
  })
}

let book = new Dictionary()
book.add('name','xiang')
book.add('age',11)
book.add('gender','man')
console.log(book.find('name'))
```

### Dictionary 的辅助方法

获取字典中的元素个数, 在键为字符串是 length 没有用了, 所以不能用 length 来返回长度

```js
function count() {
  let n = 0
  for(let key in Object.keys(this.dataStore)){
    ++n 
  } 
  return n
}
``` 

清空字典

```js
function clear() {
  for(let key in Object.keys(this.dataStore)){
    delete this.dataStore[key]
  } 
}
```
### 为 Dictionary 类添加排序功能

在获取 key 的同时进行排序, 然后在遍历输出

```js
function showAll(){
  for(let key in Object.keys(this.dataStore).sort()){
     console.log(`${key} => ${this.dataStore[key]}`)
  }
}
```

### 利用字典计算单词出现的个数

```js
function countWord(str){
  const dic = []
  const arr = str.split(' ')
  arr.forEach(item=>{
    if(Object.keys(dic).indexOf(item) >= 0){
      dic[item]++ 
    }else{
      dic[item] = 1 
    }
  })
  console.log(dic)
}
countWord('the brown fox jumped over the blue fox')
```

## 集合 Set

集合是一种包含不同元素的数据结构, 集合成员是无序的, 集合中不允许相同成员存在, 可以做去重

:::tip 注意
当你想要创建一个数据结构来存储独一无二的数时, 集合是最佳选择
:::

### 集合的定义

- 不包含任何成员的集合为空集, 全集则是包含一切可能成员的集合
- 如果两个集合完全相同, 那么两个集合相等
- 如果一个集合中所有的成员都属于另外一个集合, 则前一集合称为后一集合的子集

### 集合的操作

- 并集: 两个集合成员进行合并, 得到一个新集合
- 交集: 两个集合中共同存在的成员组成一个新集合
- 补集: 属于一个集合而不属于另一个集合的成员组成的集合

### Set 类的实现

```js
function Set(){
  this.dataStore = []
  this.add = add
  this.remove = remove
  this.size = size
  this.union = union
  this.intersect = intersect
  this.subset = subset
  this.difference = difference
  this.show = show
}
function add(data) {
  if(this.dataStore.indexOf(data) >= 0){
    return false 
  }else{
    this.dataStore.push(data) 
    return true
  }
}
function remove(data) {
  const pos = this.dataStore.indexOf(data)
  if(pos >= 0){
    this.dataStore.splice(pos,1)    
    return true
  }else{
    return false 
  }
}
function show(){
  return this.dataStore
}
function size(){
  return this.dataStore.length
}
const set = new Set()
set.add('meng')
set.add('ang')
set.add('yu')
set.show()
```

### 更多集合操作

union 方法并集操作, 在实现之前得先写一个 contains 方法来判断这个元素是否存在集合内

```js
function contains(data) {
    return this.dataStore.indexOf(data) >= 0; 
}
``` 
接下来就可以写 union 方法了

```js
function union(set){
  let tempSet = new Set()
  this.dataStore.forEach(item=>{
    tempSet.add(item) 
  })
  set.dataStore.forEach(item=>{
    if(!tempSet.contains(item)){
      tempSet.dataStore.push(item)
    } 
  })
  return tempSet
}
```
intersect 方法交集操作, 如果两个集合内有相同的元素, 那么把相同的元素放到新的集合里返回

```js
function intersect(set) {
  let tempSet = new Set()
  this.dataStore.forEach(item=>{
    if(set.dataStore.indexOf(item)>=0){
      tempSet.add(item) 
    }
  }) 
  return tempSet
}
```

subSet 方法判断是否为子集, 先判断长度, 在遍历判断元素是否全部符合要求

```js
function subSet(set){
  if(this.dataStore.length > set.dataStore.length){
    for(let item of set.dataStore){
      if(this.dataStore.indexOf(item) === -1){
        return false
      }
    }
    return true
  }else{
    return false 
  }
}
```

