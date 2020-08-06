// 十大经典算法

// 二分查找非递归

const binarySearch = (arr, target) => {
  let left = 0
  let right = arr.length - 1
  let middle
  while (left <= right) {
    middle = Math.floor((right + left) / 2)
    if (arr[middle] === target) {
      return middle
    } else if (arr[middle] < target) {
      left = middle + 1
    } else {
      right = middle - 1
    }
  }
  return -1
}

// console.log(binarySearch([1, 2, 3, 4, 5], 5))

// 分治算法解决汉诺塔问题

const hannuota = (num, a, b, c) => {
  if (num === 1) {
    console.log(`第${num}个盘从 ${a} 移动到 ${c}`)
  } else {
    hannuota(num - 1, a, c, b)
    console.log(`第${num}个盘从 ${a} 移动到 ${c}`)
    hannuota(num - 1, b, a, c)
  }
}
// hannuota(2,'a','b','c')


//动态规划解决背包问题

function dynamic() {
  // 重量
  const w = [1, 4, 3]
  // 金额
  const val = [1500, 3000, 2000]
  // 最大的容量
  const m = 4
  // 表格
  let v = []
  for (let i = 0; i <= val.length; i++) {
    v[i] = []
    for (let j = 0; j <= m; j++) {
      v[i][j] = 0
    }
  }
  // 开始动态规划
  for (let i = 1; i < v.length; i++) {
    for (let j = 1; j < v[0].length; j++) {
      if (w[i - 1] > j) {
        // 当重量大于容量, 那么就取上一格的数据
        v[i][j] = v[i - 1][j]
      } else {
        // 如果重量小于等于, 要么取上一格, 要么看看剩下的容量是否还能存下其他物品
        v[i][j] = Math.max(v[i - 1][j], val[i - 1] + v[i - 1][j - w[i - 1]])
      }
    }
  }
  console.log(`最后能存放最大的金额为${v[v.length-1][v[0].length-1]}`)
}

dynamic()
