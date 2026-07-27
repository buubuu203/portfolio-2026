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
  "I joined Cake by VPBank as a PO Intern on the KYC & Digital Onboarding team, translating State Bank of Vietnam regulatory constraints into specs that Compliance, Legal, Engineering, and Design could all build against.",
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
  {
    title: "Top Valedictorian of E-Commerce",
    org: "University of Information Technology",
    date: "Sep 2021",
    detail: "Total score: 29.9",
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
  ],
  tools: ["Jira", "Confluence", "Figma", "Postman", "Notion", "GA4", "GTM", "SQL", "Git"],
  languages: ["Vietnamese (native)", "English (IELTS 6.5)"],
};

export type Metric = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  targetPercent?: number;
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
  metrics: Metric[];
};

export const experience: Experience[] = [
  {
    slug: "cticket-platform",
    company: "Cake by VPBank",
    mark: "C",
    title: "CTicket Platform",
    period: "Mar 2025 - Present",
    role: "Associate Technical Product Manager (promoted from PO Intern)",
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
      "Re-prioritized the roadmap in real time during high-stakes on-sales, including The Spark K-Star (sold out in 1 week), T1 Vietnam Fanmeeting, and the VPBank International Marathon, shipping 30+ features with **zero critical post-release incidents**.",
      "Owned the **CTicket x OPES ticket-cancellation insurance partnership** end-to-end - PRD, eligibility rules, and the OPES API integration contract - aligning Compliance, Marketing, and Engineering to ship it.",
      "Drove the **CTicket x 8Wonder (VinWonders) real-time inventory integration** - CTicket's first external-provider integration - authoring the PRD and API contract (token, lock-slot, rate-service, and booking-confirmation flows against VinWonders' OTA API) so events sell from a single shared stock pool across channels with no overselling.",
      "Designed and shipped **Group Buy** (leader/member registration, per-member sub-order ticket assignment) as a new purchase path for event-organizer partnerships, launching first for the VPBank International Marathon.",
      "Integrated dual **payment gateways** into CTicket checkout - Cake's own rails for Visa/Mastercard, global QR, and VAN, plus Xendit for full card-network coverage - powering individual, group, and insurance purchase flows.",
      "Authored specs, Figma mockups, workflows, and business rules end-to-end across four surfaces: [consumer ticketing web](https://cticket.vn/), a partner-facing SDK embedded in Cake's banking super-app whose **merchant integration contract** I owned, a [mobile check-in app](https://play.google.com/store/apps/details?id=vn.cake.ticket&hl=vi&pli=1) (App Store + Play Store), and a role-based admin portal.",
      "Built **GA4/GTM event tracking** and BI-partnered KPI dashboards from scratch, covering revenue, funnel conversion, and partner performance.",
    ],
    metrics: [
      { label: "GMV", value: 238, suffix: "bn VND", targetPercent: 159 },
      { label: "Revenue", value: 8, suffix: "bn+ VND" },
      { label: "Accounts", value: 99, suffix: "k+" },
      { label: "Features shipped", value: 30, suffix: "+" },
      { label: "Events tracked", value: 96 },
      { label: "Partners", value: 52 },
    ],
  },
  {
    slug: "kyc-digital-onboarding",
    company: "Cake by VPBank",
    mark: "C",
    title: "KYC & Digital Onboarding",
    period: "Jun 2024 - Feb 2025",
    role: "Technical Product Owner / PO Intern",
    summary:
      "Translated State Bank of Vietnam regulatory constraints into shippable specs for NFC-based identity verification.",
    highlights: [
      "Partnered with Compliance, Legal, Engineering, and Design to translate **State Bank of Vietnam regulatory constraints** into specs for [NFC-based identity verification](https://cake.vn/guide/huong-dan-ho-tro-cap-nhat-sinh-trac-hoc-tren-ung-dung-cake-bank).",
      "Authored **100+ user stories** across 8 sprint releases, balancing compliance requirements against onboarding speed.",
      "Validated outcomes via UAT and post-release funnel analysis.",
    ],
    metrics: [
      { label: "User stories", value: 100, suffix: "+" },
      { label: "Sprint releases", value: 8 },
    ],
  },
  {
    slug: "elite-fitness-ftisu",
    company: "University Project - self-directed",
    markImage: { src: "/images/uit-logo.png", width: 54, height: 42, alt: "UIT logo" },
    title: "Elite Fitness FTISU (iOS App)",
    period: "2023 - 2025",
    role: "Solo Product Owner & UI/UX Designer",
    summary:
      "Self-directed university project: shipped a live App Store app end-to-end and cut booking drop-off through usability testing.",
    highlights: [
      "Initiated and owned product and UI/UX design end-to-end for a **live App Store app** as a university project, with no prior dedicated owner driving iteration.",
      "Ran iterative usability testing to identify onboarding and class-booking friction.",
      "Shipped fixes that **cut drop-off** at both onboarding and booking steps.",
      `Same era: [co-authored a published AI-personalisation paper](${publication.url}) (Springer LNCS 2024) and [won the Advanced Information Systems Contest](${honors[0].url}) (AISC 2023).`,
    ],
    metrics: [],
  },
];
