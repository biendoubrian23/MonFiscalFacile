import { TrendingUp, Shield, CheckSquare, Zap, Clock, Award } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Jusqu'à 1 700€ récupérés",
      description: "C'est ce que nos utilisateurs économisent en moyenne. Et vous ?",
      stat: "89%",
      statLabel: "trouvent des économies"
    },
    {
      icon: Shield,
      title: "100% conforme",
      description: "Chaque suggestion est validée par la réglementation fiscale française.",
      stat: "0",
      statLabel: "risque juridique"
    },
    {
      icon: CheckSquare,
      title: "Rien n'est oublié",
      description: "On vous guide case par case pour ne rater aucune déduction.",
      stat: "47",
      statLabel: "réductions analysées"
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-500 uppercase tracking-widest mb-3">
            Pourquoi nous faire confiance
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Ce qui change tout
          </h2>
          <p className="text-lg text-slate max-w-xl mx-auto">
            Fini les heures perdues. Fini les doutes. Place aux résultats.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className="group relative bg-offwhite border-l-4 border-l-primary-500 p-8 hover:bg-charcoal transition-all duration-300"
            >
              {/* Stat en grand */}
              <div className="mb-6">
                <span className="text-5xl font-black text-primary-500 group-hover:text-primary-400 transition-colors">
                  {benefit.stat}
                </span>
                <span className="block text-xs text-slate group-hover:text-white/60 mt-1 uppercase tracking-wide transition-colors">
                  {benefit.statLabel}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-charcoal group-hover:text-white mb-2 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-slate group-hover:text-white/80 text-sm leading-relaxed transition-colors">
                {benefit.description}
              </p>

              {/* Icône subtile */}
              <benefit.icon className="absolute top-6 right-6 w-5 h-5 text-slate/20 group-hover:text-white/20 transition-colors" strokeWidth={1.5} />
            </div>
          ))}
        </div>

        {/* Barre de réassurance */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="py-4">
            <div className="text-2xl font-bold text-charcoal">5 689+</div>
            <div className="text-xs text-slate uppercase tracking-wide">utilisateurs</div>
          </div>
          <div className="py-4">
            <div className="text-2xl font-bold text-charcoal">4.9/5</div>
            <div className="text-xs text-slate uppercase tracking-wide">satisfaction</div>
          </div>
          <div className="py-4">
            <div className="text-2xl font-bold text-charcoal">2025</div>
            <div className="text-xs text-slate uppercase tracking-wide">barème à jour</div>
          </div>
          <div className="py-4">
            <div className="text-2xl font-bold text-charcoal">Gratuit</div>
            <div className="text-xs text-slate uppercase tracking-wide">pour commencer</div>
          </div>
        </div>
      </div>
    </section>
  );
}
