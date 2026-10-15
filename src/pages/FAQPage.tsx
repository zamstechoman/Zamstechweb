import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'

function FAQPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All services')
  const categories = ['All services', ...new Set(services.map((service) => service.category))]
  const questions = useMemo(() => services.flatMap((service) => service.faqs.map((faq) => ({ ...faq, serviceTitle: service.shortTitle, serviceSlug: service.slug, category: service.category }))).filter((faq) => {
    const matchesCategory = category === 'All services' || faq.category === category
    return matchesCategory && `${faq.question} ${faq.answer} ${faq.serviceTitle}`.toLowerCase().includes(query.trim().toLowerCase())
  }), [category, query])

  return <main className="faq-page" id="top"><section className="faq-hero"><div className="route-index">AMITY NODE <span>·</span> FAQ</div><p className="eyebrow"><span className="eyebrow-dot" /> Clear answers, practical next steps</p><h1>Good questions<br /><span>deserve clarity.</span></h1><p>Answers to common questions about the service areas. Every project is scoped to its requirements, so details are confirmed in conversation.</p></section><section className="faq-content"><div className="faq-controls"><label><span className="sr-only">Search frequently asked questions</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search questions" /></label><div className="service-filters" role="group" aria-label="Filter questions by service category">{categories.map((item) => <button key={item} type="button" className={`service-filter${category === item ? ' is-active' : ''}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div></div><p className="faq-count" aria-live="polite">{questions.length} {questions.length === 1 ? 'answer' : 'answers'}</p><div className="faq-list">{questions.map((faq) => <details className="service-faq" key={`${faq.serviceSlug}-${faq.question}`}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p><Link to={`/services/${faq.serviceSlug}`}>About {faq.serviceTitle} <ArrowRight size={13} /></Link></details>)}{questions.length === 0 && <p className="faq-empty">No answers matched that search.</p>}</div><div className="faq-contact"><div><span className="eyebrow muted">Still have a question?</span><h2>Let’s work it out.</h2></div><Link to="/contact" className="text-link dark-link">Contact Amity Node <ArrowRight size={14} /></Link></div></section></main>
}

export default FAQPage