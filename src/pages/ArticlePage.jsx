import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchPost, fetchPostContent } from '../api/posts'
import ArticleContent from '../components/ArticleContent'
import { getPostCover } from '../utils/getPostCover'
import './ArticlePage.css'

export default function ArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const mainRef = useRef(null)

  const [post, setPost] = useState(null)
  const [blocks, setBlocks] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    let cancelled = false

    async function loadArticle() {
      setLoading(true)
      setError(null)
      setPost(null)
      setBlocks(null)

      try {
        const [postData, contentData] = await Promise.all([
          fetchPost(id),
          fetchPostContent(id),
        ])

        if (cancelled) return

        setPost({ ...postData, views: contentData.views })
        setBlocks(contentData.blocks)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadArticle()

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="app article-page">
        <main className="article-page__main">
          <div className="article-page__loading">
            <div className="article-page__loading-line" />
            <div className="article-page__loading-line article-page__loading-line--short" />
            <div className="article-page__loading-block" />
          </div>
        </main>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="app article-page">
        <main className="article-page__main">
          <div className="article-page__status">
            <p>{error || '文章不存在'}</p>
            <button type="button" onClick={() => navigate('/')}>返回首页</button>
          </div>
        </main>
      </div>
    )
  }

  const coverImage = getPostCover(post)

  return (
    <div className="app article-page">
      <main className="article-page__main" ref={mainRef}>
        {coverImage ? (
          <img className="article-page__hero" src={coverImage} alt="" />
        ) : (
          <div
            className="article-page__hero"
            style={{ background: post.cover }}
            aria-hidden="true"
          />
        )}

        <div className="article-page__intro">
          <div className="article-page__meta">
            <span className="article-page__category">{post.category}</span>
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <h1 className="article-page__title">{post.title}</h1>
          <p className="article-page__excerpt">{post.excerpt}</p>
          <div className="article-page__info">
            <span>{post.readTime}</span>
            <span>·</span>
            <span>{post.views} 阅读</span>
          </div>
        </div>

        {blocks && <ArticleContent blocks={blocks} />}
      </main>
    </div>
  )
}
