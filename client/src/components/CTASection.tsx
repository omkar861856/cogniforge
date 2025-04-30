import { Button } from "@/components/ui/button";

export default function CTASection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-amber-600 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading-fluid leading-tight mb-8">
          LET'S BUILD SOMETHING <span className="underline decoration-4 underline-offset-8">TOGETHER</span>
        </h2>
        <p className="text-xl md:text-3xl lg:text-4xl text-orange-50 leading-relaxed mb-12 max-w-4xl mx-auto">
          Have a project in mind? We're ready to bring your vision to life with cutting-edge web development and AI solutions.
        </p>
        <Button 
          onClick={scrollToContact}
          className="inline-block text-xl md:text-3xl lg:text-4xl bg-white hover:bg-orange-50 text-orange-500 font-semibold py-4 px-12 rounded-xl shadow-lg transition-all transform hover:scale-105 h-auto"
        >
          Get In Touch Now
        </Button>
      </div>
    </section>
  );
}
