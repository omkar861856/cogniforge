import { Link } from "wouter";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="py-12 md:py-16 px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-orange-400">COGNIFORGE AI</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("projects");
                  }}
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("about");
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.linkedin.com/in/cogniforge-ai-5833b7315" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="mailto:omkar861856@gmail.com" 
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-lg md:text-xl lg:text-2xl text-gray-300">AI Voice & Chat Agents</span></li>
              <li><span className="text-lg md:text-xl lg:text-2xl text-gray-300">Automation Solutions</span></li>
              <li><span className="text-lg md:text-xl lg:text-2xl text-gray-300">Custom Web Development</span></li>
            </ul>
          </div>
        </div>
        
        <div className="text-lg md:text-xl lg:text-2xl text-gray-400 border-t border-gray-800 pt-8">
          &copy; {new Date().getFullYear()} CogniForge AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
