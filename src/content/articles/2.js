import coverImage from './2.meta.js'

export default {
  blocks: [
    {
      type: 'text',
      content: '移动端 UI 设计的第一原则：**触摸目标要够大**。按钮、链接、Tab 的可点击区域建议不小于 44×44pt，避免用户误触或点不到。',
    },
    {
      type: 'image',
      src: coverImage,
      alt: '手指点击手机屏幕',
      caption: '触摸目标尺寸直接影响操作体验',
    },
    {
      type: 'heading',
      level: 2,
      content: '留白与层级',
    },
    {
      type: 'text',
      content: '手机屏幕空间有限，但**留白不是浪费**。适当的间距让信息层级更清晰——标题、摘要、元数据之间保持节奏感，阅读才不会累。',
    },
    {
      type: 'heading',
      level: 2,
      content: '固定导航 + 滚动内容',
    },
    {
      type: 'text',
      content: '顶部 Header 与底部 Tab 固定，中间内容区独立滚动——这是移动 App 最经典的布局模式。用户随时知道自己在哪，也随时可以切换页面。',
    },
    {
      type: 'image',
      src: 'https://picsum.photos/seed/mobile-ui-2/800/420',
      alt: '移动应用界面草图',
      caption: '经典三段式布局永不过时',
    },
    {
      type: 'quote',
      content: '好的移动端设计，是让用户感觉不到设计的存在。',
    },
    {
      type: 'heading',
      level: 2,
      content: '微动效反馈',
    },
    {
      type: 'text',
      content: '卡片点击时的轻微缩放、Tab 切换的颜色过渡——这些微动效给操作以**即时反馈**，让界面感觉「活」了起来，而不是静态的图片。',
    },
  ],
}
