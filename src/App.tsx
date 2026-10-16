import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, Menu, Search, X } from 'lucide-react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlobalTools from './components/GlobalTools'
import { articles, projects } from './data/editorial'
import { services } from './data/services'
import { mediaQueryMatches } from './utils/browser'

const HomePage = lazy(() => import('./pages/HomePage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))
const ConfigurePage = lazy(() => import('./pages/ConfigurePage'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const InteractiveLabPage = lazy(() => import('./pages/InteractiveLabPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const AboutPage = lazy(() => import('./pages/CompanyPages').then((module) => ({ default: module.AboutPage })))
const ContactPage = lazy(() => import('./pages/CompanyPages').then((module) => ({ default: module.ContactPage })))
const PrivacyPage = lazy(() => import('./pages/CompanyPages').then((module) => ({ default: module.LegalPage })))
const TermsPage = lazy(() => import('./pages/CompanyPages').then((module) => ({ default: module.LegalPage })))

gsap.registerPlugin(ScrollTrigger)

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

const searchItems = [
  ...services.map((service) => ({ title: service.title, category: 'Service', href: `/services/${service.slug}`, content: `${service.summary} ${service.description} ${service.useCases.join(' ')}` })),
  ...projects.map((project) => ({ title: project.title, category: 'Concept project', href: `/portfolio/${project.slug}`, content: `${project.summary} ${project.objective} ${project.approach} ${project.category}` })),
  ...articles.map((article) => ({ title: article.title, category: 'Journal', href: `/blog/${article.slug}`, content: `${article.summary} ${article.category} ${article.sections.flatMap((section) => [section.heading, ...section.paragraphs]).join(' ')}` })),
]

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const searchToggleRef = useRef<HTMLButtonElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const location = useLocation()

  useEffect(() => { setMenuOpen(false); setSearchOpen(false) }, [location.pathname])

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && (menuOpen || searchOpen)) {
        setMenuOpen(false)
        setSearchOpen(false)
        if (searchOpen) searchToggleRef.current?.focus()
        else menuToggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen, searchOpen])

  const matchingSearchItems = searchTerm.trim()
    ? searchItems.filter((item) => `${item.title} ${item.category} ${item.content}`.toLowerCase().includes(searchTerm.trim().toLowerCase())).slice(0, 7)
    : []

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
        <div className="header-tools"><button ref={menuToggleRef} className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <button ref={searchToggleRef} className="search-toggle" type="button" aria-label={searchOpen ? 'Close search' : 'Search services, projects, and articles'} aria-expanded={searchOpen} aria-controls="site-search" onClick={() => setSearchOpen((open) => !open)}>{searchOpen ? <X size={18} /> : <Search size={18} />}</button></div>
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
      {searchOpen && <div className="site-search" id="site-search" role="search"><label htmlFor="site-search-input">Search services, projects, and articles</label><input ref={searchInputRef} id="site-search-input" type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Try hosting, Wi-Fi, or workflows" />{searchTerm.trim() && <div className="site-search-results" aria-live="polite">{matchingSearchItems.length ? matchingSearchItems.map((item) => <Link key={item.href} to={item.href} onClick={() => { setSearchOpen(false); setSearchTerm('') }}><span>{item.category}</span><strong>{item.title}</strong><ArrowUpRight size={14} /></Link>) : <p>No matching local content.</p>}</div>}</div>}
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
        <div className="footer-column"><span className="footer-label">Company</span><Link to="/about">About Amity Node</Link><Link to="/faq">FAQ</Link><Link to="/contact">Contact</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div>
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

function NotFound() {
  return <main className="route-page" id="top"><div className="route-index">AMITY NODE <span>·</span> 404</div><p className="eyebrow"><span className="eyebrow-dot" /> Address not found</p><h1>Nothing here<span className="route-period">.</span></h1><p className="route-description">That address does not match a page on this site. Return home or explore the service areas.</p><Link to="/" className="text-link">Return home <ArrowUpRight size={15} /></Link></main>
}

function RouteMetadata() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname.startsWith('/services/') || /^\/blog\/.+/.test(pathname)) return
    const pages: Record<string, { title: string; description: string }> = {
      '/': { title: 'Amity Node | Technology, connected with purpose', description: 'Technology, digital experiences, software, hosting, and practical IT support from Amity Node.' },
      '/services': { title: 'Technology Services | Amity Node', description: 'Explore website, software, hosting, cloud, IT support, networking, and automation services.' },
      '/portfolio': { title: 'Portfolio Concepts | Amity Node', description: 'Explore clearly labeled concept projects and interface studies from Amity Node.' },
      '/interactive-lab': { title: 'Interactive 3D Lab | Amity Node', description: 'Experiment with a real-time 3D material, lighting, color, and rotation study.' },
      '/blog': { title: 'Technology Journal | Amity Node', description: 'Locally authored practical guides about web development, hosting, networks, and technology.' },
      '/faq': { title: 'Frequently Asked Questions | Amity Node', description: 'Answers to common questions about Amity Node services and project scoping.' },
      '/about': { title: 'About Amity Node', description: 'Learn about Amity Node’s practical approach to technology, design, and business solutions.' },
      '/contact': { title: 'Contact Amity Node', description: 'Start a project conversation with Amity Node in Oman or from anywhere worldwide.' },
      '/configure': { title: 'Configure Your Solution | Amity Node', description: 'Create a project brief and review a WhatsApp or email enquiry for Amity Node.' },
      '/privacy': { title: 'Privacy | Amity Node', description: 'How this website handles information entered into the local enquiry configurator.' },
      '/terms': { title: 'Terms of Use | Amity Node', description: 'Terms and limitations for using the Amity Node website and its general information.' },
    }
    const page = pages[pathname]
    if (!page) return
    document.title = page.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = page.description
    const socialTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    const socialDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    if (socialTitle) socialTitle.content = page.title
    if (socialDescription) socialDescription.content = page.description
  }, [pathname])
  return null
}

function RouteMotion({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    if (!content || mediaQueryMatches('(prefers-reduced-motion: reduce)')) return

    let context: gsap.Context | undefined
    let frame = 0
    let routeObserver: MutationObserver | undefined

    const scheduleMotion = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const main = content.querySelector<HTMLElement>('main:not(.route-loading)')
        if (!main) return
        routeObserver?.disconnect()
        if (main.classList.contains('home-page')) return

        context = gsap.context(() => {
          gsap.from(main, {
            autoAlpha: 0,
            duration: 0.38,
            ease: 'power1.out',
            clearProps: 'all',
          })

          const blocks = gsap.utils.toArray<HTMLElement>(
            'main:not(.home-page) > :not(.reading-progress), main > .configure-layout > *, main > .portfolio-detail-top, main > .portfolio-detail-visual, main > .portfolio-detail-copy, main > .article-layout > *, main > .related-articles, main > .service-detail-hero > *, main .article-body > section',
          )
          const cards = gsap.utils.toArray<HTMLElement>(
            'main .service-catalog-card, main .portfolio-card, main .blog-card, main .project-card, main .service-preview, main .journal-preview, main .process-step, main .capability-item, main .service-faq, main .service-option, main .service-workflow-step, main .principle-list article, main .related-service',
          )
          const targets = [...new Set([...blocks, ...cards])]
          if (!targets.length) return

          targets.forEach((element, index) => {
            if (element.getBoundingClientRect().top > window.innerHeight * 0.94) {
              gsap.set(element, { autoAlpha: 0, y: 28, x: index % 2 === 0 ? -10 : 10 })
            }
          })

          ScrollTrigger.batch(targets, {
            start: 'top 91%',
            once: true,
            onEnter: (elements) => gsap.to(elements, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.78,
              ease: 'power3.out',
              stagger: 0.07,
              overwrite: 'auto',
            }),
          })
        }, main)
        ScrollTrigger.refresh()
      })
    }

    routeObserver = new MutationObserver(scheduleMotion)
    routeObserver.observe(content, { childList: true, subtree: true })
    scheduleMotion()

    return () => {
      window.cancelAnimationFrame(frame)
      routeObserver?.disconnect()
      context?.revert()
    }
  }, [pathname])

  return <div ref={contentRef}>{children}</div>
}

export default function App() {
  return <><RouteScrollReset /><RouteMetadata /><a className="skip-link" href="#top">Skip to content</a><SiteHeader /><RouteMotion><Routes>
    <Route path="/" element={<Suspense fallback={<main className="route-loading" aria-label="Loading homepage" />}><HomePage /></Suspense>} />
    <Route path="/services" element={<Suspense fallback={<main className="route-loading" aria-label="Loading services" />}><ServicesPage /></Suspense>} />
    <Route path="/services/:slug" element={<Suspense fallback={<main className="route-loading" aria-label="Loading service details" />}><ServiceDetailPage /></Suspense>} />
    <Route path="/portfolio" element={<Suspense fallback={<main className="route-loading" aria-label="Loading portfolio" />}><PortfolioPage /></Suspense>} />
    <Route path="/portfolio/:slug" element={<Suspense fallback={<main className="route-loading" aria-label="Loading project" />}><PortfolioPage /></Suspense>} />
    <Route path="/interactive-lab" element={<Suspense fallback={<main className="route-loading" aria-label="Loading interactive lab" />}><InteractiveLabPage /></Suspense>} />
    <Route path="/blog" element={<Suspense fallback={<main className="route-loading" aria-label="Loading journal" />}><BlogPage /></Suspense>} />
    <Route path="/blog/:slug" element={<Suspense fallback={<main className="route-loading" aria-label="Loading article" />}><BlogPage /></Suspense>} />
    <Route path="/faq" element={<Suspense fallback={<main className="route-loading" aria-label="Loading frequently asked questions" />}><FAQPage /></Suspense>} />
    <Route path="/about" element={<Suspense fallback={<main className="route-loading" aria-label="Loading About page" />}><AboutPage /></Suspense>} />
    <Route path="/contact" element={<Suspense fallback={<main className="route-loading" aria-label="Loading Contact page" />}><ContactPage /></Suspense>} />
    <Route path="/privacy" element={<Suspense fallback={<main className="route-loading" aria-label="Loading Privacy page" />}><PrivacyPage type="privacy" /></Suspense>} />
    <Route path="/terms" element={<Suspense fallback={<main className="route-loading" aria-label="Loading Terms page" />}><TermsPage type="terms" /></Suspense>} />
    <Route path="/configure" element={<Suspense fallback={<main className="route-loading" aria-label="Loading configurator" />}><ConfigurePage /></Suspense>} />
    <Route path="*" element={<NotFound />} />
  </Routes></RouteMotion><SiteFooter /><GlobalTools /></>
}