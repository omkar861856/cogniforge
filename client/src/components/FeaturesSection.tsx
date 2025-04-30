import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProjectItem {
  title: string;
  description: string;
  link: string;
  technologies: string[];
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
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
      description: "Flagship product of our startup focusing on creating micro/mini SaaS solutions and specialized AI agents for business automation.",
      link: "#",
      technologies: ["AI/ML", "SaaS Architecture", "API Integration", "Cloud Infrastructure"]
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="relative py-24 md:py-32 lg:py-40 px-6 lg:px-8 bg-gradient-to-bl from-white via-orange-50 to-white overflow-hidden"
    >
      {/* Tech background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full text-orange-500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tech-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M0 10h10v10H0zm20 0h10v10H20zm0 20h10v10H20zM0 30h10v10H0z" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-pattern)" />
        </svg>
      </div>
      
      {/* Animated gradient background */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-64 opacity-20 pointer-events-none"
        style={{ 
          background: 'linear-gradient(90deg, rgba(255,97,0,0) 0%, rgba(255,97,0,0.3) 50%, rgba(255,97,0,0) 100%)',
        }}
        initial={{ y: 0 }}
        animate={{
          y: 800
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2 
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading-fluid leading-tight mb-16 md:mb-24 relative inline-block"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <span className="text-orange-500 ai-text-glow">FEATURED</span> PROJECTS
          <motion.span 
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-amber-300"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
        </motion.h2>
        
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="mb-24 md:mb-32 group relative"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.1 * (index + 1) }}
          >
            {/* Highlight bar */}
            <motion.div 
              className="absolute left-0 top-0 w-1 bg-gradient-to-b from-orange-400 to-amber-300 rounded-full"
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1, delay: 0.5 + (0.2 * index) }}
            />
            
            <div 
              className="pl-6 relative"
              style={{ perspective: '1000px' }}
            >
              {/* 3D Perspective Effect on the project title */}
              <motion.h3 
                className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 group-hover:text-orange-500 transition-colors duration-300 relative"
                whileHover={{ 
                  x: 10,
                  rotateY: 5,
                  textShadow: "0px 10px 20px rgba(249, 115, 22, 0.2)",
                  z: 30
                }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Add futuristic backdrop highlight on hover */}
                <motion.div
                  className="absolute -inset-4 rounded-xl opacity-0 group-hover:opacity-5 bg-orange-200"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.05 }}
                  transition={{ duration: 0.3 }}
                />
                
                {project.title}
                <motion.span
                  className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ✨
                </motion.span>
                
                {/* Futuristic underline bar */}
                <motion.div
                  className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"
                  initial={{ width: 0 }}
                  whileHover={{ width: "50%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.h3>
              
              <motion.p 
                className="text-xl md:text-3xl lg:text-4xl text-gray-600 leading-relaxed mb-6"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {project.description}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-3 mb-6"
                initial={{ opacity: 0.9, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.7 + (0.1 * index) }}
              >
                {project.technologies.map((tech, techIndex) => (
                  <motion.span 
                    key={techIndex} 
                    className="text-lg md:text-xl bg-orange-100 text-orange-800 px-4 py-2 rounded-full whitespace-nowrap backdrop-blur-sm"
                    whileHover={{ 
                      backgroundColor: "#fed7aa", 
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(255, 165, 0, 0.3)"
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
              
              <motion.a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xl md:text-2xl text-orange-500 font-semibold hover:text-orange-700 transition-colors inline-flex items-center gap-2 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <span>View Project</span>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </motion.a>
            </div>
            
            {/* Tech circuit paths - only visible on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,100 Q200,150 400,100 T800,100" fill="none" stroke="#f97316" strokeWidth="2" />
                <path d="M0,50 Q200,0 400,50 T800,50" fill="none" stroke="#fdba74" strokeWidth="1.5" />
                <path d="M0,150 Q200,200 400,150 T800,150" fill="none" stroke="#ffedd5" strokeWidth="1" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
