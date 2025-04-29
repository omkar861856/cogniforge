interface FeatureItem {
  title: string;
  description: string;
}

export default function FeaturesSection() {
  const features: FeatureItem[] = [
    {
      title: "Maximum Impact",
      description: "Large typography commands attention and creates an immediate, powerful impression on your visitors.",
    },
    {
      title: "Clear Hierarchy",
      description: "Oversized text naturally creates visual hierarchy, guiding the user's eye exactly where you want it to go.",
    },
    {
      title: "Memorable Design",
      description: "Bold typography creates a lasting impression that visitors will remember long after they've left your site.",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 lg:py-32 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading-fluid leading-tight mb-16 md:mb-24">
          Why go <span className="text-indigo-600">BIG</span>
        </h2>
        
        {features.map((feature, index) => (
          <div key={index} className="mb-24 md:mb-32">
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8">{feature.title}</h3>
            <p className="text-xl md:text-3xl lg:text-4xl text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
