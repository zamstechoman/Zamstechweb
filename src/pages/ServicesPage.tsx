import { useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'
import ServiceArtwork from '../components/ServiceArtwork'

function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('All services')
  const categories = useMemo(() => ['All services', ...new Set(services.map((service) => service.category))], [])
  const visibleServices = activeCategory === 'All services'
    ? services
    : services.filter((service) => service.category === activeCategory)

  return (
    <main className="services-page" id="top">
      <section className="services-hero">
        <div className="services-hero-copy">
          <div className="route-index">AMITY NODE <span>·</span> SERVICES</div>
          <p className="eyebrow"><span className="eyebrow-dot" /> Technology for real work</p>
          <h1>Make the next<br /><span>move make sense.</span></h1>
          <p className="services-hero-description">Digital experiences, business systems, and dependable technology support, scoped around what you actually need.</p>
          <a className="text-link" href="#service-list">Explore service areas <ArrowRight size={15} /></a>
        </div>
        <div className="services-hero-index" aria-hidden="true"><span>11</span><i />SERVICE AREAS</div>
      </section>

      <section className="services-list-section" id="service-list">
        <div className="services-list-heading">
          <div><span className="eyebrow muted">Find the right starting point</span><h2>What do you need<br />to make work better?</h2></div>
          <p>Choose an area to see how we can help. If your requirement crosses categories, start with the closest fit and we can work it out together.</p>
        </div>
        <div className="service-filters" role="group" aria-label="Filter services by category">
          {categories.map((category) => <button className={`service-filter${activeCategory === category ? ' is-active' : ''}`} key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div>
        <p className="service-result-count" aria-live="polite">Showing {visibleServices.length} {visibleServices.length === 1 ? 'service' : 'services'}</p>
        <div className="service-catalog-grid">
          {visibleServices.map((service, index) => {
            const Icon = service.icon
            return (
              <article className={`service-catalog-card accent-${service.accent}`} key={service.slug}>
                <Link className="service-catalog-art-link" to={`/services/${service.slug}`} aria-label={`Explore ${service.title}`}>
                  <ServiceArtwork service={service} compact />
                  <span className="service-card-number">{String(index + 1).padStart(2, '0')} <i>/ {String(visibleServices.length).padStart(2, '0')}</i></span>
                </Link>
                <div className="service-catalog-copy">
                  <div className="service-card-category"><Icon size={14} strokeWidth={1.6} />{service.category}</div>
                  <h3><Link to={`/services/${service.slug}`}>{service.title}</Link></h3>
                  <p>{service.summary}</p>
                  <div className="service-use-cases" aria-label="Typical use cases">{service.useCases.map((useCase) => <span key={useCase}>{useCase}</span>)}</div>
                  <div className="service-card-actions"><Link to={`/services/${service.slug}`} className="service-explore-link">Explore service <ArrowUpRight size={14} /></Link><Link to={`/configure?service=${service.slug}`} className="service-configure-link">Configure <ArrowRight size={13} /></Link></div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="services-contact-strip">
        <div><span className="eyebrow"><span className="eyebrow-dot" /> Not sure where to start?</span><h2>Tell us what is<br /><span>getting in the way.</span></h2></div>
        <Link to="/configure" className="button button-primary">Talk through your needs <ArrowUpRight size={15} /></Link>
      </section>
    </main>
  )
}

export default ServicesPage