// Update this once a custom domain is live — every canonical URL, sitemap
// entry, and Open Graph image resolves against it.
export const siteUrl = "https://dangchau-portfolio-2026.vercel.app";

export const identity = {
  name: "Chau Ngoc Buu Dang",
  location: "Ho Chi Minh City, Vietnam",
  email: "work.dangchau2003@gmail.com",
  phone: "(+84) 917 192 680",
  linkedin: "https://linkedin.com/in/dangchau2003",
  heroEyebrow: "Associate Technical Product Manager",
  heroHeadline: "Associate Product Manager",
  heroSubhead:
    "I help companies ship the right product on time — without wasting resources on unclear requirements.",
};

export const narrative = [
  "I joined Cake by VPBank as a BA Intern on the KYC & Digital Onboarding team, translating State Bank of Vietnam regulatory constraints into specs that Compliance, Legal, Engineering, and Design could all build against.",
  "That work led to a promotion to Associate Technical Product Manager, where my scope grew to owning the CTicket Platform's entire product surface - specs, Figma mockups, GA4 event tracking, and roadmap trade-offs made in real time during high-stakes on-sales.",
];

export const education = {
  school: "University of Information Technology - VNU-HCM",
  studentId: "21521918",
  degree: "BSc in E-Commerce",
  period: "2021-2025",
  gpa: "8.83/10",
  thesis: "Senior Thesis: 9.7/10",
  ielts: "IELTS 6.5",
};

export const publication = {
  title: "Co-authored AI-personalisation research",
  venue: "Future Data & Security Engineering 2024 (Springer LNCS)",
  url: "https://link.springer.com/chapter/10.1007/978-981-96-0437-1_19",
};

export type Honor = {
  title: string;
  org: string;
  date: string;
  detail?: string;
  url?: string;
};

export const honors: Honor[] = [
  {
    title: "Winner at Advanced Information Systems Contest - AISC2023",
    org: "Faculty of Information Systems, University of Information Technology, VNU-HCM",
    date: "Jan 2023",
    url: "https://tuyensinh.uit.edu.vn/chung-ket-aisc-2023-giai-nhat-cuoc-thi-goi-ten-doi-double-kill-va-findy",
  },
];

export const skills = {
  methods: [
    "Backlog & sprint management",
    "Spec authoring (user stories, AC, mockups, workflows, business rules)",
    "UAT & feature acceptance",
    "Roadmap prioritisation & trade-off",
    "Funnel & cohort analysis",
    "Event tracking spec authoring",
    "AI-assisted spec drafting & prototyping",
  ],
  tools: ["Jira", "Confluence", "Figma", "Postman", "Notion", "GA4", "GTM", "SQL", "Git", "Claude", "Copilot"],
  languages: ["Vietnamese (native)", "English (IELTS 6.5)"],
};

export type Metric = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  targetPercent?: number;
  description?: string;
};

export type Partner = {
  name: string;
  logo?: { src: string; width: number; height: number; alt: string };
  /** Show the name next to the logo — for icon-only marks that don't spell the name themselves. */
  showName?: boolean;
};

export type Experience = {
  slug: string;
  company: string;
  /** Single-letter initial chip shown before the company name. Omit for non-employer entries. */
  mark?: string;
  /** Logo image shown before the company name instead of `mark`. */
  markImage?: { src: string; width: number; height: number; alt: string };
  title: string;
  period: string;
  role: string;
  summary: string;
  /** External companies/platforms integrated with — rendered as a scannable badge row for PO/integration-scope searches. */
  partners?: Partner[];
  highlights: string[];
  links?: { label: string; url: string }[];
  metrics: Metric[];
};

export const experience: Experience[] = [
  {
    slug: "cticket-platform",
    company: "Cake by VPBank",
    mark: "C",
    markImage: { src: "/images/cake-logo.png", width: 2291, height: 610, alt: "Cake by VPBank logo" },
    title: "CTicket Platform",
    period: "Mar 2025 - Present",
    role: "Associate Technical Product Manager (promoted from BA Intern)",
    summary:
      "**Sole Product Owner** of a 7-engineer Agile squad with no BA layer - spec directly against engineering, data models, and compliance, and own every roadmap trade-off end to end.",
    partners: [
      { name: "Cake", logo: { src: "/images/cake-logo.png", width: 2291, height: 610, alt: "Cake by VPBank" } },
      { name: "VPBank", logo: { src: "/images/vpbank-logo.svg", width: 706, height: 160, alt: "VPBank" } },
      {
        name: "OPES",
        logo: { src: "/images/opes-logo.png", width: 248, height: 242, alt: "OPES" },
        showName: true,
      },
      {
        name: "VinWonders (8Wonder)",
        logo: { src: "/images/vinwonders-logo.png", width: 122, height: 32, alt: "VinWonders" },
      },
      { name: "Xendit", logo: { src: "/images/xendit-logo.svg", width: 121, height: 37, alt: "Xendit" } },
    ],
    highlights: [
      "Led a **7-engineer** Agile squad to **238 bn VND GMV** (**159%** of annual target), **8 bn+ VND revenue**, **~99k accounts**, **30+ features** across **96 events** and **52 partners** with **zero critical post-release incidents**.",
      "Authored specs, Figma mockups, workflows, and business rules end-to-end across a multi-surface product suite — [consumer ticketing web](https://cticket.vn/), a partner-facing SDK embedded in Cake's banking super-app whose **merchant integration contract** I owned, a [mobile check-in app](https://play.google.com/store/apps/details?id=vn.cake.ticket&hl=vi&pli=1) (App Store + Play Store), and a role-based admin portal — with the check-in app clearing **97.5%** of **81,534** tickets across two nights.",
      "Built **GA4/GTM event tracking** and BI-partnered **KPI dashboards** from scratch, covering revenue, funnel conversion, and partner performance.",
      "Re-prioritized the roadmap in real time — **BigBang World Tour** Vietnam leg (peak **2.16M requests/min**, **126K** concurrent in queue), **The Spark K-Star** (sold out in 1 week), **T1 Vietnam Fanmeeting**, and the **VPBank International Marathon**.",
      "Owned the **CTicket x OPES ticket-cancellation insurance partnership** end-to-end — PRD, eligibility rules, and the OPES API integration contract — aligning Compliance, Marketing, and Engineering to ship it.",
      "Drove the **CTicket x 8Wonder (VinWonders) real-time inventory integration** — CTicket's first external-provider integration — authoring the PRD and API contract (token, lock-slot, rate-service, and booking-confirmation flows against VinWonders' OTA API) so events sell from a single shared stock pool across channels with no overselling.",
      "Designed and shipped **Group Buy** (leader/member registration, per-member sub-order ticket assignment) as a new purchase path for event-organizer partnerships, launching first for the VPBank International Marathon.",
      "Integrated dual **payment gateways** into CTicket checkout — Cake's own rails for Visa/Mastercard, global QR, and VAN, plus Xendit for full card-network coverage — powering individual, group, and insurance purchase flows.",
      "Leveraged **AI copilots** (Claude, Copilot) daily across the product workflow — drafting specs and business-rule matrices, rapid-prototyping internal tools, reviewing API contracts, and building this portfolio site.",
    ],
    links: [
      { label: "cticket.vn — consumer ticketing web", url: "https://cticket.vn/" },
      { label: "Mobile check-in app on Google Play", url: "https://play.google.com/store/apps/details?id=vn.cake.ticket&hl=vi&pli=1" },
    ],
    metrics: [
      { label: "GMV (2025)", value: 238, description: "bn VND · 159% of annual target", targetPercent: 159 },
      { label: "Revenue (2025)", value: 8, suffix: "+", description: "bn VND · CTicket platform" },
      { label: "Accounts (2025)", value: 99, prefix: "~", suffix: "k", description: "across 96 events" },
      { label: "Peak queue (2026)", value: 126, suffix: "K", description: "concurrent in queue · BigBang World Tour" },
    ],
  },
  {
    slug: "mindx-teacher",
    company: "MindX Technology School",
    mark: "M",
    markImage: { src: "/images/mindx-logo.png", width: 184, height: 80, alt: "MindX Technology School logo" },
    title: "Coding & Game Dev Teacher",
    period: "Jun 2026 - Sep 2026",
    role: "Part-time Teacher",
    summary:
      "Taught coding and game development part-time to K-12 students at MindX Technology School in Ho Chi Minh City.",
    highlights: [
      "Designed and delivered lessons across **Scratch**, **Python**, and **GameMaker Studio 2** for K-12 students.",
      "Provided individualized feedback to support students' **logical thinking** and problem-solving growth.",
      "Communicated student progress to parents through structured session reports.",
    ],
    metrics: [],
  },
  {
    slug: "kyc-digital-onboarding",
    company: "Cake by VPBank",
    mark: "C",
    markImage: { src: "/images/cake-logo.png", width: 2291, height: 610, alt: "Cake by VPBank logo" },
    title: "KYC & Digital Onboarding",
    period: "Jun 2024 - Feb 2025",
    role: "Technical Product Owner / BA Intern",
    summary:
      "Translated State Bank of Vietnam regulatory constraints into shippable specs for NFC-based identity verification.",
    highlights: [
      "Partnered with Compliance, Legal, Engineering, and Design to translate **State Bank of Vietnam regulatory constraints** into specs for [NFC-based identity verification](https://cake.vn/guide/huong-dan-ho-tro-cap-nhat-sinh-trac-hoc-tren-ung-dung-cake-bank).",
      "Authored **100+ user stories** across 8 sprint releases, balancing compliance requirements against onboarding speed.",
      "Validated outcomes via UAT and post-release funnel analysis.",
    ],
    links: [
      { label: "NFC biometric update guide on Cake", url: "https://cake.vn/guide/huong-dan-ho-tro-cap-nhat-sinh-trac-hoc-tren-ung-dung-cake-bank" },
    ],
    metrics: [
      { label: "User stories", value: 100, suffix: "+", description: "across 8 sprint releases" },
      { label: "Releases", value: 8, description: "sprint releases" },
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  period: string;
  role: string;
  markImage?: { src: string; width: number; height: number; alt: string };
  summary: string;
  highlights: string[];
  links?: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    slug: "elite-fitness-ftisu",
    title: "Elite Fitness FTISU (iOS App)",
    period: "2023 - 2025",
    role: "Product Owner & UI/UX Designer",
    markImage: { src: "/images/uit-logo.png", width: 697, height: 620, alt: "UIT logo" },
    summary:
      "Self-directed university project: shipped a live App Store app end-to-end and cut booking drop-off through usability testing.",
    highlights: [
      "Initiated and owned product and UI/UX design end-to-end for a **live App Store app** as a university project.",
      "Ran iterative usability testing to identify onboarding and class-booking friction.",
      "Shipped fixes that **cut drop-off** at both onboarding and booking steps.",
      `Same era: [co-authored a published AI-personalisation paper](${publication.url}) (Springer LNCS 2024) and [won the Advanced Information Systems Contest](${honors[0].url}) (AISC 2023).`,
    ],
    links: [
      { label: "Springer LNCS 2024 — AI-personalisation chapter", url: "https://link.springer.com/chapter/10.1007/978-981-96-0437-1_19" },
      { label: "AISC 2023 — first prize announcement", url: "https://tuyensinh.uit.edu.vn/chung-ket-aisc-2023-giai-nhat-cuoc-thi-goi-ten-doi-double-kill-va-findy" },
    ],
  },
];
