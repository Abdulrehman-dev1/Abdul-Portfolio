export type FeatureGroup = {
  title: string;
  bullets: string[];
};

export type FeatureSection = {
  heading: string;
  bullets?: string[];
  groups?: FeatureGroup[];
};

export type CaseStudySection = {
  heading: string;
  paragraph?: string;
  bullets?: string[];
};

export type ProjectCaseStudy =
  | {
      kind: "full";
      id: string;
      title: string;
      sections: CaseStudySection[];
    }
  | {
      kind: "bullets";
      id: string;
      title: string;
      intro: string;
      bullets: string[];
    }
  | {
      kind: "summary";
      title: string;
      summary: string;
      targetSlug: string;
      targetHash: string;
      linkLabel: string;
    };

export type ProjectScreenshot = {
  filename: string;
  src: string;
  alt: string;
  caption: string;
};

export type FeaturedProject = {
  slug: string;
  title: string;
  cardDescription: string;
  role: string;
  techStack: string[];
  integrations: string[];
  accessControl?: string;
  liveUrl?: string;
  liveLabel?: string;
  overview: string;
  featureSections: FeatureSection[];
  highlights: string[];
  caseStudy?: ProjectCaseStudy;
  screenshots?: ProjectScreenshot[];
};

const rawTokenizationScreenshots: Omit<ProjectScreenshot, "src">[] = [
  {
    filename: "1.png",
    alt: "Tokenization landing page hero section showing 'Invest Smarter. Own Real Assets Digitally.' with navigation and mobile app store badges",
    caption: "Landing Page Hero",
  },
  {
    filename: "2.png",
    alt: "Tokenization fractional real estate introduction section titled 'Start Building Wealth with Fractional Real Estate'",
    caption: "Fractional Real Estate Overview",
  },
  {
    filename: "3png.png",
    alt: "Tokenization interactive investment return calculator estimating annual profit and total expected value in AED",
    caption: "Interactive Investment Return Calculator",
  },
  {
    filename: "4.png",
    alt: "Tokenization Investment Properties page header with Country, Property Type, and Min/Max Yield filters",
    caption: "Property Marketplace Filters",
  },
  {
    filename: "5.png",
    alt: "Tokenization available property offering cards displaying annual rate of return and investment horizon",
    caption: "Live Property Offerings",
  },
  {
    filename: "6.png",
    alt: "Tokenization secondary marketplace listing grid with search, price range, open and partial status badges, and Buy Tokens actions",
    caption: "Secondary Marketplace Listings",
  },
  {
    filename: "7.png",
    alt: "Tokenization secondary marketplace token purchase page with Buy Tokens quantity input and purchase summary",
    caption: "Secondary Token Purchase Flow",
  },
  {
    filename: "8.png",
    alt: "Tokenization admin dashboard displaying platform KPI cards, weekly investment growth chart, top projects chart, and management navigation",
    caption: "Admin Panel Dashboard",
  },
];

const tokenizationScreenshots: ProjectScreenshot[] = [...rawTokenizationScreenshots]
  .sort((a, b) =>
    a.filename.localeCompare(b.filename, undefined, { numeric: true, sensitivity: "base" }),
  )
  .map((item) => ({
    ...item,
    src: `/assets/images/tokenization_images/${item.filename}`,
  }));

export const projects: FeaturedProject[] = [
  {
    slug: "xpertbid",
    title: "XpertBid – Marketplace & Auctions",
    cardDescription:
      "A multi-module marketplace combining live auctions, standard and business product sales, and a reverse marketplace, with a role-based admin panel and automated email and WhatsApp notifications.",
    role: "Full Stack Developer (frontend first, then backend)",
    techStack: ["Laravel", "Inertia.js", "React.js", "MySQL", "Redis"],
    integrations: ["PayFast", "Google Maps APIs", "Third-party WhatsApp messaging service"],
    liveUrl: "https://www.xpertbid.com/",
    liveLabel: "xpertbid.com",
    overview:
      "XpertBid is a Pakistan-focused marketplace where people can auction items, sell products, and post buying requests that sellers compete to fulfil. I joined as a frontend developer, building the UI for the storefront and the admin panel. As I grew into backend work with Laravel, I took on server-side development as well. When the senior developer moved the platform from Next.js + Laravel to Laravel + Inertia.js + React, I built the current version on that stack.",
    featureSections: [
      {
        heading: "Core modules",
        groups: [
          {
            title: "1. Auction Management System",
            bullets: [
              "Verified users create auctions through a dedicated listing form.",
              "Live bidding with a full bid history for every product.",
              "A “My Bids” area where users see each bid as active, won, or lost.",
              "Email and WhatsApp notifications for every bid event: outbid, won, or lost.",
              "After winning, the user completes checkout within 24 hours. If they don’t, the win passes to the second-highest bidder.",
            ],
          },
          {
            title: "2. Normal Products",
            bullets: [
              "Sellers create a listing with a title, description, and images.",
              "Buyers complete a simple one-time checkout.",
            ],
          },
          {
            title: "3. Business Products",
            bullets: [
              "Store-oriented inventory with stock management, SKUs, and barcodes.",
              "Buyers can purchase multiple units based on available quantity.",
            ],
          },
          {
            title: "4. Reverse Marketplace",
            bullets: [
              "Buyers post a request for what they need.",
              "Sellers bid on it, and the buyer chooses which offer to accept.",
              "Targeted notifications: when a request is created, only sellers whose preferences match its category, product, and location get an email or WhatsApp message.",
              "After an offer is accepted, the XpertBid team handles the deal manually. In-app checkout is not part of this module yet.",
            ],
          },
          {
            title: "5. 1 Rupee Auction (recently added)",
            bullets: [],
          },
        ],
      },
      {
        heading: "Platform features",
        bullets: [
          "Location search and map preview using Google Maps APIs.",
          "Secure local payments through PayFast.",
          "Referral system, user profiles, user verification, and order management.",
          "Notification management so users control which alerts they receive.",
        ],
      },
      {
        heading: "Admin panel",
        bullets: [
          "Role-based access with dedicated roles such as Main Admin, SEO Handler, Listing Handler, and Order Handler.",
          "Marketing notifications: send emails and WhatsApp messages to registered users, for example to announce an offer.",
          "Product scrapers built in Laravel that read HTML attributes from Daraz, OLX, and PropertyFinder to import listings without manual data entry.",
        ],
      },
    ],
    highlights: [
      "Rebuilt on Laravel + Inertia.js + React with a server-rendered, single-page feel.",
      "Five product flows (auctions, standard products, business products, reverse marketplace, 1 Rupee auction) on one shared backend.",
      "Notification system that targets the right sellers instead of broadcasting to everyone.",
    ],
    caseStudy: {
      kind: "full",
      id: "one-login-across-three-sites",
      title: "Case Study: One Login Across Three Sites",
      sections: [
        {
          heading: "The problem",
          paragraph:
            "Once the property and build frontends launched as separate apps on subdomains, a user who logged in on xpertbid.com appeared logged out on the other two, and the reverse. Browsers don’t let different origins share localStorage, and the main site and the new frontends authenticate in different ways, so a shared login needed a deliberate design.",
        },
        {
          heading: "The architecture",
          bullets: [
            "Main site (Laravel + Inertia): a standard Laravel session cookie, scoped to the parent domain so all subdomains can see it.",
            "Next.js satellites (property and build): Laravel Sanctum bearer tokens stored in localStorage.",
            "Auth calls from the satellites go through a same-origin Next.js proxy route that forwards them to the Laravel API, which avoids CORS problems.",
          ],
        },
        {
          heading: "How the sync works",
          bullets: [
            "Silent cookie SSO (main site to satellite): when a user opens a satellite, it quietly asks the main site for a token, sending the session cookie along. If the user is logged in, Laravel checks the request origin against an allowlist and returns a fresh Sanctum token, so the user is logged in instantly with no redirect.",
            "One-time auth bridge (satellite to main site): when a user logs in on a satellite, the backend creates a random 64-character token, stored in cache for only 2 minutes. The browser visits a bridge URL on the main site, the token is consumed in a single read, and the main site session is created.",
            "Moving between sites: when a logged-in user clicks through to another XpertBid site, a fresh bridge link is generated. If the destination is another satellite, the main site passes along a new token so the user lands already logged in.",
            "Google login: handled by the main site, which then redirects back to the satellite with a new token.",
          ],
        },
        {
          heading: "Logout and session health",
          bullets: [
            "Global logout: logging out on any site deletes the user’s Sanctum tokens and ends the main session, so the other sites log the user out too. A short guard prevents a satellite from immediately re-logging the user in after logout.",
            "Tab switching: satellites re-check login status when the browser tab regains focus, throttled to avoid excess requests. They clear the token only on a real 401, not on a network error. The main site refreshes its auth data on focus as well.",
            "Keep-alive: the main site pings the server every 10 minutes so an active user’s 120-minute session doesn’t expire while idle.",
          ],
        },
        {
          heading: "Security choices",
          bullets: [
            "Bridge tokens are random, short-lived, and single-use.",
            "Cross-origin requests are checked against an allowlist of trusted origins.",
            "Separate token names per frontend make tokens easy to revoke.",
          ],
        },
        {
          heading: "Result",
          paragraph:
            "Users log in once and stay logged in across xpertbid.com, property.xpertbid.com, and build.xpertbid.com, and logging out of any one signs them out of all three.",
        },
      ],
    },
  },
  {
    slug: "xpertproperty",
    title: "XpertProperty – Property Marketplace",
    cardDescription:
      "A standalone property frontend built on the XpertBid backend, with login that stays in sync with the main site.",
    role: "Full Stack Developer",
    techStack: ["Next.js", "Laravel REST APIs", "Laravel Sanctum"],
    integrations: [],
    liveUrl: "https://property.xpertbid.com/",
    liveLabel: "property.xpertbid.com",
    overview:
      "XpertProperty is a dedicated Next.js frontend for the property category, built to separate property listings from the general XpertBid marketplace. It uses the same Laravel backend through REST APIs, so listings, users, and accounts are shared with xpertbid.com while the property experience lives on its own subdomain.",
    featureSections: [
      {
        heading: "What I built",
        bullets: [
          "A Next.js frontend that consumes the Laravel APIs.",
          "Token-based authentication with Laravel Sanctum.",
          "Single sign-on with the main site, so a user logged in on xpertbid.com is logged in here too (see the case study below).",
        ],
      },
    ],
    highlights: [],
    caseStudy: {
      kind: "summary",
      title: "Case Study: One Login Across Three Sites",
      summary:
        "Because XpertProperty runs on its own subdomain with Sanctum tokens in localStorage while xpertbid.com uses a parent-domain Laravel session cookie, login state syncs via silent cookie SSO, same-origin Next.js proxy routes, single-use 64-character auth bridge tokens, and global logout across all three XpertBid sites.",
      targetSlug: "xpertbid",
      targetHash: "one-login-across-three-sites",
      linkLabel: "Read the full case study on XpertBid",
    },
  },
  {
    slug: "xpertbuild",
    title: "XpertBuild – Home Renovation & Builders",
    cardDescription:
      "A standalone frontend for home renovation and builder services, sharing accounts and sessions with the main XpertBid platform.",
    role: "Full Stack Developer",
    techStack: ["Next.js", "Laravel REST APIs", "Laravel Sanctum"],
    integrations: [],
    liveUrl: "https://build.xpertbid.com/",
    liveLabel: "build.xpertbid.com",
    overview:
      "XpertBuild is the second Next.js frontend, created for the home renovation and builder categories. It follows the same architecture as XpertProperty: its own frontend on a subdomain, with the Laravel backend providing the data and authentication.",
    featureSections: [
      {
        heading: "What I built",
        bullets: [
          "A Next.js frontend that consumes the Laravel APIs.",
          "Sanctum token authentication with its own token, separate from the property site.",
          "Seamless login and logout across all three XpertBid sites.",
        ],
      },
    ],
    highlights: [],
    caseStudy: {
      kind: "summary",
      title: "Case Study: One Login Across Three Sites",
      summary:
        "XpertBuild uses its own named Sanctum token proxied through Next.js API routes and stays synchronized with xpertbid.com and property.xpertbid.com through silent cookie SSO, short-lived one-time bridge tokens, tab-focus session checks, and coordinated global logout.",
      targetSlug: "xpertbid",
      targetHash: "one-login-across-three-sites",
      linkLabel: "Read the full case study on XpertBid",
    },
  },
  {
    slug: "tokenization",
    title: "Tokenization – Fractional Real Estate Platform",
    cardDescription:
      "A fractional real estate platform where verified investors buy digital tokens of high-value properties, earn monthly rental yield, and trade tokens peer to peer on a secondary marketplace.",
    role: "Full Stack Developer",
    techStack: [
      "Laravel 12",
      "PHP 8.2",
      "MySQL",
      "Vue 3",
      "Inertia.js",
      "Vite",
      "Bootstrap 5",
      "Chart.js",
      "Quill.js",
      "Ziggy",
    ],
    integrations: ["Stripe", "Manual bank-transfer verification", "OneSignal web push"],
    accessControl: "Spatie Laravel Permission with custom role and KYC middleware",
    overview:
      "Tokenization lets investors own a share of high-value properties instead of buying whole properties. After completing KYC verification, an investor buys tokens of a live property offering, tracks their portfolio and returns, receives rental income in their wallet, and can sell tokens to other investors on a built-in secondary marketplace. Admins manage properties, offerings, KYC reviews, payments, rental payouts, and user access from a role-based admin panel.",
    featureSections: [
      {
        heading: "Core modules",
        groups: [
          {
            title: "Property discovery",
            bullets: [
              "Landing page with live offerings, an interactive investment return calculator, testimonials, FAQs, and a consultation form.",
              "Marketplace with filters for country, city, property type (residential, commercial, industrial, mixed-use), yield range, and sorting by yield, value, or name.",
              "Watchlist so users can bookmark favorite properties.",
            ],
          },
          {
            title: "Authentication and onboarding",
            bullets: [
              "Email verification and password reset using 6-digit codes.",
              "A 6-step onboarding wizard: personal details, KYC document upload (government ID, selfie, address proof), investment profile, wallet creation, funding information, and completion.",
              "KYC gating: unverified users cannot invest, and admins review submissions in pending, verified, rejected, and resubmit queues.",
            ],
          },
          {
            title: "Primary investments",
            bullets: [
              "Live preview of tokens, the 2% platform fee, and projected annual return before the user pays.",
              "Checks for the offering window, KYC status, per-investor token limits, and remaining supply.",
              "Two payment options: Stripe card payments, and bank transfer with receipt upload that an admin verifies or rejects.",
              "Stripe webhooks confirm payments and credit holdings idempotently.",
            ],
          },
          {
            title: "Investor dashboard and wallet",
            bullets: [
              "Dashboard showing total invested, current holding value, returns, rental income, and a Chart.js comparison of current worth against compound predicted worth.",
              "Portfolio view with ownership share, listed versus available tokens, estimated annual return, and rental payouts per property.",
              "Wallet ledger covering deposits, withdrawals, investment debits, rental income, secondary trade debits and credits, and fees.",
            ],
          },
          {
            title: "Secondary marketplace",
            bullets: [
              "Holders list unlisted tokens at a price they choose and can cancel listings.",
              "Buyers purchase partial or full listings from their wallet balance.",
              "Each trade updates both wallets and both holdings atomically, deducts a 1% trading fee, and records the trade.",
            ],
          },
          {
            title: "Rental cycles and automation",
            bullets: [
              "Admins generate rental cycles and update payout statuses, with retry logic for database deadlocks.",
              "A scheduled command distributes monthly rent to token holders in proportion to their share, safely repeatable without double payouts.",
              "A command running every minute marks a property as completed when its investment horizon ends.",
            ],
          },
          {
            title: "Admin panel",
            bullets: [
              "Platform KPIs, property management with a rich-text editor, image and document uploads, and country/state/city cascading selects.",
              "Offering, user, and role/permission management.",
              "Push notifications through OneSignal: broadcast messages to all subscribed users, and an optional alert when a new property is launched.",
            ],
          },
        ],
      },
    ],
    highlights: [
      "End-to-end investor journey: KYC, onboarding, payment, portfolio, rental income, and resale.",
      "Dual payment flow with automated card payments and admin-verified bank transfers.",
      "Automated monthly payouts and property maturity handled by scheduled commands.",
    ],
    caseStudy: {
      kind: "bullets",
      id: "keeping-money-operations-safe",
      title: "Case study: keeping money operations safe",
      intro:
        "A platform that moves money and ownership has to stay correct under concurrent use. These are the safeguards built into it:",
      bullets: [
        "No overselling: investments run inside database transactions with row locking on the offering, so two investors cannot buy the same last tokens.",
        "No double credits: Stripe webhooks are signature-verified and processed idempotently, and the monthly rent distribution can be re-run without paying anyone twice.",
        "Consistent trades: a secondary trade locks the listing, both wallets, and both holdings in one transaction, so balances and token counts always agree.",
        "Deadlock handling: rental payout updates retry automatically on database deadlocks.",
        "Auditability: every balance change is recorded in a wallet ledger with a transaction type.",
      ],
    },
    screenshots: tokenizationScreenshots,
  },
];

export function getProjectBySlug(slug: string): FeaturedProject | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous: FeaturedProject | undefined;
  next: FeaturedProject | undefined;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1 || projects.length < 2) {
    return { previous: undefined, next: undefined };
  }
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { previous, next };
}
