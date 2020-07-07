# 数组

在这里定下一个目标

1. 基础篇: 数组, 队列, 栈, 链表, 树与递归, 哈希表, 双指针 
2. 思想篇: 二分, 滑动窗口, 搜索(BFS, DFS, 回溯), 动态规划
3. 提高篇: 贪心, 分治, 位运算, KMP&PK, 并查集, 前缀树, 线段树, 堆

按照这个顺序学习和刷题, 循序渐进, 积少成多, 量变引起质变, 加油, 不积跬步无以至千里


## JS中的数组定义

- 一个存储元素的线性集合, 元素可以通过索引来任意存储, 索引通常是数字
- 在 JS 中的数组不同于其他语言, 在 JS 中数组是一种特殊的对象, 所以效率没有其他语言的数组高

## 创建数组

```js
// 1 最常用方式
const arr1 = []

// 2
const arr2 = [1,2,3,4,5]

// 3 长度为 0, 一个参数表示长度, 多个参数表示元素
const arr3 = new Array(0) 

// 4 长度为 5
const arr4 = new Array(1,2,3,4,5) 

// 5 数组内可以是不同类型
const arr5 = [1,'chauncey',true,null]
```

通过 `Array.isArray()` 判断是否为数组


## 读写数组

```js
let arr = []
for(let i=0;i<10;i++){
  arr[i] = i + 1
}

console.log(arr[0]) // 1
```
利用 for 循环遍历往数组里写元素

利用数组下标读取元素

## 字符串生成数组

```js
const numArray = '12345'.split('')
console.log(numArray) // [1,2,3,4,5]
```
利用字符串的 split 方法可以根据条件把字符串切成数组

## 对数组的整体性操作

```js
let arr1 = [1,2,3,4,5]
let arr2 = arr1
```
这时候 arr2 并不是一个新的数组, 因为对象都是引用类型的数据, 所以 arr2 和 arr1 都指向一个数组, 如果修改其中一个, 那么
另一个也会改变

```js
arr1[1] = 'chauncey'
console.log(arr2) // ['chauncey',2,3,4,5]
```

这样的操作叫做浅拷贝, 那我们在日常使用中往往想要的是赋值后会得到一个新的嗯数组, 那么就不能这么简单的赋值

```js
for(let i=0;i<arr1.length;i++){
  arr2[i] = arr1[i]
}
```
利用 for 循环来遍历每个元素, 然后在赋值给 arr2, 普通类型的数据赋值不是引用类型的, 所以这样会生成一个新数组, 这样的操作就叫深拷贝


## 存取元素

JS 提供了一组访问数组的函数, 叫存取函数, 这些函数返回目标数组的某种变体

### 查找元素

`indexOf()` 用来匹配是否数组内存在这一项, 如果包含返回索引, 如果不包含返回 -1

```js
const arr = ['chauncey','bob','tom','jerry']
if(arr.indexOf('bob') !== -1){
   console.log('bob is here')
}else{
   console.log('bob is not here')
}
```

如果数组包含多个相同的元素, 那么 `indexOf()` 总是返回第一个匹配的元素索引, 与之相反的还有 `lastIndexOf()`
这个函数返回相同元素的最后一个元素索引

利用 `indexOf()` 可以做数组去重

```js
const uniqueArr = (arr)=>{
	let newArr = []
	for(let i=0;i<arr.length;i++){
		if(newArr.indexOf(arr[i]) === -1){
				newArr.push(arr[i]) 
		}
	}
	return newArr
}
```

### 数字的字符串转化

`toString()` 和 `join()` 方法可以将数组变为字符串

```js
let arr = [1,2,3,4,5]
arr.toString() // '1,2,3,4,5'

arr.join() // '1,2,3,4,5'
```

### 通过已有数组创建新数组

`concat()` 和 `splice()` 方法允许通过已有数组创建新数组

```js
let arr = [1,2,3,4,5]
const concatArr = arr.concat()
arr[0] = 2
console.log(concatArr) // [1,2,3,4,5]

const spliceArr = arr.splice(0)
console.log(arr) // []
console.log(spliceArr)  // [2,2,3,4,5]
```

在数组 `concat()` 之后改变值, 但是 `concat()` 之后的新数组没有改变值, 所以`concat()` 会产生一个新的数组

:::tip 注意
在使用 splice 生成新数组的时候, 原数组也会发生变化
:::

## 可变数组

### 添加元素

`push()` 和 `unshift()` 可以为数组添加元素

```js
let arr = [1,2,3,4,5]
arr.push(6)
console.log(arr) // [1,2,3,4,5,6]
arr.unshift(0)
console.log(arr) // [0,1,2,3,4,5,6]
```

`push()` 方法添加元素在末尾, `unshift()` 方法添加元素在开头

### 删除元素

`pop()` 和 `shift()` 可以从数组中删除元素

```js
let arr = [1,2,3,4,5]
const returnValue1 = arr.pop()
console.log(returnValue1) // 5
console.log(arr) // [1,2,3,4]
const returnValue2 = arr.shift()
console.log(returnValue2) // 1
console.log(arr) // [2,3,4]
```
`pop()` 方法删除元素在末尾, `shift()` 方法删除元素在开头

**他们的返回值都是删除了的元素**

### 从数组中间位置添加删除元素

`splice()` 可以实现从任意位置添加删除元素

它一共有三个参数: 

1. 起始索引
2. 删除元素个数
3. 添加的元素

```js
let arr = [1,2,3,4,5]
arr.splice(1,2,'chauncey',true)
console.log(arr) // [1, "chauncey", true, 4, 5]
```
从索引 1 开始, 删除 2 个元素(包含索引1), 然后填加两个元素


### 为数组排序

`reserve()` 翻转数组 

```js
let arr = [1,2,3,4,5]
arr.reverse()
console.log(arr) // [5,4,3,2,1]
```
`sort()` 排序数组

:::tip 注意
字符串时可以直接用 `sort()`, 但是排序数字时需要传参数

因为 `sort()` 方法是按照字典进行排序的, 因为它假定元素都是字符串类型的, 所以在排序数字时会自动转换为字符串排序
:::

```js
let arr = [3,1,2,200,4,100]
arr.sort()
console.log(arr) // [1, 100, 2, 200, 3, 4]
```
对于数字类型, 可以传一个回调, 做一个简单的相减操作, a-b 为顺序排序, 如果 b-a 为倒序排序

```js
let arr = [3,1,2,200,4,100]
arr.sort((a,b)=>a-b)
console.log(arr) // [1, 2, 3, 4, 100, 200]
arr.sort((a,b)=>b-a)
console.log(arr) // [200, 100, 4, 3, 2, 1]
```

## 迭代器方法

### 不生成新数组的迭代器方法

`forEach()` 接收一个函数做参数, 对数组中的每个元素使用该函数

```js
[1,2,3,4,5].forEach(item=>console.log(`I am ${item} element`))
// I am 1 element
// I am 2 element
// I am 3 element
// I am 4 element
// I am 5 element
```

`every()` 该方法接受一个返回值为布尔类型的函数, 对数组中的每个元素使用该元素, 如果对于所有的元素, 该函数返回 true, 该方法返回 true

```js
const result = [1,2,3].every(item=>item%2===0)
console.log(result) // false
```

`some()` 和 every 类似, 只要有一个元素返回 true, 那么该方法就返回 true

```js
const result = [1,2,3].some(item=>item%2===0)
console.log(result) // true
```
 
`reduce()` 方法从一个累加值开始, 不断对累加值和数组中的后续元素调用该函数, 直到数组中最后一个元素, 最后返回得到的累加值

```js
const result = [1,2,3].reduce((sum,curr)=>sum+curr)
console.log(result) // 6
```

`reduceRight()` 和 `reduce()` 方法相同, 唯一不同的是顺序是从右边累加

### 生成新数组的迭代器方法

`map()` 遍历数组元素在根据每个元素去进行操作返回的数组

```js
const result = [1,2,3].map(item=>item*2)
console.log(result) // [2,4,6]
```
`filter()`  遍历数组元素在根据某种条件过滤后返回的数组

```js
const result = [1,2,3].filter(item=>item>2)
console.log(result) // [3]
```

# 二维数组

JS 只支持一维数组, 但是在通过数组里保存数组的形式可以很容易的实现二维数组

## 创建二维数组

- 法一(适合创建复杂数组)
```js
Array.matrix = function(numrows,numcols,initial){
  let arr = []
  for(let i = 0; i < numrows; i++) {
    let columns = []
    for(let j=0;j<numcols;j++){
      columns[j] = initial 
    } 
  arr[i] = columns
  }
  return arr
}

const nums = Array.matrix(5,5,0)
console.log(nums[1][1]) // 0
```

- 法二(适合创建简单数组)
```js
const arr = [[1,2,3],[1,2,3]]
console.log(arr[1][1]) // 2
```

## 联系

1. 创建一个记录学生成绩的对象, 提供一个添加成绩的方法, 以及一个现实学生平均成绩的方法

```js
function Student(){
	this.students = []
	this.add = add
	this.average = average
}

function add(score){
	this.students.push(score)
}

function average(){
	let total = 0
	for(let i=0;i<this.students.length;i++){
		total += this.students[i]
	}
	return total / this.students.length
}

let stu = new Student()

stu.add(33)
stu.add(56)
stu.add(78)
stu.add(90)

console.log(stu.average())
```

2. 将一组单词存在一个数组中, 并按正序和倒序分别显示这些单词

```js
let words = ['jack','tom','chauncey','frank']
words.sort()
console.log(words) // 倒序

words.reverse()
console.log(words) // 正序
```
















