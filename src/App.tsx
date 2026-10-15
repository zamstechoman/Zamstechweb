import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, NavLink, Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import { getService } from './data/services'

const HomePage = lazy(() => import('./pages/HomePage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))

const serviceLinks = [
  { label: 'Website design & development', href: '/services/web-development' },
  { label: 'Web applications', href: '/services/web-applications' },
  { label: 'Android applications', href: '/services/android-applications' },
  { label: 'Website hosting', href: '/services/website-hosting' },
  { label: 'VPS & cloud solutions', href: '/services/vps-cloud' },
  { label: 'Computer repairs & support', href: '/services/computer-support' },
  { label: 'Network configuration & CCTV', href: '/services/network-cctv' },
  { label: 'Business & accounting software', href: '/services/business-software' },
  { label: 'Automation & workflows', href: '/services/workflow-automation' },
  { label: 'Website & software maintenance', href: '/services/maintenance' },
  { label: 'Other technology services', href: '/services/other-technology' },
]

const mainLinks = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Interactive lab', href: '/interactive-lab' },
  { label: 'Journal', href: '/blog' },
  { label: 'About', href: '/about' },
]

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()

  useEffect(() => setMenuOpen(false), [location.pathname])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuToggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 20)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Amity Node home">
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span className="brand-name">amity<span>node</span></span>
        </Link>
        <button ref={menuToggleRef} className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav id="primary-navigation" className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <div className="nav-services">
            <NavLink to="/services" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Services <span className="nav-caret" aria-hidden="true">+</span>
            </NavLink>
            <div className="service-menu">
              <span className="menu-eyebrow">What we do</span>
              {serviceLinks.map((service) => <Link key={service.href} to={service.href} className="service-menu-link">{service.label}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}
              <Link to="/services" className="menu-all">All services <ArrowRight size={14} /></Link>
            </div>
          </div>
          {mainLinks.map((item) => <NavLink key={item.href} to={item.href} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>{item.label}</NavLink>)}
          <Link className="header-cta" to="/configure">Let’s talk <ArrowUpRight size={15} /></Link>
        </nav>
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <Link className="brand footer-brand" to="/"><span className="brand-mark" aria-hidden="true"><span /><span /><span /></span><span className="brand-name">amity<span>node</span></span></Link>
          <p>Technology, connected with purpose.<br />Built for the way your business works.</p>
        </div>
        <div className="footer-column footer-services"><span className="footer-label">Services</span>{serviceLinks.map((service) => <Link key={service.href} to={service.href}>{service.label}</Link>)}</div>
        <div className="footer-column"><span className="footer-label">Explore</span><Link to="/portfolio">Portfolio</Link><Link to="/interactive-lab">Interactive lab</Link><Link to="/blog">Journal</Link></div>
        <div className="footer-column"><span className="footer-label">Company</span><Link to="/about">About Amity Node</Link><Link to="/contact">Contact</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div>
        <div className="footer-contact"><span className="footer-label">Start a conversation</span><a href="https://wa.me/96878301334" target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14} /></a><span className="footer-country">Oman · Working worldwide</span></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Amity Node</span><span>Independent technology, thoughtfully connected.</span><a href="#top" className="back-top">Back to top <ArrowUpRight size={13} /></a></div>
    </footer>
  )
}

function RouteScrollReset() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const routeTitles: Record<string, { eyebrow: string; description: string }> = {
  about: { eyebrow: 'The people behind the connection', description: 'A closer look at Amity Node, our approach, and the principles shaping the work.' },
  services: { eyebrow: 'Technology for real work', description: 'Explore connected digital, software, hosting, and IT capabilities.' },
  portfolio: { eyebrow: 'Selected work', description: 'Projects and concepts will live here, with a clear distinction between demos and client work.' },
  'interactive-lab': { eyebrow: 'A place to experiment', description: 'The interactive 3D material and lighting experiment is planned for a later build phase.' },
  blog: { eyebrow: 'Notes on technology', description: 'Practical guides and locally stored articles are planned for a later build phase.' },
  contact: { eyebrow: 'Start a conversation', description: 'Contact options and the guided solution configurator are planned for a later build phase.' },
  configure: { eyebrow: 'Configure your solution', description: 'The multi-step service configurator and WhatsApp enquiry handoff are planned for a later build phase.' },
  privacy: { eyebrow: 'Privacy', description: 'This page will describe how the website handles information when the contact experience is implemented.' },
  terms: { eyebrow: 'Terms of use', description: 'Website terms will be published here before the site launches.' },
}

function RouteIntro({ title, eyebrow, description }: { title: string; eyebrow: string; description: string }) {
  return <main className="route-page" id="top"><div className="route-index">AMITY NODE <span>·</span> DIGITAL & TECHNOLOGY</div><p className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</p><h1>{title}<span className="route-period">.</span></h1><p className="route-description">{description}</p><Link to="/" className="text-link">Return home <ArrowUpRight size={15} /></Link><div className="route-progress"><span>Phase 01</span><span>Foundation in progress</span><span className="progress-track"><i /></span></div></main>
}

function NotFound() {
  return <RouteIntro title="Page not found" eyebrow="404 · Lost in the network" description="That address does not lead anywhere just yet. Head back home to continue exploring Amity Node." />
}

function ConfigureRouteIntro() {
  const [searchParams] = useSearchParams()
  const selectedService = getService(searchParams.get('service') ?? undefined)
  const description = selectedService
    ? `${selectedService.title} is selected as your starting point. The guided configuration and enquiry flow is planned for Phase 6.`
    : routeTitles.configure.description

  return <RouteIntro title="Configure your solution" eyebrow={routeTitles.configure.eyebrow} description={description} />
}

export default function App() {
  return <><RouteScrollReset /><a className="skip-link" href="#top">Skip to content</a><SiteHeader /><div><Routes>
    <Route path="/" element={<Suspense fallback={<main className="route-loading" aria-label="Loading homepage" />}><HomePage /></Suspense>} />
    <Route path="/services" element={<Suspense fallback={<main className="route-loading" aria-label="Loading services" />}><ServicesPage /></Suspense>} />
    <Route path="/services/:slug" element={<Suspense fallback={<main className="route-loading" aria-label="Loading service details" />}><ServiceDetailPage /></Suspense>} />
    <Route path="/portfolio" element={<RouteIntro title="Portfolio" {...routeTitles.portfolio} />} />
    <Route path="/interactive-lab" element={<RouteIntro title="Interactive lab" {...routeTitles['interactive-lab']} />} />
    <Route path="/blog" element={<RouteIntro title="Journal" {...routeTitles.blog} />} />
    <Route path="/blog/:slug" element={<RouteIntro title="Article" {...routeTitles.blog} />} />
    {(['about', 'contact', 'privacy', 'terms'] as const).map((key) => <Route key={key} path={`/${key}`} element={<RouteIntro title={key === 'about' ? 'About Amity Node' : key[0].toUpperCase() + key.slice(1)} {...routeTitles[key]} />} />)}
    <Route path="/configure" element={<ConfigureRouteIntro />} />
    <Route path="*" element={<NotFound />} />
  </Routes></div><SiteFooter /></>
}