import { lazy, Suspense, useEffect, useRef } from 'react'
import { ArrowRight, ArrowUpRight, Boxes, CloudCog, CodeXml, Cpu, Globe2, Layers3, ShieldCheck, Workflow } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const CinematicScroll = lazy(() => import('../components/CinematicScroll'))
gsap.registerPlugin(ScrollTrigger)

const serviceCards = [
  { number: '01', title: 'Websites & digital experiences', text: 'Clear, considered websites built around your customers and the way your team works.', icon: Globe2, href: '/services/web-development', tone: 'mint' },
  { number: '02', title: 'Software & business systems', text: 'Purposeful applications and connected workflows that make everyday work easier.', icon: Workflow, href: '/services/business-software', tone: 'blue' },
  { number: '03', title: 'Cloud, hosting & IT', text: 'Practical infrastructure and responsive support for the technology you rely on.', icon: CloudCog, href: '/services/website-hosting', tone: 'coral' },
]

const capabilities = [
  { icon: CodeXml, label: 'Web development' },
  { icon: Boxes, label: 'Business software' },
  { icon: CloudCog, label: 'Hosting & cloud' },
  { icon: ShieldCheck, label: 'IT support & security' },
  { icon: Cpu, label: 'Networks & devices' },
  { icon: Layers3, label: 'Automation & integration' },
]

function HomePage() {
  const pageRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      const revealTargets = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      gsap.set(revealTargets, { y: 28, autoAlpha: 0 })
      ScrollTrigger.batch(revealTargets, {
        start: 'top 88%',
        once: true,
        onEnter: (elements) => gsap.to(elements, {
          y: 0,
          autoAlpha: 1,
          duration: 0.82,
          stagger: 0.09,
          ease: 'power3.out',
          overwrite: 'auto',
        }),
      })

      const materialStudy = pageRef.current?.querySelector('.lab-preview-art')
      const ringA = materialStudy?.querySelector('.lab-ring-a')
      const ringB = materialStudy?.querySelector('.lab-ring-b')
      const core = materialStudy?.querySelector('.lab-preview-core')
      if (materialStudy && ringA && ringB && core) {
        const studyMotion = { trigger: materialStudy, start: 'top bottom', end: 'bottom top', scrub: 1 }
        gsap.to(ringA, { rotation: 18, ease: 'none', scrollTrigger: studyMotion })
        gsap.to(ringB, { rotation: -16, ease: 'none', scrollTrigger: studyMotion })
        gsap.to(core, { rotation: 62, scale: 1.08, ease: 'none', scrollTrigger: studyMotion })
      }

      gsap.utils.toArray<HTMLElement>('.project-visual').forEach((visual) => {
        gsap.fromTo(visual, { scale: 1.045 }, {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: visual, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        })
      })
    }, pageRef)

    return () => context.revert()
  }, [])

  return (
    <main className="home-page" id="top" ref={pageRef}>
      <Suspense fallback={<section className="cinematic-loading" aria-label="Loading cinematic introduction" />}>
        <CinematicScroll />
      </Suspense>

      <section className="intro-section" id="introduction">
        <div className="section-index" data-reveal>01 <span>/</span> The idea</div>
        <div className="intro-content" data-reveal>
          <p className="eyebrow muted">One connected partner</p>
          <h2>Less friction.<br /><span>More forward.</span></h2>
          <p className="intro-description">A new website, a smarter workflow, dependable hosting, or help with the technology already in place. Good solutions make the next step feel simpler.</p>
          <Link to="/about" className="text-link dark-link">Get to know us <ArrowUpRight size={15} /></Link>
        </div>
        <div className="intro-aside" data-reveal><span className="aside-symbol">↗</span><p>Clear thinking.<br />Useful technology.<br />A human point of contact.</p></div>
      </section>

      <section className="services-section">
        <div className="section-heading" data-reveal>
          <div><span className="eyebrow"><span className="eyebrow-dot" /> What we do</span><h2>Technology for<br /><span>the work ahead.</span></h2></div>
          <p>Digital products, business tools, and technology support, brought together around what you actually need.</p>
        </div>
        <div className="service-preview-grid">
          {serviceCards.map(({ number, title, text, icon: Icon, href, tone }) => (
            <Link className={`service-preview service-${tone}`} to={href} key={number} data-reveal>
              <div className="service-preview-top"><span>{number} / 03</span><Icon size={21} strokeWidth={1.5} aria-hidden="true" /></div>
              <div><h3>{title}</h3><p>{text}</p></div>
              <span className="service-card-link">Explore service <ArrowUpRight size={15} /></span>
            </Link>
          ))}
        </div>
        <Link to="/services" className="section-link">See all services <ArrowRight size={16} /></Link>
      </section>

      <section className="lab-preview-section">
        <div className="lab-preview-art" data-reveal aria-hidden="true"><div className="lab-ring lab-ring-a" /><div className="lab-ring lab-ring-b" /><div className="lab-preview-core"><span /><i /></div><div className="lab-preview-dot" /></div>
        <div className="lab-preview-copy" data-reveal>
          <span className="eyebrow"><span className="eyebrow-dot" /> Interactive lab · Study 001</span>
          <h2>Curiosity is<br />part of the craft.</h2>
          <p>Explore a real-time 3D material study. Change its surface, color, lighting, and orientation in your browser.</p>
          <Link to="/interactive-lab" className="text-link">Visit the interactive lab <ArrowUpRight size={15} /></Link>
        </div>
        <span className="lab-coordinate">STUDY 001 <i /> MATERIAL / LIGHT</span>
      </section>

      <section className="projects-section">
        <div className="section-heading" data-reveal>
          <div><span className="eyebrow muted">Selected directions</span><h2>Built with<br /><span>intention.</span></h2></div>
          <p>Early interface explorations show how clear information and careful craft can meet. These are concepts, not client projects.</p>
        </div>
        <div className="project-grid">
          <article className="project-card" data-reveal>
            <div className="project-visual project-visual-ops" aria-label="Concept operations dashboard interface preview" role="img">
              <div className="mock-toolbar"><span className="mock-brand"><i /> north / field</span><span>Overview&nbsp;&nbsp; Work&nbsp;&nbsp; Reports</span><b>Today ↗</b></div>
              <div className="mock-dashboard"><div className="mock-sidebar"><span /><span /><span /><span /></div><div className="mock-main"><div className="mock-heading"><span>Good morning, team</span><i>● ● ●</i></div><div className="mock-metrics"><span /><span /><span /></div><div className="mock-table"><i /><i /><i /><i /></div></div></div>
            </div>
            <div className="project-meta"><div><span className="concept-label">Concept project</span><h3>Operations, in focus</h3><p>A calmer interface concept for everyday team coordination.</p></div><ArrowUpRight size={18} aria-hidden="true" /></div>
          </article>
          <article className="project-card" data-reveal>
            <div className="project-visual project-visual-web" aria-label="Concept storefront website interface preview" role="img">
              <div className="web-mock-nav"><span>FORM / OBJECT</span><span>Objects&nbsp;&nbsp; Studio&nbsp;&nbsp; Journal</span><i>Bag (0)</i></div>
              <div className="web-mock-body"><span>OBJECTS FOR SLOWER LIVING</span><strong>Made to<br />stay.</strong><i>Explore the collection&nbsp; ↗</i><div className="web-mock-object"><b /><i /></div></div>
            </div>
            <div className="project-meta"><div><span className="concept-label">Concept project</span><h3>Commerce with character</h3><p>A responsive storefront direction with room for the product to speak.</p></div><ArrowUpRight size={18} aria-hidden="true" /></div>
          </article>
        </div>
        <Link to="/portfolio" className="section-link">Explore the portfolio <ArrowRight size={16} /></Link>
      </section>

      <section className="process-section">
        <div className="process-intro" data-reveal><span className="eyebrow"><span className="eyebrow-dot" /> How we work</span><h2>Good work<br />starts with<br /><span>good questions.</span></h2><p>A thoughtful process keeps the technology useful and the decisions clear.</p></div>
        <div className="process-steps">
          {[
            ['01', 'Listen', 'Understand the people, the priorities, and the problem worth solving.'],
            ['02', 'Shape', 'Agree on a practical direction, scope, and a sensible next step.'],
            ['03', 'Build', 'Create, test, and refine the solution with the details in view.'],
            ['04', 'Support', 'Keep improving and help the technology work over time.'],
          ].map(([number, title, text]) => <article className="process-step" key={number} data-reveal><span className="process-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowRight size={15} aria-hidden="true" /></article>)}
        </div>
      </section>

      <section className="capabilities-section">
        <div className="capabilities-heading" data-reveal><span className="eyebrow muted">Connected capabilities</span><h2>One clear view<br />of your technology.</h2></div>
        <div className="capabilities-grid">
          {capabilities.map(({ icon: Icon, label }) => <div className="capability-item" key={label} data-reveal><Icon size={18} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span><ArrowUpRight size={13} aria-hidden="true" /></div>)}
        </div>
      </section>

      <section className="journal-section">
        <div className="journal-heading" data-reveal><div><span className="eyebrow"><span className="eyebrow-dot" /> From the journal</span><h2>Useful ideas.<br /><span>Less jargon.</span></h2></div><p>Locally authored guides for making practical technology decisions. This is not a live news feed.</p></div>
        <div className="journal-preview-grid">
          <Link className="journal-preview" data-reveal to="/blog/website-or-web-application"><span>WEB DEVELOPMENT</span><h3>When does a website need to become a web application?</h3><p>A practical look at the signs that a workflow needs more than another page.</p></Link>
          <Link className="journal-preview" data-reveal to="/blog/choosing-business-hosting"><span>HOSTING & CLOUD</span><h3>Choosing website hosting: the questions that matter first</h3><p>Workload, backups, support, and ownership are worth checking before a move.</p></Link>
        </div>
        <Link to="/blog" className="section-link">Visit the journal <ArrowRight size={16} /></Link>
      </section>

      <section className="closing-cta" data-reveal>
        <span className="eyebrow"><span className="eyebrow-dot" /> Start with a conversation</span>
        <div className="closing-cta-main"><h2>What could work<br /><span>better?</span></h2><Link to="/configure" className="button button-primary">Configure your solution <ArrowUpRight size={16} /></Link></div>
        <div className="closing-cta-foot"><span>One idea is enough to begin.</span><span>Oman&nbsp; · &nbsp;Worldwide enquiries</span></div>
      </section>
    </main>
  )
}

export default HomePage