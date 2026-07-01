import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchPosts } from '../api/posts'
import { useBlog } from '../context/BlogContext'

export default function SearchPanel({ open, onClose }) {
  const { blog } = useBlog()
  const hotKeywords = blog?.hotKeywords ?? []

  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    } else {
      setQuery('')
      setResults([])
    }
  }, [open])

  useEffect(() => {
    const keyword = query.trim()
    if (!keyword) {
      setResults([])
      setSearching(false)
      return
    }

    setSearching(true)
    const timer = setTimeout(() => {
      searchPosts(keyword)
        .then(setResults)
        .catch(() => setResults([]))
        .finally(() => setSearching(false))
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleKeywordClick = (keyword) => {
    setQuery(keyword)
    inputRef.current?.focus()
  }

  const goToArticle = (postId) => {
    onClose()
    navigate(`/article/${postId}`)
  }

  return (
    <>
      <div
        className={`search-panel__backdrop${open ? ' search-panel__backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`search-panel${open ? ' search-panel--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="搜索文章"
        aria-hidden={!open}
      >
        <div className="search-panel__bar">
          <span className="search-panel__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </span>
          <input
            ref={inputRef}
            type="search"
            className="search-panel__input"
            placeholder="搜索文章标题、摘要、分类..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            enterKeyHint="search"
          />
          {query && (
            <button
              type="button"
              className="search-panel__clear"
              aria-label="清空搜索"
              onClick={() => setQuery('')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          <button type="button" className="search-panel__cancel" onClick={onClose}>
            取消
          </button>
        </div>

        <div className="search-panel__body">
          {!query.trim() ? (
            <div className="search-panel__hints">
              <p className="search-panel__hints-title">热门搜索</p>
              <div className="search-panel__keywords">
                {hotKeywords.map((word) => (
                  <button
                    key={word}
                    type="button"
                    className="search-panel__keyword"
                    onClick={() => handleKeywordClick(word)}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          ) : searching ? (
            <p className="page-status">搜索中...</p>
          ) : results.length > 0 ? (
            <ul className="search-panel__results">
              {results.map((post) => (
                <li key={post.id}>
                  <button
                    type="button"
                    className="search-panel__result"
                    onClick={() => goToArticle(post.id)}
                  >
                    <span className="search-panel__result-category">{post.category}</span>
                    <span className="search-panel__result-title">{post.title}</span>
                    <span className="search-panel__result-excerpt">{post.excerpt}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="search-panel__empty">
              <p>未找到「{query}」相关文章</p>
              <p className="search-panel__empty-hint">换个关键词试试</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
