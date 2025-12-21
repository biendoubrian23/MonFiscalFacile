import { TrendingUp, Shield, MessageCircle } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Économisez sans effort",
      description: "En moyenne, nos utilisateurs économisent 1 700€ par an sur leurs impôts."
    },
    {
      icon: Shield,
      title: "100% légal",
      description: "Toutes nos suggestions respectent la réglementation fiscale en vigueur."
    },
    {
      icon: MessageCircle,
      title: "Simple et clair",
      description: "Pas de jargon comptable. Des explications humaines que tout le monde comprend."
    }
  ];

  return (
    <section className="py-20 px-6 bg-offwhite">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Ce que vous gagnez
          </h2>
          <p className="text-lg text-slate max-w-2xl mx-auto">
            Une solution pensée pour les indépendants qui veulent optimiser sans se compliquer la vie.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title}
              className="bg-white border border-gray-200 p-8 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-50 flex items-center justify-center mb-6">
                <benefit.icon className="w-6 h-6 text-primary-500" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-semibold text-charcoal mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
