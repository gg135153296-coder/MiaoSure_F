import { useEffect, useState } from 'react'
import { fetchResumeProfile } from '../api/resume'
import { getDefaultResumeData, mergeResumeData } from '../utils/mergeResumeData'

export function useResumeData() {
  const [resumeData, setResumeData] = useState(getDefaultResumeData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetchResumeProfile()
      .then((data) => {
        if (!cancelled) setResumeData(mergeResumeData(data))
      })
      .catch((error) => {
        console.warn('Resume profile API unavailable, using defaults:', error)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { resumeData, loading }
}
