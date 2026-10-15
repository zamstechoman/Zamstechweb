import { useMemo, useState, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Check, Copy, MessageCircle, Send } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { getService, services } from '../data/services'

type Field = { key: string; label: string; options: string[]; multiple?: boolean }

const fields: Record<string, Field[]> = {
  'web-development': [
    { key: 'siteType', label: 'What are you building?', options: ['Company website', 'Online store', 'Booking or service site', 'Landing page', 'Redesign an existing site'] },
    { key: 'pages', label: 'Approximate page count', options: ['1–3 pages', '4–7 pages', '8–15 pages', 'More than 15'] },
    { key: 'features', label: 'Features to include', options: ['Contact form', 'Booking', 'Online payments', 'Content editing', 'Multilingual content'], multiple: true },
    { key: 'content', label: 'Content readiness', options: ['Ready to use', 'Needs editing', 'Needs to be created'] },
    { key: 'hosting', label: 'Domain and hosting', options: ['Already arranged', 'Need help choosing', 'Include setup in the discussion'] },
  ],
  'web-applications': [
    { key: 'appType', label: 'Application type', options: ['Internal team tool', 'Customer or partner portal', 'Workflow system', 'Reporting dashboard'] },
    { key: 'modules', label: 'Needed modules', options: ['User roles', 'Approvals', 'Data entry', 'Reports', 'Integrations'], multiple: true },
    { key: 'users', label: 'Expected users', options: ['1–5', '6–20', '21–100', 'More than 100'] },
    { key: 'deployment', label: 'Deployment preference', options: ['Cloud hosted', 'Existing infrastructure', 'Not sure yet'] },
  ],
  'android-applications': [
    { key: 'appType', label: 'App type', options: ['Customer-facing', 'Field or operations tool', 'Companion to existing software', 'Focused utility'] },
    { key: 'features', label: 'Main features', options: ['Offline use', 'Notifications', 'Camera or files', 'Location', 'Account sign-in'], multiple: true },
    { key: 'backend', label: 'Backend services', options: ['Already available', 'Required', 'Not sure yet'] },
    { key: 'screens', label: 'Approximate screens', options: ['1–5', '6–10', '11–20', 'More than 20'] },
  ],
  'website-hosting': [
    { key: 'sites', label: 'Websites to host', options: ['1', '2–5', '6–10', 'More than 10'] },
    { key: 'traffic', label: 'Expected traffic', options: ['Under 5,000 visits/month', '5,000–25,000', '25,000–100,000', 'Not sure'] },
    { key: 'email', label: 'Business email', options: ['Needed', 'Already arranged', 'Not required'] },
    { key: 'backup', label: 'Backup frequency', options: ['Daily', 'Weekly', 'Monthly', 'Need advice'] },
  ],
  'vps-cloud': [
    { key: 'resources', label: 'Resource profile', options: ['Small app or test environment', 'Business application', 'High-traffic workload', 'Not sure yet'] },
    { key: 'operatingSystem', label: 'Operating system', options: ['Linux', 'Windows', 'No preference'] },
    { key: 'management', label: 'Administration', options: ['Managed support', 'Self-managed', 'Discuss options'] },
    { key: 'backup', label: 'Backup and recovery', options: ['Daily backups', 'Weekly backups', 'Recovery planning needed', 'Need advice'] },
  ],
  'computer-support': [
    { key: 'device', label: 'Device type', options: ['Laptop', 'Desktop', 'Multiple devices', 'Other'] },
    { key: 'issue', label: 'Problem category', options: ['Hardware', 'Software or operating system', 'Setup or installation', 'Performance', 'Not sure'] },
    { key: 'supportMode', label: 'Preferred support', options: ['Remote', 'On-site', 'Either, depending on the issue'] },
    { key: 'urgency', label: 'Timing', options: ['Flexible', 'Within a few days', 'As soon as availability allows'] },
  ],
  'network-cctv': [
    { key: 'siteType', label: 'Site type', options: ['Home', 'Small office', 'Commercial site', 'Multiple locations'] },
    { key: 'networkSize', label: 'Connected devices', options: ['1–10', '11–30', '31–75', 'More than 75'] },
    { key: 'needs', label: 'Areas to discuss', options: ['Wi-Fi coverage', 'Network cabling', 'CCTV cameras', 'Troubleshooting', 'New installation'], multiple: true },
    { key: 'assessment', label: 'Site assessment', options: ['Likely needed', 'Not sure', 'Remote advice first'] },
  ],
  'business-software': [
    { key: 'businessType', label: 'Business type', options: ['Retail or trading', 'Services', 'Professional practice', 'Other'] },
    { key: 'modules', label: 'Required modules', options: ['Accounting', 'Invoicing', 'Inventory', 'Payroll', 'Reporting'], multiple: true },
    { key: 'users', label: 'Expected users', options: ['1–5', '6–20', '21–50', 'More than 50'] },
    { key: 'migration', label: 'Existing data or software', options: ['Need data migration', 'Replacing existing software', 'Starting fresh', 'Not sure yet'] },
  ],
  'workflow-automation': [
    { key: 'workflow', label: 'Current workflow', options: ['Repeated data entry', 'Approvals and handoffs', 'Notifications and reminders', 'Recurring reports', 'Other'] },
    { key: 'applications', label: 'Applications involved', options: ['Microsoft tools', 'Google tools', 'Business software', 'Website or forms', 'Several different tools'] },
    { key: 'frequency', label: 'How often does it happen?', options: ['Several times a day', 'Daily', 'Weekly', 'Monthly'] },
    { key: 'outcome', label: 'Desired outcome', options: ['Save time', 'Reduce errors', 'Improve visibility', 'Make handoffs clearer'] },
  ],
  maintenance: [
    { key: 'platform', label: 'System to maintain', options: ['Website', 'Web application', 'Business software', 'Server or cloud environment'] },
    { key: 'frequency', label: 'Maintenance frequency', options: ['Monthly', 'Quarterly', 'As needed', 'Not sure'] },
    { key: 'support', label: 'Support level', options: ['Routine updates', 'Backups and security checks', 'Issue response', 'Discuss a complete care plan'], multiple: true },
    { key: 'currentState', label: 'Current situation', options: ['Already maintained', 'Needs a review', 'Urgent issue to resolve'] },
  ],
  'other-technology': [
    { key: 'need', label: 'Closest description', options: ['Technology assessment', 'Integration or setup', 'Advice on options', 'A combination of needs'] },
    { key: 'consultation', label: 'Preferred consultation', options: ['WhatsApp', 'Email', 'Call', 'Not sure'] },
  ],
}

const budgetOptions = ['Under OMR 100', 'OMR 100–300', 'OMR 300–750', 'OMR 750–1,500', 'OMR 1,500+', 'Need guidance']

function ConfigurePage() {
  const [searchParams] = useSearchParams()
  const initial = getService(searchParams.get('service') ?? undefined)
  const [step, setStep] = useState(initial ? 2 : 1)
  const [serviceSlug, setServiceSlug] = useState(initial?.slug ?? '')
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [timeline, setTimeline] = useState('Flexible, to be discussed')
  const [budget, setBudget] = useState('Need guidance')
  const [priority, setPriority] = useState('Standard')
  const [notes, setNotes] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('Oman')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const service = getService(serviceSlug)
  const serviceFields = service ? fields[service.slug] ?? [] : []

  const summary = useMemo(() => {
    const lines = [
      'AMITY NODE | PROJECT ENQUIRY',
      `Service: ${service?.title ?? 'Not selected'}`,
      ...serviceFields.flatMap((field) => {
        const value = answers[field.key]
        if (!value || (Array.isArray(value) && value.length === 0)) return []
        return [`${field.label}: ${Array.isArray(value) ? value.join(', ') : value}`]
      }),
      `Preferred timing: ${timeline}`,
      `Priority: ${priority}`,
      `Budget range: ${budget} (price to be confirmed after review)`,
      `Name: ${name || 'Not provided'}`,
      `Company: ${company || 'Not provided'}`,
      `Email: ${email || 'Not provided'}`,
      `Phone / WhatsApp: ${phone || 'Not provided'}`,
      `Country: ${country || 'Not provided'}`,
      `Project notes: ${notes || 'None'}`,
    ]
    return lines.join('\n')
  }, [answers, budget, company, country, email, name, notes, phone, priority, service, serviceFields, timeline])

  const whatsappUrl = `https://wa.me/96878301334?text=${encodeURIComponent(summary)}`
  const emailUrl = `mailto:?subject=${encodeURIComponent(`Project enquiry: ${service?.title ?? 'Amity Node'}`)}&body=${encodeURIComponent(summary)}`

  function selectService(slug: string) {
    setServiceSlug(slug)
    setAnswers({})
    setError('')
  }

  function updateAnswer(key: string, value: string, multiple: boolean) {
    setAnswers((current) => {
      if (!multiple) return { ...current, [key]: value }
      const selected = Array.isArray(current[key]) ? current[key] as string[] : []
      return { ...current, [key]: selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value] }
    })
  }

  function continueStep(event: FormEvent) {
    event.preventDefault()
    setError('')
    if (step === 1 && !service) return setError('Choose a service area to continue.')
    if (step === 2 && serviceFields.some((field) => !answers[field.key] || (Array.isArray(answers[field.key]) && (answers[field.key] as string[]).length === 0))) return setError('Complete each configuration field to continue.')
    if (step === 3 && (!name.trim() || (!email.trim() && !phone.trim()))) return setError('Add your name and at least one contact method.')
    setStep((current) => Math.min(current + 1, 4))
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setError('Clipboard access is unavailable. You can select and copy the enquiry summary above.')
    }
  }

  return (
    <main className="configure-page" id="top">
      <div className="configure-heading"><p className="eyebrow"><span className="eyebrow-dot" /> Configure your solution</p><h1>A clear brief<br /><span>starts here.</span></h1><p>Share the essentials. Your selections stay in this browser until you choose to open WhatsApp or email.</p></div>
      <div className="configure-layout">
        <section className="configure-form-panel" aria-label="Project configuration">
          <ol className="configure-steps" aria-label="Configuration steps">{['Service', 'Scope', 'Contact', 'Review'].map((label, index) => <li className={step === index + 1 ? 'active' : step > index + 1 ? 'complete' : ''} key={label}><span>{step > index + 1 ? <Check size={13} /> : `0${index + 1}`}</span>{label}</li>)}</ol>
          <form onSubmit={step < 4 ? continueStep : (event) => event.preventDefault()}>
            {step === 1 && <div className="configure-step-content"><span className="eyebrow muted">01 / Pick a starting point</span><h2>What do you need help with?</h2><div className="configure-service-grid">{services.map((item) => <button type="button" key={item.slug} className={`configure-service-option${serviceSlug === item.slug ? ' selected' : ''}`} onClick={() => selectService(item.slug)} aria-pressed={serviceSlug === item.slug}><span>{item.category}</span><strong>{item.title}</strong></button>)}</div></div>}
            {step === 2 && service && <div className="configure-step-content"><span className="eyebrow muted">02 / {service.shortTitle}</span><h2>Shape the requirements.</h2><div className="configure-field-grid">{serviceFields.map((field) => <fieldset className="configure-field" key={field.key}><legend>{field.label}{field.multiple ? ' · select all that apply' : ''}</legend><div className="configure-choice-list">{field.options.map((option) => {
              const selected = field.multiple ? Array.isArray(answers[field.key]) && (answers[field.key] as string[]).includes(option) : answers[field.key] === option
              return <label className={`configure-choice${selected ? ' selected' : ''}`} key={option}><input type={field.multiple ? 'checkbox' : 'radio'} name={field.key} value={option} checked={Boolean(selected)} onChange={() => updateAnswer(field.key, option, Boolean(field.multiple))} /><span>{option}</span></label>
            })}</div></fieldset>)}</div><label className="configure-notes-label">Anything else about the scope?<textarea rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="A constraint, feature, or question to keep in mind" /></label></div>}
            {step === 3 && <div className="configure-step-content"><span className="eyebrow muted">03 / Timing and contact</span><h2>When, and how can we reach you?</h2><div className="configure-field-grid"><label className="configure-input-label">Preferred timing<select value={timeline} onChange={(event) => setTimeline(event.target.value)}><option>Flexible, to be discussed</option><option>As soon as availability allows</option><option>Within 2–4 weeks</option><option>Within 1–3 months</option><option>Planning for later</option></select></label><label className="configure-input-label">Priority<select value={priority} onChange={(event) => setPriority(event.target.value)}><option>Standard</option><option>Time-sensitive</option><option>Flexible</option></select></label><label className="configure-input-label">Indicative budget range<select value={budget} onChange={(event) => setBudget(event.target.value)}>{budgetOptions.map((item) => <option key={item}>{item}</option>)}</select></label><label className="configure-input-label">Your name<input required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" /></label><label className="configure-input-label">Company <span>(optional)</span><input value={company} onChange={(event) => setCompany(event.target.value)} autoComplete="organization" /></label><label className="configure-input-label">Email <span>(optional if phone is provided)</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" /></label><label className="configure-input-label">Phone or WhatsApp <span>(optional if email is provided)</span><input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" /></label><label className="configure-input-label">Country<input value={country} onChange={(event) => setCountry(event.target.value)} autoComplete="country-name" /></label></div><p className="configure-privacy-note">Your details are only included in the enquiry message you choose to send.</p></div>}
            {step === 4 && <div className="configure-step-content"><span className="eyebrow muted">04 / Check before you send</span><h2>Review your enquiry.</h2><p className="configure-price-note">Price to be confirmed after review. No quotation is calculated from these selections.</p><pre className="configure-summary">{summary}</pre><p className="configure-handoff-note">Your enquiry has not been sent. Choose WhatsApp or email below, then complete the action in that application. The email draft has no recipient prefilled because a public business email has not been provided.</p><div className="configure-handoff-actions"><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Continue on WhatsApp</a><a className="button button-secondary" href={emailUrl}><Send size={15} /> Open email draft</a><button type="button" className="copy-summary" onClick={copySummary} aria-label="Copy enquiry summary"><Copy size={16} />{copied ? 'Copied' : 'Copy summary'}</button></div></div>}
            {error && <p className="configure-error" role="alert">{error}</p>}
            <div className="configure-form-actions">{step > 1 && <button type="button" className="configure-back" onClick={() => { setError(''); setStep((current) => current - 1) }}><ArrowLeft size={15} /> Back</button>}{step < 4 && <button type="submit" className="button button-primary">Continue <ArrowRight size={15} /></button>}</div>
          </form>
        </section>
        <aside className="configure-aside"><span className="eyebrow"><span className="eyebrow-dot" /> Live summary</span><h2>{service?.title ?? 'Your project'}</h2><p>{service?.summary ?? 'Select a service to begin. You can revisit every choice before sending.'}</p><div className="configure-aside-row"><span>Budget</span><strong>{budget}</strong></div><div className="configure-aside-row"><span>Timing / priority</span><strong>{timeline} · {priority}</strong></div><div className="configure-aside-foot">OMR ranges are guidance supplied by you. Final scope and price are confirmed after review.</div><Link to="/services" className="text-link">Browse service details <ArrowRight size={14} /></Link></aside>
      </div>
    </main>
  )
}

export default ConfigurePage