"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Crown,
  Check,
  X,
  Star,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  Sparkles,
  Gift,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

// Types
interface Plan {
  id: "gratuit" | "premium";
  name: string;
  price: string;
  period: string;
  description: string;
  features: { text: string; included: boolean; info?: string }[];
  cta: string;
  popular?: boolean;
}

// Composant FAQ
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium text-charcoal">{question}</span>
        <ChevronDown
          size={20}
          className={`text-slate transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-4 text-slate">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function AbonnementPage() {
  const { user, isPremium } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");

  const plans: Plan[] = [
    {
      id: "gratuit",
      name: "Gratuit",
      price: "0€",
      period: "pour toujours",
      description: "Parfait pour découvrir MonFiscalFacile",
      features: [
        { text: "1 simulation de statut", included: true, info: "Comparez les statuts micro vs société une fois" },
        { text: "Calculatrices de base", included: true, info: "Frais km et cotisations sociales" },
        { text: "Profil fiscal", included: true },
        { text: "Simulations illimitées", included: false },
        { text: "Plan d'action personnalisé", included: false },
        { text: "Rappels fiscaux", included: false },
        { text: "Guides pratiques", included: false },
        { text: "Calculatrice TVA", included: false },
        { text: "Export PDF", included: false },
        { text: "Support prioritaire", included: false },
      ],
      cta: "Plan actuel",
    },
    {
      id: "premium",
      name: "Premium",
      price: billingPeriod === "yearly" ? "9€" : "12€",
      period: billingPeriod === "yearly" ? "/mois (108€/an)" : "/mois",
      description: "Pour optimiser vraiment votre fiscalité",
      features: [
        { text: "Simulations illimitées", included: true, info: "Comparez autant de scénarios que vous voulez" },
        { text: "Toutes les calculatrices", included: true, info: "TVA, frais km, cotisations, impôts..." },
        { text: "Plan d'action personnalisé", included: true, info: "Étapes concrètes pour optimiser vos impôts" },
        { text: "Rappels fiscaux", included: true, info: "Ne ratez plus aucune échéance" },
        { text: "Guides pratiques complets", included: true, info: "Micro-entreprise, EI, EURL, SASU..." },
        { text: "Export PDF professionnel", included: true },
        { text: "Support prioritaire", included: true },
        { text: "Mises à jour fiscales 2024", included: true },
        { text: "Garantie satisfait 30 jours", included: true },
        { text: "Accès à vie aux fonctionnalités", included: true },
      ],
      cta: "Passer Premium",
      popular: true,
    },
  ];

  const faqs = [
    {
      question: "Comment fonctionne le plan Premium ?",
      answer: "Une fois votre paiement effectué, vous avez accès immédiatement à toutes les fonctionnalités Premium. Votre abonnement se renouvelle automatiquement chaque mois ou chaque année selon votre choix.",
    },
    {
      question: "Puis-je annuler à tout moment ?",
      answer: "Oui, vous pouvez annuler votre abonnement à tout moment depuis cette page. Vous conservez l'accès Premium jusqu'à la fin de votre période de facturation.",
    },
    {
      question: "Que se passe-t-il si j'annule ?",
      answer: "Vous repassez au plan Gratuit avec accès limité. Vos données sont conservées, mais certaines fonctionnalités seront verrouillées.",
    },
    {
      question: "Y a-t-il une garantie satisfait ou remboursé ?",
      answer: "Oui ! Si vous n'êtes pas satisfait, contactez-nous dans les 30 jours suivant votre achat et nous vous remboursons intégralement.",
    },
    {
      question: "Comment sont sécurisés mes paiements ?",
      answer: "Nous utilisons Stripe, le leader mondial du paiement en ligne. Vos informations bancaires ne transitent jamais par nos serveurs.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
          {isPremium ? "Gérer mon abonnement" : "Passez au niveau supérieur"}
        </h1>
        <p className="text-slate max-w-xl mx-auto">
          {isPremium
            ? "Vous êtes actuellement membre Premium. Merci pour votre confiance !"
            : "Débloquez toutes les fonctionnalités pour optimiser votre fiscalité au maximum."}
        </p>
      </div>

      {/* Toggle mensuel/annuel */}
      {!isPremium && (
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={billingPeriod === "monthly" ? "text-charcoal font-medium" : "text-slate"}>
            Mensuel
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${
              billingPeriod === "yearly" ? "bg-primary-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow transition-transform ${
                billingPeriod === "yearly" ? "translate-x-6" : ""
              }`}
            />
          </button>
          <span className={billingPeriod === "yearly" ? "text-charcoal font-medium" : "text-slate"}>
            Annuel
          </span>
          {billingPeriod === "yearly" && (
            <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Gift size={14} />
              -25%
            </span>
          )}
        </div>
      )}

      {/* Statut actuel si Premium */}
      {isPremium && (
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Crown className="w-8 h-8" />
              </div>
              <div>
                <p className="font-semibold text-lg">Membre Premium</p>
                <p className="opacity-90">Prochain renouvellement : 15 février 2025</p>
              </div>
            </div>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
              Gérer le paiement
            </button>
          </div>
        </div>
      )}

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white border rounded-xl p-6 ${
              plan.popular
                ? "border-primary-500 ring-2 ring-primary-100"
                : "border-gray-200"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary-500 text-white text-sm font-semibold px-4 py-1 rounded-full flex items-center gap-1">
                  <Star size={14} />
                  Populaire
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-charcoal mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-charcoal">{plan.price}</span>
                <span className="text-slate">{plan.period}</span>
              </div>
              <p className="text-sm text-slate mt-2">{plan.description}</p>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  {feature.included ? (
                    <Check size={20} className="text-primary-500 flex-shrink-0" />
                  ) : (
                    <X size={20} className="text-gray-300 flex-shrink-0" />
                  )}
                  <span className={feature.included ? "text-charcoal" : "text-gray-400"}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                plan.id === "premium" && !isPremium
                  ? "bg-primary-500 text-white hover:bg-primary-600"
                  : plan.id === "gratuit" && !isPremium
                  ? "bg-gray-100 text-slate cursor-default"
                  : "bg-gray-100 text-slate"
              }`}
              disabled={plan.id === "gratuit" || isPremium}
            >
              {isPremium && plan.id === "premium" ? (
                <>Plan actuel</>
              ) : isPremium && plan.id === "gratuit" ? (
                <>Rétrograder</>
              ) : (
                <>
                  {plan.cta}
                  {plan.id === "premium" && <ArrowRight size={18} />}
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Avantages */}
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-gray-50 rounded-xl p-5 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-charcoal mb-1">Paiement sécurisé</h4>
          <p className="text-sm text-slate">Via Stripe, vos données sont protégées</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-5 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-charcoal mb-1">Garantie 30 jours</h4>
          <p className="text-sm text-slate">Satisfait ou remboursé, sans condition</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-5 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="font-semibold text-charcoal mb-1">Accès instantané</h4>
          <p className="text-sm text-slate">Débloquez tout immédiatement</p>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
          <HelpCircle size={24} className="text-primary-500" />
          Questions fréquentes
        </h3>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="mt-8 text-center text-slate">
        <p>
          Une question ? Contactez-nous à{" "}
          <a href="mailto:support@monfiscalfacile.fr" className="text-primary-500 hover:underline">
            support@monfiscalfacile.fr
          </a>
        </p>
      </div>
    </div>
  );
}
