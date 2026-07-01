import coverImage from './5.meta.js'

export default {
  blocks: [
    {
      type: 'text',
      content: '开始写博客的那个周末，我只是想记下刚读完的一本书。没想到写下第一段之后，**思路突然变得清晰**——原来很多模糊的感受，是需要被文字整理过的。',
    },
    {
      type: 'image',
      src: coverImage,
      alt: '笔记本与咖啡',
      caption: '写作从记录一件小事开始',
    },
    {
      type: 'heading',
      level: 2,
      content: '写作即思考',
    },
    {
      type: 'text',
      content: '费曼说过：如果你不能简单地解释一件事，说明你还没有真正理解它。写作逼着你把概念**拆解、重组、用别人的语言讲一遍**——这个过程本身就是深度学习。',
    },
    {
      type: 'quote',
      content: '我写作不是为了被人看见，而是为了让自己看见。',
    },
    {
      type: 'heading',
      level: 2,
      content: '不必追求完美',
    },
    {
      type: 'text',
      content: '博客不需要每篇都是爆款。一段读书笔记、一次徒步记录、一个技术踩坑——**真实的小记录**，比精心打磨却迟迟不发布的「大作」更有价值。',
    },
    {
      type: 'image',
      src: 'https://picsum.photos/seed/writing-2/800/460',
      alt: '书桌上的台灯',
      caption: '持续记录，比偶尔爆发更重要',
    },
  ],
}
