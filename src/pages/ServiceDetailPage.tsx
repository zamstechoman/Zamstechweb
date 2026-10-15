import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ServiceArtwork from '../components/ServiceArtwork'
import { getService } from '../data/services'

function ServiceNotFound() {
  return <main className="service-not-found route-page" id="top"><p className="eyebrow"><span className="eyebrow-dot" /> Service not found</p><h1>Let’s find<br />the right fit.</h1><p className="route-description">That service page does not exist. Browse the service areas to find a useful starting point.</p><Link to="/services" className="text-link"><ArrowLeft size={15} /> All services</Link></main>
}

function ServiceDetailPage() {
  const { slug } = useParams()
  const service = getService(slug)

  useEffect(() => {
    if (!service) return
    const originalTitle = document.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const originalDescription = description?.content
    const socialTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    const originalSocialTitle = socialTitle?.content
    const socialDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    const originalSocialDescription = socialDescription?.content
    document.title = `${service.title} | Amity Node`
    if (description) description.content = service.summary
    if (socialTitle) socialTitle.content = `${service.title} | Amity Node`
    if (socialDescription) socialDescription.content = service.summary
    return () => {
      document.title = originalTitle
      if (description && originalDescription) description.content = originalDescription
      if (socialTitle && originalSocialTitle) socialTitle.content = originalSocialTitle
      if (socialDescription && originalSocialDescription) socialDescription.content = originalSocialDescription
    }
  }, [service])

  if (!service) return <ServiceNotFound />

  const relatedServices = service.related.map((relatedSlug) => getService(relatedSlug)).filter((related) => related !== undefined)

  return (
    <main className={`service-detail-page accent-${service.accent}`} id="top">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><ChevronRight size={13} /><Link to="/services">Services</Link><ChevronRight size={13} /><span aria-current="page">{service.shortTitle}</span></nav>
      <section className="service-detail-hero">
        <div className="service-detail-copy">
          <p className="eyebrow"><span className="eyebrow-dot" />{service.category}</p>
          <h1>{service.title}<span>.</span></h1>
          <p className="service-detail-summary">{service.description}</p>
          <div className="service-detail-actions"><Link to={`/configure?service=${service.slug}`} className="button button-primary">Configure this service <ArrowUpRight size={15} /></Link><a href="#service-approach" className="text-link">See how it works <ArrowRight size={14} /></a></div>
        </div>
        <ServiceArtwork service={service} />
      </section>

      <section className="service-detail-overview" id="service-approach">
        <div className="service-detail-section-heading"><span className="eyebrow muted">A practical starting point</span><h2>Useful technology<br />starts with the problem.</h2></div>
        <div className="service-challenges"><h3>Common challenges</h3>{service.challenges.map((challenge, index) => <div className="service-challenge" key={challenge}><span>{String(index + 1).padStart(2, '0')}</span><p>{challenge}</p></div>)}</div>
      </section>

      <section className="service-included-section">
        <div className="service-detail-section-heading"><span className="eyebrow"><span className="eyebrow-dot" /> What we can cover</span><h2>Clear scope.<br /><span>Useful detail.</span></h2><p>The right scope depends on your requirements. These are the areas we can review together before confirming the work.</p></div>
        <div className="service-included-list">{service.included.map((item) => <div className="included-item" key={item}><span><Check size={14} /></span>{item}</div>)}</div>
      </section>

      <section className="service-options-section">
        <div><span className="eyebrow muted">Options to discuss</span><h2>Shape it around<br />your requirements.</h2></div>
        <div className="service-options-list">{service.options.map((option, index) => <div className="service-option" key={option}><span>{String(index + 1).padStart(2, '0')}</span><p>{option}</p><ArrowUpRight size={14} /></div>)}</div>
      </section>

      <section className="service-workflow-section">
        <div className="service-detail-section-heading"><span className="eyebrow muted">A clear way forward</span><h2>From first question<br />to working solution.</h2></div>
        <div className="service-workflow">{service.workflow.map((step, index) => <article className="service-workflow-step" key={step.title}><span className="workflow-number">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></article>)}</div>
      </section>

      <section className="service-faq-section">
        <div><span className="eyebrow"><span className="eyebrow-dot" /> Good to know</span><h2>Questions, answered.</h2></div>
        <div className="service-faq-list">{service.faqs.map((faq) => <details className="service-faq" key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <section className="related-services-section">
        <div className="related-services-heading"><span className="eyebrow muted">Often considered together</span><Link to="/services" className="text-link dark-link">All services <ArrowRight size={14} /></Link></div>
        <div className="related-services-grid">{relatedServices.map((related) => <Link to={`/services/${related.slug}`} className="related-service" key={related.slug}><span>{related.category}</span><strong>{related.title}</strong><ArrowUpRight size={15} /></Link>)}</div>
      </section>

      <section className="service-detail-cta"><span className="eyebrow"><span className="eyebrow-dot" /> Start with this service</span><div><h2>Let’s shape a<br /><span>useful next step.</span></h2><Link to={`/configure?service=${service.slug}`} className="button button-primary">Configure this service <ArrowUpRight size={15} /></Link></div><Link to="/services" className="return-services"><ArrowLeft size={14} /> Browse all services</Link></section>
    </main>
  )
}

export default ServiceDetailPage