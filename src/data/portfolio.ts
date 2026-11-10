export const profile = {
  name: "Abdulrehman Majid",
  title: "Full Stack Developer",
  titles: [
    "Full Stack Developer",
    "Laravel Developer",
    "React.js Developer",
    "Next.js Developer",
    "PHP Developer",
    "API Developer",
  ],
  tagline:
    "Engineering scalable, high-performance web applications, auction marketplaces, and complex eCommerce architectures with Laravel, Next.js, and React.",
  bio: "Full Stack Developer with 2 years of professional experience building production-ready web apps across enterprise eCommerce, auction engines, subscription systems, and property platforms. Currently Full Stack Developer at XpertBid (part-time, remote), following nearly two years at Acusync Technologies.",
  education: "Intermediate in Computer Science — Liaquat Govt. Degree Boys College, Karachi",
  company: "XpertBid",
  email: "connecttoabdulrehman01@gmail.com",
  phone: "+92 319 8212626",
  location: "Karachi, Pakistan",
  github: "https://github.com/Abdulrehman-dev1",
  linkedin: "https://www.linkedin.com/in/abdulrehman-majid/",
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  details?: string;
  current: boolean;
};

export const experience: ExperienceItem[] = [
  {
    company: "XpertBid",
    role: "Full Stack Developer",
    period: "Aug 2025 – Present",
    details: "Part-time, Remote",
    current: true,
  },
  {
    company: "Acusync Technologies",
    role: "Full Stack Developer",
    period: "Dec 2024 – Oct 2026",
    current: false,
  },
];

export const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "10+", label: "Enterprise & Client Systems Built" },
  { value: "API", label: "Full Stack & Integration Specialist" },
];

export const techStack: { category: string; items: string[] }[] = [
  {
    category: "Backend",
    items: ["PHP", "Laravel", "CodeIgniter", "Python", "RESTful APIs", "RBAC"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "Vue.js", "Inertia.js", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    category: "Databases",
    items: ["MySQL", "Firebase", "Redis"],
  },
  {
    category: "Integrations",
    items: ["Stripe", "PayFast", "Google Maps & Places APIs"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Postman", "Cursor", "Antigravity"],
  },
];
