"use client";

import { useState } from "react";
import {
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  ChevronDown,
  BookOpen,
  Calculator,
  FileText,
  CreditCard,
  User,
  Bell,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

// Types
interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

// Composant FAQ accordéon
function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-charcoal pr-4">{item.question}</span>
        <ChevronDown
          size={20}
          className={`text-slate flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 text-slate border-t border-gray-100 pt-3">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function AidePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "Tout", icon: <HelpCircle size={18} /> },
    { id: "simulation", label: "Simulations", icon: <Calculator size={18} /> },
    { id: "compte", label: "Mon compte", icon: <User size={18} /> },
    { id: "abonnement", label: "Abonnement", icon: <CreditCard size={18} /> },
    { id: "fiscalite", label: "Fiscalité", icon: <FileText size={18} /> },
  ];

  const faqs: FAQItem[] = [
    // Simulations
    {
      question: "Comment lancer une nouvelle simulation ?",
      answer: "Cliquez sur le bouton 'Nouvelle simulation' dans le menu ou sur la page Vue d'ensemble. Vous serez guidé étape par étape pour renseigner vos informations (CA, charges, situation familiale) et obtenir une comparaison des différents statuts juridiques.",
      category: "simulation",
    },
    {
      question: "Que signifient les résultats de la simulation ?",
      answer: "La simulation compare plusieurs options : micro-entreprise, EI au réel, EURL à l'IS, SASU... Pour chaque option, vous voyez le revenu net après impôts et charges sociales. Le statut recommandé est celui qui maximise votre revenu net tout en prenant en compte vos contraintes (seuils, TVA, etc.).",
      category: "simulation",
    },
    {
      question: "Puis-je modifier une simulation existante ?",
      answer: "Oui ! Depuis la page 'Mes simulations', cliquez sur une simulation pour la consulter, puis sur 'Dupliquer' pour créer une variante avec des paramètres modifiés. Cela vous permet de comparer différents scénarios facilement.",
      category: "simulation",
    },
    {
      question: "Mes simulations sont-elles sauvegardées ?",
      answer: "Oui, toutes vos simulations sont automatiquement enregistrées et accessibles depuis la page 'Mes simulations'. Avec le plan Gratuit, seule votre dernière simulation est visible. Avec Premium, vous avez accès à tout votre historique.",
      category: "simulation",
    },
    // Compte
    {
      question: "Comment modifier mon profil fiscal ?",
      answer: "Rendez-vous sur la page 'Profil fiscal' depuis le menu. Vous pouvez y modifier votre situation familiale, vos revenus annexes, et d'autres informations qui influencent les calculs de vos simulations.",
      category: "compte",
    },
    {
      question: "Comment changer mon adresse email ?",
      answer: "Depuis la page 'Profil fiscal', cliquez sur 'Modifier mes informations'. Vous recevrez un email de confirmation sur votre nouvelle adresse.",
      category: "compte",
    },
    {
      question: "Comment supprimer mon compte ?",
      answer: "Contactez-nous à support@monfiscalfacile.fr avec votre demande de suppression. Nous traiterons votre demande sous 48h. Attention : toutes vos données et simulations seront définitivement effacées.",
      category: "compte",
    },
    // Abonnement
    {
      question: "Quelles sont les différences entre Gratuit et Premium ?",
      answer: "Le plan Gratuit vous permet de faire 1 simulation et d'accéder aux calculatrices de base. Le plan Premium débloque les simulations illimitées, le plan d'action personnalisé, les rappels fiscaux, tous les guides pratiques, et le support prioritaire.",
      category: "abonnement",
    },
    {
      question: "Comment passer au plan Premium ?",
      answer: "Rendez-vous sur la page 'Abonnement' depuis le menu et cliquez sur 'Passer Premium'. Le paiement est sécurisé via Stripe. Vous avez accès immédiatement à toutes les fonctionnalités.",
      category: "abonnement",
    },
    {
      question: "Puis-je annuler mon abonnement ?",
      answer: "Oui, à tout moment depuis la page 'Abonnement'. Vous conservez l'accès Premium jusqu'à la fin de votre période de facturation. Nous offrons également une garantie satisfait ou remboursé de 30 jours.",
      category: "abonnement",
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express) et les prélèvements SEPA via notre partenaire Stripe.",
      category: "abonnement",
    },
    // Fiscalité
    {
      question: "Comment fonctionne le barème des frais kilométriques ?",
      answer: "Le barème fiscal dépend de la puissance de votre véhicule (CV) et du nombre de km parcourus. Par exemple, pour 5 CV et 10 000 km, vous pouvez déduire environ 5 210€. Utilisez notre calculatrice 'Frais kilométriques' pour un calcul précis.",
      category: "fiscalite",
    },
    {
      question: "Qu'est-ce que le versement libératoire ?",
      answer: "C'est une option pour les micro-entrepreneurs permettant de payer l'impôt sur le revenu en même temps que les cotisations sociales (tous les mois ou trimestres). Le taux est fixe (1%, 1.7% ou 2.2% selon l'activité) au lieu du barème progressif.",
      category: "fiscalite",
    },
    {
      question: "Quelle est la différence entre EURL et SASU ?",
      answer: "L'EURL (gérant TNS) a des cotisations sociales plus faibles (~45% du bénéfice) mais moins de protection sociale. La SASU (président assimilé salarié) a des cotisations plus élevées (~80%) mais offre une meilleure couverture (chômage possible, retraite cadre). Le choix dépend de vos priorités et revenus.",
      category: "fiscalite",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-primary-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-charcoal mb-2">
          Comment pouvons-nous vous aider ?
        </h1>
        <p className="text-slate">
          Trouvez rapidement des réponses à vos questions
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" size={20} />
        <input
          type="text"
          placeholder="Rechercher dans l'aide..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-4 text-charcoal focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      </div>

      {/* Catégories */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-charcoal hover:bg-gray-200"
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Liste des FAQ */}
      <div className="space-y-3 mb-10">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, i) => <FAQAccordion key={i} item={faq} />)
        ) : (
          <div className="text-center py-10 text-slate">
            <HelpCircle size={40} className="mx-auto mb-3 opacity-50" />
            <p>Aucun résultat trouvé pour "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* Guides rapides */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
          <BookOpen size={22} className="text-primary-500" />
          Guides rapides
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="/mon-espace/guides"
            className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-charcoal group-hover:text-primary-600 transition-colors">
                  Bien démarrer en micro-entreprise
                </h4>
                <p className="text-sm text-slate mt-1">Les bases pour lancer votre activité</p>
              </div>
            </div>
          </a>
          <a
            href="/mon-espace/guides"
            className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={20} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-charcoal group-hover:text-primary-600 transition-colors">
                  Première simulation : mode d'emploi
                </h4>
                <p className="text-sm text-slate mt-1">Comment interpréter vos résultats</p>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-gradient-to-br from-gray-50 to-primary-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-charcoal mb-2">
          Vous n'avez pas trouvé votre réponse ?
        </h2>
        <p className="text-slate mb-6">
          Notre équipe est là pour vous aider. Nous répondons généralement sous 24h.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="mailto:support@monfiscalfacile.fr"
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Mail size={20} className="text-primary-600" />
            </div>
            <div>
              <h4 className="font-semibold text-charcoal">Par email</h4>
              <p className="text-sm text-primary-600">support@monfiscalfacile.fr</p>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageCircle size={20} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-charcoal">Chat en direct</h4>
              <p className="text-sm text-slate">Disponible en heures ouvrées</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
