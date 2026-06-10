type SectionHeaderProps = {
  eyebrow: string
  title: string
  copy?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  compact?: boolean
}

export default function SectionHeader({
  eyebrow,
  title,
  copy,
  align = 'left',
  tone = 'dark',
  compact = false,
}: SectionHeaderProps) {
  const centered = align === 'center'
  const titleTone = tone === 'light' ? 'text-ink-950' : 'text-white'
  const copyTone = tone === 'light' ? 'text-ink-700' : 'text-sage-200/80'

  return (
    <div
      className={`max-w-4xl ${centered ? 'mx-auto text-center' : ''}`}
      data-reveal
    >
      <div className={`section-eyebrow ${centered ? 'justify-center' : ''}`}>
        <span aria-hidden="true" className="transition-all duration-700" data-eyebrow-line />
        <p>{eyebrow}</p>
      </div>
      <h2 className={`mt-3 ${compact ? 'heading' : 'display-md'} ${titleTone}`}>
        {title}
      </h2>
      {copy ? (
        <p className={`mt-4 max-w-2xl lead ${centered ? 'mx-auto' : ''} ${copyTone}`}>
          {copy}
        </p>
      ) : null}
    </div>
  )
}
