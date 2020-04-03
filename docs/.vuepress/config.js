module.exports = {
    title: 'Learning', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: 'Chauncey 的的学习记录', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],  //浏览器的标签栏的网页图标
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {    
        logo: '/logo.png',
        lastUpdated: 'lastUpdate', // string | boolean
        nav: [
            { text: '首页', link: '/' },
            { text: '基础笔记', link: '/pages/base-notes/js-this.md' },
            { text: '项目', link: '/pages/project-notes/wc-money.md' },
            { text: 'Node', link: '/pages/node-notes/test.md' },
            { text: '面试题', link: '/pages/interview-notes/js-questions.md' },
            { text: '工具', link: '/pages/tool/tool-use.md' },
            { text: '关于我', link: '/pages/about-me/about-me.md' },
            { text: 'Github', link: 'https://github.com/chaunceym' },
        ],
        sidebar: {
            '/pages/base-notes/':[
                {
                    title: 'JS',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['js-this.md', 'JS三座大山之this'],
                        ['js-ajax.md', 'JS三座大山之ajax']
                    ]
                },
                {
                    title: 'HTML',
                    collapsable: false, // 可选的, 默认值是 true,
                    children: [
                        ['html-base.md', 'base标签的运用']
                    ]
                },
                {
                    title: 'CSS',
                    collapsable: false, // 可选的, 默认值是 true,
                    children: [
                        ['css-flex.md', '弹性盒子']
                    ]
                },
            ],
            '/pages/project-notes/':[
                {
                    title: '旺财记账',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['wc-money.md', '旺财记账记账页面'],
                        ['wc-statistic.md', '旺财记账统计页面']
                    ]
                },
                {
                    title: 'mySlide',
                    collapsable: false, // 可选的, 默认值是 true,
                    children: [
                        ['my-index.md', 'mySlide首页']
                    ]
                },
                {
                    title: 'Point UI',
                    collapsable: false, // 可选的, 默认值是 true,
                    children: [
                        ['po-layout.md', 'layout轮子']
                    ]
                },
            ],
            '/pages/node-notes/':[
                {
                    title: 'node笔记',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['test.md', '测试'],
                    ]
                },
            ],
            '/pages/interview-notes/':[
                {
                    title: 'JS面试题',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['js-questions.md', 'JavaScript'],
                    ]
                },
            ],
        }
    }
}