import { Link } from 'react-router-dom'
import { getPostCover } from '../utils/getPostCover'

export default function ArticleCard({ post }) {
  const coverImage = getPostCover(post)

  return (
    <Link to={`/article/${post.id}`} className="article-card">
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
      </div>
      <div className="article-card__body">
        <div className="article-card__meta">
          <span className="article-card__category">{post.category}</span>
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <h3 className="article-card__title">{post.title}</h3>
        <p className="article-card__excerpt">{post.excerpt}</p>
        <div className="article-card__footer">
          <span>{post.readTime}</span>
          <span className="article-card__dot">·</span>
          <span>{post.views} 阅读</span>
        </div>
      </div>
    </Link>
  )
}
