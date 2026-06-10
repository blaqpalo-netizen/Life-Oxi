import MetricCounter from '@/components/MetricCounter'
import { certificationStrip, impactStats } from '@/data/site'

export default function ImpactStatsBand() {
  return (
    <section id="impact" className="relative overflow-hidden bg-surface-dark py-16 text-white sm:py-20 lg:py-28">
      <div className="absolute inset-0 dark-grid opacity-30" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent" />
      <div className="section-shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:items-end">
          <div data-reveal="clip">
            <p className="eyebrow text-brand-200">Impact</p>
            <h2 className="mt-3 display-md max-w-3xl text-white">
              Infrastructure proof, measured in hospitals, plants, systems and regions served.
            </h2>
          </div>

          <p data-reveal="fade" className="lead max-w-2xl text-sage-100/78 lg:ml-auto">
            Medical gas systems are judged by reliability after handover. These figures anchor the
            brand story in field delivery rather than marketing language.
          </p>
        </div>

        <div data-reveal-group="scale" className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {impactStats.map((stat) => (
            <article key={stat.label} data-reveal="scale" className="bg-surface-dark/88 p-6 sm:p-7">
              <MetricCounter
                {...stat}
                className="text-5xl text-white sm:text-6xl lg:text-7xl"
                labelClassName="text-sage-300"
              />
            </article>
          ))}
        </div>

        <div data-reveal className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-4">
          {certificationStrip.map((item) => (
            <article key={item.code} className="bg-white/[0.035] p-5 transition duration-300 hover:bg-white/[0.06]">
              <p className="font-display text-xl font-semibold text-brand-200">{item.code}</p>
              <p className="mt-2 text-sm leading-6 text-sage-100/72">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
