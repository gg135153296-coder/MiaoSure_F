import { useCallback, useEffect, useRef, useState } from 'react'
import { navItems } from '../data/navItems'

export default function BottomNav({ activeTab, onTabChange }) {
  const navRef = useRef(null)
  const itemRefs = useRef({})
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  const updateIndicator = useCallback(() => {
    const nav = navRef.current
    const activeEl = itemRefs.current[activeTab]
    if (!nav || !activeEl) return

    const navRect = nav.getBoundingClientRect()
    const activeRect = activeEl.getBoundingClientRect()

    setIndicator({
      left: activeRect.left - navRect.left,
      width: activeRect.width,
    })
  }, [activeTab])

  useEffect(() => {
    updateIndicator()

    const nav = navRef.current
    if (!nav) return

    const observer = new ResizeObserver(updateIndicator)
    observer.observe(nav)
    Object.values(itemRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    window.addEventListener('resize', updateIndicator)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateIndicator)
    }
  }, [activeTab, updateIndicator])

  return (
    <nav className="bottom-nav" aria-label="底部导航">
      <div className="bottom-nav__inner" ref={navRef}>
        <div className="bottom-nav__track" aria-hidden="true">
          <span
            className={`bottom-nav__indicator${indicator.width > 0 ? ' bottom-nav__indicator--ready' : ''}`}
            style={{
              width: indicator.width,
              transform: `translateX(${indicator.left}px)`,
            }}
          />
        </div>

        {navItems.map((item) => (
          <button
            key={item.id}
            ref={(el) => {
              itemRefs.current[item.id] = el
            }}
            type="button"
            className={`bottom-nav__item${activeTab === item.id ? ' bottom-nav__item--active' : ''}`}
            onClick={() => onTabChange(item.id)}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            <span className="bottom-nav__icon">{item.icon}</span>
            <span className="bottom-nav__label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
