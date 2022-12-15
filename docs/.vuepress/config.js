module.exports = {
  base: "/notes/",
  title: "Learning",
  description: "PangYu 的的学习记录",
  head: [
    ["link", { rel: "icon", href: "/logo.png" }], //浏览器的标签栏的网页图标
  ],
  markdown: {
    lineNumbers: true,
  },
  serviceWorker: true,
  themeConfig: {
    logo: "/logo.png",
    lastUpdated: "最后更新于",
    nav: [
      { text: "基础", link: "/pages/base-notes/js/js-this.md" },
      { text: "项目", link: "/pages/project-notes/cat/wc-money.md" },
      { text: "Node", link: "/pages/node-notes/node-buffer.md" },
      { text: "Linux", link: "/pages/linux-notes/linux-start.md" },
      { text: "算法", link: "/pages/suanfa-notes/suanfa/sort.md" },
      { text: "技巧", link: "/pages/interview-notes/js-questions.md" },
      { text: "工具", link: "/pages/tool-notes/tool-use.md" },
      { text: "关于我", link: "/pages/about-me/about-me.md" },
      { text: "Github", link: "https://github.com/pangyujs" },
    ],
    sidebar: {
      "/pages/suanfa-notes/": [
        {
          title: "算法",
          collapsable: false,
          sidebarDepth: 1,
          children: [["suanfa/sort.md", "Hello, 排序"]],
        },
        {
          title: "数据结构",
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ["structure/suanfa-day01.md", "Hello, 数组"],
            ["structure/chart01.md", "Hello, 图"],
            ["structure/linked01.md", "Hello, 链表"],
            ["structure/hash01.md", "Hello, 哈希表"],
            ["structure/list01.md", "Hello, 列表"],
            ["structure/pointer01.md", "Hello, 双指针"],
            ["structure/stack01.md", "Hello, 栈"],
            ["structure/queue01.md", "Hello, 队列"],
            ["structure/tree01.md", "Hello, 二叉树"],
          ],
        },
      ],
      "/pages/base-notes/": [
        {
          title: "JS",
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ["js/js-this.md", "JS三座大山之this"],
            ["js/js-ajax.md", "JS三座大山之ajax"],
            ["js/js-promise.md", "Promise"],
          ],
        },
        {
          title: "React",
          collapsable: false,
          children: [
            ["react/re-class.md", "class组件"],
            ["react/re-function.md", "函数组件"],
            ["react/re-hooks1.md", "Hooks原理解析"],
            ["react/re-hooks2.md", "Hooks各个击破"],
          ],
        },
        {
          title: "Vue",
          collapsable: false,
          children: [
            ["vue/vue-form.md", "表单"],
            ["vue/vue-animation.md", "深入动画原理"],
          ],
        },
        {
          title: "TS",
          collapsable: false,
          children: [["ts/ts-start.md", "TS初体验"]],
        },
        {
          title: "HTML",
          collapsable: false,
          children: [["html/html-base.md", "base标签的运用"]],
        },
        {
          title: "CSS",
          collapsable: false,
          children: [["css/css-flex.md", "弹性盒子"]],
        },
      ],
      "/pages/project-notes/": [
        {
          title: "小猫记账",
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ["cat/wc-money.md", "记账页面"],
            ["cat/wc-statistic.md", "统计页面"],
            ["cat/wc-label.md", "标签页面"],
          ],
        },
        {
          title: "mySlide",
          collapsable: false,
          children: [["myslide/my-index.md", "mySlide介绍"]],
        },
        {
          title: "Point UI",
          collapsable: false,
          children: [["pointui/po-index.md", "Point UI介绍"]],
        },
        {
          title: "土豆炖牛肉",
          collapsable: false,
          children: [["clock/clock-index.md", "土豆炖牛肉介绍"]],
        },
      ],
      "/pages/node-notes/": [
        {
          title: "node笔记",
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ["node-buffer.md", "Node缓冲区"],
            ["node-callback.md", "Node回调函数"],
            ["node-event-loop.md", "Node事件循环"],
            ["node-emitter.md", "Node事件触发器"],
            ["node-global.md", "Node全局对象"],
            ["express-start.md", "Express初探"],
          ],
        },
      ],
      "/pages/linux-notes/": [
        {
          title: "Linux笔记",
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ["linux-start.md", "linux系统启动过程"],
            ["linux-files.md", "linux系统目录结构"],
            ["linux-files-attr.md", "linux文件基本属性"],
            ["linux-files-manager.md", "linux文件和目录管理"],
            ["linux-disk-manager.md", "linux磁盘管理"],
            ["linux-shell.md", "Shell编程"],
            ["linux-bash.md", "bash命令详解"],
            ["linux-config.md", "我的 Ubuntu"],
            ["linux-git.md", "git 配置"],
          ],
        },
      ],
      "/pages/interview-notes/": [
        {
          title: "JS技巧",
          collapsable: true,
          sidebarDepth: 1,
          children: [["js-questions.md", "JavaScript"]],
        },
        {
          title: "Vue技巧",
          collapsable: true,
          sidebarDepth: 1,
          children: [["vue-questions.md", "Vue"]],
        },
        {
          title: "React技巧",
          collapsable: true,
          sidebarDepth: 1,
          children: [["react-questions.md", "React"]],
        },
        {
          title: "Dom技巧",
          collapsable: true,
          sidebarDepth: 1,
          children: [["dom-questions.md", "dom"]],
        },
        {
          title: "Http技巧",
          collapsable: true,
          sidebarDepth: 1,
          children: [["http-questions.md", "Http"]],
        },
        {
          title: "Css技巧",
          collapsable: true,
          sidebarDepth: 1,
          children: [["css-questions.md", "Css"]],
        },
        {
          title: "Html技巧",
          collapsable: true,
          sidebarDepth: 1,
          children: [["html-questions.md", "Html"]],
        },
        {
          title: "Webpack技巧",
          collapsable: true,
          sidebarDepth: 1,
          children: [["webpack-questions.md", "Webpack"]],
        },
        {
          title: "TypeScript技巧",
          collapsable: true,
          sidebarDepth: 1,
          children: [["ts-questions.md", "TypeScript"]],
        },
        {
          title: "Node技巧",
          collapsable: true,
          sidebarDepth: 1,
          children: [["node-questions.md", "Node"]],
        },
        {
          title: "开放题和刁钻题",
          collapsable: true,
          sidebarDepth: 1,
          children: [["open-questions.md", "Other"]],
        },
      ],
      "/pages/tool-notes/": [
        {
          title: "常用工具",
          collapsable: false,
          sidebarDepth: 1,
          children: [["tool-use.md", "工具"]],
        },
        {
          title: "webpack",
          collapsable: false,
          sidebarDepth: 1,
          children: [["webpack-use.md", "webpack"]],
        },
        {
          title: "parcel",
          collapsable: false,
          sidebarDepth: 1,
          children: [["parcel-use.md", "parcel"]],
        },
      ],
    },
  },
};
