import { useEffect, useState } from 'react'
import { fetchFeaturedPosts, fetchPosts } from '../api/posts'
import { useBlog } from '../context/BlogContext'
import CategoryTabs from '../components/CategoryTabs'
import ArticleList from '../components/ArticleList'
import FeaturedCarousel from '../components/FeaturedCarousel'

export default function HomePage({ activeCategory, onCategoryChange }) {
  const { blog } = useBlog()
  const categories = blog?.categories ?? ['全部']

  const [featuredPosts, setFeaturedPosts] = useState([])
  const [listPosts, setListPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchFeaturedPosts()
      .then(setFeaturedPosts)
      .catch(() => setFeaturedPosts([]))
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(null)

    const params = { category: activeCategory }
    if (activeCategory === '全部') {
      params.excludeFeatured = 'true'
    }

    fetchPosts(params)
      .then((data) => setListPosts(data.list))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [activeCategory])

  return (
    <>
      {/* <CategoryTabs
        categories={categories}
        active={activeCategory}
        onChange={onCategoryChange}
      /> */}

      {featuredPosts.length > 0 && activeCategory === '全部' && (
        <section className="section section--carousel">
          <FeaturedCarousel posts={featuredPosts} />
        </section>
      )}

      <section className="section section--latest">
        <div className="latest-header">
          <div className="latest-header__row">
            <h2 className="latest-header__title">
              <span className="latest-header__bar" aria-hidden="true" />
              {activeCategory === '全部' ? '最新文章' : activeCategory}
            </h2>
            {/* {!loading && !error && (
              <span className="latest-header__badge">{listPosts.length} 篇</span>
            )} */}
          </div>
          <p className="latest-header__desc">探索最近更新与精选内容</p>
        </div>

        {loading && (
          <div className="latest-loading">
            {[0, 1, 2].map((i) => (
              <div key={i} className="latest-loading__card skeleton" />
            ))}
          </div>
        )}
        {error && !loading && <p className="page-status page-status--error">{error}</p>}

        {!loading && !error && (
          <ArticleList posts={listPosts} />
        )}

        {!loading && !error && listPosts.length === 0 && (
          <p className="latest-empty">该分类暂无文章</p>
        )}
      </section>
    </>
  )
}
