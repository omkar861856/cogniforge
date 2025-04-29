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
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">BIG.</div>
        
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
                  href="#features" 
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("features");
                  }}
                >
                  Features
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
              <li><a href="#" className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-lg md:text-xl lg:text-2xl text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="text-lg md:text-xl lg:text-2xl text-gray-400 border-t border-gray-800 pt-8">
          &copy; {new Date().getFullYear()} BIG Typography. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
