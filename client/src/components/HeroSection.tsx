import { Button } from "@/components/ui/button";

export default function HeroSection() {
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
    <section className="relative py-10 md:py-16 lg:py-24 px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-white via-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 md:mb-6 text-xl md:text-2xl lg:text-3xl font-medium text-orange-600">
          Innovative AI Solutions
        </div>
        <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-mega font-black tracking-tight text-gray-900 text-size-fluid leading-tight">
          <span className="text-orange-600">COGNIFORGE AI</span> <br />
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">WEB DEVELOPMENT</span>
        </h1>
        <p className="mt-6 text-2xl md:text-4xl lg:text-5xl text-subheading-fluid text-gray-600 max-w-4xl leading-snug">
          Building micro/mini SaaS solutions and specialized AI agents for business automation | Custom web development
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => scrollToSection("projects")}
            className="text-xl md:text-3xl lg:text-4xl bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105 h-auto"
          >
            View Projects
          </Button>
          <Button 
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="text-xl md:text-3xl lg:text-4xl bg-white hover:bg-orange-50 text-orange-500 font-semibold py-4 px-8 rounded-xl border border-orange-200 transition-colors h-auto"
          >
            Contact Me
          </Button>
        </div>
      </div>
    </section>
  );
}
