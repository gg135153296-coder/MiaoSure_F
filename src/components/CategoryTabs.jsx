export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <nav className="category-tabs" aria-label="文章分类">
      {categories.map((cat) => (
        <button
          key={cat}
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
