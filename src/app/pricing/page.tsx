"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Check, X, Star, Shield, Zap, Clock } from "lucide-react";
import { useState } from "react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const gratuitFeatures = [
    "Simulation limitée",
    "Estimation approximative",
    "Conseils généraux sur quoi déclarer",
    "Accès limité aux guides",
  ];

  const premiumFeatures = [
    "Simulations illimitées",
    "Analyse complète de votre situation",
    "Checklist personnalisée case par case",
    "Guides détaillés pas à pas",
    "Calendrier fiscal + rappels",
    "Historique et comparaison N-1",
    "Support prioritaire par email",
    "Mises à jour barème en temps réel",
  ];

  // Tableau comparatif détaillé
  const comparaison = [
    { feature: "Simulation fiscale", gratuit: "Limitée", premium: "Illimitées" },
    { feature: "Calcul de l'impôt", gratuit: "Approximatif", premium: "Précis au centime" },
    { feature: "Réductions identifiées", gratuit: "Aperçu", premium: "47+ analysées" },
    { feature: "Checklist case par case", gratuit: false, premium: true },
    { feature: "Infos-bulles explicatives", gratuit: false, premium: true },
    { feature: "Calendrier fiscal + rappels", gratuit: false, premium: true },
    { feature: "Historique des simulations", gratuit: false, premium: true },
    { feature: "Comparaison année N-1", gratuit: false, premium: true },
    { feature: "Barème 2025 à jour", gratuit: true, premium: true },
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
              Un petit prix pour de grandes économies
            </h1>
            <p className="text-xl text-slate max-w-2xl mx-auto">
              Nos utilisateurs économisent en moyenne 1 700€/an. ROI moyen : x100.
            </p>

            {/* Toggle 3 mois / Annuel */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`font-medium ${!isAnnual ? "text-charcoal" : "text-slate"}`}>
                3 mois
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                  isAnnual ? "bg-primary-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    isAnnual ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={`font-medium ${isAnnual ? "text-charcoal" : "text-slate"}`}>
                Annuel
                <span className="ml-2 text-xs bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full">
                  -25%
                </span>
              </span>
            </div>
          </div>

          {/* Cartes de prix */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            {/* Carte Gratuit */}
            <div className="bg-white border border-gray-200 p-8 relative flex flex-col">
              <h2 className="text-2xl font-bold text-charcoal mb-2">
                Gratuit
              </h2>
              <p className="text-slate mb-6">
                Pour avoir un premier aperçu
              </p>
              
              <div className="mb-8">
                <span className="text-5xl font-bold text-charcoal">
                  0€
                </span>
                <span className="text-slate ml-2">
                  pour toujours
                </span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {gratuitFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-charcoal">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/simulation"
                className="block text-center px-8 py-4 font-semibold transition-all duration-200 mt-auto border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
              >
                Essayer gratuitement
              </Link>
            </div>

            {/* Carte Premium */}
            <div className="bg-white border-primary-500 ring-2 ring-primary-500 border p-8 relative flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-sm font-medium px-4 py-1">
                Le plus populaire
              </div>
              
              <h2 className="text-2xl font-bold text-charcoal mb-2">
                Premium
              </h2>
              <p className="text-slate mb-6">
                Pour vraiment économiser sur vos impôts
              </p>
              
              <div className="mb-8">
                <span className="text-5xl font-bold text-charcoal">
                  {isAnnual ? "19,99€" : "14,99€"}
                </span>
                <span className="text-slate ml-2">
                  {isAnnual ? "pour 1 an" : "pour 3 mois"}
                </span>
                {isAnnual && (
                  <span className="block text-sm text-primary-600 mt-1">
                    soit 1,67€/mois
                  </span>
                )}
                {!isAnnual && (
                  <span className="block text-sm text-primary-600 mt-1">
                    soit 5€/mois
                  </span>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {premiumFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-charcoal">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/connexion"
                className="block text-center px-8 py-4 font-semibold transition-all duration-200 mt-auto bg-primary-500 text-white hover:bg-primary-600"
              >
                Débloquer Premium
              </Link>
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
                        {typeof ligne.gratuit === "string" ? (
                          <span className="text-slate text-sm">{ligne.gratuit}</span>
                        ) : ligne.gratuit ? (
                          <Check className="w-5 h-5 text-primary-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="text-center py-4 px-6 bg-primary-50/50">
                        {typeof ligne.premium === "string" ? (
                          <span className="text-primary-600 font-medium text-sm">{ligne.premium}</span>
                        ) : (
                          <Check className="w-5 h-5 text-primary-500 mx-auto" />
                        )}
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
