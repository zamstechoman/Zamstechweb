import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Search, Share2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { articles } from '../data/editorial'

function readingTime(article: (typeof articles)[number]) {
  const words = article.sections.flatMap((section) => [section.heading, ...section.paragraphs]).join(' ').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function BlogPage() {
  const { slug } = useParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All topics')
  const [shareLabel, setShareLabel] = useState('Share article')
  const article = articles.find((item) => item.slug === slug)
  const categories = ['All topics', ...new Set(articles.map((item) => item.category))]
  const visibleArticles = useMemo(() => articles.filter((item) => {
    const matchesCategory = category === 'All topics' || item.category === category
    const searchable = `${item.title} ${item.summary} ${item.category} ${item.sections.flatMap((section) => [section.heading, ...section.paragraphs]).join(' ')}`.toLowerCase()
    return matchesCategory && searchable.includes(query.trim().toLowerCase())
  }), [category, query])

  useEffect(() => {
    if (!article) return
    const originalTitle = document.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const originalDescription = description?.content
    const socialTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    const originalSocialTitle = socialTitle?.content
    const socialDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    const originalSocialDescription = socialDescription?.content
    document.title = `${article.title} | Amity Node Journal`
    if (description) description.content = article.summary
    if (socialTitle) socialTitle.content = `${article.title} | Amity Node Journal`
    if (socialDescription) socialDescription.content = article.summary
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
      document.documentElement.style.setProperty('--reading-progress', `${Math.min(progress, 100)}%`)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => {
      document.title = originalTitle
      if (description && originalDescription) description.content = originalDescription
      if (socialTitle && originalSocialTitle) socialTitle.content = originalSocialTitle
      if (socialDescription && originalSocialDescription) socialDescription.content = originalSocialDescription
      document.documentElement.style.removeProperty('--reading-progress')
      window.removeEventListener('scroll', updateProgress)
    }
  }, [article])

  async function shareArticle() {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: article?.title, url }).catch(() => undefined)
    } else {
      await navigator.clipboard.writeText(url)
      setShareLabel('Link copied')
      window.setTimeout(() => setShareLabel('Share article'), 1800)
    }
  }

  if (slug && article) return (
    <main className="article-page" id="top">
      <div className="reading-progress" aria-hidden="true" />
      <header className="article-header"><Link to="/blog" className="text-link"><ArrowLeft size={15} /> Journal</Link><p className="eyebrow"><span className="eyebrow-dot" />{article.category}</p><h1>{article.title}<span>.</span></h1><p className="article-summary">{article.summary}</p><div className="article-meta"><span>Amity Node editorial</span><span>Updated {new Date(`${article.updated}T00:00:00Z`).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</span><span>{readingTime(article)} min read</span><button type="button" onClick={shareArticle}><Share2 size={14} />{shareLabel}</button></div></header>
      <div className="article-layout"><aside className="article-toc"><span>IN THIS ARTICLE</span>{article.sections.map((section, index) => <a key={section.heading} href={`#section-${index + 1}`}>{section.heading}</a>)}</aside><article className="article-body">{article.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<p className="article-disclaimer">This locally authored guide is general information, not a live status report or a substitute for advice specific to your equipment and provider.</p><Link to="/configure" className="text-link">Ask about a related need <ArrowUpRight size={14} /></Link></article></div>
      <section className="related-articles"><span className="eyebrow muted">Keep exploring</span><div>{articles.filter((item) => item.slug !== article.slug).slice(0, 2).map((item) => <Link key={item.slug} to={`/blog/${item.slug}`}><span>{item.category}</span><strong>{item.title}</strong><ArrowUpRight size={15} /></Link>)}</div></section>
    </main>
  )

  if (slug) return <main className="route-page" id="top"><p className="eyebrow"><span className="eyebrow-dot" /> Journal</p><h1>Article not found<span className="route-period">.</span></h1><p className="route-description">That article is not in the local journal collection.</p><Link to="/blog" className="text-link"><ArrowLeft size={15} /> Browse the journal</Link></main>

  return (
    <main className="blog-page" id="top">
      <section className="blog-hero"><div className="route-index">AMITY NODE <span>·</span> JOURNAL</div><p className="eyebrow"><span className="eyebrow-dot" /> Notes on technology</p><h1>Useful ideas.<br /><span>Less jargon.</span></h1><p>Locally authored explainers for practical technology decisions. This journal is not a live news feed.</p></section>
      <section className="blog-listing"><div className="blog-tools"><label className="blog-search"><Search size={16} /><span className="sr-only">Search journal articles</span><input type="search" placeholder="Search articles" value={query} onChange={(event) => setQuery(event.target.value)} /></label><div className="blog-categories" role="group" aria-label="Filter articles by topic">{categories.map((item) => <button key={item} type="button" className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
        <article className="blog-card featured case-study-featured"><span>FEATURED CASE STUDY</span><h2><Link to="/journal/oman-telecom-network-infrastructure-case-study">Oman Telecom Network Infrastructure Case Study</Link></h2><p>An illustrative technical review of telecommunications infrastructure planning in Oman, including network benchmarks, greenfield architecture, operator comparisons, and deployment considerations.</p><div><span>Technical research</span><Link to="/journal/oman-telecom-network-infrastructure-case-study">Read case study <ArrowRight size={14} /></Link></div></article>
        {visibleArticles.length === 0 ? <p className="blog-empty" role="status">No articles match that search.</p> : <><p className="blog-count" aria-live="polite">{visibleArticles.length} {visibleArticles.length === 1 ? 'article' : 'articles'}</p><div className="blog-card-grid">{visibleArticles.map((item, index) => <article className={`blog-card${index === 0 && !query && category === 'All topics' ? ' featured' : ''}`} key={item.slug}><span>{index === 0 && !query && category === 'All topics' ? 'FEATURED GUIDE' : item.category.toUpperCase()}</span><h2><Link to={`/blog/${item.slug}`}>{item.title}</Link></h2><p>{item.summary}</p><div><span>{readingTime(item)} min read</span><Link to={`/blog/${item.slug}`}>Read article <ArrowRight size={14} /></Link></div></article>)}</div></>}
      </section>
    </main>
  )
}

export default BlogPage