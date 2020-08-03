// 怎样做一个计时器

const element = document.getElementById('el');
let start;
function step(timestamp) {
  // timestamp 总共执行时间
  // start 开始动画时间
  if (start === undefined) start = timestamp;
  // elapsed 开始动画时间
  const elapsed = timestamp - start;
  element.innerText = 10 - Math.floor(elapsed/1000)
  if(parseInt(element.innerText) === 0){
    element.innerText = '生日快乐'
  }
  if (elapsed < 10000) { // Stop the animation after 2 seconds
    window.requestAnimationFrame(step);
  }
}
console.time()
window.requestAnimationFrame(step);
console.timeEnd()