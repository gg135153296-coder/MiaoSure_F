import { useMemo, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import avatarImg from '../assets/touxiang02.png'
import qrcodeImg from '../assets/resume-qrcode.png'
import ResumeExportBar from '../components/ResumeExportBar'
import { useResumeData } from '../hooks/useResumeData'
import { buildResumeMarkdown } from '../utils/buildResumeMarkdown'
import './ResumePage.css'

function ContactIcon({ type }) {
  switch (type) {
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" />
        </svg>
      )
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M6.5 4h3l1.5 5-2 1.5a11 11 0 005 5L17.5 13.5 22.5 15v3a2 2 0 01-2.1 2A18 18 0 013 5.1 2 2 0 015 3z" />
        </svg>
      )
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      )
    case 'user':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      )
    case 'badge':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.2l5-.7L12 3z" />
        </svg>
      )
    default:
      return null
  }
}

function getPlainText(children) {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) {
    return children
      .map((child) => (typeof child === 'string' || typeof child === 'number' ? String(child) : ''))
      .join('')
  }
  return ''
}

const markdownComponents = {
  h2: ({ children }) => <h2 className="resume-section__title">{children}</h2>,
  h3: ({ children }) => <h3 className="resume-timeline__role">{children}</h3>,
  p: ({ children }) => {
    const content = getPlainText(children)
    const isProjectStart = /^([一二三四五六七八九十]、)?项目名称：/.test(content)
    return (
      <p className={`resume-md__p${isProjectStart ? ' resume-project-block__start' : ''}`}>
        {children}
      </p>
    )
  },
  ul: ({ children }) => <ul className="resume-list">{children}</ul>,
  ol: ({ children }) => <ol className="resume-project__list">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => <strong className="resume-md__strong">{children}</strong>,
}

export default function ResumePage() {
  const sheetRef = useRef(null)
  const { resumeData } = useResumeData()
  const resumeMarkdown = useMemo(() => buildResumeMarkdown(resumeData), [resumeData])
  const { profile } = resumeData

  return (
    <div className="resume-page">
      <ResumeExportBar sheetRef={sheetRef} resumeData={resumeData} />
      <main className="resume-page__main">
        <article className="resume-sheet" ref={sheetRef}>
          <header className="resume-header">
            <div className="resume-header__profile">
              <img className="resume-header__avatar" src={avatarImg} alt="" />
              <div className="resume-header__identity">
                <h1 className="resume-header__name">{profile.name}</h1>
                <p className="resume-header__title">{profile.title}</p>
              </div>
            </div>

            <ul className="resume-header__contacts">
              {profile.contacts.map((item) => (
                <li
                  key={`${item.label}-${item.value}`}
                  className={`resume-header__contact${item.icon === 'mail' ? ' resume-header__contact--mail' : ''}`}
                >
                  <span className="resume-header__contact-icon">
                    <ContactIcon type={item.icon} />
                  </span>
                  <span className="resume-header__contact-text">
                    <span className="resume-header__contact-label">{item.label}：</span>
                    {item.href ? (
                      <a href={item.href}>{item.value}</a>
                    ) : (
                      item.value
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </header>

          <div className="resume-md">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {resumeMarkdown}
            </ReactMarkdown>
          </div>

          <div className="resume-pdf-qrcode-page">
            <img className="resume-pdf-qrcode" src={qrcodeImg} alt="简历二维码" />
          </div>
        </article>
      </main>
    </div>
  )
}
