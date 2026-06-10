import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import WheelGesturesPlugin from 'embla-carousel-wheel-gestures'
import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

type HorizontalScrollCarouselProps = {
  children: ReactNode
  autoPlayDelay?: number
  className?: string
  contentClassName?: string
  ariaLabel?: string
  showProgress?: boolean
  showEdgeFade?: boolean
  setApi?: (api: CarouselApi) => void
}

function useCarouselProgress(api: CarouselApi | undefined) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!api) return

    const onScroll = () => setProgress(api.scrollProgress())
    onScroll()
    api.on('scroll', onScroll)
    api.on('reInit', onScroll)

    return () => {
      api.off('scroll', onScroll)
      api.off('reInit', onScroll)
    }
  }, [api])

  return progress
}

function useAutoCarouselWithPause(api: CarouselApi | undefined, delay?: number) {
  useEffect(() => {
    if (!api || !delay) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let timer = 0
    let resumeTimer = 0
    let paused = false

    const tick = () => {
      if (!paused && !document.hidden) {
        api.scrollNext()
      }
    }

    const pause = () => {
      paused = true
      window.clearTimeout(resumeTimer)
      resumeTimer = window.setTimeout(() => {
        paused = false
      }, 5000)
    }

    timer = window.setInterval(tick, delay)

    const node = api.rootNode()
    node.addEventListener('pointerdown', pause)
    node.addEventListener('wheel', pause, { passive: true })
    node.addEventListener('touchstart', pause, { passive: true })

    const onVisibility = () => {
      if (document.hidden) paused = true
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.clearInterval(timer)
      window.clearTimeout(resumeTimer)
      node.removeEventListener('pointerdown', pause)
      node.removeEventListener('wheel', pause)
      node.removeEventListener('touchstart', pause)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [api, delay])
}

export function useCarouselSelection(api: CarouselApi | undefined) {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => setSelected(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  return selected
}

export default function HorizontalScrollCarousel({
  children,
  autoPlayDelay,
  className,
  contentClassName,
  ariaLabel = 'Scrollable content',
  showProgress = true,
  showEdgeFade = true,
  setApi: externalSetApi,
}: HorizontalScrollCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [interacted, setInteracted] = useState(false)
  const progress = useCarouselProgress(api)

  useAutoCarouselWithPause(api, autoPlayDelay)

  const handleSetApi = useCallback(
    (carouselApi: CarouselApi) => {
      setApi(carouselApi)
      externalSetApi?.(carouselApi)
    },
    [externalSetApi]
  )

  useEffect(() => {
    if (!api) return

    const markInteracted = () => setInteracted(true)
    const node = api.rootNode()
    node.addEventListener('pointerdown', markInteracted)
    node.addEventListener('wheel', markInteracted, { passive: true })
    node.addEventListener('touchstart', markInteracted, { passive: true })

    return () => {
      node.removeEventListener('pointerdown', markInteracted)
      node.removeEventListener('wheel', markInteracted)
      node.removeEventListener('touchstart', markInteracted)
    }
  }, [api])

  return (
    <div className={cn('relative', className)} data-reveal>
      <Carousel
        opts={{ align: 'center', loop: true, dragFree: true }}
        plugins={[WheelGesturesPlugin()]}
        setApi={handleSetApi}
        aria-label={ariaLabel}
        className="group/rail"
      >
        <div
          className={cn(
            'relative',
            showEdgeFade &&
              '[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]'
          )}
        >
          <CarouselContent className={cn('-ml-6 py-3', contentClassName)}>{children}</CarouselContent>

          {showEdgeFade && !interacted ? (
            <>
              <div
                className="pointer-events-none absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-1 text-ink-950/40 animate-pulse sm:flex"
                aria-hidden="true"
              >
                <ChevronLeft size={18} />
              </div>
              <div
                className="pointer-events-none absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-1 text-ink-950/40 animate-pulse sm:flex"
                aria-hidden="true"
              >
                <ChevronRight size={18} />
              </div>
            </>
          ) : null}
        </div>
      </Carousel>

      {showProgress ? (
        <div className="mx-auto mt-4 h-0.5 max-w-xs overflow-hidden rounded-full bg-ink-950/8">
          <div
            className="h-full rounded-full bg-brand-500 transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(progress * 100, 4)}%` }}
            role="progressbar"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Carousel scroll progress"
          />
        </div>
      ) : null}
    </div>
  )
}
