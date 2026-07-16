import { Link } from 'react-router-dom'
import { getPostCover } from '../utils/getPostCover'

export default function ArticleCard({ post, index = 0, offsetY = 0 }) {
  const coverImage = getPostCover(post)

  return (
    <Link
      to={`/article/${post.id}`}
      className="article-card article-card--feed"
      style={{
        '--stagger': `${index * 0.06}s`,
        '--offset-y': `${offsetY}px`,
      }}
    >
      <div className="article-card__cover-wrap">
        {coverImage ? (
          <img
            className="article-card__cover"
            src={coverImage}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="article-card__cover article-card__cover--gradient"
            style={{ background: post.cover }}
            aria-hidden="true"
          />
        )}
        <div className="article-card__cover-overlay" aria-hidden="true" />
        <span className="article-card__category">{post.category}</span>
      </div>

      <div className="article-card__body">
        <h3 className="article-card__title">{post.title}</h3>
        {post.excerpt && (
          <p className="article-card__excerpt">{post.excerpt}</p>
        )}
        <div className="article-card__meta">
          <time dateTime={post.date}>{post.date}</time>
          {post.readTime && <span>{post.readTime}</span>}
          <span className="article-card__views">{post.views} 阅读</span>
        </div>
      </div>
    </Link>
  )
}
