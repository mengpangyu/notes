module.exports = {
  base: '/notes/',
  title: 'Learning',
  description: 'Chauncey 的的学习记录',
  head: [
    ['link', {rel: 'icon', href: '/logo.png'}],  //浏览器的标签栏的网页图标
  ],
  markdown: {
    lineNumbers: true
  },
  serviceWorker: true,
  themeConfig: {
    logo: '/logo.png',
    lastUpdated: '最后更新于',
    nav: [
      {text: '首页', link: '/'},
      {text: '基础笔记', link: '/pages/base-notes/js/js-this.md'},
      {text: '项目', link: '/pages/project-notes/cat/wc-money.md'},
      {text: 'Node', link: '/pages/node-notes/test.md'},
      {text: 'Linux', link: '/pages/linux-notes/linux-bash.md'},
      {text: '面试题', link: '/pages/interview-notes/js-questions.md'},
      {text: '工具', link: '/pages/tool-notes/tool-use.md'},
      {text: '关于我', link: '/pages/about-me/about-me.md'},
      {text: 'Github', link: 'https://github.com/chaunceym'},
    ],
    sidebar: {
      '/pages/base-notes/': [
        {
          title: 'JS',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['js/js-this.md', 'JS三座大山之this'],
            ['js/js-ajax.md', 'JS三座大山之ajax'],
            ['js/js-promise.md', 'Promise'],
          ]
        },
        {
          title: 'React',
          collapsable: false,
          children: [
            ['react/re-class.md', 'class组件'],
            ['react/re-function.md', '函数组件'],
            ['react/re-hooks1.md', 'Hooks原理解析'],
            ['react/re-hooks2.md', 'Hooks各个击破'],
          ]
        },
        {
          title: 'Vue',
          collapsable: false,
          children: [
            ['vue/vue-form.md', '表单'],
            ['vue/vue-animation.md', '深入动画原理'],
          ]
        },
        {
          title: 'TS',
          collapsable: false,
          children: [
            ['ts/ts-start.md', 'TS初体验']
          ]
        },
        {
          title: 'HTML',
          collapsable: false,
          children: [
            ['html/html-base.md', 'base标签的运用']
          ]
        },
        {
          title: 'CSS',
          collapsable: false,
          children: [
            ['css/css-flex.md', '弹性盒子']
          ]
        },
      ],
      '/pages/project-notes/': [
        {
          title: '小猫记账',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['cat/wc-money.md', '记账页面'],
            ['cat/wc-statistic.md', '统计页面'],
            ['cat/wc-label.md', '标签页面'],
          ]
        },
        {
          title: 'mySlide',
          collapsable: false,
          children: [
            ['myslide/my-index.md', 'mySlide介绍']
          ]
        },
        {
          title: 'Point UI',
          collapsable: false,
          children: [
            ['pointui/po-index.md', 'Point UI介绍']
          ]
        },
        {
          title: '土豆炖牛肉',
          collapsable: false,
          children: [
            ['clock/clock-index.md', '土豆炖牛肉介绍']
          ]
        },
      ],
      '/pages/node-notes/': [
        {
          title: 'node笔记',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['test.md', 'Express初探'],
          ]
        },
      ],
      '/pages/linux-notes/': [
        {
          title: 'linux笔记',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['linux-bash.md', 'bash命令详解'],
          ]
        },
      ],
      '/pages/interview-notes/': [
        {
          title: 'JS面试题',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['js-questions.md', 'JavaScript'],
          ]
        },
        {
          title: 'Vue面试题',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['vue-questions.md', 'Vue'],
          ]
        },
        {
          title: 'React面试题',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['react-questions.md', 'React'],
          ]
        },
        {
          title: 'Dom面试题',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['dom-questions.md', 'dom'],
          ]
        },
        {
          title: 'Http面试题',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['http-questions.md', 'Http'],
          ]
        },
        {
          title: 'Css面试题',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['css-questions.md', 'Css'],
          ]
        },
        {
          title: 'Html面试题',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['html-questions.md', 'Html'],
          ]
        },
        {
          title: 'Webpack面试题',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['webpack-questions.md', 'Webpack'],
          ]
        },
        {
          title: 'TypeScript面试题',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['ts-questions.md', 'TypeScript'],
          ]
        },
        {
          title: 'Node面试题',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['node-questions.md', 'Node'],
          ]
        },
        {
          title: '开放题和刁钻题',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['open-questions.md', 'Other'],
          ]
        },
      ],
      '/pages/tool-notes/': [
        {
          title: '常用工具',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['tool-use.md', '工具'],
          ]
        },
        {
          title: 'webpack',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['webpack-use.md', 'webpack'],
          ]
        },
        {
          title: 'parcel',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['parcel-use.md', 'parcel'],
          ]
        },
      ],
    }
  }
}
