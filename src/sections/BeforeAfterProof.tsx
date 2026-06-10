import { useState } from 'react'
import { MoveHorizontal } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import { beforeAfterComparisons } from '@/data/site'

export default function BeforeAfterProof() {
  return (
    <section id="proof" className="relative overflow-hidden bg-surface-muted py-16 text-ink-950 sm:py-20 lg:py-28">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              tone="light"
              eyebrow="Before / After proof"
              title="Engineering intent translated into clinical-ready infrastructure."
              copy="Drag across each comparison to see the shift from planning and sequencing into verified installation work."
            />
          </div>

          <div className="grid gap-5">
            {beforeAfterComparisons.map((comparison) => (
              <ComparisonSlider key={comparison.title} comparison={comparison} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

type Comparison = (typeof beforeAfterComparisons)[number]

function ComparisonSlider({ comparison }: { comparison: Comparison }) {
  const [position, setPosition] = useState(58)

  return (
    <article data-reveal="scale" className="overflow-hidden rounded-lg bg-white shadow-elevated">
      <div className="relative aspect-[5/4] overflow-hidden bg-ink-950 sm:aspect-[16/9]">
        <img
          src={comparison.after}
          alt={comparison.afterLabel}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img
            src={comparison.before}
            alt={comparison.beforeLabel}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 caption text-ink-950 backdrop-blur-sm">
          {comparison.beforeLabel}
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-ink-950/78 px-3 py-1.5 caption text-white backdrop-blur-sm">
          {comparison.afterLabel}
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_24px_rgba(255,255,255,0.72)]"
          style={{ left: `${position}%` }}
        >
          <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white text-ink-950 shadow-elevated">
            <MoveHorizontal size={20} />
          </span>
        </div>

        <input
          type="range"
          min={8}
          max={92}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          aria-label={`Compare ${comparison.beforeLabel} with ${comparison.afterLabel}`}
        />
      </div>

      <div className="grid gap-3 p-5 sm:p-6 lg:grid-cols-[0.48fr_0.52fr]">
        <h3 className="heading text-ink-950">{comparison.title}</h3>
        <p className="body text-ink-700">{comparison.copy}</p>
      </div>
    </article>
  )
}
