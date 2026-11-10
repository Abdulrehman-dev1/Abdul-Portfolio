export type ArchivedProject = {
  name: string;
  role: string;
  stack: string[];
  details: string;
  link: string;
  tags: string[];
  status?: string;
};

export const archivedProjects: ArchivedProject[] = [
  {
    name: "XpertBid Marketplace & Auctions",
    role: "Lead Full Stack Developer",
    stack: ["Laravel", "Inertia.js", "React.js", "MySQL"],
    details:
      "Built marketplace workflows, auction bidding modules, RESTful APIs, and integrated Laravel-based web scrapers.",
    link: "https://www.xpertbid.com/",
    tags: ["Marketplace", "Full Stack"],
  },
  {
    name: "Mr. Barni Real Estate Marketplace",
    role: "Full Stack Developer (Frontend & Backend)",
    stack: ["Laravel", "Inertia.js", "React.js", "MySQL"],
    details:
      "Real estate platform for property buying, selling, and investing; built property listings, Google Maps integration, and checkout flows.",
    link: "https://mrbarni.acusync.net/",
    tags: ["Real Estate", "Full Stack"],
    status: "Under Development",
  },
  {
    name: "Emirati Coffee & Subscription Platform",
    role: "Full Stack Developer",
    stack: ["Laravel", "MySQL"],
    details:
      "Complete eCommerce overhaul including user authentication, guest checkout, multi-step ordering, coupon engine, and a full subscription management module.",
    link: "https://emirati.acusync.net/",
    tags: ["eCommerce", "Full Stack"],
  },
  {
    name: "Bison Services Platform",
    role: "Main Full Stack Developer",
    stack: ["Laravel", "Inertia.js", "React.js", "MySQL"],
    details: "Scalable service platform currently being transformed into an eCommerce solution.",
    link: "https://bison.acusync.net/",
    tags: ["eCommerce", "Full Stack"],
    status: "Transitioning to eCommerce",
  },
  {
    name: "Smart Property Services",
    role: "Frontend Developer",
    stack: ["Next.js", "Tailwind CSS"],
    details:
      "Modern, responsive real estate and property service interface built with high-speed Next.js client rendering.",
    link: "https://smart.acusync.net/",
    tags: ["Real Estate", "Frontend"],
  },
  {
    name: "Blackdot Invoicing System",
    role: "Solo Full Stack Developer",
    stack: ["Laravel", "Inertia.js", "Vue.js", "MySQL"],
    details: "Engineered a complete custom invoice and billing management platform from scratch.",
    link: "https://blackdot.acusync.net/",
    tags: ["Full Stack"],
  },
  {
    name: "ADXC Athletics Platform",
    role: "UI & Frontend Optimization Developer",
    stack: ["Laravel", "Blade", "Tailwind CSS"],
    details: "Athlete platform interface enhancements and frontend bug fixes.",
    link: "https://adxc.acusync.net/",
    tags: ["Frontend"],
  },
  {
    name: "AJP eCommerce Platform",
    role: "Full Stack Developer (Built Independently)",
    stack: ["Laravel", "Next.js", "MySQL"],
    details:
      "Full-scale physical and digital eCommerce platform with cart, checkout, and custom order management.",
    link: "https://ajp-frontend.vercel.app/",
    tags: ["eCommerce", "Full Stack"],
  },
];

export const archivedProjectFilters = [
  "All",
  "Full Stack",
  "Frontend",
  "eCommerce",
  "Marketplace",
  "Real Estate",
];
