import { Activity, ArrowDownRight, ArrowUpRight, Bell, Check, ChevronDown, CircleHelp, Grid2X2, LockKeyhole, MapPin, MoreHorizontal, Search, Settings2, ShieldCheck, ShoppingBag, Wifi } from 'lucide-react'

type ProjectMockupProps = {
  visual: string
  title: string
  compact?: boolean
}

function OperationsMockup() {
  return (
    <div className="mockup-frame mockup-ops-frame">
      <header className="mockup-topbar"><span className="mockup-brand"><i /> north / field</span><nav><span>Overview</span><span>Work</span><span>People</span></nav><div className="mockup-user"><Bell size={13} /><i>AM</i></div></header>
      <div className="mockup-app-body"><aside className="mockup-sidebar"><span className="mockup-side-active"><Grid2X2 size={14} /></span><span><Activity size={14} /></span><span><Search size={14} /></span><span><Settings2 size={14} /></span><b>NF</b></aside>
        <div className="mockup-dashboard-content"><div className="mockup-page-title"><div><small>MONDAY, 14 OCTOBER</small><strong>Good morning, team</strong></div><button type="button">This week <ChevronDown size={11} /></button></div>
          <div className="mockup-metric-row"><div><small>Active projects</small><strong>24 <i>+12%</i></strong><span>vs. last month</span></div><div><small>On schedule</small><strong>18 <i>75%</i></strong><span>6 need attention</span></div><div><small>Open tasks</small><strong>36 <i>−8%</i></strong><span>across 8 teams</span></div></div>
          <div className="mockup-dashboard-lower"><section className="mockup-chart-panel"><div><strong>Delivery overview</strong><span>Last 8 weeks <ChevronDown size={10} /></span></div><div className="mockup-chart"><div className="mockup-chart-axis"><i>100</i><i>75</i><i>50</i><i>25</i></div><div className="mockup-chart-bars">{[38, 56, 44, 68, 54, 82, 65, 93].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></div><div className="mockup-chart-legend"><i /> Completed <i /> In progress</div></section>
            <section className="mockup-activity-panel"><strong>Needs attention</strong><span><i className="mockup-alert-dot" /> Supplier review <small>Due today</small></span><span><i /> Site handoff <small>1 day late</small></span><span><i /> Sprint planning <small>Tomorrow</small></span></section></div>
        </div>
      </div>
    </div>
  )
}

function StorefrontMockup() {
  return (
    <div className="mockup-frame mockup-store-frame">
      <header className="store-topbar"><span>FORM / OBJECT</span><nav><span>Objects</span><span>Studio</span><span>Journal</span></nav><span>Bag (0) <ShoppingBag size={13} /></span></header>
      <div className="store-hero"><div className="store-copy"><small>OBJECTS FOR SLOWER LIVING</small><strong>Made to<br />stay.</strong><p>Considered objects for the everyday.</p><span>Explore the collection <ArrowUpRight size={12} /></span></div><div className="store-product"><i /><b /><span /></div><div className="store-product-index">01 / 04</div></div>
      <footer className="store-foot"><span>New collection / 2026</span><span>Designed for everyday use</span><ArrowDownRight size={13} /></footer>
    </div>
  )
}

function FieldworkMockup() {
  return (
    <div className="mockup-phone-scene">
      <div className="mockup-device-back"><span /></div>
      <div className="mockup-phone"><div className="phone-speaker" /><header><span>09:41</span><span><i /><i /><i /></span></header><div className="phone-app-head"><span>FIELD NOTES</span><button type="button" aria-label="More options"><MoreHorizontal size={15} /></button></div><div className="phone-greeting"><small>MONDAY, OCTOBER 14</small><strong>Good morning,<br />Sam.</strong></div><div className="phone-visit-card"><div><span>UP NEXT</span><span className="phone-status">ON SITE</span></div><strong>Al Khuwair / Unit 08</strong><small><MapPin size={11} /> Muscat · 10:30 AM</small></div><div className="phone-section-head"><strong>Recent notes</strong><span>See all</span></div><div className="phone-note"><i>01</i><span>Cooling system check<small>Saved 8:42 AM</small></span><Check size={13} /></div><div className="phone-note"><i>02</i><span>Access panel review<small>Yesterday</small></span><ArrowUpRight size={13} /></div><button type="button" className="phone-add"><span>+</span> Capture a site note</button><div className="phone-home-indicator" /></div>
      <div className="phone-float-label"><span>FIELD / 01</span><strong>Capture. Review. Follow through.</strong></div>
    </div>
  )
}

function NetworkMockup() {
  return (
    <div className="mockup-frame mockup-network-frame">
      <header className="network-topbar"><span className="mockup-brand"><i /> SIGNAL / MAP</span><span><i className="network-live-dot" /> LOCAL CONCEPT</span><button type="button" aria-label="Network options"><MoreHorizontal size={15} /></button></header>
      <div className="network-layout"><aside className="network-rail"><span className="active"><Grid2X2 size={14} /></span><span><Wifi size={14} /></span><span><ShieldCheck size={14} /></span><span><Settings2 size={14} /></span></aside><div className="network-canvas"><div className="network-map-heading"><div><small>OVERVIEW / ALL LOCATIONS</small><strong>Network health</strong></div><span>Updated just now <i /></span></div>
          <div className="network-topology"><div className="network-link network-link-a" /><div className="network-link network-link-b" /><div className="network-link network-link-c" /><div className="network-link network-link-d" /><div className="network-node network-gateway"><span><Wifi size={15} /></span><small>Gateway</small><b>Online</b></div><div className="network-node network-camera"><span><Activity size={14} /></span><small>Camera 04</small><b>Stable</b></div><div className="network-node network-office"><span><Grid2X2 size={14} /></span><small>Office AP</small><b>Online</b></div><div className="network-node network-workstation"><span><LockKeyhole size={14} /></span><small>Workstation</small><b>Protected</b></div></div>
          <footer className="network-status"><span><i /> 12 devices</span><span><i /> 4 connections</span><span><CircleHelp size={12} /> Concept view</span></footer>
        </div></div>
    </div>
  )
}

export default function ProjectMockup({ visual, title, compact = false }: ProjectMockupProps) {
  const preview = visual === 'ops' ? <OperationsMockup /> : visual === 'web' ? <StorefrontMockup /> : visual === 'mobile' ? <FieldworkMockup /> : <NetworkMockup />

  return (
    <div className={`project-mockup project-mockup-${visual}${compact ? ' is-compact' : ''}`} role="img" aria-label={`${title}, fictional product interface concept`}>
      {preview}
      <span className="mockup-concept-stamp">DESIGN STUDY / NOT A LIVE PRODUCT</span>
    </div>
  )
}
