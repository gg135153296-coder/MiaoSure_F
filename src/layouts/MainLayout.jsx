import { useCallback, useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import SideMenu from '../components/SideMenu'
import SearchPanel from '../components/SearchPanel'
import HomePage from '../pages/HomePage'
import ExplorePage from '../pages/ExplorePage'
import WritePage from '../pages/WritePage'
import ProfilePage from '../pages/ProfilePage'
import { navItems } from '../data/navItems'
import '../App.css'

const CHROME_HIDE_DELAY = 3200
const SCROLL_HIDE_THRESHOLD = 10

export default function MainLayout() {
  const appRef = useRef(null)
  const hideTimerRef = useRef(null)
  const scrollStateRef = useRef({ el: null, lastTop: 0 })
  const [chromeVisible, setChromeVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [homeCategory, setHomeCategory] = useState('全部')
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const currentNav = navItems.find((item) => item.id === activeTab)

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId)
    setMenuOpen(false)
    setSearchOpen(false)
  }, [])

  const handleCategorySelect = useCallback((category) => {
    setActiveTab('home')
    setHomeCategory(category)
  }, [])

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      if (!prev) setSearchOpen(false)
      return !prev
    })
  }, [])

  const openSearch = useCallback(() => {
    setSearchOpen(true)
    setMenuOpen(false)
  }, [])

  const closeOverlays = useCallback(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [])

  const hideChrome = useCallback(() => {
    setChromeVisible(false)
  }, [])

  const scheduleHideChrome = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    hideTimerRef.current = window.setTimeout(() => {
      hideChrome()
    }, CHROME_HIDE_DELAY)
  }, [hideChrome])

  const showChrome = useCallback(() => {
    setChromeVisible(true)
    if (!menuOpen && !searchOpen) {
      scheduleHideChrome()
    }
  }, [menuOpen, searchOpen, scheduleHideChrome])

  useEffect(() => {
    if (menuOpen || searchOpen) {
      setChromeVisible(true)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      return
    }

    if (chromeVisible) {
      scheduleHideChrome()
    }
  }, [menuOpen, searchOpen, chromeVisible, scheduleHideChrome])

  useEffect(() => {
    const app = appRef.current
    if (!app) return

    const onInteract = () => showChrome()

    const onScroll = (e) => {
      const target = e.target
      if (!(target instanceof HTMLElement)) return
      if (!target.classList.contains('main')) return
      if (target.dataset.autoscrolling === 'true') return

      const scrollTop = target.scrollTop
      const state = scrollStateRef.current

      if (state.el !== target) {
        state.el = target
        state.lastTop = scrollTop
        return
      }

      const delta = scrollTop - state.lastTop
      if (Math.abs(delta) < SCROLL_HIDE_THRESHOLD) return

      state.lastTop = scrollTop

      if (delta > 0 && scrollTop > 48) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
        hideChrome()
        return
      }

      if (delta < 0) {
        showChrome()
      }
    }

    app.addEventListener('touchstart', onInteract, { passive: true })
    app.addEventListener('mousedown', onInteract)
    app.addEventListener('scroll', onScroll, { passive: true, capture: true })

    return () => {
      app.removeEventListener('touchstart', onInteract)
      app.removeEventListener('mousedown', onInteract)
      app.removeEventListener('scroll', onScroll, { capture: true })
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [showChrome, hideChrome])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeOverlays()
    }

    if (menuOpen || searchOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen, searchOpen, closeOverlays])

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            activeCategory={homeCategory}
            onCategoryChange={setHomeCategory}
          />
        )
      case 'explore':
        return <ExplorePage />
      case 'write':
        return <WritePage />
      case 'me':
        return <ProfilePage />
      default:
        return null
    }
  }

  return (
    <div
      ref={appRef}
      className={[
        'app',
        menuOpen || searchOpen ? 'app--locked' : '',
        chromeVisible ? 'app--chrome-visible' : '',
      ].filter(Boolean).join(' ')}
    >
      <Header
        title={currentNav?.title ?? 'HΘΓΞ 博客'}
        menuOpen={menuOpen}
        onMenuClick={toggleMenu}
        onSearchClick={openSearch}
        onBanner={activeTab === 'home'}
      />

      <SideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCategorySelect={handleCategorySelect}
      />

      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="main">
        {renderPage()}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
