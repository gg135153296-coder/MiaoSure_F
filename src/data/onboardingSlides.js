export const ONBOARDING_DURATION_MS = 12000
export const SLIDE_INTERVAL_MS = ONBOARDING_DURATION_MS / 4

export const onboardingSlides = [
  {
    id: 'read',
    lines: [
      { text: '在线阅读', bold: true },
      { text: '不是未来的', bold: false },
      { text: '大趋势，', bold: true },
      { text: '而是当下的', bold: false },
      { text: '主流方式！', bold: true, caps: true },
    ],
    illustration: 'reading',
  },
  {
    id: 'explore',
    lines: [
      { text: '探索发现', bold: true },
      { text: '浏览精选文章', bold: false },
      { text: '与灵感', bold: true },
      { text: '遇见更广阔的', bold: false },
      { text: '知识世界', bold: true, caps: true },
    ],
    illustration: 'explore',
  },
  {
    id: 'write',
    lines: [
      { text: '自由创作', bold: true },
      { text: '记录所思所想', bold: false },
      { text: '分享观点', bold: true },
      { text: '让文字产生', bold: false },
      { text: '真实价值', bold: true, caps: true },
    ],
    illustration: 'write',
  },
  {
    id: 'welcome',
    lines: [
      { text: '欢迎来到', bold: true },
      { text: '一个有趣博客', bold: false },
      { text: '开启你的', bold: true },
      { text: '专属阅读', bold: false },
      { text: '之旅！', bold: true, caps: true },
    ],
    illustration: 'welcome',
  },
]
