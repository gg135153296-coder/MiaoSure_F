import { navItems } from '../data/navItems'

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="bottom-nav" aria-label="底部导航">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`bottom-nav__item${activeTab === item.id ? ' bottom-nav__item--active' : ''}`}
          onClick={() => onTabChange(item.id)}
          aria-current={activeTab === item.id ? 'page' : undefined}
        >
          <span className="bottom-nav__icon">{item.icon}</span>
          <span className="bottom-nav__label">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
