// 图创建

class Graph {
  constructor(n) {
    this.el = []
    this.arr = []
    for (let i = 0; i < n; i++) {
      this.arr[i] = []
      for (let j = 0; j < n; j++) {
        this.arr[i][j] = 0
      }
    }
    this.edge = 0
    this.isVisitedDfs = []
    this.isVisitedBfs = []
  }

  show() {
    console.log(this.arr)
  }

  add(item) {
    this.el.push(item)
  }

  getEdge() {
    return this.edge
  }

  getSize() {
    return this.el.length
  }

  addEdge(i, j, val) {
    this.arr[i][j] = val
    // 无向图, 所以要把 arr[j][i]也添加
    this.arr[j][i] = val
    this.edge++
  }

  // 得到第一个邻接节点的下标
  getFirstNeighbour(index) {
    for (let j = 0; j < this.el.length; j++) {
      // 如果第 index 个节点有下个节点
      if (this.arr[index][j] > 0) {
        return j
      }
    }
    return -1
  }

  // 根据前一节点下标来获取下一个节点的下标
  getNextNeighbour(index1, index2) {
    for (let i = index2 + 1; i < this.el.length; i++) {
      if (this.arr[index1][i] > 0) {
        return i
      }
    }
    return -1
  }

  dfs(i) {
    console.log(this.el[i] + "=>")
    this.isVisitedDfs[i] = true
    let w = this.getFirstNeighbour(i)
    while (w !== -1) {
      if (!this.isVisitedDfs[w]) {
        this.dfs(w)
      }
      // 如果被访问过, 那么回到前一个节点去看看有没有其他的可连接的元素
      w = this.getNextNeighbour(i, w)
    }
  }

  doneDfs() {
    for (let i = 0; i < this.el.length; i++) {
      if (!this.isVisitedDfs[i]) {
        this.dfs(i)
      }
    }
  }

  bfs(i) {
    let u, w
    let queue = []
    console.log(this.el[i] + "=>")
    this.isVisitedBfs[i] = true
    queue.push(i)
    // 当队列为空时就循环搜索完毕
    while (queue.length) {
      // 取出头结点
      u = queue.shift()
      // 获取头结点的下节点
      w = this.getFirstNeighbour(u)
      while (w !== -1) {
        // 没被访问过
        if (!this.isVisitedBfs[w]) {
          console.log(this.el[w] + "=>")
          this.isVisitedBfs[w] = true
          // 入队来保证访问过的元素
          queue.push(w)
        }
        // 以访问过
        w = this.getNextNeighbour(u, w)
      }
    }
  }

  doneBfs() {
    for (let i = 0; i < this.el.length; i++) {
      if (!this.isVisitedBfs[i]) {
        this.bfs(i)
      }
    }
  }
}

const gr = new Graph(5)
gr.add('a')
gr.add('b')
gr.add('c')
gr.add('d')
gr.add('e')
gr.addEdge(0, 1, 1)
gr.addEdge(0, 2, 1)
gr.addEdge(1, 2, 1)
gr.addEdge(1, 3, 1)
gr.addEdge(1, 4, 1)
gr.doneBfs()


// dfs 深度优先搜索


