type SiteHeaderProps = { status: string }

export function SiteHeader({ status }: SiteHeaderProps) {
  return (
    <nav className="topbar">
      <a className="brand" href="/" aria-label="Northstar home"><span className="brand-mark">N</span><span>northstar<span className="brand-dot">.</span></span></a>
      <span className="secure-label"><span className="secure-dot" /> {status}</span>
    </nav>
  )
}
