module.exports = {
    base: '/notes/',
    title: 'Learning',
    description: 'Chauncey 的的学习记录',
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],  //浏览器的标签栏的网页图标
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {
        logo: '/logo.png',
        lastUpdated: '最后更新于',
        nav: [
            { text: '首页', link: '/' },
            { text: '基础笔记', link: '/pages/base-notes/js-this.md' },
            { text: '项目', link: '/pages/project-notes/wc-money.md' },
            { text: 'Node', link: '/pages/node-notes/test.md' },
            { text: '面试题', link: '/pages/interview-notes/js-questions.md' },
            { text: '工具', link: '/pages/tool-notes/tool-use.md' },
            { text: '关于我', link: '/pages/about-me/about-me.md' },
            { text: 'Github', link: 'https://github.com/chaunceym' },
        ],
        sidebar: {
            '/pages/base-notes/':[
                {
                    title: 'JS',
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        ['js-this.md', 'JS三座大山之this'],
                        ['js-ajax.md', 'JS三座大山之ajax']
                    ]
                },
                {
                    title: 'React',
                    collapsable: false,
                    children: [
                        ['re-class.md', 'class组件']
                    ]
                },
                {
                    title: 'TS',
                    collapsable: false,
                    children: [
                        ['ts-start.md', 'TS初体验']
                    ]
                },
                {
                    title: 'HTML',
                    collapsable: false,
                    children: [
                        ['html-base.md', 'base标签的运用']
                    ]
                },
                {
                    title: 'CSS',
                    collapsable: false,
                    children: [
                        ['css-flex.md', '弹性盒子']
                    ]
                },
            ],
            '/pages/project-notes/':[
                {
                    title: '旺财记账',
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        ['wc-money.md', '旺财记账记账页面'],
                        ['wc-statistic.md', '旺财记账统计页面']
                    ]
                },
                {
                    title: 'mySlide',
                    collapsable: false,
                    children: [
                        ['my-index.md', 'mySlide首页']
                    ]
                },
                {
                    title: 'Point UI',
                    collapsable: false,
                    children: [
                        ['po-layout.md', 'layout轮子']
                    ]
                },
            ],
            '/pages/node-notes/':[
                {
                    title: 'node笔记',
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        ['test.md', '测试'],
                    ]
                },
            ],
            '/pages/interview-notes/':[
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
                    title: 'Node面试题',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        ['node-questions.md', 'Node'],
                    ]
                },
            ],
        }
    }
}