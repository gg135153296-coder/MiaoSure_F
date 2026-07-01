import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingIllustration from '../components/onboarding/OnboardingIllustration'
import {
  ONBOARDING_DURATION_MS,
  SLIDE_INTERVAL_MS,
  onboardingSlides,
} from '../data/onboardingSlides'
import './OnboardingPage.css'

const STORAGE_KEY = 'onboarding-done'

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isExiting, setIsExiting] = useState(false)
  const slideTimerRef = useRef(null)
  const finishTimerRef = useRef(null)

  const finishOnboarding = useCallback(() => {
    setIsExiting(true)
    localStorage.setItem(STORAGE_KEY, '1')
    window.setTimeout(() => {
      navigate('/', { replace: true })
    }, 500)
  }, [navigate])

  const clearTimers = useCallback(() => {
    if (slideTimerRef.current) clearInterval(slideTimerRef.current)
    if (finishTimerRef.current) clearTimeout(finishTimerRef.current)
  }, [])

  useEffect(() => {
    slideTimerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= onboardingSlides.length - 1) return prev
        setDirection(1)
        return prev + 1
      })
    }, SLIDE_INTERVAL_MS)

    finishTimerRef.current = window.setTimeout(finishOnboarding, ONBOARDING_DURATION_MS)

    return clearTimers
  }, [finishOnboarding, clearTimers])

  const handleSkip = () => {
    clearTimers()
    finishOnboarding()
  }

  const slide = onboardingSlides[activeIndex]
  const progress = ((activeIndex + 1) / onboardingSlides.length) * 100

  return (
    <div className={`onboarding${isExiting ? ' onboarding--exit' : ''}`}>
      <button type="button" className="onboarding__skip" onClick={handleSkip}>
        跳过
      </button>

      <div className="onboarding__content">
        <div
          key={slide.id}
          className={`onboarding__slide onboarding__slide--${direction > 0 ? 'forward' : 'backward'}`}
        >
          <div className="onboarding__text">
            {slide.lines.map((line, i) => (
              <p
                key={`${slide.id}-${i}`}
                className={[
                  'onboarding__line',
                  line.bold && 'onboarding__line--bold',
                  line.caps && 'onboarding__line--caps',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ animationDelay: `${0.05 + i * 0.07}s` }}
              >
                {line.text}
              </p>
            ))}
          </div>

          <OnboardingIllustration name={slide.illustration} />
        </div>
      </div>

      <div className="onboarding__footer">
        <div className="onboarding__dots">
          {onboardingSlides.map((item, i) => (
            <span
              key={item.id}
              className={`onboarding__dot${i === activeIndex ? ' onboarding__dot--active' : ''}`}
            />
          ))}
        </div>

        <div className="onboarding__progress">
          <div
            className="onboarding__progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export function shouldShowOnboarding() {
  try {
    return !localStorage.getItem(STORAGE_KEY)
  } catch {
    return false
  }
}
