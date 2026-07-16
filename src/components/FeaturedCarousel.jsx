import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPostCover } from '../utils/getPostCover'

const AUTO_PLAY_MS = 4500
const SWIPE_THRESHOLD = 48

function getOffset(index, active, total) {
  let diff = index - active
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total
  return diff
}

function getPositionClass(offset) {
  if (offset === 0) return 'featured-carousel__card--active'
  if (offset === -1) return 'featured-carousel__card--prev'
  if (offset === 1) return 'featured-carousel__card--next'
  if (offset === -2) return 'featured-carousel__card--far-prev'
  if (offset === 2) return 'featured-carousel__card--far-next'
  return 'featured-carousel__card--hidden'
}

export default function FeaturedCarousel({ posts }) {
  const [active, setActive] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [progressKey, setProgressKey] = useState(0)
  const pausedRef = useRef(false)
  const touchStartX = useRef(0)
  const dragXRef = useRef(0)

  const total = posts.length

  const goTo = useCallback((index) => {
    if (total === 0) return
    const next = ((index % total) + total) % total
    setActive(next)
    setProgressKey((k) => k + 1)
  }, [total])

  const goNext = useCallback(() => goTo(active + 1), [active, goTo])
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo])

  const pauseAutoPlay = useCallback(() => {
    pausedRef.current = true
    window.setTimeout(() => {
      pausedRef.current = false
    }, 7000)
  }, [])

  useEffect(() => {
    if (total <= 1) return

    const timer = window.setInterval(() => {
      if (pausedRef.current || isDragging) return
      setActive((prev) => {
        const next = (prev + 1) % total
        setProgressKey((k) => k + 1)
        return next
      })
    }, AUTO_PLAY_MS)

    return () => clearInterval(timer)
  }, [total, isDragging])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    dragXRef.current = 0
    setIsDragging(true)
    pauseAutoPlay()
  }

  const handleTouchMove = (e) => {
    const delta = e.touches[0].clientX - touchStartX.current
    dragXRef.current = delta
    setDragX(delta)
  }

  const handleTouchEnd = () => {
    const delta = dragXRef.current
    if (delta < -SWIPE_THRESHOLD) goNext()
    else if (delta > SWIPE_THRESHOLD) goPrev()
    dragXRef.current = 0
    setDragX(0)
    setIsDragging(false)
  }

  const handleCardClick = (index, offset) => {
    pauseAutoPlay()
    if (offset === 0) return
    goTo(index)
  }

  if (total === 0) return null

  return (
    <div className="featured-carousel">
      <div
        className="featured-carousel__stage"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={pauseAutoPlay}
      >
        <div className="featured-carousel__deck">
          {posts.map((post, index) => {
            const offset = getOffset(index, active, total)
            const positionClass = getPositionClass(offset)
            const coverImage = getPostCover(post)
            const isActive = offset === 0

            const cardStyle = isDragging && isActive
              ? { '--drag-x': `${dragX}px` }
              : undefined

            const cardInner = (
              <>
                {coverImage ? (
                  <img
                    className="featured-carousel__image"
                    src={coverImage}
                    alt=""
                    loading={isActive ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                  />
                ) : (
                  <div
                    className="featured-carousel__image featured-carousel__image--gradient"
                    style={{ background: post.cover }}
                    aria-hidden="true"
                  />
                )}
                <div className="featured-carousel__overlay" />
                <div className="featured-carousel__shine" aria-hidden="true" />
                <div className="featured-carousel__content">
                  <span className="featured-carousel__category">{post.category}</span>
                  <h3 className="featured-carousel__title">{post.title}</h3>
                  <p className="featured-carousel__excerpt">{post.excerpt}</p>
                </div>
                {isActive && <div className="featured-carousel__glow" aria-hidden="true" />}
              </>
            )

            return (
              <div
                key={post.id}
                className={`featured-carousel__card ${positionClass}${isDragging ? ' featured-carousel__card--dragging' : ''}`}
              >
                <div
                  className="featured-carousel__card-inner"
                  style={cardStyle}
                  onClick={() => handleCardClick(index, offset)}
                >
                  {isActive ? (
                    <Link to={`/article/${post.id}`} className="featured-carousel__card-link" draggable={false}>
                      {cardInner}
                    </Link>
                  ) : (
                    <div className="featured-carousel__card-link" role="button" tabIndex={-1}>
                      {cardInner}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {total > 1 && (
        <div className="featured-carousel__footer">
          <div className="featured-carousel__counter">
            <span className="featured-carousel__counter-current">
              {String(active + 1).padStart(2, '0')}
            </span>
            <span className="featured-carousel__counter-sep">/</span>
            <span className="featured-carousel__counter-total">
              {String(total).padStart(2, '0')}
            </span>
          </div>

          <div className="featured-carousel__dots">
            {posts.map((post, index) => (
              <button
                key={post.id}
                type="button"
                className={`featured-carousel__dot${active === index ? ' featured-carousel__dot--active' : ''}`}
                aria-label={`第 ${index + 1} 张`}
                onClick={() => {
                  pauseAutoPlay()
                  goTo(index)
                }}
              />
            ))}
          </div>

          <div className="featured-carousel__progress" key={progressKey}>
            <div
              className="featured-carousel__progress-bar"
              style={{ animationDuration: `${AUTO_PLAY_MS}ms` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
