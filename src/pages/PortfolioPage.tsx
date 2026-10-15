import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/editorial'

function PortfolioPage() {
  const { slug } = useParams()
  const [category, setCategory] = useState('All concepts')
  const project = projects.find((item) => item.slug === slug)
  const categories = ['All concepts', ...new Set(projects.map((item) => item.category))]
  const visibleProjects = useMemo(() => category === 'All concepts' ? projects : projects.filter((item) => item.category === category), [category])

  if (slug && project) return (
    <main className="portfolio-detail-page" id="top">
      <div className="portfolio-detail-top"><Link to="/portfolio" className="text-link"><ArrowLeft size={15} /> All concepts</Link><span>CONCEPT PROJECT · NOT CLIENT WORK</span></div>
      <div className={`portfolio-detail-visual portfolio-visual-${project.visual}`} aria-hidden="true"><div className="concept-window"><span /><span /><span /><i /></div><div className="concept-orbit" /></div>
      <section className="portfolio-detail-copy"><p className="eyebrow"><span className="eyebrow-dot" />{project.category} · Concept project</p><h1>{project.title}<span>.</span></h1><p className="portfolio-lead">{project.summary}</p><div className="portfolio-detail-columns"><div><h2>Objective</h2><p>{project.objective}</p></div><div><h2>Approach</h2><p>{project.approach}</p></div></div><h2 className="portfolio-deliverables-title">Exploration areas</h2><ul className="portfolio-deliverables">{project.details.map((detail) => <li key={detail}>{detail}<ArrowUpRight size={14} /></li>)}</ul><Link to="/configure" className="button button-primary">Discuss a project like this <ArrowRight size={15} /></Link></section>
    </main>
  )

  if (slug) return <main className="portfolio-page route-page" id="top"><p className="eyebrow"><span className="eyebrow-dot" /> Portfolio</p><h1>Concept not found<span className="route-period">.</span></h1><p className="route-description">That concept is not in the local project collection.</p><Link to="/portfolio" className="text-link"><ArrowLeft size={15} /> Browse concepts</Link></main>

  return (
    <main className="portfolio-page" id="top">
      <section className="portfolio-hero"><div className="route-index">AMITY NODE <span>·</span> PORTFOLIO</div><p className="eyebrow"><span className="eyebrow-dot" /> Selected directions</p><h1>Ideas made<br /><span>visible.</span></h1><p>These clearly labeled concept projects are design explorations, not commissioned client work or deployed products.</p></section>
      <section className="portfolio-listing"><div className="portfolio-listing-heading"><div><span className="eyebrow muted">A few directions</span><h2>Work in progress,<br />shown honestly.</h2></div><p>Use the category filters to explore interface and product ideas. No client results or performance claims are implied.</p></div>
        <div className="portfolio-filters" role="group" aria-label="Filter concepts by category">{categories.map((item) => <button key={item} type="button" className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <p className="portfolio-count" aria-live="polite">{visibleProjects.length} {visibleProjects.length === 1 ? 'concept' : 'concepts'}</p>
        <div className="portfolio-grid">{visibleProjects.map((item, index) => <article className="portfolio-card" key={item.slug}><Link to={`/portfolio/${item.slug}`} className={`portfolio-card-visual portfolio-visual-${item.visual}`} aria-label={`View concept: ${item.title}`}><div className="concept-window"><span /><span /><span /><i /></div><span className="portfolio-card-number">0{index + 1} / CONCEPT</span></Link><div className="portfolio-card-copy"><div><span>{item.category} · Concept project</span><h3><Link to={`/portfolio/${item.slug}`}>{item.title}</Link></h3><p>{item.summary}</p></div><Link to={`/portfolio/${item.slug}`} aria-label={`View ${item.title}`}><ArrowUpRight size={17} /></Link></div></article>)}</div>
      </section>
      <section className="portfolio-cta"><span className="eyebrow"><span className="eyebrow-dot" /> Your project is next</span><h2>Let’s make a useful<br /><span>direction together.</span></h2><Link to="/configure" className="button button-primary">Configure your solution <ArrowRight size={15} /></Link></section>
    </main>
  )
}

export default PortfolioPage