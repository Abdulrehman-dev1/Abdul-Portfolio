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

export type ProjectCompany = "XpertBid" | "Acusync Technologies";

export const projectFilterTabs = ["All", "XpertBid", "Acusync Technologies"] as const;
export type ProjectFilterTab = (typeof projectFilterTabs)[number];

export type FeaturedProject = {
  slug: string;
  company: ProjectCompany;
  status?: string;
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

function buildScreenshots(
  folder: string,
  items: Omit<ProjectScreenshot, "src">[],
): ProjectScreenshot[] {
  return [...items]
    .sort((a, b) =>
      a.filename.localeCompare(b.filename, undefined, { numeric: true, sensitivity: "base" }),
    )
    .map((item) => ({
      ...item,
      src: `/assets/images/${folder}/${item.filename}`,
    }));
}

const tokenizationScreenshots = buildScreenshots("tokenization_images", [
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
]);

const emiratiScreenshots = buildScreenshots("emirati_images", [
  {
    filename: "1.png",
    alt: "Emirati Coffee – Coffee Subscription Store navigation bar and Colombia coffee catalog header",
    caption: "Storefront & Catalog Header",
  },
  {
    filename: "2.png",
    alt: "Emirati Coffee – Coffee Subscription Store personalized monthly subscription plan step with grind type selection",
    caption: "Subscription Grind Selection",
  },
  {
    filename: "3.png",
    alt: "Emirati Coffee – Coffee Subscription Store product cards with quantity selector and 250g, 500g, and 1kg weight options",
    caption: "Product & Size Selection",
  },
  {
    filename: "4.png",
    alt: "Emirati Coffee – Coffee Subscription Store product modal comparing One Time Order and Subscribe & Save subscription benefits",
    caption: "One-Time vs. Subscribe & Save",
  },
  {
    filename: "5.png",
    alt: "Emirati Coffee – Coffee Subscription Store guest checkout summary with Stripe and Cash on Delivery payment options and coupon field",
    caption: "Checkout & Payment Options",
  },
]);

const bisonScreenshots = buildScreenshots("bison_images", [
  {
    filename: "1.png",
    alt: "Bison TradeWorks – B2B Sourcing Platform hero section titled 'Manufacturing & goods, sourced from Mexico.' with EN/ES language switcher",
    caption: "Bilingual Hero & Value Pillars",
  },
  {
    filename: "2.png",
    alt: "Bison TradeWorks – B2B Sourcing Platform four-step buyer workflow titled 'From your list to your dock'",
    caption: "Four-Step Sourcing Workflow",
  },
  {
    filename: "3.png",
    alt: "Bison TradeWorks – B2B Sourcing Platform manufacturer partnership section titled 'Sell to one buyer, not a dozen'",
    caption: "Manufacturer Partnership Overview",
  },
]);

const mrBarniScreenshots = buildScreenshots("mrbarni_images", [
  {
    filename: "1.png",
    alt: "Mr. Barni – UAE Real Estate Marketplace hero section with PWA install banner and Dubai property search bar",
    caption: "Marketplace Hero & PWA Install Prompt",
  },
  {
    filename: "2.png",
    alt: "Mr. Barni – UAE Real Estate Marketplace latest properties grid displaying For Sale and For Rent cards with AED pricing and verified badges",
    caption: "Latest Property Listings Grid",
  },
  {
    filename: "3.png",
    alt: "Mr. Barni – UAE Real Estate Marketplace filtered search results with emirate, AED price range, and bedroom filters alongside RERA verified badges",
    caption: "Filtered Search & RERA Verification",
  },
  {
    filename: "4.png",
    alt: "Mr. Barni – UAE Real Estate Marketplace account registration page with signup form and platform highlights",
    caption: "Account Registration & Onboarding",
  },
  {
    filename: "5.png",
    alt: "Mr. Barni – UAE Real Estate Marketplace super admin dashboard showing KPI counts, moderation queue, and user role breakdown",
    caption: "Admin KPI Dashboard & Moderation Queue",
  },
  {
    filename: "6.png",
    alt: "Mr. Barni – UAE Real Estate Marketplace admin analytics showing listings by status, inquiries pipeline, and 30-day activity charts",
    caption: "Listings & Inquiries 30-Day Analytics",
  },
]);

export const projects: FeaturedProject[] = [
  {
    slug: "xpertbid",
    company: "XpertBid",
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
    company: "XpertBid",
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
    company: "XpertBid",
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
    company: "XpertBid",
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
  {
    slug: "adxc",
    company: "Acusync Technologies",
    title: "ADXC – Abu Dhabi Extreme Championship",
    cardDescription:
      "The official website of the Abu Dhabi Extreme Championship, a grappling and combat sports event. I built key UI sections of the site, including the Chairman’s Message and the Athletes page.",
    role: "Frontend Developer (UI)",
    techStack: ["Laravel (existing codebase)"],
    integrations: [],
    liveUrl: "https://adxcworld.com/",
    liveLabel: "adxcworld.com",
    overview:
      "ADXC is the official website of the Abu Dhabi Extreme Championship, a grappling tournament held across the UAE and abroad. The site covers events, athletes, news, rules and judging criteria, ticketing, and live-stream links. The site runs on Laravel, and my work focused on the user interface.",
    featureSections: [
      {
        heading: "What I built",
        bullets: [
          "Chairman’s Message section on the home page, presenting the championship’s vision alongside the chairman’s portrait.",
          "Athletes page showcasing the competing athletes.",
          "Responsive UI work to match the site’s existing design.",
        ],
      },
    ],
    highlights: [],
  },
  {
    slug: "adma",
    company: "Acusync Technologies",
    title: "ADMA – Abu Dhabi Martial Arts Academy",
    cardDescription:
      "A martial arts academy platform for the UAE with membership purchasing and a checkout flow supporting Google Pay and MoMo Pay.",
    role: "Full Stack Developer",
    techStack: ["Laravel", "MySQL"],
    integrations: ["Google Pay", "MoMo Pay"],
    liveUrl: "https://www.adma.academy/",
    liveLabel: "adma.academy",
    overview:
      "ADMA is a martial arts academy with multiple locations across Abu Dhabi, Al Ain, and Dubai, offering Brazilian Jiu-Jitsu, Muay Thai, MMA, wrestling, and boxing. Visitors can explore the academy, book a trial class, and purchase memberships online. I built the project from the ground up on Laravel and MySQL.",
    featureSections: [
      {
        heading: "What I built",
        bullets: [
          "UI for the public website and the member-facing pages.",
          "Membership module: members choose a plan and purchase a membership online.",
          "Checkout flow with Google Pay and MoMo Pay payment options.",
          "Database design and backend logic in MySQL.",
        ],
      },
    ],
    highlights: [],
  },
  {
    slug: "emirati-coffee",
    company: "Acusync Technologies",
    title: "Emirati Coffee – Coffee Subscription Store",
    cardDescription:
      "A UAE coffee store with flexible subscriptions. I built the subscription module, guest checkout, and Stripe payments on top of an existing codebase.",
    role: "Laravel Developer (second developer on an existing codebase)",
    techStack: ["Laravel", "MySQL"],
    integrations: ["Stripe"],
    overview:
      "Emirati Coffee is a UAE-based online coffee store. I joined as the second developer, working inside code that another developer had started, so I had to read, understand, and extend an existing system. The UI was built by someone else, and my work covered the backend features below.",
    featureSections: [
      {
        heading: "What I built",
        groups: [
          {
            title: "Subscription module",
            bullets: [
              "Subscription plans of 3, 6, and 12 months.",
              "Flexible delivery schedules: a customer can choose how many deliveries they want within a plan, for example 12 weekly deliveries across a 6-month subscription.",
              "Date and quantity calculations that generate each delivery date and the amount of coffee per delivery.",
            ],
          },
          {
            title: "Checkout",
            bullets: [
              "Guest checkout, so customers can buy without creating an account.",
              "Stripe integration for secure payments.",
            ],
          },
        ],
      },
    ],
    highlights: [],
    screenshots: emiratiScreenshots,
  },
  {
    slug: "dubai-street-kitties",
    company: "Acusync Technologies",
    title: "Dubai Street Kitties – Cat Rescue & Adoption Platform",
    cardDescription:
      "A public adoption website and admin portal for a UAE cat sanctuary, with advanced cat filtering, detailed medical profiles, and a full management dashboard.",
    role: "Full Stack Developer",
    techStack: [
      "Laravel 12",
      "React 18",
      "Inertia.js",
      "Tailwind CSS",
      "Vite",
      "Headless UI",
      "Inertia SSR",
      "Spatie Laravel Permission",
      "Laravel Sanctum",
    ],
    integrations: [],
    liveUrl: "https://www.dubaistreetkitties.com/",
    liveLabel: "dubaistreetkitties.com",
    overview:
      "Dubai Street Kitties has two parts. The public website lets visitors browse rescue cats, view detailed medical and personality profiles, read about the sanctuary, and send adoption or support inquiries. The admin portal lets sanctuary staff manage cats, photos, medical records and expenses in AED, categories, the gallery, users, and reports.",
    featureSections: [
      {
        heading: "Public website",
        bullets: [
          "Home page with sanctuary highlights, the latest available cats, and a pet-sitting section.",
          "Available Cats page with server-side search and filters for breed, age, gender, vaccination status, personality traits, and compatibility (special needs, good with kids, good for apartments, friendly with dogs), with “Load More” pagination.",
          "Cat profile with an image gallery slider, health and behavior badges, and a downloadable medical report.",
          "Gallery with category tabs, adoption and international adoption guides, support and volunteering pages, and a contact page.",
          "SEO meta tags on every page, and server-side rendering through Inertia SSR.",
        ],
      },
      {
        heading: "Admin portal",
        bullets: [
          "Dashboard showing total, available, adopted, and fostered cats, adoption rate, and total medical costs in AED.",
          "Full cat management with status tabs, multi-image upload, and drag-and-drop photo reordering.",
          "Medical records timeline for vet visits, procedures, and vaccinations, with costs.",
          "Manageable dropdowns: admins add, rename, or delete options such as breeds and traits from the UI, and changes sync to existing records.",
          "Category and gallery management, with server-side image resizing.",
          "Reports with status breakdowns and 6-month added-versus-adopted trends.",
          "Role-based access for admin, volunteer, and adopter roles, plus contact-message and user management.",
        ],
      },
    ],
    highlights: [],
  },
  {
    slug: "bison-tradeworks",
    company: "Acusync Technologies",
    title: "Bison TradeWorks – B2B Sourcing Platform",
    cardDescription:
      "A bilingual B2B platform connecting Mexican manufacturers with US and Canadian brands and retailers, with a product catalogue, lead capture, and a full CMS-style admin.",
    role: "Full Stack Developer",
    techStack: [
      "Laravel",
      "PHP 8.3",
      "React 18",
      "Inertia.js",
      "Vite",
      "Tailwind CSS",
      "Headless UI",
      "MySQL",
    ],
    integrations: [],
    overview:
      "Bison TradeWorks connects vetted manufacturers in León, Guanajuato (Mexico) with brands and retailers in the US and Canada. The site serves three audiences: brands that need custom contract manufacturing, retailers who want ready-made leather and crafted goods, and manufacturers who want direct access to North American buyers.",
    featureSections: [
      {
        heading: "Public website",
        bullets: [
          "Dedicated pages for Brands, Retailers, Manufacturers, About, and Contact, plus intent-based landing routes such as “Request a Quote” and “Become a Partner”.",
          "Filterable product catalogue by category, with detail pages and multi-image galleries.",
          "Lead capture: a contact form that adapts its copy to the visitor’s intent, with rate limiting, database storage, and email notifications.",
          "Bilingual (English/Spanish): database-driven translations with caching and fallback, locale-aware product URLs, and automatic language detection with a live language toggle.",
        ],
      },
      {
        heading: "Admin panel",
        bullets: [
          "Dashboard with new and total submissions and active product counts.",
          "Product editor with a tab per language, automatic slugs, and a multi-image uploader (up to 12 images, with server-side resizing and WebP conversion).",
          "Contact submissions CRM with intent and status filters.",
          "Language and translation manager: add languages, track missing translations, and edit strings side by side.",
          "Role-based access with four roles and 13 permissions, plus audit logging of admin actions with user, IP, and timestamp.",
        ],
      },
      {
        heading: "SEO and security",
        bullets: [
          "Meta tags, canonical links, Open Graph tags, JSON-LD structured data, a dynamic XML sitemap, and robots.txt.",
          "Security headers, rate limiting on sensitive routes, and public registration disabled.",
        ],
      },
    ],
    highlights: [],
    screenshots: bisonScreenshots,
  },
  {
    slug: "al-salama-training",
    company: "Acusync Technologies",
    title: "Al Salama – Training & Event Scheduling System",
    cardDescription:
      "A real-time training and event scheduling system for a UAE safety training company, with a live calendar, trainer conflict detection, capacity checks, and expiry tracking.",
    role: "Full Stack Developer",
    techStack: [
      "Next.js 15",
      "React 19",
      "Firebase (Authentication and Cloud Firestore)",
      "Material UI",
      "Bootstrap",
    ],
    integrations: ["Google Places API"],
    liveUrl: "https://event.alsalama.ae/",
    liveLabel: "event.alsalama.ae",
    overview:
      "Al Salama is a UAE-based corporate training and safety company. This system lets the team manage training sessions, site visits, trainer schedules, training center capacity, courses, and training expirations in one place. Changes appear live for every user through real-time database listeners.",
    featureSections: [
      {
        heading: "Core features",
        groups: [
          {
            title: "Real-time calendar",
            bullets: [
              "Month, week, and day views synced live with Firestore.",
              "Overlapping events are clustered and displayed side by side in the week and day views.",
              "Color-coded events for site visits, client locations, and Al Salama center sessions.",
            ],
          },
          {
            title: "Smart booking and conflict detection",
            bullets: [
              "Location-aware trainer clash check: a trainer cannot be double-booked, with no buffer between sessions at the same location and a 60-minute travel buffer between different locations.",
              "Events can include multiple client companies, and the total trainees are validated against the training center’s maximum capacity.",
              "UAE-restricted Google Places search for client and site-visit locations, with direct Google Maps links in the event view.",
            ],
          },
          {
            title: "Filtering",
            bullets: [
              "Advanced filter drawer by availability, event type (training or site visit), courses, training centers, trainers, and sales managers.",
            ],
          },
          {
            title: "Expired trainings tracker",
            bullets: [
              "Tracks expired trainings based on each course’s validity period, with a live badge count in the navbar and a company-wise list.",
            ],
          },
          {
            title: "Recycle bin",
            bullets: [
              "Deleted events are soft-deleted and can be restored, permanently deleted, or batch-emptied.",
            ],
          },
          {
            title: "Admin modules",
            bullets: [
              "Staff management and monthly trainer workload stats (events attended and total hours).",
              "Full management of training centers (address and capacity) and courses (name, duration, validity).",
            ],
          },
          {
            title: "Access and usability",
            bullets: [
              "Firebase email/password login with admin and viewer roles, password reset, and a change-password flow with re-authentication.",
              "Dark and light themes, with a responsive mobile navigation drawer.",
            ],
          },
        ],
      },
    ],
    highlights: [
      "Real-time collaboration: every user sees schedule changes instantly.",
      "Scheduling rules that account for travel time and venue capacity, preventing double-booking.",
    ],
  },
  {
    slug: "smart-renovation",
    company: "Acusync Technologies",
    title: "Smart Renovation – Luxury Design & Fit-Out Website with Custom CMS",
    cardDescription:
      "A corporate website and custom CMS for a Dubai luxury interior design and renovation studio, with room-tagged project galleries, a queued image pipeline, and a database-driven SEO redirect engine.",
    role: "Full Stack Developer",
    techStack: [
      "Laravel 13",
      "PHP 8.3",
      "React 18",
      "TypeScript",
      "Inertia.js",
      "Tailwind CSS",
      "Vite",
      "MySQL",
      "Spatie Media Library",
      "Spatie Permission",
      "TipTap editor",
      "PHPUnit",
    ],
    integrations: [],
    liveUrl: "https://smartrenovation.acusync.net/",
    liveLabel: "smartrenovation.acusync.net",
    overview:
      "Smart Renovation is a Dubai-based luxury interior design, turnkey renovation, and fit-out studio. I built a fast, SEO-friendly public website together with a complete custom admin CMS, so the client can manage projects, galleries, services, articles, press releases, awards, reviews, redirects, and contact leads without developer help. The migration preserved the existing SEO structure.",
    featureSections: [
      {
        heading: "Public website",
        bullets: [
          "Home page with a hero video, featured projects, an awards slider, client reviews, a 3-step renovation process, and WhatsApp and contact calls to action.",
          "Works portfolio with filters for category, location, room type, and search, plus detailed project gallery pages.",
          "Service pages, editorial articles, press coverage with downloadable PDFs, and curated collection pages.",
          "Rate-limited contact form, a thank-you conversion page, a floating WhatsApp button, and Google Tag Manager and GA4 support configured from site settings.",
        ],
      },
      {
        heading: "Custom admin CMS",
        bullets: [
          "Dashboard showing published and draft counts, weekly and total leads, and recent content.",
          "Dual gallery manager: each project has a public gallery and a hidden gallery, with image transfer between them, room-wise tagging, drag-and-drop ordering, and one-click cover promotion.",
          "Management for categories, locations, services, articles, press items, collection items, awards, client reviews, static pages, and a leads inbox.",
          "Role-based access for super-admin and editor roles.",
          "Rich-text editor (TipTap) with image uploads and YouTube embeds, backed by server-side HTML sanitization.",
        ],
      },
      {
        heading: "Performance and SEO",
        bullets: [
          "Queued media pipeline: large, high-resolution photos are processed in the background into thumbnail, card, and large versions.",
          "Dynamic XML sitemap and JSON-LD structured data.",
          "Database-driven 301/302/307/308 redirect engine, so old URLs keep working and search rankings are preserved.",
          "Legacy SEO URLs from the previous site kept intact.",
        ],
      },
      {
        heading: "Migration and quality",
        bullets: [
          "Custom Artisan commands imported legacy projects, services, articles, and room tags into the new CMS.",
          "PHPUnit tests covering project CRUD, dual galleries, cover promotion, media uploads, the rich-text editor, redirects, authentication, and HTML sanitization.",
        ],
      },
    ],
    highlights: [],
  },
  {
    slug: "mr-barni",
    company: "Acusync Technologies",
    title: "Mr. Barni – UAE Real Estate Marketplace",
    cardDescription:
      "A multi-role UAE property marketplace for agencies, agents, sellers, investors, and buyers, with verified listings, a lead CRM, and an admin moderation panel.",
    role: "Full Stack Developer",
    techStack: [
      "Laravel 13",
      "PHP 8.3",
      "React 18",
      "TypeScript",
      "Inertia.js",
      "Tailwind CSS",
      "MySQL",
      "Spatie Permission",
      "TipTap",
      "Google2FA",
      "Vite PWA",
    ],
    integrations: [],
    overview:
      "Mr. Barni is a Dubai-focused real estate marketplace and multi-role property portal. Public visitors search and filter properties and send inquiries, while agencies, agents, sellers, investors, buyers, and admins each get their own workflows and dashboards.",
    featureSections: [
      {
        heading: "Public marketplace",
        bullets: [
          "Featured and latest listings with multi-filter search by transaction type (sale or rent), category (residential, off-plan, commercial, land), emirate, price range, bedrooms, and sorting. Similar properties appear on each detail page.",
          "UAE-specific listing fields: AED pricing, RERA permit and broker numbers, off-plan details (developer, project, completion date, payment plan), commercial subtypes, and land zoning, with a Google Maps embed.",
          "Verification badges for approved agencies, agents, sellers, and RERA details.",
          "Lead capture through a rate-limited inquiry form and WhatsApp click tracking.",
          "Favorites and saved searches for logged-in users.",
        ],
      },
      {
        heading: "Accounts and security",
        bullets: [
          "6-digit email verification, role selection after signup, and a role-specific onboarding form for each user type.",
          "Two-factor authentication (TOTP with recovery codes) for admins.",
          "Security headers, HTML sanitization, and ownership documents stored privately so only the owner or an admin can open them.",
        ],
      },
      {
        heading: "Listing management",
        bullets: [
          "Multi-step listing form with a rich-text description, ordered photos and videos, and ownership proof documents.",
          "Staged change requests: edits to a published listing don’t go live immediately. They are saved as a change request and applied after admin approval.",
        ],
      },
      {
        heading: "Agency, agent, and seller portals",
        bullets: [
          "Role dashboards with listing and lead counts, status charts, and 30-day activity.",
          "Lead inbox with filters, a status pipeline (new, contacted, qualified, closed), notes, and direct email replies.",
          "Agencies can view and manage their linked agents.",
        ],
      },
      {
        heading: "Investor portal (foundation)",
        bullets: [
          "Investor preferences (goal, budget, risk level) and a property watchlist with statuses (watching, shortlisted, portfolio), target yield, and notes.",
        ],
      },
      {
        heading: "Admin panel",
        bullets: [
          "KPI dashboard with 30-day charts for signups, listings, and leads.",
          "User, role, and permission management, including suspension and two-factor reset.",
          "Approval workflows for agency, agent, and seller verification.",
          "Listing moderation with a side-by-side comparison of the live and proposed versions of an edited listing.",
          "Filterable audit log of 22 tracked actions and live previews of system email templates.",
        ],
      },
      {
        heading: "Installable web app",
        bullets: [
          "Progressive web app support with a service worker, offline fallback page, and an install prompt.",
        ],
      },
    ],
    highlights: [],
    screenshots: mrBarniScreenshots,
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
