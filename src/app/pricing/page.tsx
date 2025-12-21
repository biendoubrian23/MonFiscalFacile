import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Découverte",
      price: "0€",
      period: "pour toujours",
      description: "Pour voir ce que vous pouvez économiser",
      features: [
        "Diagnostic fiscal complet",
        "Estimation de vos impôts",
        "Premières recommandations",
        "Comparatif avant/après"
      ],
      cta: "Commencer gratuitement",
      href: "/simulation",
      highlighted: false
    },
    {
      name: "Optimisation",
      price: "12€",
      period: "par mois",
      description: "Pour passer à l'action et économiser vraiment",
      features: [
        "Tout du plan Découverte",
        "Simulations illimitées",
        "Plan d'action personnalisé",
        "Alertes et rappels fiscaux",
        "Historique complet",
        "Support prioritaire"
      ],
      cta: "Débloquer l'optimisation",
      href: "/simulation?plan=pro",
      highlighted: true
    }
  ];

  return (
    <main className="min-h-screen bg-offwhite">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Un investissement rentable
            </h1>
            <p className="text-xl text-slate max-w-2xl mx-auto">
              Pour 12€/mois, économisez jusqu'à 1 700€/an. ROI : x12.
            </p>
          </div>

          {/* Cartes de prix */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`bg-white border p-8 ${
                  plan.highlighted 
                    ? "border-primary-500 ring-2 ring-primary-500" 
                    : "border-gray-200"
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-primary-500 text-white text-sm font-medium px-4 py-1 inline-block mb-4">
                    Recommandé
                  </div>
                )}
                
                <h2 className="text-2xl font-bold text-charcoal mb-2">
                  {plan.name}
                </h2>
                <p className="text-slate mb-6">
                  {plan.description}
                </p>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold text-charcoal">
                    {plan.price}
                  </span>
                  <span className="text-slate ml-2">
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <span className="text-charcoal">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block text-center px-8 py-4 font-semibold transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-primary-500 text-white hover:bg-primary-600"
                      : "border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ rapide */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-charcoal mb-8 text-center">
              Questions fréquentes
            </h3>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 p-6">
                <h4 className="font-semibold text-charcoal mb-2">
                  Puis-je annuler à tout moment ?
                </h4>
                <p className="text-slate">
                  Oui, vous pouvez annuler votre abonnement à tout moment. Pas de frais cachés, pas d'engagement.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6">
                <h4 className="font-semibold text-charcoal mb-2">
                  Est-ce que ça remplace un comptable ?
                </h4>
                <p className="text-slate">
                  Non, MonFiscalFacile est un outil d'aide à la décision. Pour des conseils personnalisés complexes, consultez un professionnel.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6">
                <h4 className="font-semibold text-charcoal mb-2">
                  Les suggestions sont-elles légales ?
                </h4>
                <p className="text-slate">
                  Absolument. Toutes nos recommandations sont basées sur la réglementation fiscale en vigueur. Aucune zone grise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
