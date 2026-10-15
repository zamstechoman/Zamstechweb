export type Project = {
  slug: string
  title: string
  category: string
  summary: string
  objective: string
  approach: string
  details: string[]
  visual: string
}

export const projects: Project[] = [
  {
    slug: 'northfield-operations',
    title: 'Operations, in focus',
    category: 'Business software',
    summary: 'A calmer interface concept for everyday team coordination.',
    objective: 'Explore how a small operations team could review active work, see priorities, and spot handoffs without navigating a dense collection of spreadsheets.',
    approach: 'The concept uses a compact overview, clear status language, and a consistent data hierarchy. It is a design study, not a commissioned or deployed product.',
    details: ['Dashboard information architecture', 'Responsive operations overview', 'Work queue and status patterns'],
    visual: 'ops',
  },
  {
    slug: 'form-object-storefront',
    title: 'Commerce with character',
    category: 'Web design',
    summary: 'A storefront direction that gives a considered product room to speak.',
    objective: 'Show how an editorial product story can coexist with an easy path to browse and purchase.',
    approach: 'A restrained navigation, generous product imagery, and direct calls to action create a simple concept storefront. Product and brand are fictional and shown for design exploration only.',
    details: ['Responsive storefront direction', 'Product discovery layout', 'Editorial content hierarchy'],
    visual: 'web',
  },
  {
    slug: 'field-notes-mobile',
    title: 'Field notes, together',
    category: 'Mobile applications',
    summary: 'A mobile workflow concept for capturing structured site observations.',
    objective: 'Explore a low-friction way for field teams to record visit notes and make follow-up actions visible.',
    approach: 'The concept prioritizes a short capture flow, readable status, and a review queue. It does not connect to a real service or store submitted data.',
    details: ['Mobile-first task flow', 'Structured note capture', 'Offline-state design exploration'],
    visual: 'mobile',
  },
  {
    slug: 'signal-network-map',
    title: 'Signal, mapped',
    category: 'Networks & infrastructure',
    summary: 'A visual study for making a small network easier to understand.',
    objective: 'Consider how a network overview could make devices, connections, and attention areas easier to scan.',
    approach: 'The visual uses a simple node map and restrained status cues. It is an interface concept and does not inspect or represent a real network.',
    details: ['Network overview concept', 'Connection and device hierarchy', 'Status indicator exploration'],
    visual: 'network',
  },
]

export type Article = {
  slug: string
  title: string
  category: string
  summary: string
  updated: string
  sections: { heading: string; paragraphs: string[] }[]
}

export const articles: Article[] = [
  {
    slug: 'choosing-business-hosting',
    title: 'Choosing website hosting: the questions that matter first',
    category: 'Hosting & cloud',
    summary: 'A practical checklist for comparing hosting around workload, backups, support, and ownership.',
    updated: '2026-10-15',
    sections: [
      { heading: 'Start with the site you have', paragraphs: ['Before comparing plans, write down what the site runs on, how much storage it uses, and whether it sends business email. A simple brochure site and a data-heavy application have different needs.', 'Check who controls the domain, hosting account, and DNS. Clear ownership makes future changes and recovery much easier.'] },
      { heading: 'Ask what is included', paragraphs: ['Compare backup frequency, retention, restore support, security updates, and the route to technical help. A low headline price can leave important operational work with your team.', 'For email, confirm whether mailboxes, storage, spam controls, and migration assistance are included. Website hosting and business email may be separate products.'] },
      { heading: 'Plan for a safe move', paragraphs: ['A migration should include a backup, a test of the moved site, a DNS plan, and time to confirm that forms and email still work. Keep the previous service available until the new setup is verified.', 'There is no universal best hosting provider. Match the service to the site, the support you need, and the person responsible for maintaining it.'] },
    ],
  },
  {
    slug: 'website-or-web-application',
    title: 'When does a website need to become a web application?',
    category: 'Web development',
    summary: 'Recognize when a workflow needs more than another page or form.',
    updated: '2026-10-15',
    sections: [
      { heading: 'Information or interaction?', paragraphs: ['A website is often the right tool when the main job is to explain a service, publish information, and help a visitor take a clear next step.', 'An application becomes useful when people need to work with changing information: submitting records, tracking progress, reviewing approvals, or using different roles.'] },
      { heading: 'Look for repeated workarounds', paragraphs: ['Spreadsheets sent between teams, copied information, and manual status messages can signal a workflow problem. They do not automatically mean custom software is needed; first understand why the workarounds exist.', 'Check whether an existing product can support the process. Custom development brings responsibility for testing, security, maintenance, and support as well as flexibility.'] },
      { heading: 'Define a small first release', paragraphs: ['Map the users, information, decisions, and exceptions. Then identify the smallest useful workflow that can be tested with real users.', 'A clear scope makes it possible to compare an application with process changes or existing software before committing to a larger build.'] },
    ],
  },
  {
    slug: 'wifi-troubleshooting-basics',
    title: 'Wi-Fi troubleshooting: a measured first check',
    category: 'Networks & devices',
    summary: 'A safe way to narrow down common connection problems before changing network settings.',
    updated: '2026-10-15',
    sections: [
      { heading: 'Check whether the issue is local', paragraphs: ['Test another device in the same place and the affected device in another location. This helps separate a device issue from a coverage or service issue.', 'Note when the problem occurs and whether it affects one room, one device, or every connected device. That detail is more useful than repeatedly restarting equipment without a pattern.'] },
      { heading: 'Check the simple causes', paragraphs: ['Confirm that Wi-Fi is enabled, airplane mode is off, and the device is connected to the expected network. If only one service or website fails, the wireless connection may not be the cause.', 'If you control the router, check its status lights and provider outage information. Avoid factory resets unless you have the configuration details needed to restore the network.'] },
      { heading: 'When to ask for help', paragraphs: ['Persistent dead zones, frequent drops across devices, unknown network equipment, or a business network with cameras and wired devices may need a site-specific assessment.', 'Keep the router model and a short record of symptoms available. Never share Wi-Fi passwords publicly or with an unverified support contact.'] },
    ],
  },
]