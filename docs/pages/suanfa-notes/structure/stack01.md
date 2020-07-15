# 栈

栈是一种类似列表的数据结构, 但是相对于来说栈更容易操作, 而且容易实现

## 对栈的操作 

栈是一种**后入先出**(LIFO,last-in-first-out)的数据结构, 所以任何不在栈顶的元素都无法访问, 为了得到栈底的元素必须拿掉上面的元素

入栈使用 `push()` 方法, 出栈使用 `pop()` 方法

`peek()` 返回栈顶元素但不删除它, 而 `pop()` 会删除

`clear()` 清空栈

## 栈的实现

先定义一个构造函数

```js
const stack = function(){
  this.dataStore = []
  this.top = 0
  this.push = push
  this.pop = pop
  this.peek = peek
  this.length = length
  this.clear = clear
}

// top++ 是为了添加元素到索引, 在执行 + 操作, 保证顺序
const push = function(element){
  this.dataStore[this.top++] = element
}

const pop = function(){
  return this.dataStore[--this.top] 
}

const peek = function(){
  return this.dataStore[this.top-1] 
}

const length = function(){
  return this.top
}

const clear = function(){
  this.top = 0
}
```

## 利用栈实现进制转换

```js
const mulBase = (num,base) => {
  let stack = []
  do{
    stack.push(num % base)
    num = Math.floor(num / base) 
  }while (num > 0)
  let converted = ''
  while(stack.length > 0){
    converted += stack.pop()
  }
  return converted
}
// 十转二
const result1 = mulBase(33,2)
console.log(result1) // 100001

// 十转八
const result2 = mulBase(33,8)
console.log(result2) // 41

// 十转十六
const result3 = mulBase(33,16)
console.log(result3) // 41

// 十转三二
const result4 = mulBase(33,32)
console.log(result4) // 41
```

## 利用栈实现回文

回文的意思就是一个单词正着念, 反着念都是一样的

```js
const isPalindrome = word => {
  let stack = []

  for(let i=0;i<word.length;i++){
    stack.push(word[i]) 
  }
  let rword = ''
  while(stack.length > 0){
    rword += stack.pop() 
  }
  return word === rword;
}

console.log(isPalindrome('word')) // false
```

## 利用栈实现递归

```js
const foo = n => {
  let stack = []
  while(n>1){
    stack.push(n--) 
  }  
  let sum = 1
  while(stack.length > 0){
    sum *= stack.pop() 
  }
  return sum
}
console.log(foo(5)) // 120
```


## 利用栈判断括号是否符合有效(leetCode20.有效的括号)

```js
const kuohao = (str) => {
   const map = new Map()
   map.set(')','(')
   map.set(']','[')
   map.set('}','{')
   let stack = []
   for(const char of str){
     if(char === '(' || char === '[' || char === '{' || char === ')' || char===']' || char === '}'){
       if(map.has(char)){
         const popChar = stack.length ? stack.pop() : '#'
         if(popChar !== map.get(char)){
           return false
         } 
       }else{
         stack.push(char) 
       }
     } 
   }
   return !stack.length
 }
```

## 利用栈实现佩慈糖果

将黄色糖果移出并保持其他糖果顺序不变

```js
let candy = ['red1','red2','red3','yellow1','yellow2','blue1','red4','yellow3']
const getYellow = (candy) => {
  let stackYellow = []
  let stackTemp = []
  while(candy.length > 0){
    const one = candy.pop()
    if(/yellow/.test(one)){
      stackYellow.push(one)
    }else{
      stackTemp.push(one)    
    } 
  }
  return stackTemp.reverse()
}
```
