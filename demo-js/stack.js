/**
 * 栈类
 * @param maxSize 栈的最大长度
 * @constructor Stack
 */
function Stack(maxSize){
  this.maxSize = maxSize
  this.arr = new Array(maxSize)
  this.top = -1
  // 入栈
  this.push = push
  // 出栈
  this.pop = pop
  // 判空
  this.isEmpty = isEmpty
  // 判满
  this.isFull = isFull
  // 显示栈
  this.show = show
  // 查看栈顶
  this.peek = peek
}
function peek(){
  return this.arr[this.top]
}
function isFull(){
  return this.top === this.maxSize - 1
}
function isEmpty(){
  return this.top === -1
}
function push(data){
  if(this.isFull()) return console.log('栈满, 无法加入元素')
  this.top++
  this.arr[this.top] = data
}
function pop(){
  if(this.isEmpty()) return console.log('栈空, 没有元素')
  const value = this.arr[this.top]
  this.top--
  return value
}
function show(){
  if(this.isEmpty()) return console.log('栈空')
  while(this.top >= 0){
    console.log(this.arr[this.top])
    this.top--
  }
}

/**
 * 实现利用栈来解决算术表达式
 * @param str 表达式
 */
function useStack(str){
  let index = 0, num1, num2, oper, res, multNum = ''
  let numStack = new Stack(10)
  let charStack = new Stack(10)
  while(true){
    let ch = str.substr(index,1)
    if(isOper(ch)){
      if(charStack.isEmpty()){
        charStack.push(ch)
      }else{
        if(level(ch) <= level(charStack.peek())){
          num1 = numStack.pop()
          num2 = numStack.pop()
          oper = charStack.pop()
          res = cal(num1,num2,oper)
          numStack.push(res)
          charStack.push(ch)
        }else{
          charStack.push(ch)
        }
      }
    }else{
      multNum += ch

      if(index === str.length - 1){// 防止索引越界
        numStack.push(parseInt(multNum))
        multNum = ''
      }else{ // 判断下一位是否为操作符
        if(isOper(str.substr(index+1,1))){
          numStack.push(parseInt(multNum))
          multNum = ''
        }
      }
    }
    index++
    if(index >= str.length) break
  }
  while(true){
    if(charStack.isEmpty()) break
    num1 = numStack.pop()
    num2 = numStack.pop()
    oper = charStack.pop()
    res = cal(num1,num2,oper)
    numStack.push(res)
  }
  console.log(numStack.pop())
}

/**
 * 实现计算
 * @param num1 数1
 * @param num2 数2
 * @param ch 操作符
 * @returns {number}
 */
function cal(num1,num2,ch){
  let res = 0
  switch(ch){
    case '*':
      res = num1 * num2
      break;
    case '+':
      res = num1 + num2
      break;
    case '-':
      res = num2 - num1
      break;
    case '/':
      res = num2 / num1
      break;
    default:
      break;
  }
  return res
}

/**
 * 判断操作符的级别
 * @param ch 操作符
 * @returns {number}
 */
function level(ch){
  if(ch === '*' || ch === '/') return 1
  else if(ch === '+' || ch === '-') return 0
  else return -1
}

/**
 * 判断是否为操作符
 * @param ch 操作符
 * @returns {boolean}
 */
function isOper(ch){
  return ch === '+' || ch === '-' || ch === '*' || ch === '/'
}
// useStack('4001+2*6-1/2')

// 实现逆波兰表达式

function inversePolish(str){
  let arr
  console.log(typeof str)
  if(typeof str === 'string'){
    arr = str.split('')
  }else{
    arr = str
  }
  let stack = []
  let num1,num2,char,res
  for (let i=0;i<arr.length;i++){
    if(/\d+/.test(arr[i])){
      stack.push(parseInt(arr[i]))
    }else{
      num1 = stack.pop()
      num2 = stack.pop()
      char = arr[i]
      switch (char) {
        case '-':
          res = num2 - num1
          break;
        case '+':
          res = num2 + num1
          break;
        case '*':
          res = num2 * num1
          break;
        case '/':
          res = num2 / num1
          break;
        default: break;
      }
      stack.push(res)
    }
  }
  console.log(stack.pop())
}
// inversePolish('3 4 + 5 * 6 -')
/**
 * 中缀表达式转后缀表达式
 * @param str
 * @returns {[]}
 */
function convert(str){
  const arr = str.split('')
  const charStack = []
  const numStack = []
  for(let i=0;i<arr.length;i++){
    if(/\d+/.test(arr[i])){
      numStack.push(arr[i])
    }else if(arr[i] === '('){
      charStack.push(arr[i])
    }else if(arr[i] === ')'){
      while(charStack[charStack.length - 1] !== '('){
        numStack.push(charStack.pop())
      }
      charStack.pop()
    }else{
      while(charStack.length !== 0 && charStack[charStack.length - 1] !== '(' && level(charStack[charStack.length - 1]) >= level(arr[i])){
        numStack.push(charStack.pop())
      }
      charStack.push(arr[i])
    }
  }
  while(charStack.length !== 0){
    numStack.push(charStack.pop())
  }
  return numStack
}
inversePolish(convert('1+((2+3)*4)-5'))

