import { useBlog } from '../context/BlogContext'
import { navItems } from '../data/navItems'

export default function SideMenu({
  open,
  onClose,
  activeTab,
  onTabChange,
  onCategorySelect,
}) {
  const { blog } = useBlog()
  const menuCategories = (blog?.categories ?? []).filter((cat) => cat !== '全部')

  const handleNavClick = (tabId) => {
    onTabChange(tabId)
    onClose()
  }

  const handleCategoryClick = (category) => {
    onCategorySelect(category)
    onClose()
  }

  return (
    <>
      <div
        className={`side-menu__backdrop${open ? ' side-menu__backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`side-menu${open ? ' side-menu--open' : ''}`}
        aria-hidden={!open}
        aria-label="侧边导航"
      >
        <div className="side-menu__header">
          <div className="side-menu__avatar">{blog?.avatar ?? 'M'}</div>
          <div>
            <p className="side-menu__name">{blog?.name ?? 'HΘΓΞ博客'}</p>
            <p className="side-menu__tagline">{blog?.tagline ?? ''}</p>
          </div>
        </div>

        <nav className="side-menu__section">
          <p className="side-menu__label">页面导航</p>
          <ul className="side-menu__list">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`side-menu__item${activeTab === item.id ? ' side-menu__item--active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span className="side-menu__icon">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="side-menu__section">
          <p className="side-menu__label">文章分类</p>
          <ul className="side-menu__list">
            {menuCategories.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  className="side-menu__item side-menu__item--category"
                  onClick={() => handleCategoryClick(cat)}
                >
                  <span className="side-menu__dot" />
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="side-menu__footer">
          <p className="side-menu__author">{blog?.author ?? ''}</p>
          <p className="side-menu__bio">{blog?.bio ?? ''}</p>
        </div>
      </aside>
    </>
  )
}
