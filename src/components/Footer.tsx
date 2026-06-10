import { Link } from 'react-router'
import { Mail, MapPin, Phone } from 'lucide-react'
import BrandMark from '@/components/BrandMark'
import { contact, navigation } from '@/data/site'

const serviceLinks = [
  'MGPS design',
  'PSA oxygen plants',
  'Medical air & vacuum',
  'AVSU zoning',
  'Bedside outlets',
  'Maintenance contracts',
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950 text-white">
      <div className="absolute inset-0 scan-grid opacity-15" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent" />

      <div className="section-shell relative z-10 pb-28 pt-12 sm:pb-14 sm:pt-14 md:pb-14">
        <div className="grid gap-9 lg:grid-cols-[1.25fr_0.75fr_0.9fr]">
          <div>
            <BrandMark />
            <p className="mt-6 max-w-md text-sm leading-7 text-sage-100/70">
              Enterprise-grade medical gas infrastructure for hospitals, clinics, and
              healthcare construction partners across Ghana and wider Africa.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-sage-100/75">
              <a
                href={`tel:+233${contact.phones[0].slice(1)}`}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:text-white"
              >
                <Phone size={16} />
                <span>{contact.phones.join(' / ')}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:text-white"
              >
                <Mail size={16} />
                <span>{contact.email}</span>
              </a>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
                <MapPin size={16} />
                <span>{contact.location}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase text-brand-200">Explore</h4>
            <ul className="grid gap-3 text-sm">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sage-100/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase text-brand-200">Engineering scope</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-sage-100/75">
              {serviceLinks.map((link) => (
                  <div key={link} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
                  {link}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-5 text-xs text-sage-100/60 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Life-Oxi Medical Engineering. All rights reserved.
          </p>
          <p>ISO 7396-1 / HTM 02-01 / ASTM B819 aligned delivery.</p>
        </div>
      </div>
    </footer>
  )
}
