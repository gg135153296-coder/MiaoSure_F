import { useCallback, useEffect, useRef } from 'react'
import ArticleCard from './ArticleCard'

const SCROLL_SPEED = 32
const SCROLL_START_DELAY = 1200
const BOTTOM_PAUSE_MS = 2000

const LEFT_OFFSETS = [0, 14, 6, 20, 10, 16, 4, 18]
const RIGHT_OFFSETS = [18, 8, 22, 12, 24, 6, 16, 10]

function getCardOffset(index) {
  const col = index % 2
  const pos = Math.floor(index / 2)
  if (col === 0) return LEFT_OFFSETS[pos % LEFT_OFFSETS.length]
  return RIGHT_OFFSETS[pos % RIGHT_OFFSETS.length]
}

function splitColumns(posts) {
  const left = []
  const right = []
  posts.forEach((post, index) => {
    const item = { post, index, offsetY: getCardOffset(index) }
    if (index % 2 === 0) left.push(item)
    else right.push(item)
  })
  return { left, right }
}

export default function ArticleList({ posts }) {
  const listRef = useRef(null)
  const stoppedRef = useRef(false)
  const rafRef = useRef(null)
  const pauseTimerRef = useRef(null)
  const lastTimeRef = useRef(0)

  const stopAutoScroll = useCallback(() => {
    stoppedRef.current = true
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current)
      pauseTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    stoppedRef.current = false

    const scrollEl = listRef.current?.closest('.main')
    if (!scrollEl || posts.length === 0) return

    const tick = (now) => {
      if (stoppedRef.current) return

      if (!lastTimeRef.current) lastTimeRef.current = now
      const delta = now - lastTimeRef.current
      lastTimeRef.current = now

      const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight
      if (maxScroll <= 0) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      if (scrollEl.scrollTop >= maxScroll - 1) {
        if (!pauseTimerRef.current) {
          pauseTimerRef.current = window.setTimeout(() => {
            pauseTimerRef.current = null
            scrollEl.scrollTop = 0
            lastTimeRef.current = 0
            if (!stoppedRef.current) {
              rafRef.current = requestAnimationFrame(tick)
            }
          }, BOTTOM_PAUSE_MS)
        }
        return
      }

      scrollEl.scrollTop += (SCROLL_SPEED * delta) / 1000
      rafRef.current = requestAnimationFrame(tick)
    }

    const startTimer = window.setTimeout(() => {
      if (!stoppedRef.current) {
        lastTimeRef.current = 0
        rafRef.current = requestAnimationFrame(tick)
      }
    }, SCROLL_START_DELAY)

    const onUserInteract = () => stopAutoScroll()

    scrollEl.addEventListener('touchstart', onUserInteract, { passive: true })
    scrollEl.addEventListener('mousedown', onUserInteract)
    scrollEl.addEventListener('wheel', onUserInteract, { passive: true })

    return () => {
      clearTimeout(startTimer)
      stopAutoScroll()
      scrollEl.removeEventListener('touchstart', onUserInteract)
      scrollEl.removeEventListener('mousedown', onUserInteract)
      scrollEl.removeEventListener('wheel', onUserInteract)
    }
  }, [posts, stopAutoScroll])

  const { left, right } = splitColumns(posts)

  return (
    <div className="article-list" ref={listRef}>
      <div className="article-list__col">
        {left.map(({ post, index, offsetY }) => (
          <ArticleCard key={post.id} post={post} index={index} offsetY={offsetY} />
        ))}
      </div>
      <div className="article-list__col">
        {right.map(({ post, index, offsetY }) => (
          <ArticleCard key={post.id} post={post} index={index} offsetY={offsetY} />
        ))}
      </div>
    </div>
  )
}
