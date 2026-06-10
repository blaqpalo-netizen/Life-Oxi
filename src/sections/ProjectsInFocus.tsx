import { useMemo, useState } from 'react'
import { ArrowRight, ExternalLink, MapPin } from 'lucide-react'
import HorizontalScrollCarousel, { useCarouselSelection } from '@/components/HorizontalScrollCarousel'
import PremiumButton from '@/components/PremiumButton'
import SectionHeader from '@/components/SectionHeader'
import { CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { galleryItems, projects } from '@/data/site'

type Project = (typeof projects)[number]

export default function ProjectsInFocus() {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const selected = useCarouselSelection(api)

  return (
    <section id="projects" className="relative overflow-hidden bg-surface-default py-16 text-ink-950 sm:py-20 lg:py-28">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
          <SectionHeader
            tone="light"
            eyebrow="Featured projects"
            title="Hospital infrastructure with enough depth to inspect."
            copy="Each project opens into a compact case study: challenge, scope, solution, outcomes, imagery, and geographic context."
          />

          <InstallationMap selected={selected} onProjectSelect={setSelectedProject} />
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <p data-reveal className="caption text-ink-700 sm:hidden">Swipe to explore</p>
          <a
            data-reveal
            href="/gallery"
            className="link-underline group ml-auto inline-flex min-h-11 w-fit items-center gap-2 pb-1 text-sm font-semibold text-ink-950 transition duration-300 hover:text-brand-700"
          >
            Open full gallery
            <ArrowRight size={16} className="transition duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <HorizontalScrollCarousel
          autoPlayDelay={4800}
          ariaLabel="Featured hospital infrastructure projects"
          className="mt-2"
          contentClassName="items-stretch py-4"
          setApi={setApi}
        >
          {projects.map((project, index) => {
            const isActive = selected === index

            return (
              <CarouselItem key={project.title} className="basis-[88%] pl-6 md:basis-[66%] lg:basis-[46%]">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className={`group grid h-full w-full overflow-hidden rounded-lg bg-ink-950 text-left text-white shadow-soft transition-all duration-700 hover:-translate-y-1 hover:shadow-elevated ${
                    isActive ? 'scale-100 opacity-100' : 'scale-[0.95] opacity-[0.62]'
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={`${project.title} project`}
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover opacity-[0.94] transition duration-1000 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,8,10,0.02)_15%,rgba(1,8,10,0.72)_100%)]" />
                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-xs font-semibold text-ink-950 backdrop-blur-sm">
                      <MapPin size={14} fill="currentColor" />
                      {project.location}
                    </div>
                    <div className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-md transition duration-300 group-hover:bg-brand-300 group-hover:text-ink-950">
                      <ExternalLink size={18} />
                    </div>
                  </div>

                  <div className="grid gap-5 p-5 sm:p-6">
                    <div>
                      <p className="eyebrow text-brand-200">{project.facilityType}</p>
                      <h3 className="mt-2 heading text-white">{project.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-sage-100/78">{project.scope}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/18 px-2.5 py-1 text-xs font-semibold text-sage-100/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              </CarouselItem>
            )
          })}
        </HorizontalScrollCarousel>
      </div>

      <Dialog open={Boolean(selectedProject)} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject ? <CaseStudyDrawer project={selectedProject} /> : null}
      </Dialog>
    </section>
  )
}

function InstallationMap({
  selected,
  onProjectSelect,
}: {
  selected: number
  onProjectSelect: (project: Project) => void
}) {
  return (
    <div data-reveal="scale" className="relative overflow-hidden rounded-lg border border-ink-950/10 bg-ink-950 p-5 text-white shadow-elevated">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow text-brand-200">Installation map</p>
          <h3 className="mt-1 caption text-white">Ghana and Ethiopia project coordinates</h3>
        </div>
        <span className="rounded-full border border-white/12 px-3 py-1 text-xs font-semibold text-sage-100/72">Live references</span>
      </div>

      <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_42%_62%,rgba(96,232,157,0.18),transparent_18%),radial-gradient(circle_at_73%_53%,rgba(96,232,157,0.16),transparent_16%),#061113] map-grid">
        <div className="absolute left-[32%] top-[54%] h-20 w-28 rounded-full border border-brand-200/22 bg-brand-300/5 blur-[1px]" />
        <div className="absolute left-[64%] top-[45%] h-20 w-28 rounded-full border border-brand-200/18 bg-brand-300/5 blur-[1px]" />
        <span className="absolute left-[35%] top-[73%] text-xs font-semibold uppercase text-sage-100/52">Ghana</span>
        <span className="absolute left-[68%] top-[39%] text-xs font-semibold uppercase text-sage-100/52">Ethiopia</span>

        {projects.map((project, index) => {
          const active = selected === index

          return (
            <button
              key={project.slug}
              type="button"
              onClick={() => onProjectSelect(project)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${project.map.x}%`, top: `${project.map.y}%` }}
              aria-label={`Open ${project.title} case study`}
            >
              <span
                className={`block h-4 w-4 rounded-full border border-white bg-brand-300 shadow-[0_0_0_8px_rgba(96,232,157,0.1)] transition duration-300 ${
                  active ? 'scale-125 shadow-[0_0_0_12px_rgba(96,232,157,0.16)]' : 'hover:scale-125'
                }`}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function CaseStudyDrawer({ project }: { project: Project }) {
  const relatedGallery = useMemo(
    () => galleryItems.filter((item) => item.projectSlug === project.slug).slice(0, 4),
    [project.slug]
  )

  return (
    <DialogContent className="left-auto right-0 top-0 h-[100svh] max-h-[100svh] w-full max-w-4xl translate-x-0 translate-y-0 overflow-y-auto rounded-none border-l border-white/10 border-r-0 border-y-0 bg-surface-dark p-0 text-white shadow-cinematic sm:max-w-3xl lg:max-w-4xl">
      <div className="grid min-h-full lg:grid-cols-[0.45fr_0.55fr]">
        <div className="relative min-h-[18rem] overflow-hidden bg-ink-950 lg:min-h-full">
          <img src={project.image} alt={`${project.title} installation`} className="absolute inset-0 h-full w-full object-cover opacity-[0.92]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,8,10,0.02)_0%,rgba(1,8,10,0.84)_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="eyebrow text-brand-200">{project.facilityType}</p>
            <DialogTitle className="mt-3 display-md text-white">{project.title}</DialogTitle>
            <DialogDescription className="mt-3 lead text-sage-100/80">{project.location}</DialogDescription>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid gap-6">
            <CaseStudyBlock label="Challenge" copy={project.caseStudy.challenge} />
            <CaseStudyBlock label="Scope" copy={project.workScope} />
            <CaseStudyBlock label="Solution" copy={project.caseStudy.solution} />

            <div>
              <p className="eyebrow text-brand-200">Outcomes</p>
              <div className="mt-3 grid gap-2">
                {project.caseStudy.outcomes.map((outcome) => (
                  <div key={outcome} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 caption text-sage-100">
                    {outcome}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow text-brand-200">Gallery evidence</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {[project.secondaryImage, ...relatedGallery.map((item) => item.image)].slice(0, 4).map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt={`${project.title} related work`}
                    className="aspect-[4/3] w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row">
              <PremiumButton href={`/gallery?project=${project.slug}`} variant="light">
                View Related Gallery
              </PremiumButton>
              <PremiumButton href="/#contact" variant="ghost">
                Discuss Similar Work
              </PremiumButton>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

function CaseStudyBlock({ label, copy }: { label: string; copy: string }) {
  return (
    <div>
      <p className="eyebrow text-brand-200">{label}</p>
      <p className="mt-2 body text-sage-100/78">{copy}</p>
    </div>
  )
}
