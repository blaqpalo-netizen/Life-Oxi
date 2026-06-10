import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import { advantages, services } from '@/data/site'

function serviceSpan(index: number) {
  if (index === 0) return 'lg:col-span-2 lg:row-span-2'
  if (index === 1) return 'lg:col-span-2'
  return ''
}

export default function ServicesOverview() {
  return (
    <section id="services" className="relative overflow-hidden bg-surface-muted py-16 text-ink-950 sm:py-20 lg:py-28">
      <div className="absolute inset-0 surface-grid opacity-70" aria-hidden="true" />
      <div className="section-shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <SectionHeader
              tone="light"
              eyebrow="Services"
              title="Specialized systems, specified around clinical risk."
              copy="Life-Oxi delivers the infrastructure layer behind oxygen generation, distribution, patient access, and operational continuity."
            />

            <div data-reveal-group className="mt-8 grid gap-3">
              {advantages.map((advantage) => (
                <article key={advantage.title} data-reveal="fade" className="border-t border-ink-950/12 pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-brand-700" />
                    <div>
                      <h3 className="caption text-ink-950">{advantage.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-ink-700">{advantage.copy}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </aside>

          <div data-reveal-group="scale" className="grid auto-rows-[minmax(17rem,auto)] gap-4 lg:grid-cols-4">
            {services.map((service, index) => (
              <article
                key={service.key}
                data-reveal="scale"
                className={`group relative isolate overflow-hidden rounded-lg bg-ink-950 text-white shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-elevated ${serviceSpan(index)}`}
              >
                <img
                  src={service.image}
                  alt={`${service.title} service`}
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.76] transition duration-700 group-hover:scale-[1.05] group-hover:opacity-[0.92]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,8,10,0.08)_0%,rgba(1,8,10,0.78)_100%)]" />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/24 to-transparent" />

                <div className="relative z-10 flex min-h-full flex-col justify-between p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="eyebrow text-brand-200">{service.eyebrow}</p>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition duration-300 group-hover:border-brand-200/70 group-hover:bg-brand-300 group-hover:text-ink-950">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>

                  <div className="pt-16">
                    <h3 className="heading max-w-lg text-white">{service.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-sage-100/82">{service.copy}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
