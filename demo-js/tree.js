// 二叉树前中后序遍历

class Node {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }

  preOrder() {
    console.log(this.val)
    if (this.left !== null) {
      this.left.preOrder()
    }
    if (this.right !== null) {
      this.right.preOrder()
    }
  }

  midOrder() {
    if (this.left !== null) {
      this.left.midOrder()
    }
    console.log(this.val)
    if (this.right !== null) {
      this.right.midOrder()
    }
  }

  backOrder() {
    if (this.left !== null) {
      this.left.backOrder()
    }
    if (this.right !== null) {
      this.right.backOrder()
    }
    console.log(this.val)
  }

  preOrderSearch(val) {
    console.log('pre')
    let temp = null
    if (this.val === val) return this
    if (this.left !== null) temp = this.left.preOrderSearch(val)
    if (temp !== null) return temp
    if (this.right !== null) temp = this.right.preOrderSearch(val)
    return temp
  }

  midOrderSearch(val) {
    let temp = null
    if (this.left !== null) temp = this.left.midOrderSearch(val)
    if (temp !== null) return temp
    console.log('mid') // 位置要在真正比较前面, 否则就包括判空的步骤
    if (this.val === val) return this
    if (this.right !== null) temp = this.right.midOrderSearch(val)
    return temp
  }

  backOrderSearch(val) {
    let temp = null
    if (this.left !== null) temp = this.left.backOrderSearch(val)
    if (temp !== null) return temp
    if (this.right !== null) temp = this.right.backOrderSearch(val)
    if (temp !== null) return temp
    console.log('back')  // 位置要在真正比较前面, 否则就包括判空的步骤
    if (this.val === val) return this
    return temp
  }

  delNode(val) {
    if (this.left !== null && this.left.val === val) return this.left = null
    if (this.right !== null && this.rightval === val) return this.right = null
    if (this.left !== null) this.left.delNode(val)
    if (this.right !== null) this.right.delNode(val)
  }
}

class Tree {
  constructor(root) {
    this.root = root
  }

  fpreOrder() {
    if (this.root !== null) {
      this.root.preOrder()
    }
  }

  fmidOrder() {
    if (this.root !== null) {
      this.root.midOrder()
    }
  }

  fbackOrder() {
    if (this.root !== null) {
      this.root.backOrder()
    }
  }

  fpreOrderSearch(val) {
    if (this.root !== null) {
      return this.root.preOrderSearch(val)
    } else {
      return null
    }
  }

  fmidOrderSearch(val) {
    if (this.root !== null) {
      return this.root.midOrderSearch(val)
    } else {
      return null
    }
  }

  fbackOrderSearch(val) {
    if (this.root !== null) {
      return this.root.backOrderSearch(val)
    } else {
      return null
    }
  }

  fdelNode(val) {
    if (this.root !== null) {
      this.root.delNode(val)
    } else {
      console.log('空树不能删')
    }
  }
}


// 顺序存储二叉树

function arrTree(arr) {
  this.arr = arr
  this.preOrder = preOrder
}

function preOrder(index) {
  if (this.arr.length) return console.log('数组为空')
  console.log(this.arr[index])
  if (2 * index + 1 < this.arr.length) {
    this.preOrder(2 * index + 1)
  }
  if (2 * index + 2 < this.arr.length) {
    this.preOrder(2 * index + 2)
  }
}


// 赫夫曼树实现, 带权路径长最小

const huffTree = arr => {
  arr.sort((a, b) => a - b)
  const newArr = arr.map(item => new Node(item))
  while (newArr.length > 1) {
    newArr.sort((a, b) => a.val - b.val)
    let [leftNode, rightNode] = newArr.splice(0, 2)
    let parentNode = new Node(leftNode.val + rightNode.val)
    parentNode.left = leftNode
    parentNode.right = rightNode
    newArr.push(parentNode)
  }
  const tr = new Tree(newArr[0])
  tr.fpreOrder()
}


// huffTree([13, 7, 8, 3, 29, 6, 1])

// 二叉排序树 BST, 并中序遍历

Node.prototype.add = function (node) {
  if (node === null) return console.log('请输入正确的值')
  if (this.val < node.val) {
    if (this.right !== null) {
      this.right.add(node)
    } else {
      this.right = node
    }
  } else {
    if (this.left !== null) {
      this.left.add(node)
    } else {
      this.left = node
    }
  }
}

Tree.prototype.addNode = function (node) {
  if (this.root === undefined) this.root = node
  else this.root.add(node)
}

let arr = [7, 3, 10, 12, 5, 1, 9]

const tr = new Tree()
arr.forEach(item => {
  let node = new Node(item)
  tr.addNode(node)
})

console.log(tr.fmidOrder())



