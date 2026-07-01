import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BlogProvider } from './context/BlogContext'
import OnboardingGate from './components/OnboardingGate'
import MainLayout from './layouts/MainLayout'
import OnboardingPage from './pages/OnboardingPage'

const ArticlePage = lazy(() => import('./pages/ArticlePage'))

function PageLoader() {
  return (
    <div className="app page-loader">
      <div className="page-loader__bar" />
      <div className="page-loader__bar page-loader__bar--short" />
      <div className="page-loader__block" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <BlogProvider>
        <OnboardingGate />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/welcome" element={<OnboardingPage />} />
            <Route path="/" element={<MainLayout />} />
            <Route path="/article/:id" element={<ArticlePage />} />
          </Routes>
        </Suspense>
      </BlogProvider>
    </BrowserRouter>
  )
}
