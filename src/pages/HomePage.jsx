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
        <h2 className="section__title">
          {activeCategory === '全部' ? '最新文章' : activeCategory}
          <span className="section__count">{listPosts.length} 篇</span>
        </h2>

        {loading && <p className="page-status">加载中...</p>}
        {error && !loading && <p className="page-status page-status--error">{error}</p>}

        {!loading && !error && (
          <ArticleList posts={listPosts} />
        )}

        {!loading && !error && listPosts.length === 0 && (
          <p className="empty">该分类暂无文章</p>
        )}
      </section>
    </>
  )
}
