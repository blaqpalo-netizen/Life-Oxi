import { useEffect, useMemo, useState } from 'react'
import SectionHeader from '@/components/SectionHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/data/site'

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function FAQSection() {
  const faqItems = useMemo(
    () => faqs.map((faq) => ({ ...faq, id: `faq-${slugify(faq.question)}` })),
    []
  )
  const [openItem, setOpenItem] = useState<string | undefined>()

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    const matched = faqItems.find((faq) => faq.id === hash)
    if (matched) {
      setOpenItem(matched.id)
    }
  }, [faqItems])

  return (
    <section id="faq" className="relative overflow-hidden bg-surface-default py-16 text-ink-950 sm:py-20 lg:py-28">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              tone="light"
              eyebrow="FAQ"
              title="Remove friction before the assessment."
              copy="Practical answers for facilities, contractors, and project teams planning medical gas infrastructure."
            />
          </div>

          <Accordion
            data-reveal-group
            type="single"
            collapsible
            value={openItem}
            onValueChange={(value) => {
              setOpenItem(value)
              if (value) {
                window.history.replaceState(null, '', `#${value}`)
              }
            }}
            className="overflow-hidden rounded-lg border border-ink-950/10 bg-surface-muted shadow-soft"
          >
            {faqItems.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} id={faq.id} data-reveal className="border-ink-950/10 px-5 sm:px-6">
                <AccordionTrigger className="py-5 text-left heading text-ink-950 hover:no-underline [&_svg]:text-brand-700">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="body max-w-3xl pb-6 text-ink-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
