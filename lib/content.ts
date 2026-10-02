export type ProjectStatus = "live" | "case-study" | "in-progress";

export interface ExternalLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  kicker: string;
  tagline: string;
  status: ProjectStatus;
  summary: string[];
  stats?: { label: string; value: number; suffix?: string; prefix?: string }[];
  links: ExternalLink[];
  accent?: "glacier" | "marigold";
}

export const projects: Project[] = [
  {
    slug: "mymoodly",
    title: "MyMoodly",
    kicker: "Solo Product — Live",
    tagline: "A live anonymous mood-matching platform — built solo, end to end.",
    status: "live",
    summary: [
      "Conceived and launched a live anonymous peer-support platform as a solo builder — using Claude Code to build, and reviewing and correcting the generated code before every release. Real users can sign up today.",
      "Designed a matching engine that pairs users based on their current mood for time-boxed chats, with a built-in crisis escalation path.",
      "Built with TypeScript, React, Next.js, and Cloudflare Workers.",
    ],
    links: [{ label: "Visit mymoodly.space", href: "https://mymoodly.space" }],
    accent: "marigold",
  },
  {
    slug: "zomato-vs-swiggy",
    title: "Zomato vs. Swiggy",
    kicker: "Strategic PM Case Study",
    tagline: "Why near-identical market conditions produced two very different paths to profitability.",
    status: "case-study",
    summary: [
      "In-depth competitive analysis: Hyperpure's B2B supply chain model, adaptive experimentation, and focused geographic expansion drove Zomato's earlier path to profitability despite near-identical market conditions.",
      "8 strategic recommendations formulated, including a B2B supply chain initiative for Swiggy and a premium-membership evolution roadmap for Zomato.",
    ],
    links: [],
    accent: "glacier",
  },
  {
    slug: "cashkaro",
    title: "CashKaro",
    kicker: "APM Intern Case Study",
    tagline: "Product strategy assignment — a context-loss bug found in the purchase flow, and a fix for it.",
    status: "case-study",
    summary: [
      "Found a context-loss bug in CashKaro's purchase flow through live-app testing.",
      "Proposed Predictive Payment Intelligence: preference- and history-driven nudges, capped weekly to avoid fatigue.",
      "Designed a power-user pilot measured on incremental tracked orders against a randomised control group.",
    ],
    links: [
      { label: "View the deck (PDF)", href: "https://drive.google.com/file/d/1RKDhJ6bMgNzdSqLJ0YDrJFBgWB7d36QJ/view" },
      { label: "Open the interactive case study", href: "https://code-companion-hub-13.lovable.app/" },
    ],
    accent: "glacier",
  },
  {
    slug: "soulace",
    title: "Soulace",
    kicker: "KFUPM Intelligent Planet Hackathon 2026",
    tagline: "An AI-powered emotional support platform, pitched to a global field.",
    status: "case-study",
    summary: [
      "Top 50 of 1,000+ global teams. Led product development — end-to-end product strategy, feature prioritization, and the final pitch narrative.",
      "Earned 1-month personalized mentorship from Google experts on product strategy, scalability, and go-to-market execution.",
    ],
    links: [],
    accent: "marigold",
  },
];

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface ExperienceBullet {
  text: string;
  stats?: StatItem[];
}

const khaltiBullets: ExperienceBullet[] = [
  {
    text: "Owned the end-to-end PRD lifecycle for Khalti's wallet-first card suite (Physical Wallet Debit Card, Virtual Debit Card, Virtual Credit Card), from business requirements and risk controls to cross-functional sign-off. Authored 30+ PRDs in 3 months across regulatory, business, and user requirements.",
    stats: [
      { label: "Virtual Debit Card active users", value: 300000, suffix: "+" },
      { label: "PRDs authored in 3 months", value: 30, suffix: "+" },
    ],
  },
  {
    text: "Spearheaded a search UX enhancement surfacing trending and recently used services, increasing search-section CTR and reducing user click depth.",
    stats: [{ label: "Search-section CTR", value: 20, prefix: "+", suffix: "%" }],
  },
  {
    text: "Established a prototype-first discovery process across Khalti Mall, Tourist Wallet, and Migrant Mode — converting BRDs into clickable prototypes built with Claude Code and reviewing them with senior stakeholders before PRD sign-off, surfacing edge cases and proposing solutions.",
  },
  {
    text: "Validated REST API contracts in Postman ahead of engineering handoff as standard practice, resolving integration and response-shape defects upstream to prevent mid-sprint blockers, and automated regression coverage across releases using Appium.",
  },
  {
    text: "Contributed to two production AI features: defined the risk policy for FacePass biometric auto-KYC, authoring the liveness and spoof-detection thresholds that gate onboarding; and managed the RAG knowledge base behind Khalti's AI chatbot so users receive only verified information.",
  },
];

export const khaltiExperience = {
  org: "Khalti by IME",
  role: "Product Management Intern",
  period: "Apr 2026 — Present",
  bullets: khaltiBullets,
};

const leadershipStats: StatItem[] = [
  { label: "Sponsors secured", value: 5 },
  { label: "Raised", value: 250000, prefix: "NPR ", suffix: "+" },
  { label: "Tickets sold out", value: 500, suffix: "+" },
  { label: "Profit generated", value: 85000, prefix: "NPR ", suffix: "+" },
];

export const leadership = {
  org: "GSS Social Club",
  role: "Event Organizer",
  headline: "Fabulous February",
  summary:
    "Spearheaded Fabulous February, a large-scale cultural event featuring film and music artists.",
  stats: leadershipStats,
};

export interface Guesstimate {
  slug: string;
  question: string;
  tag: string;
  approach: string[];
  result: string;
  reality?: string;
}

export const guesstimates: Guesstimate[] = [
  {
    slug: "smartphones-india",
    question: "How many smartphones are sold in India each year?",
    tag: "Market Sizing",
    approach: [
      "Population of India ≈ 1.4B, split into four age bands: 0–15, 15–30, 30–50, and 50+ (350M each).",
      "Ages 0–15: phones are rarely bought specifically for this group — assumed 2% adoption → 7M units.",
      "Ages 15–30, split into 15–20 / 20–25 / 25–30 (~115M each): first-phone buyers and frequent upgraders at 30% / 20% / 10% adoption → 34.5M + 23M + 15M ≈ 73M units.",
      "Ages 30–50, split by income (Rich 50M, Middle class 200M, Poor 100M): replacement rates of 30% / 10% / 5% → 15M + 20M + 5M = 40M units.",
      "Ages 50+: low-frequency buyers, often on hand-me-down phones — assumed 10% adoption → 35M units.",
    ],
    result: "≈ 155M smartphones sold annually (7M + 73M + 40M + 35M).",
  },
  {
    slug: "pizza-mumbai",
    question: "Estimate the number of pizza deliveries in Mumbai on a Saturday night.",
    tag: "Demand Estimation",
    approach: [
      "Mumbai population ≈ 22M, split into under-16 (~5.5M), 16–40 (~11M), and over-40 (~5.5M).",
      "Under 16, split further by class (upper 500K, middle 2.5M, working 1.5M): light order and pizza-share rates → ≈ 3,000 orders.",
      "16–40: ~30% order out on a Saturday night (150,000 orders), of which ~10% choose pizza → 15,000 orders.",
      "Over 40: ~20% order out, recalculated after a first pass → ≈ 159,000 pizza orders from this segment.",
    ],
    result: "≈ 167,000 pizza deliveries across Mumbai that night.",
    reality:
      "Flagged this one as possibly overcomplicated — the extra segmentation added steps without moving the answer much, which is its own lesson in knowing when to stop layering assumptions.",
  },
  {
    slug: "swiggy-kolkata",
    question: "How much revenue does Swiggy generate annually in Kolkata?",
    tag: "Revenue Estimation",
    approach: [
      "Anchored on Swiggy's total FY-25 revenue (~₹15,000 Cr across India), divided evenly across 28 states → ~₹5,000 Cr per state as a baseline.",
      "West Bengal runs Swiggy in ~16 cities; assumed Kolkata captures 30% of the state's orders given its density, population, and large student base, since Swiggy doesn't operate in every WB city.",
    ],
    result: "30% × ₹5,000 Cr ≈ ₹1,500 Cr annual Kolkata revenue.",
  },
  {
    slug: "whatsapp-india",
    question: "How many WhatsApp messages are sent in India per day?",
    tag: "Usage Estimation",
    approach: [
      "India population ≈ 1.4B; assumed ~800M WhatsApp users (rounded up from an initial 700M for a cleaner 4-way split).",
      "Split users into four usage tiers of 200M each — heavy (20–50 msgs/day), medium (5–20), decent (3–5), and less active (1–2) — and took the midpoint of each tier.",
      "Heavy: 35 × 200M = 7,000M. Medium: 15 × 200M = 3,000M. Decent: 4 × 200M = 800M. Less active: 1 × 200M = 200M.",
    ],
    result: "≈ 10.4 billion WhatsApp messages sent in India per day.",
  },
  {
    slug: "uber-bangalore",
    question: "Estimate the number of Uber rides taken daily in Bangalore.",
    tag: "Demand Estimation",
    approach: [
      "Assumed Bangalore's population at ~10M, split into 2M children, 6M adults, and 2M elderly.",
      "Ride-app usage rates: ~2.5% of children (~50,000), ~60% of adults (3.6M potential users), ~25% of elderly (500,000).",
      "Applied Uber's India market share (~35–40%, used 40%) across each segment: 40,000 + 1.44M + 200,000.",
    ],
    result: "≈ 1.6M Uber rides per day in Bangalore.",
  },
  {
    slug: "coffee-shops-delhi",
    question: "How many coffee shops are there in Delhi?",
    tag: "Market Sizing",
    approach: [
      "Delhi's area is ~1,484 sq. km ≈ 1,500 sq. km, split into three density zones of 500 sq. km each.",
      "Less dense areas: ~2 cafés per 2 sq. km → 500 cafés. Medium density: ~5–10 per sq. km → ≈2,000 cafés. Highly dense: ~20 per 2 sq. km → 5,000 cafés.",
    ],
    result: "First-pass total: ≈ 7,500 cafés.",
    reality:
      "Felt this was too high, cross-checked against 2025 data showing ~2,075 cafés in Delhi — a clear miss, kept here because the honesty is the point.",
  },
  {
    slug: "online-delivery-market-india",
    question: "What's the market size for online delivery in India?",
    tag: "Market Sizing",
    approach: [
      "Split India's 1.4B population into four segments of 350M each, by infrastructure maturity.",
      "Not developed (350M): no delivery infrastructure → no market.",
      "Underdeveloped (350M): 2% adoption → 7M users → 1.4M families ordering monthly at ₹100 → ₹1.6B.",
      "Developing (350M): 30% adoption → 21M families ordering twice a month at ₹250 → ₹126B.",
      "Developed (350M): 50% adoption → 35M families ordering 4×/month at ₹400 → ₹670B.",
    ],
    result: "≈ ₹800 billion total addressable market (₹670B + ₹126B + ₹1.6B).",
  },
  {
    slug: "instagram-reels-india",
    question: "How many people use Instagram Reels in India daily?",
    tag: "Usage Estimation",
    approach: [
      "Started from ~480M total Instagram users in India, split by age band.",
      "16–25 (200M), mostly students and always-on: ~70% DAU for Reels → 140M.",
      "25–35 (150M), working professionals and creators: ~50% DAU for Reels → 75M.",
      "35–45 (100M), present but more active on other platforms: ~30% DAU for Reels → 30M.",
    ],
    result: "≈ 240M daily Reels users (140M + 75M + 30M = 245M, rounded).",
  },
  {
    slug: "credit-cards-india",
    question: "Estimate the number of credit cards in circulation in India.",
    tag: "Market Sizing",
    approach: [
      "Split India's 1.4B population by age: 0–20 (350M, no market), 20–40, 40–60, and 60–80 (350M each).",
      "20–40: split into 20–30 and 30–40 (175M each), further split by income class (44M per class) with adoption rates of 0% / 2% / 10% / 40% → ~23M cardholders, ×2–3 cards average ≈ 46M cards.",
      "40–60: middle class (2 cards avg, 10% adoption → 34M) plus upper class (3–4 cards avg) → refined to ≈ 135M cards.",
      "60–80: mostly retirees and pensioners — upper class at 2 cards avg, 10% adoption → ≈ 85M cards.",
    ],
    result: "First attempt ≈ 200M, revised second pass ≈ 155M.",
    reality:
      "The real figure is closer to ~100M — both passes overshot. Kept here deliberately: intellectual honesty about a miss is more useful than hiding it.",
  },
  {
    slug: "ecommerce-india",
    question: "How many new e-commerce users come online in India each year?",
    tag: "Growth Modeling",
    approach: [
      "Reframed the question first — before estimating new users per year, established the current base of e-commerce users in India.",
      "Split India's ~1.4–1.5B population into three buckets of 500M by infrastructure maturity: no market (0 users), developing (20% adoption → 100M), and developed (60% adoption → 300M).",
      "Current base ≈ 400M total e-commerce users in India.",
      "Applied a 10–15% annual growth rate (picked 12% as midpoint) → ~48M new users per year.",
      "Projected forward: 2026 ≈ 400M, 2027 ≈ 450M, 2028 ≈ 500M, 2030 ≈ 600M.",
    ],
    result: "≈ 48M new e-commerce users per year, off a ~400M current base.",
  },
];

export const featuredGuesstimateSlugs = [
  "coffee-shops-delhi",
  "credit-cards-india",
  "ecommerce-india",
];

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  image: string;
  driveUrl: string;
}

export const certifications: Certification[] = [
  {
    name: "Product Management: An Introduction",
    issuer: "IBM (Coursera)",
    date: "Mar 2026",
    image: "/certs/ibm-product-management.jpg",
    driveUrl: "https://drive.google.com/file/d/1dB519CGlaL4yrPx7i-kNDrt2iwzlMWao/view",
  },
  {
    name: "Agile Project Management",
    issuer: "Google (Coursera)",
    date: "Mar 2026",
    image: "/certs/google-agile-project-management.jpg",
    driveUrl: "https://drive.google.com/file/d/1mMUSg9VbIc6vhAYRCzdzCmRGfVRIzkio/view",
  },
];

export const contact = {
  email: "lamsalsamrat831@gmail.com",
  linkedin: "https://linkedin.com/in/samrat-lamsal",
  github: "https://github.com/Samrat17ab",
  resumeHref: "/resume.pdf",
  resumePreview: "/resume-preview.png",
};
