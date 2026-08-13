import { useEffect, useState } from 'react'
import { verifyResumeAccess } from '../api/resume'
import './ResumeAccessGate.css'

const STORAGE_KEY = 'resume-access-verified'

function validateName(name) {
  const trimmed = name.trim()
  if (!trimmed) return '请输入姓名'
  if (trimmed.length > 20) return '姓名不能超过 20 个字符'
  return null
}

export function isResumeAccessVerified() {
  return sessionStorage.getItem(STORAGE_KEY) === '1'
}

export default function ResumeAccessGate({ children }) {
  const [verified, setVerified] = useState(() => isResumeAccessVerified())
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (verified) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [verified])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = validateName(name)
    if (validationError) {
      setError(validationError)
      return
    }

    setSubmitting(true)
    setError('')

    try {
      await verifyResumeAccess(name.trim())
      sessionStorage.setItem(STORAGE_KEY, '1')
      setVerified(true)
    } catch (err) {
      setError(err.message || '验证失败，请稍后重试')
    } finally {
      setSubmitting(false)
    }
  }

  if (verified) {
    return children
  }

  return (
    <div className="resume-access-gate">
      <div className="resume-access-gate__overlay" role="dialog" aria-modal="true" aria-labelledby="resume-access-title">
        <form className="resume-access-gate__dialog" onSubmit={handleSubmit}>
          <h2 id="resume-access-title" className="resume-access-gate__title">访问验证</h2>
          {/* <p className="resume-access-gate__desc">请输入姓名后继续查看</p> */}
          <input
            id="resume-access-name"
            className="resume-access-gate__input"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              if (error) setError('')
            }}
            placeholder="请输入本人姓名"
            autoComplete="name"
            autoFocus
            disabled={submitting}
            maxLength={20}
          />
          <p className="resume-access-gate__error" aria-live="polite">{error}</p>

          <button type="submit" className="resume-access-gate__submit" disabled={submitting}>
            {submitting ? '验证中…' : '确认'}
          </button>
        </form>
      </div>
    </div>
  )
}
