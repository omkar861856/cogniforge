export default function QuoteSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 px-6 lg:px-8 bg-indigo-50">
      <div className="max-w-6xl mx-auto">
        <blockquote className="text-3xl md:text-5xl lg:text-6xl font-light text-indigo-900 leading-tight italic">
          "Typography at this scale doesn't just communicate—it <span className="font-semibold">announces</span>."
        </blockquote>
        <div className="mt-8 md:mt-12 text-xl md:text-3xl text-indigo-700 font-medium">
          — Design Philosophy
        </div>
      </div>
    </section>
  );
}
