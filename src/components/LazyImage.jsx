import { useEffect, useRef, useState } from 'react'

export default function LazyImage({ src, alt, caption }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '120px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <figure ref={ref} className="article-figure">
      <div className={`article-figure__frame${loaded ? ' article-figure__frame--loaded' : ''}`}>
        {!loaded && <div className="article-figure__skeleton" aria-hidden="true" />}
        {inView && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
      {caption && <figcaption className="article-figure__caption">{caption}</figcaption>}
    </figure>
  )
}
