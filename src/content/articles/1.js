import coverImage from './1.meta.js'

export default {
  blocks: [
    {
      type: 'text',
      content: '搭建个人博客，不必从复杂架构开始。用 **React 19** 配合 **Vite**，可以在一个下午内完成从初始化到本地预览的完整流程。',
    },
    {
      type: 'image',
      src: coverImage,
      alt: '代码编辑器中的 React 项目',
      caption: '轻量工具链让开发体验更专注',
    },
    {
      type: 'heading',
      level: 2,
      content: '项目初始化',
    },
    {
      type: 'text',
      content: '执行 `npm create vite@latest` 选择 React 模板，再安装依赖即可启动。Vite 的 HMR 让每次保存都能即时看到变化，非常适合边写边调。',
    },
    {
      type: 'quote',
      content: '好的博客框架应该足够简单，让你把精力放在内容上，而不是配置上。',
    },
    {
      type: 'heading',
      level: 2,
      content: '移动端优先布局',
    },
    {
      type: 'text',
      content: '博客首页采用 **480px 最大宽度** 的移动端布局，Header 与 BottomNav 固定，中间内容区独立滚动。这种结构在手机上天然友好，桌面浏览器中则像在阅读一本精致的电子书。',
    },
    {
      type: 'image',
      src: 'https://picsum.photos/seed/react-blog-2/800/480',
      alt: '手机上的博客界面',
      caption: '移动端阅读体验是首要考量',
    },
    {
      type: 'heading',
      level: 2,
      content: '按需加载文章',
    },
    {
      type: 'text',
      content: '文章正文放在独立模块中，通过动态 `import` 按需加载。用户只有点开某一篇文章时，才下载对应的内容与图片，首屏保持轻快。',
    },
    {
      type: 'divider',
    },
    {
      type: 'text',
      content: '下一步可以接入 Markdown 文件管理、评论系统，或部署到 Vercel / Netlify。但即使保持现在这样的轻量形态，也已经是一个完整好用的个人博客了。',
    },
  ],
}
