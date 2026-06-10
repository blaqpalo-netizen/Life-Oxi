import { useEffect, useRef, useState } from 'react'

type MetricCounterProps = {
  value: number
  suffix: string
  label: string
  className?: string
  labelClassName?: string
}

export default function MetricCounter({
  value,
  suffix,
  label,
  className = 'text-white',
  labelClassName = 'text-sage-300',
}: MetricCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? value
      : 0
  )

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      return
    }

    let observer: IntersectionObserver | undefined
    let frame = 0
    let started = false

    const animate = () => {
      if (started) return
      started = true
      const start = performance.now()
      const duration = 760

      const tick = (time: number) => {
        const progress = Math.min((time - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * value))
        if (progress < 1) {
          frame = requestAnimationFrame(tick)
        }
      }

      frame = requestAnimationFrame(tick)
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          animate()
          observer?.disconnect()
        }
      },
      { threshold: 0.42 }
    )

    observer.observe(element)

    return () => {
      observer?.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <div ref={ref} className="min-w-0">
      <p className={`text-stat ${className}`}>
        {count}
        {suffix}
      </p>
      <p className={`mt-2 eyebrow ${labelClassName}`}>{label}</p>
    </div>
  )
}
