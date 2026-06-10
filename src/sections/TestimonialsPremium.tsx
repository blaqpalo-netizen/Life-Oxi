import { useState } from 'react'
import { Quote } from 'lucide-react'
import HorizontalScrollCarousel, { useCarouselSelection } from '@/components/HorizontalScrollCarousel'
import SectionHeader from '@/components/SectionHeader'
import { CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { clientLogos, testimonials } from '@/data/site'

function ClientMark({ name, fallback }: { name: string; fallback: string }) {
  const logo = clientLogos.find((client) => client.name === name || name.includes(client.name))
  const image = logo?.image || fallback
  const initials = logo?.initials || name.slice(0, 2).toUpperCase()

  return (
    <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-white/12 bg-white">
      {image ? (
        <img
          src={image}
          alt={`${name} reference`}
          width={64}
          height={64}
          className={`h-full w-full ${logo?.image ? 'object-contain p-2 grayscale' : 'object-cover'}`}
          loading="lazy"
        />
      ) : (
        <span className="font-display text-sm font-bold text-brand-700">{initials}</span>
      )}
    </div>
  )
}

export default function TestimonialsPremium() {
  const [api, setApi] = useState<CarouselApi>()
  const selected = useCarouselSelection(api)

  return (
    <section id="testimonials" className="relative overflow-hidden bg-ink-950 py-16 text-white sm:py-20 lg:py-28">
      <div className="absolute inset-0 dark-grid opacity-20" aria-hidden="true" />
      <div className="section-shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
          <SectionHeader
            eyebrow="Client confidence"
            title="References that speak in operational terms."
            copy="The strongest endorsement is not applause. It is a facility team describing uptime, access, handover clarity, and construction coordination."
          />
          <div data-reveal="clip" className="border-l border-brand-200/35 pl-5">
            <Quote size={28} className="text-brand-200" />
            <p className="mt-4 display-md text-white">
              Planned around uptime and future maintenance.
            </p>
          </div>
        </div>

        <HorizontalScrollCarousel
          autoPlayDelay={3900}
          ariaLabel="Client reference quotes"
          className="mt-10"
          contentClassName="items-stretch py-4"
          setApi={setApi}
        >
          {testimonials.map((testimonial, index) => {
            const isActive = selected === index

            return (
              <CarouselItem key={testimonial.name} className="basis-[88%] pl-6 md:basis-[62%] lg:basis-[42%]">
                <figure
                  className={`flex h-full flex-col justify-between rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-cinematic transition-all duration-700 hover:bg-white/[0.06] sm:p-7 ${
                    isActive ? 'scale-100 opacity-100' : 'scale-[0.95] opacity-[0.58]'
                  }`}
                >
                  <div>
                    <p className="font-display text-2xl font-semibold leading-tight text-brand-200">
                      &ldquo;{testimonial.highlight}&rdquo;
                    </p>
                    <blockquote className="mt-5 body text-sage-100/80">
                      {testimonial.quote}
                    </blockquote>
                  </div>

                  <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-5">
                    <ClientMark name={testimonial.name} fallback={testimonial.image} />
                    <div>
                      <p className="caption text-white">{testimonial.name}</p>
                      <p className="mt-1 text-sm leading-5 text-sage-100/64">{testimonial.context}</p>
                      <p className="mt-1 text-xs font-semibold uppercase text-brand-200/84">{testimonial.project}</p>
                    </div>
                  </figcaption>
                </figure>
              </CarouselItem>
            )
          })}
        </HorizontalScrollCarousel>
      </div>
    </section>
  )
}
