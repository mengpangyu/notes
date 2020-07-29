// 冒泡排序

const bubbleSort = arr => {
  // 一共比 arr.length - 1 次
  for (let i = 0; i < arr.length - 1; i++) {
    // 每次比较都会最后一个元素为最大元素, 所以可以除去最后那个元素比较
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
    console.log(`第${i + 1}趟排序为: ${arr}`)
  }
  return arr
}

// 优化

const bubbleSort2 = arr => {
  // 一共比 arr.length - 1 次
  let flag = false
  for (let i = 0; i < arr.length - 1; i++) {
    // 每次比较都会最后一个元素为最大元素, 所以可以除去最后那个元素比较
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = true
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
    // 如果这一趟排序没有改变那么就退出循环, 不用排序了
    if (flag) flag = false
    else break
  }
  return arr
}

// 选择排序

const selectSort = arr => {
  // 一共排 arr.length - 1 趟
  for (let i = 0; i < arr.length - 1; i++) {
    // 设置一个最小索引
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      // j 从 i + 1 开始寻找
      if (arr[minIndex] > arr[j]) {
        // 当最小值大于 arr[j] , 那么把 j 索引给了 minIndex
        minIndex = j
      }
    }
    // 如果最小索引变化, 才交换, 否则不用交换
    if (minIndex !== i) { // 优化点
      let temp = arr[i]
      arr[i] = arr[minIndex]
      arr[minIndex] = temp
    }
  }
  return arr
}

let arr = []
for (let i = 0; i < 80000; i++) {
  arr[i] = Math.floor(Math.random() * 10000000000)
}

// console.time('select')
// selectSort(arr)
// console.timeEnd('select')

// 插入排序

const insertSort = arr => {
  // i = 1 假设 arr[0] 为有序数组
  for (let i = 1; i < arr.length; i++) {
    // 设置插入值
    let insertVal = arr[i]
    // 设置插入到的插入索引
    let insertIndex = i - 1
    // 当没有遍历完有序数组而且当前插入值小于插入数组的数
    while (insertIndex >= 0 && insertVal < arr[insertIndex]) {
      // 如果小于, 那么就后移一位
      arr[insertIndex + 1] = arr[insertIndex]
      // 然后继续遍历看看下一位是否符合条件
      insertIndex--
    }
    // 当循环完成, 找到待插入的位置 insertIndex + 1, 插入数据
    if (insertIndex + 1 !== i) arr[insertIndex + 1] = insertVal
  }
  return arr
}


// 希尔排序

// 交换法
const shellSort = arr => {
  // 设置 gap 为分组长度, 每次都 /2, 如果 gap 小于 0, 那么说明排序完成
  for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // 设置分组, 一共分 gap 组
    for (let i = gap; i < arr.length; i++) {
      // 从第一个元素开始每次和分组的数比较大小
      for (let j = i - gap; j >= 0; j -= gap) {
        if (arr[j] > arr[j + gap]) {
          let temp = arr[j]
          arr[j] = arr[j + gap]
          arr[j + gap] = temp
        }
      }
    }
  }
  return arr
}


// 改进移位法

const shellSort2 = arr => {
  for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < arr.length; i++) {
      let j = i
      // 要插入的值
      let temp = arr[j]
      if (arr[j] < arr[j - gap]){
        // 简单插入排序的套路, 如果前面还有数, 而且前面的数比当前数小, 进入循环交换
        while (j - gap >= 0 && temp < arr[j - gap]) {
          arr[j] = arr[j - gap]
          j -= gap
        }
        // 交换完了就把当前值给了换完的 arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}

// shellSort2([8, 9, 1, 7, 2, 3, 5, 4, 6, 0])


// 归并排序

function mergeSort(arr){
  if(arr.length <= 1) return arr
  let middle = Math.floor(arr.length/2)
  let left = arr.slice(0,middle)
  let right = arr.slice(middle)
  return merge(mergeSort(left),mergeSort(right))
}
function merge(left,right){
  let result = []
  while(left.length && right.length){
    if (left[0] <= right[0]) {
      result.push(left.shift())
    }else{
      result.push(right.shift())
    }
  }
  while(left.length) result.push(left.shift())
  while(right.length) result.push(right.shift())
  return result
}

console.log(mergeSort([5,4,3,2,1]))