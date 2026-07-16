import { useCallback, useEffect, useRef, useState } from 'react'

export default function CategoryTabs({ categories, active, onChange }) {
  const navRef = useRef(null)
  const itemRefs = useRef({})
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  const updateIndicator = useCallback(() => {
    const nav = navRef.current
    const activeEl = itemRefs.current[active]
    if (!nav || !activeEl) return

    const navRect = nav.getBoundingClientRect()
    const activeRect = activeEl.getBoundingClientRect()

    setIndicator({
      left: activeRect.left - navRect.left + nav.scrollLeft,
      width: activeRect.width,
    })
  }, [active])

  useEffect(() => {
    updateIndicator()

    const nav = navRef.current
    if (!nav) return

    const activeEl = itemRefs.current[active]
    activeEl?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })

    const observer = new ResizeObserver(updateIndicator)
    observer.observe(nav)
    Object.values(itemRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    nav.addEventListener('scroll', updateIndicator, { passive: true })
    window.addEventListener('resize', updateIndicator)

    return () => {
      observer.disconnect()
      nav.removeEventListener('scroll', updateIndicator)
      window.removeEventListener('resize', updateIndicator)
    }
  }, [active, categories, updateIndicator])

  return (
    <nav className="category-tabs" ref={navRef} aria-label="文章分类">
      <div
        className="category-tabs__track"
        aria-hidden="true"
      >
        <span
          className={`category-tabs__indicator${indicator.width > 0 ? ' category-tabs__indicator--ready' : ''}`}
          style={{
            width: indicator.width,
            transform: `translateX(${indicator.left}px)`,
          }}
        />
      </div>

      {categories.map((cat) => (
        <button
          key={cat}
          ref={(el) => {
            itemRefs.current[cat] = el
          }}
          type="button"
          className={`category-tabs__item${active === cat ? ' category-tabs__item--active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </nav>
  )
}
