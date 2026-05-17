import Link from "next/link"

type LogoProps = {
  className?: string
}

const Logo = ({ className = "" }: LogoProps) => (
  <Link
    href="#top"
    aria-label="Nowakowski Web, retour en haut"
    className={`group inline-flex items-center font-display font-bold tracking-tight text-lg text-fg transition-all duration-300 hover:text-brand ${className}`}
  >
    <span>Nowakowski</span>
    <span
      aria-hidden
      className="ml-0.5 text-brand transition-all duration-300 group-hover:[text-shadow:0_0_18px_rgba(171,25,245,0.7)]"
    >
      .
    </span>
  </Link>
)

export default Logo
