import type { Service } from '../data/services'

function Motif({ motif }: { motif: string }) {
  switch (motif) {
    case 'web':
      return <div className="motif-browser"><i /><i /><i /><span className="browser-sidebar" /><b /><em /><strong /></div>
    case 'modules':
      return <div className="motif-modules"><span>01</span><span>02</span><span>03</span><b>API</b><i>DATA</i><em>UI</em></div>
    case 'mobile':
      return <div className="motif-phone"><span /><b /><i /><em /><strong /></div>
    case 'hosting':
      return <div className="motif-rack"><span><i /><b /></span><span><i /><b /></span><span><i /><b /></span><em>HOST / 03</em></div>
    case 'cloud':
      return <div className="motif-cloud"><span /><b /><i /><em>CPU&nbsp; / &nbsp;RAM&nbsp; / &nbsp;IO</em></div>
    case 'repair':
      return <div className="motif-device"><span><i /><b /></span><em /><strong>DIAG / 01</strong></div>
    case 'network':
      return <div className="motif-network"><span className="network-center">LAN</span><i /><i /><i /><i /><b /><b /><b /><b /></div>
    case 'ledger':
      return <div className="motif-ledger"><span>SUMMARY</span><i /><i /><i /><b /><b /><b /><em>TOTAL&nbsp; / &nbsp;OMR</em></div>
    case 'flow':
      return <div className="motif-flow"><span>INPUT</span><i /><b>RULE</b><i /><em>OUTPUT</em><strong>↗</strong></div>
    case 'maintenance':
      return <div className="motif-maintenance"><span>CHECK / 01</span><i /><i /><i /><b>✓</b><em>READY</em></div>
    default:
      return <div className="motif-signal"><span /><i /><b /><em>OPEN CHANNEL</em></div>
  }
}

export default function ServiceArtwork({ service, compact = false }: { service: Service; compact?: boolean }) {
  const Icon = service.icon

  return (
    <div className={`service-artwork artwork-${service.motif} accent-${service.accent}${compact ? ' is-compact' : ''}`} aria-hidden="true">
      <div className="artwork-grain" />
      <div className="artwork-coordinate">AN / {String(Number.parseInt(service.slug, 10) || service.slug.length).padStart(2, '0')}</div>
      <Motif motif={service.motif} />
      <span className="artwork-icon"><Icon size={16} strokeWidth={1.5} /></span>
      {!compact && <span className="artwork-caption">{service.category}</span>}
    </div>
  )
}