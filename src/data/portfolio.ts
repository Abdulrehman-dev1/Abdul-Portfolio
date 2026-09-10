export const profile = {
  name: "Abdulrehman Majid",
  title: "Full Stack Developer",
  tagline:
    "Engineering scalable, high-performance web applications, auction marketplaces, and complex eCommerce architectures with Laravel, Next.js, and React.",
  bio: "Full Stack Developer with 2 years of professional experience building production-ready web apps across enterprise eCommerce, auction engines, subscription systems, and property platforms. Currently Full Stack Developer at Acusync Technologies.",
  education: "Intermediate in Computer Science — Liaquat Govt. Degree Boys College, Karachi",
  company: "Acusync Technologies",
  email: "connecttoabdulrehman01@gmail.com",
  phone: "+92 319 8212626",
  location: "Karachi, Pakistan",
  github: "https://github.com/Abdulrehman-dev1",
  linkedin: "https://www.linkedin.com/in/abdul-rehman-9bb0a6398/",
};

export const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "10+", label: "Enterprise & Client Systems Built" },
  { value: "API", label: "Full Stack & Integration Specialist" },
];

export const techStack: { category: string; items: string[] }[] = [
  { category: "Backend & Logic", items: ["PHP", "Laravel", "Python", "RESTful API Design"] },
  {
    category: "Frontend",
    items: [
      "Next.js",
      "React.js",
      "Inertia.js",
      "Vue.js",
      "JavaScript",
      "Tailwind CSS",
      "HTML5 / CSS3",
    ],
  },
  { category: "Databases", items: ["MySQL", "Firebase Realtime Database"] },
  {
    category: "Integrations & Scraping",
    items: [
      "Google Pay",
      "MoMo Pay",
      "Google Maps / Places API",
      "BeautifulSoup",
      "Playwright",
    ],
  },
];

export type Project = {
  name: string;
  role: string;
  stack: string[];
  details: string;
  link: string;
  tags: string[];
  status?: string;
};

export const projects: Project[] = [
  {
    name: "XpertBid Marketplace & Auctions",
    role: "Lead Full Stack Developer",
    stack: ["Laravel", "Inertia.js", "React.js", "MySQL", "Python"],
    details:
      "Built marketplace workflows, auction bidding modules, RESTful APIs, and integrated automated Python scraping tools.",
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

export const projectFilters = ["All", "Full Stack", "Frontend", "eCommerce", "Marketplace", "Real Estate"];
