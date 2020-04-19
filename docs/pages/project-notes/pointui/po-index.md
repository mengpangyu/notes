# Point UI 介绍

这是我基于 Vue 实现的一个 UI 框架, 组件虽然不多, 但是对于功能很友好

![首页预览](../image/pointui-1.png)

预览链接: [https://chaunceym.gitee.io/pointui/](https://chaunceym.gitee.io/pointui/)

源码链接: [https://gitee.com/chaunceym/pointui](https://gitee.com/chaunceym/pointui)

## 功能板块

:::tip 注意
由于相关的功能我都做在官网, 所以功能模块就请预览[官网](https://chaunceym.gitee.io/pointui/)
:::


## 遇到的问题

1. 单元测试的 karma 浏览器打不开问题

查了好多文档, 最后在 StackOverflow 上找到了解决办法, 就是下载一个 `puppeteer` 插件, 就可以调出浏览器测试代码

这是我的 karma.conf.js

```js
const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();
module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    basePath: '',
    frameworks: ['mocha', 'sinon-chai'],
    client: {
      chai: {
        includeStack: true
      }
    },
    files: [
      'dist/**/*.test.js',
      'dist/**/*.test.css'
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity
  })
}
```

2. Popover 组件的制作

需要用到 CSS 垂直居中, 还要解决有滚动条时 Popover 的显示也不会变, 比较复杂


在这里把几段重要的代码贴出来:
```vue
<script>
  export default {
    methods: {
      positionContent() {
        const {contentWrapper, triggerWrapper} = this.$refs
        document.body.appendChild(contentWrapper)
        const {width, height, top, left} = triggerWrapper.getBoundingClientRect()
        const {height: height2} = contentWrapper.getBoundingClientRect()
        let positions = {
          top: {
            top: top + window.scrollY,
            left: left + window.scrollX
          },
          bottom: {
            top: top + height + window.scrollY,
            left: left + window.scrollX
          },
          left: {
            top: top + (height - height2) / 2 + window.scrollY,
            left: left + window.scrollX
          },
          right: {
            top: top + (height - height2) / 2 + window.scrollY,
            left: left + window.scrollX + width
          },
        }
        contentWrapper.style.left = positions[this.position].left + 'px'
        contentWrapper.style.top = positions[this.position].top + 'px'
      },
    }
  }
</script>
```

用了**表驱动编程**来解决有滚动条时也能保证 Popover 的位置是正确的


