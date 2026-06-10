import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'solid' | 'ghost' | 'light' | 'filter'
type Size = 'sm' | 'md'

type BaseProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  showArrow?: boolean
  active?: boolean
  className?: string
}

type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as?: 'a' }

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as: 'button' }

type PremiumButtonProps = AnchorProps | ButtonProps

const variantClasses: Record<Variant, string> = {
  solid: 'btn-liquid-solid bg-brand-500 text-white shadow-[0_0_34px_rgba(16,96,48,0.24)]',
  ghost: 'btn-liquid-ghost border border-white/15 bg-white/[0.03] text-white',
  light: 'btn-liquid-light bg-white text-ink-950 shadow-[0_8px_24px_rgba(1,8,10,0.12)]',
  filter: 'btn-liquid-filter border border-white/10 bg-white/[0.035] text-sage-100',
}

const sizeClasses: Record<Size, string> = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-12 px-5 sm:px-6 text-sm',
}

export default function PremiumButton(props: PremiumButtonProps) {
  const {
    children,
    variant = 'solid',
    size = 'md',
    showArrow = true,
    active = false,
    className = '',
    as,
    ...rest
  } = props

  const classes = cn(
    'btn-liquid relative inline-flex items-center justify-center gap-3 rounded-full font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-300',
    variantClasses[variant],
    sizeClasses[size],
    variant === 'filter' && active && 'btn-liquid-filter-active bg-white text-ink-950 border-transparent',
    className
  )

  const content = (
    <>
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
      {showArrow && variant !== 'filter' ? (
        <ArrowRight size={16} strokeWidth={1.8} className="relative z-10 transition duration-300 group-hover:translate-x-0.5" />
      ) : null}
    </>
  )

  if (as === 'button') {
    const { as: _as, type = 'button', ...buttonRest } = rest as ButtonProps
    return (
      <button type={type} className={cn('group', classes)} {...buttonRest}>
        {content}
      </button>
    )
  }

  const { as: _as, ...anchorRest } = rest as AnchorProps
  return (
    <a className={cn('group', classes)} {...anchorRest}>
      {content}
    </a>
  )
}
