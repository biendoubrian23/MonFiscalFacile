export default function Testimonials() {
  const testimonials = [
    {
      quote: "J'ai découvert que je sous-déclarais mes dépenses pro. Résultat : 2 100€ économisés cette année.",
      name: "Marie L.",
      role: "Graphiste freelance",
      savings: "2 100€"
    },
    {
      quote: "En 5 minutes, j'ai compris pourquoi je payais trop. Le changement de régime m'a fait gagner 1 800€.",
      name: "Thomas D.",
      role: "Consultant IT",
      savings: "1 800€"
    },
    {
      quote: "Enfin un outil fiscal qui parle français, pas comptable. Simple et efficace.",
      name: "Sophie M.",
      role: "Auto-entrepreneur",
      savings: "1 200€"
    }
  ];

  return (
    <section className="py-20 px-6 bg-offwhite">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Ils ont optimisé leurs impôts
          </h2>
          <p className="text-lg text-slate max-w-2xl mx-auto">
            Des indépendants comme vous qui ont fait le premier pas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.name}
              className="bg-white border border-gray-200 p-8 hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Citation */}
              <blockquote className="text-charcoal mb-6 flex-grow">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Auteur */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div>
                  <p className="font-semibold text-charcoal">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate">
                    {testimonial.role}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary-500">
                    {testimonial.savings}
                  </p>
                  <p className="text-xs text-slate">économisés</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
