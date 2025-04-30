export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 px-6 lg:px-8 bg-indigo-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading-fluid leading-tight mb-12 md:mb-16">
          <span className="text-indigo-600">ABOUT</span> ME
        </h2>
        
        <div className="text-xl md:text-3xl lg:text-4xl text-gray-700 leading-relaxed space-y-8">
          <p>
            I specialize in creating powerful web solutions that leverage the latest in AI technology to transform business communication and operations.
          </p>
          
          <p>
            With expertise in both frontend and backend development, I build complete solutions from conception to deployment, focusing on clean design and powerful functionality.
          </p>
          
          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light text-indigo-900 leading-tight italic pl-6 border-l-4 border-indigo-600 mt-12 mb-12">
            "The best websites don't just <span className="font-semibold">exist</span>, they <span className="font-semibold">communicate</span> and <span className="font-semibold">convert</span>."
          </blockquote>
          
          <p>
            My approach combines technical excellence with strategic thinking to help businesses achieve their goals through effective digital presence.
          </p>
        </div>
      </div>
    </section>
  );
}
