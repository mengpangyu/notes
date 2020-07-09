# 队列

队列是一种 **先进先出**(FIFO,First-in-First-out) 的数据结构

## 用数组实现队列

```js
const Queue = function(){
  this.dataStore = []
  this.enqueue = enqueue
  this.dequeue = dequeue
  this.front = front
  this.back = back
  this.toString = toString
  this.empty = empty
}

const enqueue = function(element){
  this.dataStore.push(element)
}

const dequeue = function(){
  return this.dataStore.shift()
}

const front = function(){
  return this.dataStore[0]
}

const back = function(){
  return this.dataStore[this.dataStore.length-1]
}

const toString = function(){
  let str = ''
  for(let i = 0; i < this.dataStore.length; i++) {
    str += this.dataStore[i] + '\n' 
  }
  return str
}

const empty = function(){
  return !this.dataStore.length
}
```

## 利用队列实现基数排序

```js
const sort = function(nums,queues,n,digit){
  for(let i = 0; i < n; i++) {
    if(digit === 1){
      queues[nums[i]%10].enqueue(nums[i])
    }else{
      queues[Math.floor(nums[i]/10)].enqueue(nums[i])
    }
  }
}
const collection = function(queues, nums){
  let i = 0
  for(let digit=0;digit<10;digit++){
    while(!queues[digit].empty()) {
      nums[i++] = queues[digit].dequeue() 
    }
  }
}
const disArray = function(arr){
  let str = ''
  for(let i = 0; i < arr.length; i++) {
    str += arr[i] + ' ' 
  }
  return str
}

let queues = []
for(var i = 0; i < 10; i++) {
  queues[i] = new Queue()
}

let nums = []
for(var i = 0; i < 10; i++) {
  nums[i] = Math.floor(Math.floor(Math.random()*101))
}
console.log(disArray(nums))
sort(nums,queues,10,1)
collection(queues,nums)
sort(nums,queues,10,10)
collection(queues,nums)
console.log(disArray(nums))
```

## 优先队列

虽然队列是先进先出, 但是有的应用也需要用到队列的优先级来判断谁先出

改变 dequeue 方法

```js
const enqueue = (element) => {
  let entry = 0
  for(let i = 1; i < this.dataStore.lenngth; i++) {
    if(this.dataStore[i].code < this.dataStore[entry].code){
      entry = i 
    } 
  }
  return this.dataStore.splice(entry,1)
}
```
判断了每个队列元素的 code, code 越小, 优先级越高


## 双向队列设计

```js
function Deque(){
  this.dataStore = []
  this.push = push
  this.pop = pop
  this.shift = shift
  this.toString = toString
  this.unshift =  unshift
}
function push(element) {
  this.dataStore.push(element) 
}
function unshift(element) {
  this.dataStore.unshift(element) 
}
function pop() {
 return  this.dataStore.pop()
}
function shift() {
 return  this.dataStore.shift() 
}
function toString() {
  let str= ''
  for (let i=0;i<this.dataStore.length;i++){
    str += this.dataStore[i] + ''
  }
return str
}

let dq = new Deque()
dq.push('last1')
dq.push('last2')
dq.push('last3')
dq.unshift('first')
console.log(dq.toString())
```