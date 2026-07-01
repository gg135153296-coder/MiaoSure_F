import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPostCover } from '../utils/getPostCover'

const AUTO_PLAY_MS = 4500

export default function FeaturedCarousel({ posts }) {
  const [active, setActive] = useState(0)
  const trackRef = useRef(null)
  const pausedRef = useRef(false)

  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current
    if (!track) return

    const slide = track.children[index]
    if (!slide) return

    const offset = slide.offsetLeft - (track.offsetWidth - slide.offsetWidth) / 2
    track.scrollTo({ left: offset, behavior: 'smooth' })
    setActive(index)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track || posts.length <= 1) return

    const onScroll = () => {
      const center = track.scrollLeft + track.offsetWidth / 2
      let closest = 0
      let minDist = Infinity

      Array.from(track.children).forEach((slide, index) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
        const dist = Math.abs(center - slideCenter)
        if (dist < minDist) {
          minDist = dist
          closest = index
        }
      })

      setActive(closest)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [posts.length])

  useEffect(() => {
    if (posts.length <= 1) return

    const timer = setInterval(() => {
      if (pausedRef.current) return
      setActive((prev) => {
        const next = (prev + 1) % posts.length
        scrollToIndex(next)
        return next
      })
    }, AUTO_PLAY_MS)

    return () => clearInterval(timer)
  }, [posts.length, scrollToIndex])

  const pauseAutoPlay = () => {
    pausedRef.current = true
    setTimeout(() => {
      pausedRef.current = false
    }, 6000)
  }

  return (
    <div className="featured-carousel">
      <div
        className="featured-carousel__track"
        ref={trackRef}
        onTouchStart={pauseAutoPlay}
        onMouseDown={pauseAutoPlay}
      >
        {posts.map((post) => {
          const coverImage = getPostCover(post)

          return (
            <Link
              key={post.id}
              to={`/article/${post.id}`}
              className="featured-carousel__slide"
            >
              {coverImage ? (
                <img
                  className="featured-carousel__image"
                  src={coverImage}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div
                  className="featured-carousel__image featured-carousel__image--gradient"
                  style={{ background: post.cover }}
                  aria-hidden="true"
                />
              )}
              <div className="featured-carousel__overlay" />
              <div className="featured-carousel__content">
                <span className="featured-carousel__category">{post.category}</span>
                <h3 className="featured-carousel__title">{post.title}</h3>
                <p className="featured-carousel__excerpt">{post.excerpt}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {posts.length > 1 && (
        <div className="featured-carousel__dots">
          {posts.map((post, index) => (
            <button
              key={post.id}
              type="button"
              className={`featured-carousel__dot${active === index ? ' featured-carousel__dot--active' : ''}`}
              aria-label={`第 ${index + 1} 张`}
              onClick={() => {
                pauseAutoPlay()
                scrollToIndex(index)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
