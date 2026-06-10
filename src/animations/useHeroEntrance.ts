import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useHeroEntrance() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = hero.querySelectorAll('[data-hero]')
    const masks = hero.querySelectorAll('[data-hero-mask] > span')
    const video = hero.querySelector('[data-hero-video]')
    const metrics = hero.querySelectorAll('[data-hero-metric]')

    if (reduceMotion) {
      ;[...items, ...masks, ...metrics].forEach((item) => {
        if (item instanceof HTMLElement) {
          item.style.opacity = '1'
          item.style.transform = 'none'
        }
      })
      return
    }

    const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } })
    timeline
      .fromTo(
        video,
        { autoAlpha: 0.38, scale: 1.08, clipPath: 'inset(8% 0 0 0)' },
        { autoAlpha: 0.96, scale: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.25 }
      )
      .fromTo(
        masks,
        { yPercent: 112 },
        { yPercent: 0, duration: 1.05, stagger: 0.12 },
        '-=0.8'
      )
      .fromTo(
        items,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.76, stagger: 0.08 },
        '-=0.74'
      )
      .fromTo(
        metrics,
        { autoAlpha: 0, y: 22, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.68, stagger: 0.06 },
        '-=0.42'
      )

    return () => {
      timeline.kill()
    }
  }, [])

  return heroRef
}
