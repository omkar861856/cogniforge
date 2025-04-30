interface ProjectItem {
  title: string;
  description: string;
  link: string;
  technologies: string[];
}

export default function ProjectsSection() {
  const projects: ProjectItem[] = [
    {
      title: "Gym Membership Website",
      description: "A sleek, modern website designed to attract and convert gym membership leads with engaging design and optimized user experience.",
      link: "https://website3.dblfarmops.shop/",
      technologies: ["React", "TailwindCSS", "Next.js", "Responsive Design"]
    },
    {
      title: "Music Label Catalogue",
      description: "Portfolio website for a music label featuring their artist catalogue, releases, and upcoming events.",
      link: "https://website1.dblfarmops.shop/",
      technologies: ["React", "Node.js", "Express", "MongoDB"]
    },
    {
      title: "Legal Arbitrators Platform",
      description: "Professional website for legal arbitration services with client portals and case management features.",
      link: "https://website2.dblfarmops.shop/",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS", "Authentication"]
    },
    {
      title: "CogniForge AI Platform",
      description: "Flagship product of my startup focusing on creating micro/mini SaaS solutions and specialized AI agents for business automation.",
      link: "#",
      technologies: ["AI/ML", "SaaS Architecture", "API Integration", "Cloud Infrastructure"]
    },
  ];

  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading-fluid leading-tight mb-16 md:mb-24">
          <span className="text-orange-500">FEATURED</span> PROJECTS
        </h2>
        
        {projects.map((project, index) => (
          <div key={index} className="mb-24 md:mb-32 group">
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 group-hover:text-orange-500 transition-colors duration-300">{project.title}</h3>
            <p className="text-xl md:text-3xl lg:text-4xl text-gray-600 leading-relaxed mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="text-lg md:text-xl bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xl md:text-2xl text-orange-500 font-semibold hover:text-orange-700 transition-colors inline-flex items-center gap-2"
            >
              View Project 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
