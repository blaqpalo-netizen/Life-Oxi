import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = gsap.utils.toArray<HTMLElement>('[data-reveal]:not([data-reveal="immediate"])')
    const parallaxElements = gsap.utils.toArray<HTMLElement>('[data-parallax]')
    const groupElements = gsap.utils.toArray<HTMLElement>('[data-reveal-group]')

    function revealConfig(element: HTMLElement) {
      const type = element.dataset.reveal || element.dataset.revealType || 'slide'

      if (type === 'fade') {
        return {
          from: { autoAlpha: 0 },
          to: { autoAlpha: 1 },
        }
      }

      if (type === 'scale') {
        return {
          from: { autoAlpha: 0, y: 18, scale: 0.96 },
          to: { autoAlpha: 1, y: 0, scale: 1 },
        }
      }

      if (type === 'clip' || type === 'mask') {
        return {
          from: { autoAlpha: 0, y: 18, clipPath: 'inset(0 0 100% 0)' },
          to: { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)' },
        }
      }

      return {
        from: { autoAlpha: 0, y: 24 },
        to: { autoAlpha: 1, y: 0 },
      }
    }

    if (reduceMotion) {
      ;[...elements, ...parallaxElements].forEach((element) => {
        element.style.opacity = '1'
        element.style.transform = 'none'
        element.style.clipPath = 'none'
      })
      return
    }

    const revealAnimations = elements
      .filter((element) => !element.closest('[data-reveal-group]'))
      .map((element) => {
        const config = revealConfig(element)

        return gsap.fromTo(
          element,
          config.from,
          {
            ...config.to,
            autoAlpha: 1,
            duration: element.dataset.reveal === 'clip' || element.dataset.reveal === 'mask' ? 0.95 : 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 92%',
              once: true,
              onEnter: () => {
                const line = element.querySelector('[data-eyebrow-line]')
                if (line instanceof HTMLElement) {
                  gsap.to(line, { width: '3.5rem', duration: 0.5, ease: 'power2.out' })
                }
              },
            },
          }
        )
      })

    const groupAnimations = groupElements.map((group) => {
      const children = group.querySelectorAll<HTMLElement>('[data-reveal]')
      const type = group.dataset.revealGroup || 'slide'
      const from =
        type === 'scale'
          ? { autoAlpha: 0, y: 14, scale: 0.97 }
          : type === 'fade'
            ? { autoAlpha: 0 }
            : { autoAlpha: 0, y: 24 }

      return gsap.fromTo(
        children,
        from,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: group,
            start: 'top 92%',
            once: true,
          },
        }
      )
    })

    const parallaxAnimations = parallaxElements.map((element) => {
      const distance = Number(element.dataset.parallax || 10)

      return gsap.fromTo(
        element,
        { yPercent: -distance / 2 },
        {
          yPercent: distance / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: element.parentElement || element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      )
    })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const imageRefreshTimer = window.setTimeout(refresh, 400)

    return () => {
      window.removeEventListener('load', refresh)
      window.clearTimeout(imageRefreshTimer)
      ;[...revealAnimations, ...groupAnimations, ...parallaxAnimations].forEach((animation) => {
        animation.scrollTrigger?.kill()
        animation.kill()
      })
    }
  }, [])
}
