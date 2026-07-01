import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { shouldShowOnboarding } from '../pages/OnboardingPage'

export default function OnboardingGate() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/' && shouldShowOnboarding()) {
      navigate('/welcome', { replace: true })
    }
  }, [location.pathname, navigate])

  return null
}
