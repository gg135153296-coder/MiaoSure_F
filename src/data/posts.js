export const categories = ['全部', '技术', '生活', '随笔', '摄影']

export const posts = [
  {
    id: 1,
    title: '用 React 19 搭建现代博客的完整指南',
    excerpt: '从项目初始化到部署上线，一步步带你构建一个轻量、美观的个人博客。',
    category: '技术',
    date: '2026-06-10',
    readTime: '8 分钟',
    views: 1284,
    cover: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    featured: true,
  },
  {
    id: 2,
    title: '移动端 UI 设计的 7 个实用原则',
    excerpt: '触摸目标、留白、层级与动效——让手机上的阅读体验更舒适。',
    category: '技术',
    date: '2026-06-05',
    readTime: '5 分钟',
    views: 892,
    cover: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 3,
    title: '周末徒步：城市边缘的治愈时刻',
    excerpt: '离开屏幕，走进山林。记录一次没有信号却充满收获的短途旅行。',
    category: '生活',
    date: '2026-05-28',
    readTime: '4 分钟',
    views: 567,
    cover: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 4,
    title: '理解 JavaScript 事件循环',
    excerpt: '宏任务、微任务与渲染时机——用一张图讲清楚异步执行顺序。',
    category: '技术',
    date: '2026-05-20',
    readTime: '10 分钟',
    views: 2103,
    cover: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 5,
    title: '写作是一种整理思绪的方式',
    excerpt: '为什么我开始写博客，以及写作如何帮助我更好地思考。',
    category: '随笔',
    date: '2026-05-12',
    readTime: '3 分钟',
    views: 445,
    cover: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    id: 6,
    title: '黄昏街头的光影瞬间',
    excerpt: '用镜头捕捉城市傍晚的暖色调，分享几条实用的街头摄影构图心得。',
    category: '摄影',
    date: '2026-05-08',
    readTime: '6 分钟',
    views: 731,
    cover: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
    featured: true,
  },
]

export function getFeaturedPosts() {
  return posts.filter((post) => post.featured)
}

export const blogInfo = {
  name: 'HΘΓΞ博客',
  tagline: '记录代码与生活',
  author: 'HΘΓΞ',
  bio: '前端开发者 · 热爱技术与摄影',
  avatar: 'M',
}
