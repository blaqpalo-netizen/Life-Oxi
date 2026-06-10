import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'

// ✅ Correct import for React + Vite
import { SpeedInsights } from '@vercel/speed-insights/react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StickyContactActions from './components/StickyContactActions'
import Home from './pages/Home'

const Gallery = lazy(() => import('./pages/Gallery'))

function HashScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const target = location.hash || '#home'
    let attempts = 0
    let timeout = 0

    const scrollToTarget = () => {
      const element = document.querySelector(target)
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 74
        const nextTop = Math.max(top, 0)
        window.scrollTo({ top: nextTop, behavior: 'auto' })
        document.documentElement.scrollTop = nextTop
        document.body.scrollTop = nextTop
      }

      attempts += 1
      if (attempts < 8) {
        timeout = window.setTimeout(scrollToTarget, 120)
      }
    }

    timeout = window.setTimeout(scrollToTarget, 120)

    return () => window.clearTimeout(timeout)
  }, [location.pathname, location.hash])

  return null
}

function PageFallback() {
  return (
    <main className="min-h-screen bg-ink-950 px-4 pt-28 text-white" aria-label="Loading page">
      <div className="section-shell">
        <div className="max-w-3xl">
          <div className="h-4 w-32 animate-pulse rounded-full bg-brand-300/35" />
          <div className="mt-5 h-16 w-full max-w-2xl animate-pulse rounded-lg bg-white/10" />
          <div className="mt-4 h-5 w-2/3 animate-pulse rounded-full bg-white/10" />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-56 animate-pulse rounded-lg bg-white/[0.055]" />
          ))}
        </div>
      </div>
    </main>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <HashScrollManager />
      <Navbar />
      <div key={location.pathname} className="animate-in fade-in duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/gallery"
            element={
              <Suspense fallback={<PageFallback />}>
                <Gallery />
              </Suspense>
            }
          />
          <Route path="/about" element={<Navigate to="/#services" replace />} />
          <Route path="/services" element={<Navigate to="/#services" replace />} />
          <Route path="/impact" element={<Navigate to="/#impact" replace />} />
          <Route path="/projects" element={<Navigate to="/#projects" replace />} />
          <Route path="/proof" element={<Navigate to="/#proof" replace />} />
          <Route path="/faq" element={<Navigate to="/#faq" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
      <StickyContactActions />

      {/* ✅ Improved Speed Insights with route prop for React Router */}
      <SpeedInsights route={location.pathname} />
    </>
  )
}