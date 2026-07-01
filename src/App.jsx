import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BlogProvider } from './context/BlogContext'
import MainLayout from './layouts/MainLayout'

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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/article/:id" element={<ArticlePage />} />
          </Routes>
        </Suspense>
      </BlogProvider>
    </BrowserRouter>
  )
}
