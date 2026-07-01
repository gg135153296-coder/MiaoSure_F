import { useEffect, useState } from 'react'
import { fetchProfileStats } from '../api/profile'
import { useBlog } from '../context/BlogContext'

export default function ProfilePage() {
  const { blog } = useBlog()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfileStats()
      .then(setProfile)
      .catch(() => setProfile(null))
      .finally(() => setLoading(false))
  }, [])

  const stats = profile?.stats ?? []
  const skills = profile?.skills ?? blog?.skills ?? []
  const contacts = profile?.contacts ?? blog?.contacts ?? {}
  const about = profile?.about ?? blog?.about ?? []

  if (loading) {
    return <p className="page-status">加载中...</p>
  }

  return (
    <div className="page-content">
      <section className="profile-card">
        <div className="profile-card__avatar">{blog?.avatar ?? 'M'}</div>
        <h2 className="profile-card__name">{blog?.author ?? ''}</h2>
        <p className="profile-card__bio">{blog?.bio ?? ''}</p>
        <p className="profile-card__tagline">{blog?.tagline ?? ''}</p>
      </section>

      <section className="profile-stats">
        {stats.map((item) => (
          <div key={item.label} className="profile-stats__item">
            <span className="profile-stats__value">{item.value}</span>
            <span className="profile-stats__label">{item.label}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <h2 className="section__title">关于我</h2>
        <div className="profile-about">
          {about.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">技术栈</h2>
        <div className="tag-grid">
          {skills.map((skill) => (
            <span key={skill} className="tag-grid__item">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">联系方式</h2>
        <ul className="contact-list">
          {contacts.github && (
            <li className="contact-list__item">
              <span className="contact-list__label">GitHub</span>
              <span className="contact-list__value">{contacts.github}</span>
            </li>
          )}
          {contacts.email && (
            <li className="contact-list__item">
              <span className="contact-list__label">邮箱</span>
              <span className="contact-list__value">{contacts.email}</span>
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}
