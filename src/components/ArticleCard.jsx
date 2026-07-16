import { Link } from 'react-router-dom'
import { getPostCover } from '../utils/getPostCover'

export default function ArticleCard({ post, index = 0, offsetY = 0 }) {
  const coverImage = getPostCover(post)
  const col = index % 2

  return (
    <Link
      to={`/article/${post.id}`}
      className="article-card article-card--grid"
      style={{
        '--stagger': `${Math.floor(index / 2) * 0.08 + col * 0.04}s`,
        '--offset-y': `${offsetY}px`,
      }}
    >
      <div className="article-card__accent" aria-hidden="true" />

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
        <div className="article-card__cover-shine" aria-hidden="true" />
        <span className="article-card__category">{post.category}</span>
      </div>

      <div className="article-card__body">
        <h3 className="article-card__title">{post.title}</h3>
        <div className="article-card__footer">
          <time dateTime={post.date}>{post.date}</time>
          <span className="article-card__dot">·</span>
          <span>{post.views} 阅读</span>
        </div>
      </div>

      <div className="article-card__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </div>
    </Link>
  )
}
