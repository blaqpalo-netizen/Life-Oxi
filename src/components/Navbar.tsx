import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import BrandMark from '@/components/BrandMark'
import PremiumButton from '@/components/PremiumButton'
import { navigation } from '@/data/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const activeHash = location.hash || '#home'
  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      return location.pathname === '/' && activeHash === href.replace('/', '')
    }

    return location.pathname === href
  }

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/10 bg-ink-950/75 shadow-2xl backdrop-blur-2xl'
            : 'bg-gradient-to-b from-ink-950/65 to-transparent'
        }`}
      >
        <div className="section-shell flex h-[4.5rem] items-center justify-between">
          <BrandMark />

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] p-1 backdrop-blur-xl lg:flex">
            {navigation.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? 'scale-[1.02] bg-white text-ink-950'
                    : 'text-sage-100/75 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <PremiumButton
              href="/#contact"
              size="sm"
              showArrow={false}
              className="hidden md:inline-flex"
            >
              Request Assessment
            </PremiumButton>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.05] text-white lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="section-shell flex h-full flex-col justify-center gap-4 pt-20">
          {navigation.map((link, i) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-3 font-display text-3xl font-semibold text-white transition-colors hover:text-brand-200"
              style={{
                transitionDelay: menuOpen ? `${i * 50}ms` : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
          <PremiumButton
            href="/#contact"
            showArrow={false}
            onClick={() => setMenuOpen(false)}
            className="mt-6 w-fit"
            style={{
              transitionDelay: menuOpen ? '250ms' : '0ms',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.4s ease',
            }}
          >
            Request Assessment
          </PremiumButton>
        </div>
      </div>
    </>
  )
}
