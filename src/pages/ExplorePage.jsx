import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchHotPosts } from '../api/posts'
import { useBlog } from '../context/BlogContext'

export default function ExplorePage() {
  const { blog } = useBlog()
  const categories = (blog?.categories ?? []).filter((cat) => cat !== '全部')
  const hotTags = blog?.hotTags ?? []

  const [hotPosts, setHotPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHotPosts(3)
      .then(setHotPosts)
      .catch(() => setHotPosts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-content">
      <section className="section">
        <h2 className="section__title">热门分类</h2>
        <div className="tag-grid">
          {categories.map((cat) => (
            <span key={cat} className="tag-grid__item">
              {cat}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">热门标签</h2>
        <div className="tag-grid">
          {hotTags.map((tag) => (
            <span key={tag} className="tag-grid__item tag-grid__item--outline">
              #{tag}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">本周热读</h2>
        {loading && <p className="page-status">加载中...</p>}
        {!loading && (
          <ul className="hot-list">
            {hotPosts.map((post, index) => (
              <li key={post.id} className="hot-list__item">
                <Link to={`/article/${post.id}`} className="hot-list__link">
                  <span className="hot-list__rank">{index + 1}</span>
                  <div className="hot-list__info">
                    <p className="hot-list__title">{post.title}</p>
                    <p className="hot-list__meta">{post.views} 阅读</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
