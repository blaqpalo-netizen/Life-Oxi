import { ClipboardCheck } from 'lucide-react'
import PremiumButton from '@/components/PremiumButton'

export default function StickyContactActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink-950/90 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-16px_45px_rgba(1,8,10,0.32)] backdrop-blur-xl md:hidden">
      <div className="mx-auto max-w-md">
        <PremiumButton href="/#contact" size="sm" showArrow={false} className="w-full">
          <ClipboardCheck size={17} />
          Request Technical Assessment
        </PremiumButton>
      </div>
    </div>
  )
}
