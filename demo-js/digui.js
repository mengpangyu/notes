const recursion = () => {
  // 创建二维数组
  let map = []
  for(let i=0;i<8;i++){
    map[i] = []
    for(let j=0;j<7;j++){
      map[i][j] = 0
    }
  }
  // 创建迷宫
  for(let i=0;i<7;i++){
    map[0][i] = 1
    map[7][i] = 1
  }
  for(let i=0;i<8;i++){
    map[i][0] = 1
    map[i][6] = 1
  }
  map[3][1] = 1
  map[3][2] = 1
  // 开始迷宫游戏
  dealMap(map,1,1)
  console.log(map)
}
const dealMap = (map,i,j) => {
  if(map[6][5] === 2) return true
  if(map[i][j] === 0){// 还没走过
    map[i][j] = 2 // 已经在这个点上了表示已经走过
    if(dealMap(map,i,j+1)) return true //左
    else if(dealMap(map,i+1,j)) return true // 上
    else if(dealMap(map,i,j-1)) return true //右
    else if(dealMap(map,i-1,j)) return true //下
    else { map[i][j] = 3; return false } // 上下左右走不通, 那就为死路, 返回 false
  }else{
    // 如果为 墙 或者死路 那就返回 false
    return false
  }
}

// recursion()

const resolveQueen = (th) => {
  // 设置八皇后
  let maxSize = 8
  // 设置皇后的位置数组, 一维数组就可以显示, arr[i] = val, 表示 val + 1 列, 第 i + 1 个皇后, 第 i + 1 个行
  let arr = new Array(maxSize)

  check(th)

  /**
   * 递归方法
   * @param th 第几个皇后
   */
  const check = (th) => {
    // 如果第 th 个皇后等于 8, 那么说明 8 个皇后已经递归完, 输出递归方法
    if(th === maxSize) return console.log(arr)
    // 循环递归皇后
    for(let i=0;i<maxSize;i++){
      // 先把第 th 个皇后放在第一列, 如果不行的话, 继续循环
      arr[th] = i
      // 判断是否在同一行 斜线 列, 如果不在, 则继续摆下一个皇后
      if(judge(th)) check(th + 1)
    }

  }

  /**
   * 判断位置是否正确
   * @param th 第几个皇后
   */
  const judge = (th) => {
    for(let i=0;i<th;i++){
      // 1. [i] === arr[th] 表示如果在同一列
      // 2. Math.abs(th - i) === Math.abs(arr[th] - arr[i]) 表示如果为斜线
      if(arr[i] === arr[th] || Math.abs(th - i) === Math.abs(arr[th] - arr[i])){
        return false
      }
    }
    return true
  }
}
resolveQueen(0)