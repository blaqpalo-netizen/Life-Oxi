import { Link } from 'react-router'

export default function BrandMark() {
  return (
    <Link to="/#home" className="group flex items-center gap-3" aria-label="Life-Oxi home">
      <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 bg-white p-1.5 shadow-[0_10px_28px_rgba(1,8,10,0.22)]">
        <img
          src="/images/logo.png"
          alt=""
          className="h-full w-full rounded-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </span>
      <span className="leading-none">
        <span className="block font-display text-sm font-semibold text-white sm:text-base">
          Life-Oxi
        </span>
        <span className="hidden text-[0.68rem] font-medium text-sage-300 sm:block">
          Medical Engineering
        </span>
      </span>
    </Link>
  )
}
