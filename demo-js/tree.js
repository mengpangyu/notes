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

  delNode(val){
    if(this.left !== null && this.left.val === val) return this.left = null
    if(this.right !== null && this.rightval === val) return this.right = null
    if(this.left !== null) this.left.delNode(val)
    if(this.right !== null) this.right.delNode(val)
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

  fpreOrderSearch(val){
    if(this.root !== null){
      return this.root.preOrderSearch(val)
    }else {
      return null
    }
  }
  fmidOrderSearch(val){
    if(this.root !== null){
      return this.root.midOrderSearch(val)
    }else {
      return null
    }
  }
  fbackOrderSearch(val){
    if(this.root !== null){
      return this.root.backOrderSearch(val)
    }else {
      return null
    }
  }
  fdelNode(val){
    if(this.root !== null){
      this.root.delNode(val)
    }else{
      console.log('空树不能删')
    }
  }
}


// 顺序存储二叉树

function arrTree(arr){
  this.arr = arr
  this.preOrder = preOrder
}
function preOrder(index) {
  if(this.arr.length) return console.log('数组为空')
  console.log(this.arr[index])
  if(2 * index + 1 < this.arr.length){
    this.preOrder(2*index+1)
  }
  if(2 * index +2 < this.arr.length){
    this.preOrder(2*index+2)
  }
}

const at = new arrTree([1,2,3,4,5,6,7])
at.preOrder(0)

// const root = new Node(1)
// const n1 = new Node(2)
// const n2 = new Node(3)
// const n3 = new Node(4)
// root.left = n1
// root.right = n2
// n2.right = n3
// const tree = new Tree(root)
//
// tree.fdelNode(2)
// tree.fpreOrder()
//
