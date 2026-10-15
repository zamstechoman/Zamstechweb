import { useState, type FormEvent } from 'react'
import { ArrowRight, MessageCircle, Send, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getService } from '../data/services'

type Reply = { text: string; serviceSlug?: string }

function recommend(message: string): Reply {
  const query = message.toLowerCase()
  let slug = 'other-technology'
  if (/web|site|website|store|booking/.test(query)) slug = 'web-development'
  else if (/app|application|portal|workflow|software|automation/.test(query)) slug = /android|mobile|phone/.test(query) ? 'android-applications' : /automat|repeat|handoff/.test(query) ? 'workflow-automation' : 'web-applications'
  else if (/host|server|cloud|vps|domain/.test(query)) slug = /vps|server|cloud/.test(query) ? 'vps-cloud' : 'website-hosting'
  else if (/computer|laptop|repair|support|device/.test(query)) slug = 'computer-support'
  else if (/network|wifi|wi-fi|camera|cctv/.test(query)) slug = 'network-cctv'
  else if (/account|invoice|inventory|payroll/.test(query)) slug = 'business-software'
  else if (/maintain|backup|update|security/.test(query)) slug = 'maintenance'
  const service = getService(slug)
  return { text: `A useful place to start may be ${service?.title ?? 'Other Technology Services'}. This is a local suggestion based only on the words you entered; it is not a live or AI-generated assessment.`, serviceSlug: slug }
}

export default function GlobalTools() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [replies, setReplies] = useState<Reply[]>([])

  function send(message: string) {
    if (!message.trim()) return
    setReplies((current) => [...current, recommend(message.trim())])
    setInput('')
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    send(input)
  }

  return <>
    <a className="floating-whatsapp" href="https://wa.me/96878301334?text=Hello%20Amity%20Node%2C%20I%27d%20like%20to%20discuss%20a%20technology%20requirement." target="_blank" rel="noreferrer" aria-label="Contact Amity Node on WhatsApp"><MessageCircle size={19} /><span>WhatsApp</span></a>
    <div className="guide-widget"><button className="guide-toggle" type="button" aria-expanded={open} aria-controls="amity-guide-panel" onClick={() => setOpen((current) => !current)}>{open ? <X size={17} /> : <span className="guide-mark">AN</span>}<span>{open ? 'Close guide' : 'Amity Guide'}</span></button>
      {open && <section className="guide-panel" id="amity-guide-panel" aria-label="Amity Guide"><header><div><strong>Amity Guide</strong><span>Local guided assistant · not live AI</span></div><button type="button" aria-label="Close Amity Guide" onClick={() => setOpen(false)}><X size={16} /></button></header><div className="guide-conversation" aria-live="polite"><p className="guide-message">Hello. Tell me what you are trying to do and I can point you to a service page. I do not access live information or customer records.</p>{replies.map((reply, index) => <div className="guide-reply" key={`${reply.serviceSlug}-${index}`}><p>{reply.text}</p>{reply.serviceSlug && <Link to={`/services/${reply.serviceSlug}`} onClick={() => setOpen(false)}>Explore {getService(reply.serviceSlug)?.shortTitle} <ArrowRight size={13} /></Link>}</div>)}{replies.length === 0 && <div className="guide-suggestions">{['Build or improve a website', 'Set up hosting or cloud', 'Fix a computer or network', 'I am not sure yet'].map((suggestion) => <button type="button" key={suggestion} onClick={() => send(suggestion)}>{suggestion}<ArrowRight size={12} /></button>)}</div>}</div><form className="guide-input" onSubmit={submit}><label className="sr-only" htmlFor="guide-question">Describe what you need</label><input id="guide-question" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Describe what you need" /><button type="submit" aria-label="Get a service suggestion"><Send size={15} /></button></form><div className="guide-shortcuts"><Link to="/configure" onClick={() => setOpen(false)}>Configure a solution</Link><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></div></section>}
    </div>
  </>
}