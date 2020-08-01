// 二分查找算法

const binarySearch = (arr, left, right, searchValue) => {
  if (left > right) return -1
  let middleIndex = Math.floor((left + right) / 2)
  let middle = arr[middleIndex]
  if (searchValue < middle) {
    return binarySearch(arr, left, middleIndex - 1, searchValue)
  } else if (searchValue > middle) {
    return binarySearch(arr, middleIndex + 1, right, searchValue)
  } else {
    return middleIndex
  }
}


// 二分查找改进, 如果多个要寻找的值

const binarySearch2 = (arr, left, right, searchValue) => {
  if (left > right) return []
  let middleIndex = Math.floor((left + right) / 2)
  let middle = arr[middleIndex]
  if (searchValue < middle) {
    return binarySearch2(arr, left, middleIndex - 1, searchValue)
  } else if (searchValue > middle) {
    return binarySearch2(arr, middleIndex + 1, right, searchValue)
  } else {
    let result = []
    let temp = middleIndex - 1
    while(true){
      if(temp < 0 || arr[temp] !== searchValue) break
      result.push(temp)
      temp -= 1
    }
    result.push(middleIndex)
    temp = middleIndex + 1
    while(true){
      if(temp > arr.length - 1 || arr[temp] !== searchValue) break
      result.push(temp)
      temp += 1
    }
    return result
  }
}


// 插值查找

const insertSearch = (arr,left,right,searchValue) => {
  if(left > right || searchValue < arr[0]  || searchValue > arr[arr.length - 1]) return -1
  let middleIndex = left + Math.floor((right - left) * (searchValue - arr[left]) / (arr[right] - arr[left]))
  let middle = arr[middleIndex]
  if(searchValue < middle){
    insertSearch(arr,left,middleIndex - 1,searchValue)
  }else if(searchValue > middle){
    insertSearch(arr,middleIndex + 1,right,searchValue)
  }else{
    return middleIndex
  }
}

let e = insertSearch([1,2,3,4,5],0,4,5)
console.log(e)
[1,2].push(1)


Array
