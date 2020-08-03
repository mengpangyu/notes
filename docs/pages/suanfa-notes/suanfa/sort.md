# Hello 排序

## 冒泡排序

>冒泡排序是一种简单的排序算法, 它重复的走仿要排序的数列, 一次比较两个元素, 如果他们的顺序错误就交换值, 走访数列直到没有 可以交换

具体算法: 

1. 比较相邻的两个元素, 如果第一个比第二个大, 则交换
2. 对每一对相邻元素做同样的工作, 从第一队到最后一对, 这样在最后的元素应该会是最大的数
3. 针对所有元素重复以上步骤, 除了最后一个
4. 重复 1~3 知道排序完成

```js
function bubbleSort(arr) {
  for(let i=0;i<arr.length;i++){
    for(let j=0;j<arr.length-1-i;j++){ 
    // 因为最后一个元素不需要和其他比较, 而且每次循环完都会产生一个最大值到最后,所以要减 i
      if(arr[j] > arr[j+1]){
        let temp = arr[j] 
        arr[j] = arr[j+1]
        arr[j+1] = temp
      } 
    }
  }
  return arr
}
```

**算法改进1**

设置一个变量 pos, 用于记录每趟排序中最后一次进行交换的位置, 由于 pos 之后的位置已实现交换, 则下一趟排序只需执行到 pos 位置即可

```js
function bubbleSort2(arr) {
  let i = arr.length - 1 
  while(i > 0){
    let pos = 0
    for(let j = 0;j < i;j++){
      if(arr[j] > arr[j+1]){
        pos = j 
        let temp = arr[j] 
        arr[j] = arr[j+1]
        arr[j+1] = temp
      } 
    }  
    i = pos
  }
  return arr
}
```

**算法改进2**

传统排序一趟排序只能找到一个最大值或者最小值, 我们考虑在每趟排序中进行正向和反向两遍冒泡方法一次可以得到两个最终值, 从而使排序趟数几乎减少一半

```js
function bubbleSort3(arr) {
  let low = 0
  let high = arr.length - 1
  let temp,j
  while(low < high){
    for(j = low;j < high;j++){ // 正向冒泡, 找到最大值
      if(arr[j] > arr[j+1]){
        temp = arr[j] 
        arr[j] = arr[j+1]
        arr[j+1] = temp
      } 
    } 
    --high // 找到最大值, 前移一位
    for(j = high;j > low;j--){ // 反向冒泡, 找到最小值
      if(arr[j] < arr[j-1]){
        temp = arr[j] 
        arr[j] = arr[j-1]
        arr[j-1] = temp
      } 
    }
    ++low // 找到最小值, 后移一位
  }
  return arr
}
```

**复杂度**

- 最佳情况 Tn = On: 当输入数据正序
- 最差情况 Tn = On2: 反序时, 排列
- 平均情况 Tn = On2

## 选择排序

>表现最稳定的排序算法之一, 无论数据复杂还是简单, 时间复杂度永远都是 On2, 不会额外占用内存空间, 首先在未排序的序列中找到最大(大)元素, 
>存放到排序序列中的起始位置, 然后在从剩余未排序的序列中继续寻找最小(大)元素, 然后放到已排序序列的末尾

算法描述:

1. 起始状态: 有序区为空
2. 找出最小的值放到有序区的末尾, 如此循环遍历完无序区

```js
function selectionSort(arr){
  for(let i=0;i<arr.length - 1;i++){
    let minIndex = i 
    for(let j=i+1;j<arr.length;j++){
      if(arr[j] < arr[minIndex]){
        minIndex = j 
      } 
    }
    let temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}
```

**复杂度**

- 最佳情况 Tn = On2
- 最差情况 Tn = On2
- 平均情况 Tn = On2

## 插入排序

>和打扑克是一样的, 刚拿到牌是乱序的, 我们需要插入牌来实现牌的顺序, 通过构建有序序列, 对于未排序数据, 在已排序序列中从后向前扫描,
>找到响应位置并插入, 插入排序在实现上, 通常采用 in-place 排序(既只需要用到O(1)的额外空间排序), 因而在从后向前扫描过程中, 需要反复把已排序
>元素逐步向后挪位, 为新元素提供插入空间



算法思路: 

1. 从第一个元素开始, 该元素可以认为已经被排序
2. 取出下一个元素, 在已经排序的元素序列中从后向前扫描
3. 如果该元素(已排序)大于新元素, 将该元素移到下一位置
4. 重复步骤3, 知道已排序的元素小于或者等于新元素的位置
5. 将新元素的位置插入到该位置
6. 重复2~5


```js
function insertSort(arr){
  if(arr instanceof Array){
    for(let i=1;i<arr.length;i++){
      let currentValue = arr[i] // 从未排序的拿出一个元素
      let j = 0
      for(j=i-1;j>=0;j--){ // 开始遍历排序过的数组
        if(arr[j] > currentValue){ // 如果排序过得数组的元素大于当前的值, 那么就换位置
          arr[j+1] = arr[j] 
        }else{ 
          // 如果不大于, 那么就跳出循环, 因为排序过的数组元素一个不大于, 那么前面的都不会大于
          break 
        } 
      }
      arr[j+1] = currentValue 
      // 在哪里break或者完成循环后, 我们就可以在 j+1 的位置去把当前元素给插入进去
    }
    return arr
  }else{
    return console.log('the param is not a array') 
  }
}
```

*算法改进1*

查找插入位置时使用二分查找的方式

```js
function insertSort(arr) {
  for(let i=0;i<arr.length;i++){
    let key = arr[i], left = 0, right = i - 1
    while(left <= right){
      let middle = parseInt((left + right) / 2) 
      if(key < arr[middle]){
        right = middle - 1 
      }else{
        left = middle + 1 
      }
    }
    for(let j=i-1;j>=left;j--){
       arr[j+1] = arr[j]
    }
    arr[left] = key
  } 
  return arr
}
```

**复杂度**

- 最佳情况 Tn = On: 输入数组按升序排列
- 最差情况 Tn = On2: 输入数组按降序排列
- 平均情况 Tn = On2

## 希尔排序

>1959年 Shell 发明: 第一个突破On2的排序算法, 是简单插入排序的改版, 核心在于间隔序列的设定, 既可以提前设定好序列, 
>也可以动态定义间隔序列

算法描述:

1. 选择一个增量序列, t1, ..., tk, 其中 ti>tj, tk=1
2. 按增量序列个数k, 对序列进行k躺排序
3. 每趟排序, 根据对应的增量ti, 将待排序列分割成若干长度为 m 的子序列, 分别对各子表进行直接插入排序, 
仅增量因子为 1 时, 整个序列作为一个表来处理, 表长度即为整个序列的长度

```js
function shellSort(arr) {
  let temp, gap = 1, len = arr.length
  while(gap < len/5){
    gap = gap * 5 + 1 
  }
  for(gap; gap > 0;gap = Math.floor(gap/5)){
    for(let i=0;i<len;i++){
      temp = arr[i] 
      for(let j=i-gap;j>=0 && arr[j]>temp;j-=gap){
        arr[j+gap] = arr[j] 
      }
      arr[j+gap] = temp
    }
  }
  return arr
}
```

**复杂度**

- 最佳情况 Tn = Onlog2n
- 最坏情况 Tn = Onlog2n
- 平均情况 Tn = Onlogn

## 归并排序

>和选择排序一样, 归并排序的性能不受数据的影响, 但表现比选择排序好得多, 因为始终都是 Onlogn 的复杂度, 代价是需要额外的内存空间, 
>采用分治法, 将已有的子序列合并, 得到完全有序的序列, 即先使每个子序列有序, 在使子序列段间有序, 若将两个有序表合并成一个有序表, 称为 2 路合并

算法描述:

1. 把长度为 n 的输入序列分成两个长度为 n/2 的子序列
2. 把对这两个子序列分别采用归并排序
3. 将两个排序好的子序列合并成一个最终的排序序列

```js
function mergeSort(arr) { // 采用自上而下的递归方法
  let len = arr.length
  if(len < 2) return arr // 当数组数就为1个的时候, 可以进行递归了
  let middle = Math.floor(len / 2) // 把传入的数组分为两半, 知道分到一个数组里只有一个元素为止
  let left = arr.slice(0,middle)
  let right = arr.slice(middle) 
  return merge(mergeSort(left),mergeSort(right))
}
function merge(left,right) {
  let result = []
  while(left.length && right.length){ // 当数组都有元素就比较一下
    if(left[0] <= right[0]){
      result.push(left.shift()) 
    }else{
      result.push(right.shift()) 
    }
  } 
  while(left.length) result.push(left.shift()) // 当左边数组还有元素直接push
  while(right.length) result.push(right.shift()) // 当右边数组还有元素直接push
  return result
}
```

**复杂度**

- 最佳情况 Tn = On
- 最坏情况 Tn = Onlogn
- 平均情况 Tn = Onlogn

## 快速排序

>最快的排序算法之一, 通过一趟排序将待排序记录分隔成独立的两部分, 其中一部分记录的关键字均比另一部分关键字小, 则可分别对这两部分
>记录继续进行排序, 已达到整个序列有序

算法描述:

快速排序把一个串 (list) 分为两个子串 (sub-list)

1. 从序列中挑出一个元素, 称为`基准`
2. 重新排序, 所有元素比基准小的放在基准前面, 所有元素比基准大的放在后面, 在这个分区退出之后, 该基准就处于列的中间位置, 这个称为分区操作
3. 递归的把小于基准值元素的字数列和大于基准元素的子数列排序

```js
function quickSort(arr) {
  if(arr.length <= 1) return arr
  let pivotIndex = Math.floor(arr.length / 2) 
  let pivot = arr.splice(pivotIndex,1)[0]
  let left = [], right = []
  for(let i=0;i<arr.length;i++){
    if(arr[i] < pivot){
      left.push(arr[i]) 
    }else{
      right.push(arr[i]) 
    }
  }
  return [...quickSort(left),pivot,...quickSort(right)]
}
```

**复杂度**

- 最佳情况 Tn = Onlogn
- 最坏情况 Tn = On2
- 平均情况 Tn = Onlogn

## 堆排序

>利用堆的概念来排序的选择排序, 堆是一个类似完全二叉树的结构, 并同时满足堆的性质, 即子节点的键值索引总是小于或者大于它的父节点

算法描述:

1. 将初始待排序关键字序列(R1,R2,...Rn)构成大顶堆, 此堆为初始的无序区
2. 将堆顶元素 R1 与最后一个元素 Rn 交换, 此时得到新的无序区(R1,R2,...Rn-1)和新的有序区Rn, 且满足R[1,2...n-1] <= R[n]
3. 由于交换后新的堆顶 R1 可能违反堆的性质, 因此需要当对当前无序区跳

```js
/*
建堆函数
arr 数组
index 索引
len 长度
*/
const buildHeap = (arr, i, length) => {
  // 先父节点
  let temp = arr[i]
  // 开始调整
  for(let k = i*2+1;k<length;k=k*2+1){
    // 如果左孩子比右孩子大, 那么索引就换到右孩子
    if(k+1 < length && arr[k] < arr[k+1]){
      k++
    }
    // 父节点比孩子节点小, 那么就把孩子节点的值给父节点
    if(temp < arr[k]){
      arr[i] = arr[k]
      // 然后把索引给了右孩子在比较孩子的孩子节点是否大小
      i = k
    }
  }
  // 把所有的节点都比较完后, 再把最初的父节点赋给现在的 i 索引, 完成建堆
  arr[i] = temp
}
const heapSort = arr => {
  // 建堆
  for(let j=Math.floor(arr.length/2-1);j>=0;j--){
    buildHeap(arr,j,arr.length)
  }
  // 排序
  for(let j=arr.length-1;j>=0;j--){
    let temp = arr[j]
    arr[j] = arr[0]
    arr[0] = temp
    buildHeap(arr,0,j)
  }
  return arr
}
```
**复杂度**

- 最佳情况 Tn = Onlogn
- 最坏情况 Tn = Onlogn
- 平均情况 Tn = Onlogn

## 计数排序

>核心在于将输入的数值转化为键存储在额外开辟的数组空间中, 是一种稳定的排序算法, 使用一个额外数组C, 其中第i个元素是待排序数组 A 中值等于i的元素
>然后根据数组 C 来将 A 中的元素排到正确的位置, 只能对整数排序

算法描述:

1. 找出最大元素就可以确定 countArr 的长度
2. 然后把原数组的值在 countArr 里当做键去存储, 值出现了几次, 那么 countArr[值] + 1
3. 然后在遍历 countArr 把大于 0 的元素都拿出来, 加入到 arr 中

```js
function countSort(arr) {
  let max = arr[0] 
  // 把最大值找出来
  for(let i=1;i<arr.length;i++){
    if(arr[i] > max) max = arr[i] 
  }
  // 声明countArr, 把元素都初始化为 0
  let countArr = []
  for(let i=0;i<max + 1;i++){
    countArr[i] = 0 
  }
  // 把arr的值当做键存入 countArr 数据
  for(let i=0;i<arr.length;i++){
    countArr[arr[i]]++
    arr[i] = 0 
  }
  // 设置一个索引, 从 countArr 里拿出计数, 如果计数为 1, 那么就直接添加到 arr 中, 如果计数大于1, 说明这个数出现了多次, 利用循环去加入同样的值
  let index = 0
  for(let i=0;i<countArr.length;i++){
    if(countArr[i] === 1){
      arr[index++] = i
    }else if(countArr[i] > 1){
      for(let j=1;j<=countArr[i];j++){
        arr[index++] = i 
      } 
    }
  }
  return arr
}
```

:::tip 注意
计数排序因为依赖于数组里得最大值所以需要很大的时间和内存, 所以在排序相差不大的正整数比较适合
:::

**复杂度**

- 最佳情况 Tn = On+k
- 最坏情况 Tn = On+k
- 平均情况 Tn = On+k

## 桶排序

>计数排序升级版, 将数据分到有限数量的桶里, 每个桶再分别排序, 然后将桶里的数据拿出来完成排序

算法描述:

1. 创建桶, 每个桶分别装一定范围内的数据
2. 遍历原数组对号入座
3. 对桶中的数据进行单独排序, 桶内的数量大于等于1, 就可以进行排序
4. 依次将桶内的数据取出, 排序完成

```js
function bucketSort(arr, num) {
  if(arr.length <= 1) return arr
  let len = arr.length, buckets = [], result = [], min = arr[0], max = arr[0], regex = /^[1-9]+[0-9]*$/, space, n = 0
  num = num || ((num > 1 && regex.test(num))) ? num : 10
  for(let i=1;i<len;i++){
    min = min <= arr[i] ? min : arr[i] 
    max = max >= arr[i] ? max : arr[i]
  }
  space = (max - min + 1) / num // 化分每个桶的容纳区间
  for(let j=0;j<len;j++){
    let index = Math.floor((arr[j] - min) / space) // 划分桶数组的索引 
    if(buckets[index]){ // 如果桶里面有数据, 进行插入排序
      let k = buckets[index].length - 1 
      while(k >= 0 && buckets[index][k] > arr[j]){ 
        buckets[index][k+1] = buckets[index][k] 
        k--
      }
      buckets[index][k+1] = arr[j]
    }else{ // 如果桶内没数据, 初始化
      buckets[index] = [] 
      buckets[index].push(arr[j])
    }
  }
  while(n < num){ // 把每个桶里的数拿出来排序完成
    result = result.concat(buckets[n]) 
    n++
  }
  return result
}
```

:::tip 注意
桶排序最好情况下使用线性时间 On, 桶划分越小, 各个桶之间的数据越少, 排序所用时间就会减小, 但相应空间消耗会增大
:::

**复杂度**

- 最佳情况 Tn = On+k
- 最坏情况 Tn = On+k
- 平均情况 Tn = On2

## 基数排序

>非比较的算法, 对每一位进行排序, 从最低位开始排序, 然后收集, 在按照高位排序, 然后再收集, 依次类推, 知道最高位

算法描述:

1. 取得数组最大数, 并取得位数
2. arr 为原始数组, 从最低位开始取每个位组成 radix 数组
3. 对 radix 进行计数排序(利用计数排序适用于小范围的特点)

```js
/**
 * 基数排序适用于：
 *  (1)数据范围较小，建议在小于1000
 *  (2)每个数值都要大于等于0
 * @author xiazdong
 * @param  arr 待排序数组
 * @param  maxDigit 最大位数
 */
//LSD Radix Sort

function radixSort(arr, maxDigit) {
    let mod = 10;
    let dev = 1;
    let counter = [];
    for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for(let j = 0; j < arr.length; j++) {
            let bucket = Math.floor((arr[j] % mod) / dev);
            if(counter[bucket]== null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        let pos = 0;
        for(let j = 0; j < counter.length; j++) {
            let value = null;
            if(counter[j]!=null) {
                while ((value = counter[j].shift()) != null) {
                      arr[pos++] = value;
                }
          }
        }
    }
    return arr;
}
```

**复杂度**

- 最佳情况 Tn = On*k
- 最坏情况 Tn = On*k
- 平均情况 Tn = On*k

基数排序 VS 计数排序 VS 桶排序

1. 基数排序: 根据键值的每位数字来分配桶
2. 计数排序: 每个桶只能存储单一键值
3. 桶排序: 每个桶存储一定范围的数值

参考文章:

[十大经典排序算法总结（JavaScript描述）](https://juejin.im/post/57dcd394a22b9d00610c5ec8)

[这或许是东半球讲十大排序算法最好的一篇文章](https://juejin.im/post/5cff49e75188257a6b40de80#heading-25)