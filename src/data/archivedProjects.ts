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
];

export const archivedProjectFilters = [
  "All",
  "Full Stack",
  "Frontend",
  "eCommerce",
  "Marketplace",
  "Real Estate",
];
