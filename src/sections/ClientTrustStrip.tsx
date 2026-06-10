import { clientLogos } from '@/data/site'

export default function ClientTrustStrip() {
  const marqueeLogos = [...clientLogos, ...clientLogos]

  return (
    <section id="trust" className="relative overflow-hidden bg-surface-default py-8 text-ink-950">
      <div className="section-shell">
        <div className="grid gap-6 border-y border-ink-950/10 py-6 lg:grid-cols-[0.38fr_1fr] lg:items-center">
          <div data-reveal="fade">
            <p className="eyebrow text-brand-700">Trusted by healthcare providers, contractors and infrastructure partners.</p>
            <p className="mt-2 caption text-ink-700">
              Reference projects across hospital networks, construction partners, and clinical engineering teams.
            </p>
          </div>

          <div data-reveal="clip" className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-marquee items-stretch gap-3 group-hover:[animation-play-state:paused]">
              {marqueeLogos.map((client, index) => (
                <article
                  key={`${client.name}-${index}`}
                  className="flex h-28 w-60 shrink-0 flex-col justify-between rounded-lg border border-ink-950/8 bg-white px-5 py-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-700/25 hover:shadow-elevated"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-ink-950/10 bg-surface-muted">
                      {client.image ? (
                        <img
                          src={client.image}
                          alt={`${client.name} logo`}
                          className="h-full w-full object-contain p-1.5 grayscale transition duration-300 hover:grayscale-0"
                          loading="lazy"
                        />
                      ) : (
                        <span className="font-display text-sm font-bold text-brand-700">{client.initials}</span>
                      )}
                    </div>
                    <h2 className="caption text-ink-950">{client.name}</h2>
                  </div>
                  <p className="line-clamp-2 text-xs leading-5 text-ink-700">{client.reference}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
