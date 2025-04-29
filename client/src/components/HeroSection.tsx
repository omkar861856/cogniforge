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
    <section className="relative py-10 md:py-16 lg:py-24 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-mega font-black tracking-tight text-gray-900 text-size-fluid leading-tight">
          Think <span className="text-indigo-600">BIGGER</span>
        </h1>
        <p className="mt-6 text-2xl md:text-4xl lg:text-5xl text-subheading-fluid text-gray-600 max-w-4xl leading-snug">
          A landing page where typography takes center stage, making a bold statement that's impossible to ignore.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => scrollToSection("contact")}
            className="text-xl md:text-3xl lg:text-4xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105 h-auto"
          >
            Get Started
          </Button>
          <Button 
            variant="outline"
            onClick={() => scrollToSection("features")}
            className="text-xl md:text-3xl lg:text-4xl bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-4 px-8 rounded-xl border border-indigo-200 transition-colors h-auto"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
