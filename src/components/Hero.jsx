import { useBlog } from '../context/BlogContext'

export default function Hero() {
  const { blog, loading } = useBlog()

  if (loading || !blog) {
    return (
      <section className="hero hero--loading">
        <div className="hero__avatar skeleton" />
        <div className="hero__content">
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--line skeleton--short" />
        </div>
      </section>
    )
  }

  return (
    <section className="hero">
      <div className="hero__avatar">{blog.avatar}</div>
      <div className="hero__content">
        <h2 className="hero__name">{blog.author}</h2>
        <p className="hero__bio">{blog.bio}</p>
        <p className="hero__tagline">{blog.tagline}</p>
      </div>
    </section>
  )
}
