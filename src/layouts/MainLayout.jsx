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

const CHROME_HIDE_DELAY = 2800

export default function MainLayout() {
  const appRef = useRef(null)
  const hideTimerRef = useRef(null)
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

  const scheduleHideChrome = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    hideTimerRef.current = window.setTimeout(() => {
      setChromeVisible(false)
    }, CHROME_HIDE_DELAY)
  }, [])

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

    scheduleHideChrome()
  }, [menuOpen, searchOpen, scheduleHideChrome])

  useEffect(() => {
    const app = appRef.current
    if (!app) return

    const onInteract = () => showChrome()

    app.addEventListener('touchstart', onInteract, { passive: true })
    app.addEventListener('mousedown', onInteract)

    return () => {
      app.removeEventListener('touchstart', onInteract)
      app.removeEventListener('mousedown', onInteract)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [showChrome])

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
