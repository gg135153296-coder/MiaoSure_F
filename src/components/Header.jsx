export default function Header({
  title,
  menuOpen,
  onMenuClick,
  onSearchClick,
  onBanner = false,
}) {
  return (
    <header className={`header${onBanner ? ' header--on-banner' : ''}`}>
      <button
        type="button"
        className={`header__menu${menuOpen ? ' header__menu--open' : ''}`}
        aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
        aria-expanded={menuOpen}
        onClick={onMenuClick}
      >
        <span />
        <span />
        <span />
      </button>

      {/* <h1 className="header__title">{title}</h1> */}

      <button
        type="button"
        className="header__search"
        aria-label="搜索文章"
        onClick={onSearchClick}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      </button>
    </header>
  )
}
