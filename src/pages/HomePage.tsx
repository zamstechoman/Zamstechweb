import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CloudCog,
  CodeXml,
  Network,
  Workflow,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { articles, projects } from '../data/editorial'
import { mediaQueryMatches } from '../utils/browser'
import ProjectMockup from '../components/ProjectMockup'

const CinematicScroll = lazy(() => import('../components/CinematicScroll'))
gsap.registerPlugin(ScrollTrigger)

const serviceCards = [
  {
    number: '01',
    type: 'SOFTWARE / APPLICATIONS',
    title: 'Useful software, shaped around real work.',
    description: 'Purpose-built digital products for the people, tasks, and decisions behind your business.',
    examples: 'Web applications · Android apps · Business software',
    icon: CodeXml,
    href: '/services/web-applications',
    visual: 'software',
  },
  {
    number: '02',
    type: 'BUSINESS SYSTEMS',
    title: 'Clearer workflows from end to end.',
    description: 'Connect everyday tools and organize repeatable work without adding needless complexity.',
    examples: 'Business tools · Workflow automation · Integrations',
    icon: Workflow,
    href: '/services/workflow-automation',
    visual: 'systems',
  },
  {
    number: '03',
    type: 'IT / INFRASTRUCTURE',
    title: 'Technology that stays dependable.',
    description: 'Practical support for the devices, networks, and digital foundations your team relies on.',
    examples: 'Computer support · Networks · Devices',
    icon: Network,
    href: '/services/network-cctv',
    visual: 'infrastructure',
  },
  {
    number: '04',
    type: 'CLOUD / DIGITAL OPERATIONS',
    title: 'A stronger foundation for what comes next.',
    description: 'Thoughtful hosting and cloud choices, planned around the workload and the people maintaining it.',
    examples: 'Website hosting · VPS & cloud · Maintenance',
    icon: CloudCog,
    href: '/services/vps-cloud',
    visual: 'cloud',
  },
]

const processStages = [
  ['01', 'Understand', 'Start with the business need, the people involved, and the problem worth solving.'],
  ['02', 'Design', 'Shape the structure and experience before adding unnecessary complexity.'],
  ['03', 'Build', 'Develop, connect, and refine the solution with usability and reliability in view.'],
  ['04', 'Support & improve', 'Maintain the system and make considered improvements as needs evolve.'],
]

function CapabilityArtwork({ visual }: { visual: string }) {
  if (visual === 'software') {
    return (
      <div className="capability-art capability-art-software" aria-hidden="true">
        <span className="software-panel software-panel-back" />
        <span className="software-panel software-panel-front">
          <i /><i /><i /><b /><b />
        </span>
        <span className="software-node software-node-one" />
        <span className="software-node software-node-two" />
      </div>
    )
  }

  if (visual === 'systems') {
    return (
      <div className="capability-art capability-art-systems" aria-hidden="true">
        <span className="system-track" />
        <span className="system-node system-node-one"><i /></span>
        <span className="system-node system-node-two"><i /></span>
        <span className="system-node system-node-three"><i /></span>
        <span className="system-node system-node-four"><i /></span>
      </div>
    )
  }

  if (visual === 'infrastructure') {
    return (
      <div className="capability-art capability-art-infrastructure" aria-hidden="true">
        <span className="network-lines" />
        <span className="infrastructure-node infrastructure-node-center"><i /></span>
        <span className="infrastructure-node infrastructure-node-top"><i /></span>
        <span className="infrastructure-node infrastructure-node-left"><i /></span>
        <span className="infrastructure-node infrastructure-node-right"><i /></span>
        <span className="infrastructure-node infrastructure-node-bottom"><i /></span>
      </div>
    )
  }

  return (
    <div className="capability-art capability-art-cloud" aria-hidden="true">
      <span className="cloud-layer cloud-layer-back" />
      <span className="cloud-layer cloud-layer-middle" />
      <span className="cloud-layer cloud-layer-front"><i /></span>
      <span className="cloud-layer-node" />
    </div>
  )
}

function estimateReadingMinutes(article: (typeof articles)[number]) {
  const words = article.sections.flatMap((section) => section.paragraphs).join(' ').trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function HomePage() {
  const pageRef = useRef<HTMLElement>(null)
  const [connectedView, setConnectedView] = useState(true)

  useEffect(() => {
    if (mediaQueryMatches('(prefers-reduced-motion: reduce)')) return

    const context = gsap.context(() => {
      const revealTargets = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      gsap.set(revealTargets, { y: 26, autoAlpha: 0 })
      ScrollTrigger.batch(revealTargets, {
        start: 'top 88%',
        once: true,
        onEnter: (elements) => gsap.to(elements, {
          y: 0,
          autoAlpha: 1,
          duration: 0.76,
          stagger: 0.075,
          ease: 'power3.out',
          overwrite: 'auto',
        }),
      })

    }, pageRef)

    return () => context.revert()
  }, [])

  return (
    <main className="home-page" id="top" ref={pageRef}>
      <Suspense fallback={<section className="cinematic-loading" aria-label="Loading cinematic introduction" />}>
        <CinematicScroll />
      </Suspense>

      <section className="home-principle" id="introduction" aria-labelledby="home-principle-title">
        <div className="home-section-index" data-reveal>01 <span>/</span> The idea</div>
        <div className="home-principle-copy" data-reveal>
          <p className="home-eyebrow"><i /> A connected technology partner</p>
          <h2 id="home-principle-title">Technology should make the next step <span>clearer.</span></h2>
          <p>Software, infrastructure, and automation work best when they support one another. We bring the pieces together around the way your business actually works.</p>
        </div>
        <div className="home-principle-aside" data-reveal>
          <span>AM / 01</span>
          <p>Clear thinking.<br />Useful technology.<br />A human point of contact.</p>
        </div>
      </section>

      <section className="home-capabilities" id="services" aria-labelledby="home-capabilities-title">
        <div className="home-section-heading" data-reveal>
          <div>
            <p className="home-eyebrow"><i /> What we build</p>
            <h2 id="home-capabilities-title">From the first idea to the systems that keep it running.</h2>
          </div>
          <p>Development, business logic, and technical support brought together to help organizations build, connect, and maintain their digital operations.</p>
        </div>
        <div className="home-capability-grid">
          {serviceCards.map(({ number, type, title, description, examples, icon: Icon, href, visual }) => (
            <Link className={`home-capability home-capability-${visual}`} to={href} key={number} data-reveal>
              <div className="home-capability-top"><span>{number} / 04</span><Icon size={19} strokeWidth={1.5} aria-hidden="true" /></div>
              <CapabilityArtwork visual={visual} />
              <div className="home-capability-copy">
                <span className="home-capability-type">{type}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="home-capability-examples">{examples}</span>
              </div>
              <span className="home-capability-link">Explore capability <ArrowUpRight size={15} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
        <Link to="/services" className="home-text-link" data-reveal>Explore all services <ArrowRight size={15} aria-hidden="true" /></Link>
      </section>

      <section className="home-transformation" aria-labelledby="home-transformation-title">
        <div className="home-transformation-copy" data-reveal>
          <p className="home-eyebrow"><i /> Built around real work</p>
          <h2 id="home-transformation-title">Less friction.<br /><span>More flow.</span></h2>
          <p>Good technology does more than look impressive. It makes work easier to understand, manage, and improve — one useful connection at a time.</p>
          <button
            className="home-transform-toggle"
            type="button"
            aria-pressed={connectedView}
            aria-controls="system-transformation-visual"
            onClick={() => setConnectedView((current) => !current)}
          >
            {connectedView ? 'View a fragmented workflow' : 'View a connected workflow'}
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>
        <div
          className={`system-transformation${connectedView ? ' is-connected' : ' is-fragmented'}`}
          id="system-transformation-visual"
          role="img"
          aria-label={connectedView
            ? 'Connected workflow with clear information paths and structured processes'
            : 'Fragmented workflow with repeated tasks and disconnected information'}
          data-reveal
        >
          <div className="transformation-toolbar"><span>WORKFLOW STUDY / 01</span><span className="transformation-state">{connectedView ? 'CONNECTED' : 'FRAGMENTED'}</span></div>
          <div className="transformation-canvas">
            <svg className="transformation-lines" viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden="true">
              <path className="transformation-line transformation-line-main" d="M104 150H496" />
              <path className="transformation-line transformation-line-branch" d="M300 150V62M300 150V238" />
              <path className="transformation-line transformation-line-loose" d="M104 150 191 76M405 220l91-70" />
            </svg>
            <div className="transformation-node transformation-node-start"><i /><span>REQUEST</span></div>
            <div className="transformation-node transformation-node-center"><i /><span>WORK IN PROGRESS</span></div>
            <div className="transformation-node transformation-node-end"><i /><span>HANDOFF</span></div>
            <div className="transformation-note transformation-note-top">SCATTERED INFORMATION</div>
            <div className="transformation-note transformation-note-bottom">REPEATED MANUAL TASKS</div>
            <div className="transformation-tag transformation-tag-top">CLEAR OWNERSHIP</div>
            <div className="transformation-tag transformation-tag-bottom">SHARED CONTEXT</div>
          </div>
          <div className="transformation-legend"><span><i /> Structured processes</span><span><i /> Connected information</span></div>
        </div>
      </section>

      <section className="home-work" id="work" aria-labelledby="home-work-title">
        <div className="home-section-heading" data-reveal>
          <div>
            <p className="home-eyebrow"><i /> Selected directions</p>
            <h2 id="home-work-title">Systems built to do more.</h2>
          </div>
          <p>Explore interface studies for software, operations, and digital experiences. These are clearly labeled concepts, not client projects.</p>
        </div>
        <div className="home-project-grid">
          {projects.slice(0, 3).map((project, index) => (
            <Link
              className={`home-project home-project-${index + 1}`}
              key={project.slug}
              to={`/portfolio/${project.slug}`}
              aria-label={`${project.title}, concept project. Open project details.`}
              data-reveal
            >
              <div className="home-project-visual">
                <ProjectMockup visual={project.visual} title={project.title} compact />
              </div>
              <div className="home-project-meta">
                <div><span>{project.category} / CONCEPT</span><h3>{project.title}</h3><p>{project.summary}</p></div>
                <ArrowUpRight size={18} aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
        <Link to="/portfolio" className="home-text-link" data-reveal>Explore the portfolio <ArrowRight size={15} aria-hidden="true" /></Link>
      </section>

      <section className="home-process" aria-labelledby="home-process-title">
        <div className="home-process-intro" data-reveal>
          <p className="home-eyebrow"><i /> Our approach</p>
          <h2 id="home-process-title">Clear thinking.<br /><span>Thoughtful execution.</span></h2>
          <p>We keep the work focused on the need, the people using it, and the next useful step.</p>
        </div>
        <ol className="home-process-steps">
          {processStages.map(([number, title, description]) => (
            <li className="home-process-step" key={number} data-reveal>
              <span className="home-process-number">{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
              <ArrowDownRight size={16} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </section>

      <section className="home-journal" id="journal" aria-labelledby="home-journal-title">
        <div className="home-section-heading" data-reveal>
          <div>
            <p className="home-eyebrow"><i /> The Amity Journal</p>
            <h2 id="home-journal-title">Technology,<br /><span>made clearer.</span></h2>
          </div>
          <div className="home-journal-intro">
            <p>Practical guides and ideas for getting more from the technology around you.</p>
            <Link to="/blog" className="home-text-link">Visit the journal <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="home-journal-grid">
          {articles.slice(0, 3).map((article, index) => (
            <Link className="home-article" to={`/blog/${article.slug}`} key={article.slug} data-reveal>
              <div className={`home-article-art home-article-art-${index + 1}`} aria-hidden="true">
                <span className="article-art-index">AN / 0{index + 1}</span>
                <span className="article-art-orbit"><i /><i /><i /></span>
                <span className="article-art-line" />
              </div>
              <div className="home-article-meta"><span>{article.category}</span><span>{estimateReadingMinutes(article)} MIN READ</span></div>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <div className="home-article-foot">
                <time dateTime={article.updated}>{new Date(`${article.updated}T00:00:00Z`).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })}</time>
                <ArrowUpRight size={16} aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-contact" aria-labelledby="home-contact-title">
        <div className="home-contact-orbit" aria-hidden="true"><i /><i /><i /><b /></div>
        <div className="home-contact-copy" data-reveal>
          <p className="home-eyebrow"><i /> Your next step</p>
          <h2 id="home-contact-title">Let’s connect<br /><span>the pieces.</span></h2>
          <p>Have a business challenge, an idea for a digital product, or a technology setup that needs attention? Let’s work out the right next step.</p>
          <div className="home-contact-actions">
            <Link to="/contact" className="home-button-primary">Start a conversation <ArrowUpRight size={16} aria-hidden="true" /></Link>
            <Link to="/services" className="home-text-link">Explore our services <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
        <span className="home-contact-coordinate">AMITY NODE / OMAN · WORLDWIDE</span>
      </section>
    </main>
  )
}

export default HomePage
