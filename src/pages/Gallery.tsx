import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useReveal } from '@/animations/useReveal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import PremiumButton from '@/components/PremiumButton'
import { galleryCategories, galleryItems } from '@/data/site'

type GalleryCategory = (typeof galleryCategories)[number]

function gallerySpanClass(span: string) {
  if (span === 'feature') return 'sm:row-span-3 lg:col-span-2'
  if (span === 'tall') return 'sm:row-span-2'
  return 'row-span-2'
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All')
  useReveal()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const visibleItems = useMemo(() => {
    if (selectedCategory === 'All') return galleryItems
    return galleryItems.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  return (
    <main className="min-h-screen bg-ink-950 text-white">
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0">
          <img
            src="/images/hero-corridor.jpg"
            alt=""
            className="h-full w-full object-cover object-center opacity-[0.78]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,8,10,0.8)_0%,rgba(1,8,10,0.42)_52%,rgba(1,8,10,0.18)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(96,232,157,0.16),transparent_42%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,8,10,0.16)_0%,#01080a_100%)]" />
        </div>

        <div className="section-shell relative z-10 pb-12 pt-8 sm:pb-16">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-200">
              Visual project archive
            </p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
              Real-world delivery from plant room to patient zone.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-sage-100/80 sm:text-lg">
            Browse installations, operations, and engineering milestones across live
              healthcare projects, including oxygen plants, pipeline systems, bedside
              delivery, PSA plant rooms, and hospital engineering work.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell pb-24 sm:pb-20">
        <div data-reveal className="sticky top-[4.5rem] z-20 -mx-4 border-y border-white/10 bg-ink-950/88 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 xl:-mx-10 xl:px-10">
          <div className="flex flex-wrap gap-2">
            {galleryCategories.map((category) => (
              <PremiumButton
                key={category}
                as="button"
                type="button"
                variant="filter"
                size="sm"
                showArrow={false}
                active={selectedCategory === category}
                aria-pressed={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </PremiumButton>
            ))}
          </div>
        </div>

        <div className="mt-8 grid auto-rows-[11rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleItems.map((item) => (
            <Dialog key={item.title}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  data-reveal
                  className={`group block w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] text-left shadow-[0_22px_60px_rgba(1,8,10,0.3)] transition duration-300 hover:-translate-y-1 hover:border-brand-300/45 hover:bg-white/[0.055] ${gallerySpanClass(item.span)}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.description}
                      className="h-56 w-full object-cover opacity-[0.94] transition duration-700 group-hover:scale-105 group-hover:opacity-100 sm:h-64"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_34%,rgba(1,8,10,0.72)_100%)] opacity-80 transition duration-300 group-hover:opacity-95" />
                    <ArrowUpRight className="absolute right-4 top-4 text-white opacity-0 transition duration-300 group-hover:opacity-100" size={20} />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-xs font-semibold uppercase text-brand-200">{item.category}</p>
                      <h2 className="mt-2 text-2xl font-semibold leading-7 text-white">{item.title}</h2>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold text-sage-100">{item.location}</p>
                    <p className="mt-2 text-sm leading-6 text-sage-100/75">{item.description}</p>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[92svh] max-w-5xl overflow-hidden border-white/10 bg-ink-950 p-0 text-white">
                <img
                  src={item.image}
                  alt={item.description}
                  className="max-h-[70svh] w-full object-contain bg-black"
                />
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase text-brand-200">{item.category}</p>
                  <DialogTitle className="mt-3 font-display text-3xl font-semibold text-white">
                    {item.title}
                  </DialogTitle>
                  <DialogDescription className="mt-3 text-base leading-7 text-sage-100/80">
                    {item.description} {item.location}
                  </DialogDescription>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>
    </main>
  )
}
