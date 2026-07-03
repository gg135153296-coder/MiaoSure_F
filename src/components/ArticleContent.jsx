import Markdown from 'react-markdown'
import LazyImage from './LazyImage'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

function renderBlock(block, index) {
  switch (block.type) {
    case 'heading':
      if (block.level === 3) {
        return <h3 key={index} className="article-content__h3">{block.content}</h3>
      }
      return <h2 key={index} className="article-content__h2">{block.content}</h2>

    case 'text':
      return (
        <div key={index} className="article-content__text">
          <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
            {block.content}
          </Markdown>
        </div>
      )

    case 'image':
      return (
        <LazyImage
          key={index}
          src={block.src}
          alt={block.alt}
          caption={block.caption}
        />
      )

    case 'quote':
      return (
        <blockquote key={index} className="article-content__quote">
          {block.content}
        </blockquote>
      )

    case 'divider':
      return <hr key={index} className="article-content__divider" />

    default:
      return null
  }
}

export default function ArticleContent({ blocks }) {
  return (
    <div className="article-content">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  )
}
