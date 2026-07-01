import coverImage from './4.meta.js'

export default {
  blocks: [
    {
      type: 'text',
      content: 'JavaScript 是单线程的——这意味着同一时刻只能做一件事。那异步代码是怎么「同时」运行的？答案藏在**事件循环**里。',
    },
    {
      type: 'image',
      src: coverImage,
      alt: '代码与数据流示意图',
      caption: '事件循环是 JS 异步的核心机制',
    },
    {
      type: 'heading',
      level: 2,
      content: '宏任务与微任务',
    },
    {
      type: 'text',
      content: '**宏任务**（MacroTask）：`setTimeout`、`setInterval`、I/O 等。**微任务**（MicroTask）：`Promise.then`、`queueMicrotask` 等。每次宏任务执行完毕后，会清空所有微任务队列，然后才进入下一次渲染。',
    },
    {
      type: 'heading',
      level: 2,
      content: '执行顺序',
    },
    {
      type: 'text',
      content: '一段经典代码：`console.log(1)` → `setTimeout(() => console.log(2))` → `Promise.resolve().then(() => console.log(3))` → `console.log(4)`。输出顺序是 **1 → 4 → 3 → 2**，你猜对了吗？',
    },
    {
      type: 'quote',
      content: '理解事件循环，是写出可预测异步代码的第一步。',
    },
    {
      type: 'image',
      src: 'https://picsum.photos/seed/eventloop-2/800/440',
      alt: '开发者思考代码逻辑',
      caption: '画图是理解异步最好的方式',
    },
    {
      type: 'heading',
      level: 2,
      content: '与渲染的关系',
    },
    {
      type: 'text',
      content: '浏览器在微任务队列清空后、下一次宏任务之前，可能会进行**样式计算与布局**。这就是为什么 `requestAnimationFrame` 和 DOM 批量更新常常搭配使用——在正确的时机触达渲染管线。',
    },
  ],
}
