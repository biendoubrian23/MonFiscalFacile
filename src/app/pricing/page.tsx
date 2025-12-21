import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Check, X, Star, Shield, Zap, Clock } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "pour toujours",
      description: "Pour découvrir votre potentiel d'économies",
      features: [
        "Simulation fiscale complète",
        "Estimation de vos impôts actuels",
        "Aperçu des économies possibles",
        "Comparatif avant/après",
      ],
      cta: "Commencer gratuitement",
      href: "/simulation",
      highlighted: false
    },
    {
      name: "Premium",
      price: "12€",
      period: "par mois",
      description: "Pour passer à l'action et économiser vraiment",
      features: [
        "Tout du plan Gratuit",
        "Simulations illimitées",
        "Plan d'action personnalisé",
        "Guides étape par étape",
        "Rappels fiscaux automatiques",
        "Historique des simulations",
        "Support prioritaire",
      ],
      cta: "Débloquer Premium",
      href: "/connexion",
      highlighted: true
    }
  ];

  // Tableau comparatif détaillé
  const comparaison = [
    { feature: "Simulation fiscale", gratuit: true, premium: true },
    { feature: "Estimation des impôts", gratuit: true, premium: true },
    { feature: "Aperçu des économies", gratuit: true, premium: true },
    { feature: "Simulations illimitées", gratuit: false, premium: true },
    { feature: "Plan d'action complet", gratuit: false, premium: true },
    { feature: "Guides pas à pas", gratuit: false, premium: true },
    { feature: "Rappels échéances fiscales", gratuit: false, premium: true },
    { feature: "Historique simulations", gratuit: false, premium: true },
    { feature: "Support prioritaire", gratuit: false, premium: true },
  ];

  // Témoignages
  const temoignages = [
    {
      nom: "Sophie M.",
      role: "Freelance en communication",
      texte: "J'ai économisé 2 800€ sur mes impôts grâce aux optimisations suggérées. L'abonnement est rentabilisé x20 !",
      note: 5,
    },
    {
      nom: "Thomas L.",
      role: "Développeur indépendant",
      texte: "Enfin un outil simple pour comprendre ma fiscalité. Les guides sont clairs et les rappels m'évitent les oublis.",
      note: 5,
    },
    {
      nom: "Marie K.",
      role: "Coach professionnelle",
      texte: "Je recommande à tous les indépendants. L'interface est intuitive et les résultats concrets.",
      note: 5,
    },
  ];

  return (
    <main className="min-h-screen bg-offwhite">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-16">
            <span className="inline-block bg-primary-50 text-primary-600 px-4 py-2 text-sm font-medium mb-4">
              Investissement rentable
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
              12€/mois pour économiser des milliers
            </h1>
            <p className="text-xl text-slate max-w-2xl mx-auto">
              Nos utilisateurs économisent en moyenne 1 700€/an. ROI moyen : x12.
            </p>
          </div>

          {/* Cartes de prix */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`bg-white border p-8 relative ${
                  plan.highlighted 
                    ? "border-primary-500 ring-2 ring-primary-500" 
                    : "border-gray-200"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-sm font-medium px-4 py-1">
                    Le plus populaire
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

          {/* Garanties */}
          <div className="bg-white border border-gray-200 p-8 mb-20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-charcoal mb-2">
                Essayez sans risque
              </h3>
              <p className="text-slate">
                Nous croyons tellement en notre outil que nous vous offrons ces garanties
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-primary-500" />
                </div>
                <h4 className="font-semibold text-charcoal mb-2">Satisfait ou remboursé</h4>
                <p className="text-sm text-slate">
                  14 jours pour tester. Si vous n'êtes pas convaincu, on vous rembourse sans question.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-primary-500" />
                </div>
                <h4 className="font-semibold text-charcoal mb-2">Annulation immédiate</h4>
                <p className="text-sm text-slate">
                  Pas d'engagement. Annulez en 1 clic depuis votre espace, à tout moment.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-primary-500" />
                </div>
                <h4 className="font-semibold text-charcoal mb-2">Support réactif</h4>
                <p className="text-sm text-slate">
                  Une question ? Notre équipe répond sous 24h, week-end compris.
                </p>
              </div>
            </div>
          </div>

          {/* Tableau comparatif */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-charcoal mb-8 text-center">
              Comparatif détaillé
            </h3>
            
            <div className="bg-white border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-charcoal">Fonctionnalité</th>
                    <th className="text-center py-4 px-6 font-semibold text-charcoal">Gratuit</th>
                    <th className="text-center py-4 px-6 font-semibold text-charcoal bg-primary-50">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {comparaison.map((ligne, idx) => (
                    <tr key={ligne.feature} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="py-4 px-6 text-charcoal">{ligne.feature}</td>
                      <td className="text-center py-4 px-6">
                        {ligne.gratuit ? (
                          <Check className="w-5 h-5 text-primary-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="text-center py-4 px-6 bg-primary-50/50">
                        <Check className="w-5 h-5 text-primary-500 mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Témoignages */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-charcoal mb-8 text-center">
              Ce qu'en disent nos utilisateurs
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {temoignages.map((t) => (
                <div key={t.nom} className="bg-white border border-gray-200 p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.note)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-charcoal mb-4 italic">"{t.texte}"</p>
                  <div>
                    <p className="font-semibold text-charcoal">{t.nom}</p>
                    <p className="text-sm text-slate">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ rapide */}
          <div className="max-w-3xl mx-auto">
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

              <div className="bg-white border border-gray-200 p-6">
                <h4 className="font-semibold text-charcoal mb-2">
                  Comment fonctionne le remboursement ?
                </h4>
                <p className="text-slate">
                  Si vous n'êtes pas satisfait dans les 14 premiers jours, contactez-nous et nous vous remboursons intégralement, sans aucune question.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="mt-20 text-center bg-charcoal text-white p-12">
            <h3 className="text-3xl font-bold mb-4">
              Prêt à réduire vos impôts ?
            </h3>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Rejoignez les milliers d'indépendants qui optimisent leurs charges grâce à MonFiscalFacile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/simulation"
                className="bg-white text-charcoal px-8 py-4 font-semibold hover:bg-gray-100 transition-all"
              >
                Tester gratuitement
              </Link>
              <Link
                href="/connexion"
                className="bg-primary-500 text-white px-8 py-4 font-semibold hover:bg-primary-600 transition-all"
              >
                Passer Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
