import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { TechStack } from "@/components/portfolio/TechStack";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { GlowCursor } from "@/components/portfolio/primitives";
import { profile } from "@/data/portfolio";
import { projects } from "@/data/projects";

const title = "Abdulrehman Majid | Full Stack Developer";
const description =
  "Full Stack Developer building scalable marketplaces, auction engines, and property platforms with Laravel, Next.js, Vue, and React.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
      email: `mailto:${profile.email}`,
      telephone: profile.phone,
      address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
      url: profile.github,
      sameAs: [profile.github, profile.linkedin],
      worksFor: { "@type": "Organization", name: profile.company },
      knowsAbout: [
        "Laravel",
        "PHP",
        "Next.js",
        "React.js",
        "Vue.js",
        "Inertia.js",
        "MySQL",
        "Redis",
        "Python",
      ],
    },
    {
      "@type": "ProfilePage",
      name: title,
      description,
      about: { "@type": "Person", name: profile.name },
      hasPart: projects.map((p) => ({
        "@type": "CreativeWork",
        name: p.title,
        ...(p.liveUrl ? { url: p.liveUrl } : {}),
        description: p.cardDescription,
      })),
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background">
      <GlowCursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
