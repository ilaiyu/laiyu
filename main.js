const giscusTheme = () =>
    localStorage.getItem('DARK_LIGHT_THEME') === 'dark' ? 'noborder_dark' : 'light';

window.$docsify = {
    hideCode: {
        scroll: false, // 启用滚动
        height: 300 // 折叠高度
    },
    subMaxLevel: 4,
    name: 'advanced-java',
    repo: 'docs/advanced-java',
    maxLevel: 4,
    auto2top: true,
    coverpage: 'docs/extra-page/cover.md',
    loadSidebar: 'summary.md',
    alias: {
        '/.*/.*/summary': 'summary.md',
        '/.*/summary.md': 'summary.md',
    },
    sidebarDisplayLevel:0,
    lastModifiedText: '最近更新时间：',
    pagination: {
        previousText: '上一篇',
        nextText: '下一篇',
        crossChapter: true,
        crossChapterText: true,
    },
    contributors: {
        repo: 'doocs/advanced-java',
        ignores: ['/README.md'],
        image: {
            margin: '0.2em',
            isRound: true,
        },
    },
    search: {
        maxAge: 1800000,
        paths: [
            '/docs/big-data/',
            '/docs/distributed-system/',
            '/docs/Dubbo/',
            '/docs/extra-page/',
            '/docs/high-concurrency/',
            '/docs/high-availability/',
            '/docs/JDK/',
            '/docs/LeaningExperience/',
            '/docs/micro-services/',
            '/docs/Mybatis/',
            '/docs/nacos/',
            '/docs/Netty/',
            '/docs/Redis/',
            '/docs/rocketmq/',
            '/docs/Sentinel/',
            '/docs/Spring/',
            '/docs/Springboot/',
            '/docs/SpringbootBatch/',
            '/docs/SpringCloud/',
            '/docs/SpringSecurity/',
            '/docs/Tomcat/'
        ],
        depth: 3,
    },
    darklightTheme: {
        defaultTheme: 'light',
        siteFont: 'Source Sans Pro,Helvetica Neue,Arial,sans-serif',
        codeFontFamily: 'Roboto Mono, Monaco, courier, monospace',
        bodyFontSize: '15px',
        dark: {
            background: 'rgb(28,32,34)',
            highlightColor: '#e96900',
            codeBackgroundColor: 'rgb(34,39,46)',
            codeTextColor: '#b4b4b4',
        },
        light: {
            highlightColor: '#e96900',
        },
    },
    plugins: [],
};
