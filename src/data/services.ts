import type { LucideIcon } from 'lucide-react'
import {
  AppWindow,
  Camera,
  CloudCog,
  CodeXml,
  Cpu,
  Globe2,
  Layers3,
  Laptop,
  Network,
  Workflow,
  Wrench,
} from 'lucide-react'

export interface ServiceFaq {
  question: string
  answer: string
}

export interface Service {
  slug: string
  title: string
  shortTitle: string
  summary: string
  description: string
  category: string
  useCases: string[]
  challenges: string[]
  included: string[]
  options: string[]
  workflow: { title: string; description: string }[]
  faqs: ServiceFaq[]
  related: string[]
  icon: LucideIcon
  motif: string
  accent: string
}

export const services: Service[] = [
  {
    slug: 'web-development',
    title: 'Website Design & Development',
    shortTitle: 'Websites & digital experiences',
    summary: 'Clear, considered websites built around your customers and the way your team works.',
    description: 'Create a confident first impression and make it easier for people to understand what you offer. From a focused company site to a richer digital experience, the work starts with your audience and the job the website needs to do.',
    category: 'Digital experiences',
    useCases: ['Company websites', 'Service and product pages', 'Bookings and enquiries'],
    challenges: ['Visitors cannot quickly understand your offer.', 'Your current site is hard to use on phones.', 'The design no longer reflects your business.'],
    included: ['Project discovery and page planning', 'Responsive interface design', 'Front-end development and content integration', 'Launch checks and handover'],
    options: ['New website or redesign', 'Landing pages or multi-page site', 'Content management needs', 'Forms, booking, or commerce integrations', 'Domain and hosting coordination'],
    workflow: [
      { title: 'Plan the experience', description: 'Agree on the audience, key actions, content, and page structure.' },
      { title: 'Design and build', description: 'Shape the interface, implement the pages, and connect agreed features.' },
      { title: 'Review and launch', description: 'Check the experience across devices, prepare the handover, and coordinate launch.' },
    ],
    faqs: [
      { question: 'Can you refresh an existing website?', answer: 'Yes. We can review what is working, identify the friction, and scope a redesign or a more focused set of improvements.' },
      { question: 'Do I need to provide the website content?', answer: 'You can provide finished content, rough notes, or existing material. Content support can be discussed during project scoping.' },
    ],
    related: ['website-hosting', 'web-applications', 'maintenance'],
    icon: Globe2,
    motif: 'web',
    accent: 'mint',
  },
  {
    slug: 'web-applications',
    title: 'Web Applications',
    shortTitle: 'Web applications',
    summary: 'Purpose-built browser software for the workflows a standard website cannot handle.',
    description: 'When information, people, and business processes need to work together, a web application can give them one clear place to do it. We help define the workflow, shape the interface, and plan the right integrations and deployment approach.',
    category: 'Software & systems',
    useCases: ['Internal team tools', 'Customer or partner portals', 'Workflow and reporting systems'],
    challenges: ['Teams repeat the same manual steps.', 'Information is scattered across tools and files.', 'Off-the-shelf systems do not fit the workflow.'],
    included: ['Workflow discovery and feature definition', 'Interface and user-flow planning', 'Application development scope', 'Integration and deployment planning'],
    options: ['User roles and access levels', 'Data entry and approval flows', 'Dashboards and reporting', 'Third-party integrations', 'Cloud or on-premise deployment discussion'],
    workflow: [
      { title: 'Map the workflow', description: 'Understand users, information, decisions, and current workarounds.' },
      { title: 'Define a first release', description: 'Prioritize useful modules and establish the right technical approach.' },
      { title: 'Build in clear steps', description: 'Develop, test, review, and refine the application with regular feedback.' },
    ],
    faqs: [
      { question: 'How is a web application different from a website?', answer: 'A website primarily presents information. A web application adds interactive workflows, data, or tools that people use to complete tasks.' },
      { question: 'Can it connect with software we already use?', answer: 'Integration depends on the other system’s available interfaces and access. We assess that during discovery before confirming scope.' },
    ],
    related: ['web-development', 'business-software', 'workflow-automation'],
    icon: AppWindow,
    motif: 'modules',
    accent: 'blue',
  },
  {
    slug: 'android-applications',
    title: 'Android Applications',
    shortTitle: 'Android applications',
    summary: 'Mobile experiences designed for the people, devices, and moments that matter.',
    description: 'Plan an Android application around a clear use case, from a focused utility to a connected business tool. We help shape the screens, capabilities, device expectations, and any backend services the experience may require.',
    category: 'Mobile products',
    useCases: ['Field and service teams', 'Customer-facing utilities', 'Companion apps for existing systems'],
    challenges: ['A mobile workflow needs to work away from a desk.', 'Customers need a direct, focused mobile experience.', 'An existing process needs device features or notifications.'],
    included: ['Use-case and screen planning', 'Mobile interface design', 'Feature and device requirements', 'Testing and release planning'],
    options: ['Offline or low-connectivity behavior', 'Push notifications', 'Camera, location, or file access', 'Backend and API requirements', 'Device and Android version support'],
    workflow: [
      { title: 'Set the mobile use case', description: 'Identify users, moments of use, connectivity, and essential tasks.' },
      { title: 'Shape the screens', description: 'Plan navigation, interface states, and the first useful feature set.' },
      { title: 'Test on devices', description: 'Review behavior across agreed devices and prepare a release handover.' },
    ],
    faqs: [
      { question: 'Can the application work without an internet connection?', answer: 'Offline support can be planned where it suits the workflow. The data that needs to be available and synchronized must be defined first.' },
      { question: 'Can an app connect to our website or business software?', answer: 'Often, if the existing platform supports a suitable integration. We review the available interfaces and security needs during planning.' },
    ],
    related: ['web-applications', 'workflow-automation', 'business-software'],
    icon: Cpu,
    motif: 'mobile',
    accent: 'violet',
  },
  {
    slug: 'website-hosting',
    title: 'Website Hosting',
    shortTitle: 'Website hosting',
    summary: 'Hosting plans and setup guided by your site, traffic, email, backup, and support needs.',
    description: 'Reliable hosting is about more than a server location. We help match a hosting setup to the size and needs of your website, understand what is included, and coordinate the move or setup with care.',
    category: 'Hosting & infrastructure',
    useCases: ['New website launches', 'Hosting moves and renewals', 'Business email and backups'],
    challenges: ['You are unsure what your current hosting includes.', 'A website needs a more suitable home.', 'Backups or support expectations are unclear.'],
    included: ['Website and hosting requirements review', 'Hosting option comparison', 'DNS and migration coordination', 'Basic launch and availability checks'],
    options: ['Number of sites and expected traffic', 'Storage and email needs', 'Backup frequency and retention', 'Managed support expectations', 'Domain and DNS coordination'],
    workflow: [
      { title: 'Review what you have', description: 'Check the website, domain, email, traffic, storage, and backup requirements.' },
      { title: 'Choose a suitable setup', description: 'Compare practical hosting options and clarify what each provider includes.' },
      { title: 'Move with a plan', description: 'Coordinate files, DNS, testing, and handover to reduce avoidable disruption.' },
    ],
    faqs: [
      { question: 'Can you move my existing website?', answer: 'Migration can be arranged after reviewing the site, its platform, email dependencies, and access to the current host.' },
      { question: 'Is email included with hosting?', answer: 'It depends on the chosen provider and plan. Email requirements are checked separately so the right option can be selected.' },
    ],
    related: ['vps-cloud', 'web-development', 'maintenance'],
    icon: CloudCog,
    motif: 'hosting',
    accent: 'blue',
  },
  {
    slug: 'vps-cloud',
    title: 'VPS & Cloud Solutions',
    shortTitle: 'VPS & cloud solutions',
    summary: 'Right-sized virtual infrastructure with clear choices around resources and administration.',
    description: 'For applications and workloads that need more control than shared hosting, a virtual server or cloud environment may be a better fit. We help make the requirements and operating responsibilities clear before a setup is selected.',
    category: 'Hosting & infrastructure',
    useCases: ['Application hosting', 'Development and test environments', 'Workloads needing server control'],
    challenges: ['An application needs a configurable environment.', 'Resource needs are unclear or changing.', 'Server security and maintenance ownership are undefined.'],
    included: ['Workload and resource review', 'Operating system and deployment discussion', 'Backup and access planning', 'Administration scope clarification'],
    options: ['CPU, memory, and storage sizing', 'Linux or Windows environment', 'Managed or self-managed responsibilities', 'Backup, monitoring, and recovery needs', 'Security and network controls'],
    workflow: [
      { title: 'Describe the workload', description: 'Review application behavior, usage, data, availability, and growth expectations.' },
      { title: 'Plan resources and access', description: 'Select a suitable environment and make administration responsibilities explicit.' },
      { title: 'Configure and review', description: 'Set up the agreed environment, test access, and document the handover.' },
    ],
    faqs: [
      { question: 'Should I choose a VPS or managed cloud service?', answer: 'The best fit depends on workload, scale, availability, and who will administer the environment. Those needs should guide the comparison.' },
      { question: 'Do you provide ongoing server administration?', answer: 'Administration, monitoring, and maintenance can be scoped separately according to the environment and support expectations.' },
    ],
    related: ['website-hosting', 'maintenance', 'web-applications'],
    icon: Layers3,
    motif: 'cloud',
    accent: 'mint',
  },
  {
    slug: 'computer-support',
    title: 'Computer Repairs & Technical Support',
    shortTitle: 'Computer repairs & IT support',
    summary: 'Practical help for computer problems, software setup, and day-to-day technical issues.',
    description: 'When a computer interrupts the workday, clear diagnosis comes first. Get help understanding the issue, deciding what can be repaired, and setting up devices and software for the people who rely on them.',
    category: 'Devices & support',
    useCases: ['Laptop and desktop troubleshooting', 'Software and operating system support', 'Device setup and maintenance'],
    challenges: ['A computer is slow, unstable, or not starting.', 'A device needs setup or software support.', 'The cause of a recurring technical issue is unclear.'],
    included: ['Issue and device assessment', 'Troubleshooting and next-step advice', 'Agreed repair or setup work', 'Basic service summary'],
    options: ['Desktop, laptop, or other device', 'Hardware or software issue', 'Remote assessment or on-site visit', 'Single device or small fleet', 'Urgency and availability'],
    workflow: [
      { title: 'Describe the issue', description: 'Share the device, symptoms, recent changes, and how urgently it affects your work.' },
      { title: 'Assess the cause', description: 'Agree on a suitable diagnostic approach and any access or visit requirements.' },
      { title: 'Resolve or advise', description: 'Carry out the agreed work or explain the practical repair and replacement options.' },
    ],
    faqs: [
      { question: 'Can you help remotely?', answer: 'Some software and configuration issues can be assessed remotely, subject to a suitable connection and your approval.' },
      { question: 'Can you guarantee a repair before inspecting the device?', answer: 'No. The cause and parts requirements often need assessment first. Any repair scope is confirmed after diagnosis.' },
    ],
    related: ['network-cctv', 'business-software', 'maintenance'],
    icon: Laptop,
    motif: 'repair',
    accent: 'coral',
  },
  {
    slug: 'network-cctv',
    title: 'Network Configuration & CCTV',
    shortTitle: 'Networks & CCTV',
    summary: 'Plan and troubleshoot the connectivity, coverage, and camera setup your site requires.',
    description: 'A dependable network starts with understanding the site and how people use it. We can assess Wi-Fi coverage, connected equipment, cabling, and CCTV requirements before recommending an installation or troubleshooting scope.',
    category: 'Networks & security',
    useCases: ['Office Wi-Fi and LAN setup', 'Network troubleshooting', 'CCTV planning and configuration'],
    challenges: ['Wi-Fi coverage drops in important areas.', 'Devices or cameras are not communicating reliably.', 'A new site needs a network and cabling plan.'],
    included: ['Site and connectivity requirements review', 'Device and coverage planning', 'Configuration or troubleshooting scope', 'Testing and setup handover'],
    options: ['Site type and number of users', 'Wi-Fi coverage and access points', 'Cabling and network equipment', 'Camera count and placement needs', 'On-site assessment and installation'],
    workflow: [
      { title: 'Understand the site', description: 'Map spaces, users, equipment, coverage gaps, and any installation constraints.' },
      { title: 'Plan the connections', description: 'Agree on network, Wi-Fi, cabling, or camera requirements for the location.' },
      { title: 'Configure and test', description: 'Complete the agreed setup, check coverage and connectivity, and hand over the details.' },
    ],
    faqs: [
      { question: 'Do you need to visit the site?', answer: 'Some troubleshooting can begin remotely, but coverage planning and physical installations often need an on-site assessment.' },
      { question: 'Can you add cameras to an existing system?', answer: 'Possibly. The current recorder, camera compatibility, wiring, and network capacity need to be checked first.' },
    ],
    related: ['computer-support', 'vps-cloud', 'maintenance'],
    icon: Camera,
    motif: 'network',
    accent: 'violet',
  },
  {
    slug: 'business-software',
    title: 'Business Software & Accounting Solutions',
    shortTitle: 'Business & accounting software',
    summary: 'Choose and configure business tools around your finance, inventory, and reporting needs.',
    description: 'Business software should support the way information moves through your organization. We help clarify requirements across accounting, invoicing, inventory, payroll, and reporting, then scope a suitable configuration or customization approach.',
    category: 'Software & systems',
    useCases: ['Accounting and invoicing', 'Inventory and order workflows', 'Business reporting and payroll needs'],
    challenges: ['Records are duplicated across spreadsheets and systems.', 'A team cannot see useful operational information.', 'Existing software needs configuration or migration.'],
    included: ['Requirements and user review', 'Module and workflow mapping', 'Configuration or customization scoping', 'Data migration and training discussion'],
    options: ['Accounting, invoicing, and tax workflows', 'Inventory and purchasing', 'Payroll and employee records', 'User roles and reporting', 'Existing software and data migration'],
    workflow: [
      { title: 'Map the business needs', description: 'Document users, current tools, information, reporting, and pain points.' },
      { title: 'Compare workable options', description: 'Review suitable products or customization paths against the requirements.' },
      { title: 'Configure for adoption', description: 'Plan setup, data transfer, training, and a measured rollout.' },
    ],
    faqs: [
      { question: 'Do you provide accounting or tax advice?', answer: 'No. Software setup can support your processes, but accounting and tax decisions should be confirmed with a qualified professional.' },
      { question: 'Can existing records be migrated?', answer: 'Migration feasibility depends on the source format, data quality, target system, and any cleanup required. It is assessed before scope is agreed.' },
    ],
    related: ['web-applications', 'workflow-automation', 'computer-support'],
    icon: CodeXml,
    motif: 'ledger',
    accent: 'mint',
  },
  {
    slug: 'workflow-automation',
    title: 'Automation & Digital Workflows',
    shortTitle: 'Automation & workflows',
    summary: 'Reduce repeat work by connecting tools and clarifying the handoffs between them.',
    description: 'Small repetitive tasks add up. We look at how work currently moves between people and applications, then identify practical opportunities for automation that stay understandable and maintainable.',
    category: 'Connected operations',
    useCases: ['Form-to-system data handoffs', 'Notifications and approval flows', 'Recurring reports and task creation'],
    challenges: ['The same information is entered more than once.', 'Important handoffs rely on reminders or manual checks.', 'A recurring task consumes time without adding value.'],
    included: ['Workflow and tool discovery', 'Automation opportunity mapping', 'Integration and exception planning', 'Testing and handover notes'],
    options: ['Current workflow and task frequency', 'Applications and available integrations', 'Approval and exception handling', 'Data sensitivity and access requirements', 'Desired outcome and success criteria'],
    workflow: [
      { title: 'Trace the current process', description: 'Capture each step, handoff, tool, exception, and repeated action.' },
      { title: 'Choose a useful improvement', description: 'Prioritize changes that reduce effort without hiding important decisions.' },
      { title: 'Test and document', description: 'Check normal and exception cases, then explain how the workflow operates.' },
    ],
    faqs: [
      { question: 'Can you automate between the tools we already use?', answer: 'It depends on available integrations, permissions, and data formats. We check these constraints before recommending an approach.' },
      { question: 'Will an automated workflow run without oversight?', answer: 'Some steps can be automated, but approvals, exceptions, and failure notifications should be designed into the workflow where appropriate.' },
    ],
    related: ['web-applications', 'business-software', 'maintenance'],
    icon: Workflow,
    motif: 'flow',
    accent: 'blue',
  },
  {
    slug: 'maintenance',
    title: 'Website & Software Maintenance',
    shortTitle: 'Website & software maintenance',
    summary: 'Keep websites and software supported with a clear, agreed maintenance scope.',
    description: 'Digital systems need ongoing attention as dependencies change, content evolves, and new issues appear. Maintenance can be scoped around the platform, update cadence, backup needs, and the support level that makes sense for your team.',
    category: 'Care & continuity',
    useCases: ['Website updates and checks', 'Software maintenance planning', 'Backup and security routines'],
    challenges: ['Updates and backups happen inconsistently.', 'Small issues accumulate without an owner.', 'Support expectations are unclear when something breaks.'],
    included: ['Platform and dependency review', 'Maintenance scope and cadence planning', 'Backup and update requirements', 'Issue escalation and support expectations'],
    options: ['Website or software platform', 'Monthly or scheduled maintenance', 'Backup and recovery needs', 'Security update expectations', 'Response and support level'],
    workflow: [
      { title: 'Review the current setup', description: 'Understand the platform, access, update state, backups, and known issues.' },
      { title: 'Agree the care plan', description: 'Define routine tasks, support boundaries, communication, and escalation.' },
      { title: 'Maintain and report', description: 'Complete the agreed checks and surface findings or follow-up work clearly.' },
    ],
    faqs: [
      { question: 'Does maintenance include feature development?', answer: 'Not automatically. New features and larger changes are scoped separately so the ongoing care work remains clear.' },
      { question: 'Can you maintain a site built by someone else?', answer: 'Usually after a review of the platform, code, access, hosting, and documentation. The review establishes what can be supported.' },
    ],
    related: ['website-hosting', 'vps-cloud', 'web-development'],
    icon: Wrench,
    motif: 'maintenance',
    accent: 'coral',
  },
  {
    slug: 'other-technology',
    title: 'Other Technology Services',
    shortTitle: 'Other technology services',
    summary: 'Have a technology need that does not fit a category? Start with the problem and we will scope it.',
    description: 'Not every requirement fits neatly into a service list. Tell us what you are trying to achieve, what you have already tried, and who is involved. We can help clarify the need and whether it is a good fit for a conversation.',
    category: 'Let’s work it out',
    useCases: ['Technology assessments', 'Unusual integrations or setup', 'Early-stage solution planning'],
    challenges: ['You know the problem but not the right category.', 'Several technology needs overlap.', 'You need help defining a useful first step.'],
    included: ['Initial requirements conversation', 'Problem and constraint clarification', 'Relevant capability review', 'Practical next-step recommendation'],
    options: ['Your goal and current setup', 'People and locations involved', 'Constraints or dependencies', 'Preferred consultation method', 'Any reference materials you can share'],
    workflow: [
      { title: 'Tell us what is happening', description: 'Describe the outcome you want and the friction you are experiencing.' },
      { title: 'Explore possible approaches', description: 'Clarify requirements, dependencies, and which capabilities may be relevant.' },
      { title: 'Decide the next step', description: 'Confirm whether to scope a project, arrange a consultation, or point you elsewhere.' },
    ],
    faqs: [
      { question: 'What if my request is outside your services?', answer: 'We will be direct about fit. If we cannot help, we will say so rather than promise a solution we cannot deliver.' },
      { question: 'Do I need a detailed specification before contacting you?', answer: 'No. A short description of the problem and the result you are looking for is a useful place to start.' },
    ],
    related: ['web-development', 'computer-support', 'workflow-automation'],
    icon: Network,
    motif: 'signal',
    accent: 'violet',
  },
]

export function getService(slug: string | undefined) {
  return services.find((service) => service.slug === slug)
}