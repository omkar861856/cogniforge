export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 px-6 lg:px-8 bg-orange-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading-fluid leading-tight mb-12 md:mb-16">
          <span className="text-orange-500">ABOUT</span> US
        </h2>
        
        <div className="text-xl md:text-3xl lg:text-4xl text-gray-700 leading-relaxed space-y-8">
          <p>
            At <span className="font-semibold text-orange-500">CogniForge AI</span>, we specialize in creating powerful micro/mini SaaS solutions and AI agents that transform business operations and communication.
          </p>
          
          <p>
            Our company focuses on developing specialized AI tools that automate repetitive tasks and enhance customer engagement through intelligent voice and chat agents.
          </p>
          
          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light text-orange-900 leading-tight italic pl-6 border-l-4 border-orange-500 mt-12 mb-12">
            "The best solutions don't just solve problems—they <span className="font-semibold">transform</span> how businesses <span className="font-semibold">operate</span>."
          </blockquote>
          
          <p>
            With expertise in both frontend and backend development, we build complete solutions from conception to deployment, focusing on clean design and powerful functionality that delivers real business value.
          </p>
        </div>
      </div>
    </section>
  );
}
