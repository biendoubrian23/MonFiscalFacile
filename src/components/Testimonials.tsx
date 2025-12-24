import { Quote, Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "J'ai découvert des réductions que je ne connaissais pas. Résultat : 890€ économisés cette année.",
      name: "Marie L.",
      role: "Assistante administrative",
      savings: "890€",
      stars: 5
    },
    {
      quote: "En 5 minutes, j'ai compris comment optimiser mes frais réels. Simple et efficace !",
      name: "Thomas D.",
      role: "Cadre commercial",
      savings: "1 240€",
      stars: 5
    },
    {
      quote: "Enfin un outil fiscal qui parle français, pas comptable. Je recommande à tous mes collègues.",
      name: "Sophie M.",
      role: "Infirmière",
      savings: "650€",
      stars: 5
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Ils ont optimisé leurs impôts
          </h2>
          <p className="text-lg text-slate max-w-2xl mx-auto">
            Des salariés comme vous qui ont fait le premier pas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.name}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col relative"
            >
              {/* Icône quote */}
              <div className="absolute -top-3 left-6">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center shadow-md">
                  <Quote size={18} className="text-white fill-white" />
                </div>
              </div>
              
              {/* Étoiles */}
              <div className="flex gap-1 mb-4 mt-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              {/* Citation */}
              <blockquote className="text-charcoal text-sm leading-relaxed mb-6 flex-grow">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Auteur et économies */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <span className="text-primary-600 font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary-500">
                    {testimonial.savings}
                  </p>
                  <p className="text-[10px] text-slate uppercase tracking-wide">économisés</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
