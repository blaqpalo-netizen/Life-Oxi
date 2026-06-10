import { Activity, ArrowDown, ShieldCheck } from 'lucide-react'
import { useHeroEntrance } from '@/animations/useHeroEntrance'
import MetricCounter from '@/components/MetricCounter'
import PremiumButton from '@/components/PremiumButton'
import { heroMetrics, trustSignals } from '@/data/site'

export default function HeroSection() {
  const heroRef = useHeroEntrance()

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative isolate min-h-[100svh] overflow-hidden border-b border-white/10 bg-surface-dark text-white"
    >
      <video
        data-hero-video
        className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.96] slow-pan"
        src="/videos/hero-video-secondary.mp4"
        poster="/images/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,8,10,0.72)_0%,rgba(1,8,10,0.38)_42%,rgba(1,8,10,0.08)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface-dark via-surface-dark/64 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[52%] bg-[linear-gradient(90deg,rgba(1,8,10,0.28),transparent)]" />

      <div className="section-shell relative z-10 flex min-h-[100svh] flex-col justify-end pb-6 pt-24 sm:pb-8 lg:pt-32">
        <div className="max-w-5xl">
          <p data-hero className="font-display text-base font-semibold text-brand-200 sm:text-lg">
            Life-Oxi Engineering Solutions
          </p>
          <h1 data-hero className="mt-4 display-xl max-w-6xl text-white">
            <span data-hero-mask>
              <span>Medical gas infrastructure</span>
            </span>
            <span data-hero-mask className="block">
              <span>built for clinical continuity</span>
            </span>
          </h1>
          <p data-hero className="mt-5 max-w-3xl lead text-sage-100/88">
            Enterprise medical oxygen, air, vacuum, and bedside delivery systems for hospitals,
            contractors, and healthcare institutions that need safe commissioning and dependable uptime.
          </p>

          <div data-hero className="mt-7 flex flex-col gap-3 sm:flex-row">
            <PremiumButton href="/#contact">Request Technical Assessment</PremiumButton>
            <PremiumButton href="/#projects" variant="ghost">
              View Engineering Work
            </PremiumButton>
          </div>

          <div data-hero className="mt-7 grid max-w-3xl gap-2 sm:grid-cols-2 lg:grid-cols-4" aria-label="Engineering trust signals">
            {trustSignals.map((item) => (
              <div key={item} className="flex items-center gap-2 border-t border-white/14 pt-3 caption text-sage-100/88">
                <ShieldCheck size={16} className="shrink-0 text-brand-200" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-4">
            {heroMetrics.map((metric) => (
              <div
                key={metric.label}
                data-hero-metric
                className="bg-surface-dark/56 px-4 py-4 backdrop-blur-xl transition duration-300 hover:bg-surface-dark/72"
              >
                <MetricCounter {...metric} />
              </div>
            ))}
          </div>

          <a
            data-hero
            href="/#trust"
            className="hidden items-center gap-3 pb-2 caption text-sage-100/70 transition hover:text-white lg:flex"
          >
            <Activity size={18} className="text-brand-200" />
            Trusted delivery evidence below
            <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
