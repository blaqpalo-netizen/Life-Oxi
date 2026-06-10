import { type FormEvent, useState } from 'react'
import { CheckCircle2, FileCheck2, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import PremiumButton from '@/components/PremiumButton'
import { buildAssessmentEmailHref } from '@/lib/contact'
import { certificationStrip, contact } from '@/data/site'

const projectTypes = [
  'Oxygen Plant Installation',
  'Medical Gas Pipeline System',
  'Bedside Oxygen Delivery System',
  'PSA Oxygen Plant',
  'Hospital Engineering Project',
  'Maintenance / System Upgrade',
  'Emergency Technical Review',
]

type FormStatus = 'idle' | 'loading' | 'success'

export default function ContactAssessment() {
  const [status, setStatus] = useState<FormStatus>('idle')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const href = buildAssessmentEmailHref(new FormData(event.currentTarget))
    setStatus('loading')

    window.setTimeout(() => {
      setStatus('success')
      window.location.href = href
    }, 700)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-surface-dark py-16 text-white sm:py-20 lg:py-28">
      <div className="absolute inset-0 dark-grid opacity-20" aria-hidden="true" />
      <div className="section-shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <div>
            <p data-reveal="fade" className="eyebrow text-brand-200">Assessment</p>
            <h2 data-reveal="clip" className="mt-3 display-md max-w-3xl text-white">
              Start with drawings, a facility walk-through, or an urgent continuity risk.
            </h2>
            <p data-reveal="fade" className="mt-5 lead max-w-2xl text-sage-100/78">
              Share the clinical spaces, plant-room context, and project timing. Life-Oxi will route the request into a technical assessment conversation.
            </p>

            <div data-reveal-group className="mt-8 grid gap-3">
              <div data-reveal className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <ShieldCheck size={20} className="mt-1 shrink-0 text-brand-200" />
                <p className="body text-sage-100/78">
                  Assessment requests are reviewed against source capacity, routing, isolation, bedside access, commissioning, and maintenance continuity.
                </p>
              </div>
              <div data-reveal className="grid gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-2">
                {certificationStrip.slice(0, 2).map((item) => (
                  <div key={item.code}>
                    <p className="caption text-white">{item.code}</p>
                    <p className="mt-1 text-sm leading-5 text-sage-100/64">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal className="mt-8 grid gap-3 border-t border-white/10 pt-5 text-sm text-sage-100/72">
              <a href={`tel:+233${contact.phones[0].slice(1)}`} className="flex items-center gap-3 transition hover:text-white">
                <Phone size={16} className="text-brand-200" />
                {contact.phones.join(' / ')}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 transition hover:text-white">
                <Mail size={16} className="text-brand-200" />
                {contact.email}
              </a>
              <p className="flex items-center gap-3">
                <MapPin size={16} className="text-brand-200" />
                {contact.location}
              </p>
            </div>
          </div>

          <div data-reveal="scale" className="rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-cinematic backdrop-blur-xl sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="eyebrow text-brand-200">Technical request</p>
                <h3 className="mt-2 heading text-white">Facility assessment form</h3>
              </div>
              <FileCheck2 className="mt-1 text-brand-200" size={24} />
            </div>

            {status === 'success' ? (
              <div className="mb-5 rounded-lg border border-brand-300/30 bg-brand-300/10 p-4 text-sage-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 shrink-0 text-brand-200" size={20} />
                  <div>
                    <p className="caption text-white">Assessment draft prepared.</p>
                    <p className="mt-1 text-sm leading-6 text-sage-100/74">
                      Your email client should open with the technical request. Send it to complete the handoff.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field-label">
                  Name
                  <input name="name" required className="field-input" placeholder="Your name" />
                </label>
                <label className="field-label">
                  Hospital/Organization
                  <input name="organization" required className="field-input" placeholder="Hospital or organization name" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field-label">
                  Location
                  <input name="location" required className="field-input" placeholder="City, region, country" />
                </label>
                <label className="field-label">
                  Contact Number
                  <input name="phone" required className="field-input" placeholder="+233..." />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field-label">
                  Email Address
                  <input name="email" type="email" required className="field-input" placeholder="name@organization.com" />
                </label>
                <label className="field-label">
                  Project Type
                  <select name="projectType" required className="field-input" defaultValue="">
                    <option value="" disabled>
                      Select project type
                    </option>
                    {projectTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="field-label">
                Project Description
                <textarea
                  name="projectDescription"
                  rows={4}
                  required
                  className="field-input resize-none"
                  placeholder="Describe the plant, pipeline, ward, theatre, ICU, or maintenance need."
                />
              </label>

              {status === 'loading' ? (
                <div className="h-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-2/3 animate-pulse rounded-full bg-brand-300" />
                </div>
              ) : null}

              <PremiumButton as="button" type="submit" variant="light" disabled={status === 'loading'} className="mt-1 w-full sm:w-auto">
                <Mail size={16} />
                {status === 'loading' ? 'Preparing Assessment Draft' : 'Request Technical Assessment'}
              </PremiumButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
