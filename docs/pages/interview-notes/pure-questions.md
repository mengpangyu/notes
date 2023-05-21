# 精华技巧(必知必会)

:::tip 答题思路
是什么, 怎么做, 解决了什么问题, 优缺点, 怎样解决缺点
:::

## HTML

### 你是如何理解 HTML 语义化?

1. 是什么: 语义化标签是一种写 HTML 标签的方法论/方式
2. 怎么做: 实现方法是遇到标题就使用 h1 到 h6, 遇到段落就用 p, 遇到文章就用 article, 主要内容使用 main, 边栏用 aside, 导航用 nav
3. 解决了什么问题: 明确了 html 的书写规范
4. 优点是:
   1. 利于 SEO
   2. 适合人类阅读, 利于团队维护
5. 缺点: 没有
6. 怎么解决缺点: 无需解决

### HTML5 有哪些新标签

不要提不熟悉的标签, 可能会成为下一个题目

- 文章相关: header main footer nav section article figure mark
- 多媒体相关: video audio svg canvas
- 表单相关: type=email type=tel

### Canvas 和 SVG 的区别是什么

看博客再进一步优化和总结, 写一篇博客

1. Canvas 主要是用笔刷来绘制 2D 图形的
2. SVG 主要是用标签来绘制不规则矢量图的
3. 相同点
   1. 都是主要用来画 2D 图形的
4. 不同点
   1. Canvas 画的是位图, SVG 画的是矢量图
   2. SVG 节点过多时渲染较慢, Canvas 性能较好, 但写起来复杂
   3. SVG 支持分层和事件, Canvas 不支持, 但可以使用库实现

## CSS
