"use client";

import { useState } from "react";
import { Lightbulb, TrendingUp, Gift, PiggyBank, Heart, Home, ChevronRight, Check, X, Sparkles } from "lucide-react";

interface Opportunite {
  id: string;
  titre: string;
  description: string;
  economie: number;
  cout: number;
  coutReel: number;
  icon: React.ReactNode;
  categorie: "epargne" | "don" | "logement" | "famille";
  exemple: string;
  dismissed: boolean;
}

// Données simulées basées sur le profil utilisateur
const mockUserData = {
  tmi: 11, // %
  impotActuel: 1664,
  salaireNet: 30000,
  hasPER: false,
  hasDons: false,
  hasEmploiDomicile: false,
};

const opportunitesData: Opportunite[] = [
  {
    id: "per",
    titre: "Ouvrir un PER",
    description: "Versez sur un Plan Épargne Retraite et déduisez de votre revenu imposable",
    economie: 110,
    cout: 1000,
    coutReel: 890,
    icon: <PiggyBank size={24} />,
    categorie: "epargne",
    exemple: "1 000€ versés = 110€ d'impôt en moins (TMI 11%)",
    dismissed: false,
  },
  {
    id: "dons",
    titre: "Faire un don",
    description: "Les dons aux associations ouvrent droit à 66% de réduction d'impôt",
    economie: 33,
    cout: 50,
    coutReel: 17,
    icon: <Heart size={24} />,
    categorie: "don",
    exemple: "Un don de 50€ ne vous coûte que 17€ après réduction",
    dismissed: false,
  },
  {
    id: "emploi-domicile",
    titre: "Emploi à domicile",
    description: "Ménage, jardinage, cours... 50% en crédit d'impôt",
    economie: 600,
    cout: 1200,
    coutReel: 600,
    icon: <Home size={24} />,
    categorie: "logement",
    exemple: "100€/mois = 600€ récupérés chaque année",
    dismissed: false,
  },
  {
    id: "dons-75",
    titre: "Don aux Restos du Cœur",
    description: "75% de réduction pour les dons aux organismes d'aide aux personnes en difficulté",
    economie: 75,
    cout: 100,
    coutReel: 25,
    icon: <Gift size={24} />,
    categorie: "don",
    exemple: "100€ donnés = seulement 25€ de votre poche",
    dismissed: false,
  },
];

const getCategorieStyle = (cat: string) => {
  switch (cat) {
    case "epargne":
      return { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" };
    case "don":
      return { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-200" };
    case "logement":
      return { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" };
    case "famille":
      return { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200" };
  }
};

export default function OpportunitesPage() {
  const [opportunites, setOpportunites] = useState(opportunitesData);
  const [filter, setFilter] = useState<string>("all");

  const dismissOpportunite = (id: string) => {
    setOpportunites(prev =>
      prev.map(o => (o.id === id ? { ...o, dismissed: true } : o))
    );
  };

  const restoreOpportunite = (id: string) => {
    setOpportunites(prev =>
      prev.map(o => (o.id === id ? { ...o, dismissed: false } : o))
    );
  };

  const totalEconomiesPotentielles = opportunites
    .filter(o => !o.dismissed)
    .reduce((sum, o) => sum + o.economie, 0);

  const filteredOpportunites = opportunites.filter(o => {
    if (filter === "all") return !o.dismissed;
    if (filter === "dismissed") return o.dismissed;
    return o.categorie === filter && !o.dismissed;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
            <Lightbulb size={24} className="text-yellow-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-charcoal">Mes Opportunités</h1>
            <p className="text-slate text-sm">Découvrez comment payer moins d'impôts</p>
          </div>
        </div>
      </div>

      {/* Résumé potentiel */}
      <div className="bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Sparkles size={32} className="text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-amber-700 mb-1">Économies potentielles identifiées</p>
            <p className="text-3xl font-bold text-amber-600">+{totalEconomiesPotentielles.toLocaleString()}€</p>
            <p className="text-xs text-amber-600/70">Basé sur votre TMI de {mockUserData.tmi}%</p>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {[
          { id: "all", label: "Toutes" },
          { id: "epargne", label: "Épargne" },
          { id: "don", label: "Dons" },
          { id: "logement", label: "Logement" },
          { id: "dismissed", label: "Ignorées" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f.id
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-slate hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Liste des opportunités */}
      <div className="space-y-4">
        {filteredOpportunites.length === 0 ? (
          <div className="text-center py-12">
            <Lightbulb size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-slate">Aucune opportunité dans cette catégorie</p>
          </div>
        ) : (
          filteredOpportunites.map((opp) => {
            const style = getCategorieStyle(opp.categorie);

            return (
              <div
                key={opp.id}
                className={`bg-white border rounded-2xl p-5 transition-all hover:shadow-md ${
                  opp.dismissed ? "opacity-60 border-gray-200" : "border-gray-100"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${style.bg} rounded-xl flex items-center justify-center flex-shrink-0 ${style.text}`}>
                    {opp.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-charcoal">{opp.titre}</h3>
                    </div>
                    <p className="text-sm text-slate mb-3">{opp.description}</p>

                    {/* Calcul */}
                    <div className="bg-gray-50 rounded-xl p-3 mb-3">
                      <p className="text-xs text-slate mb-2">{opp.exemple}</p>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-slate">Coût initial</p>
                          <p className="font-medium text-charcoal">{opp.cout}€</p>
                        </div>
                        <ChevronRight size={16} className="text-slate" />
                        <div>
                          <p className="text-xs text-slate">Économie</p>
                          <p className="font-medium text-green-600">-{opp.economie}€</p>
                        </div>
                        <ChevronRight size={16} className="text-slate" />
                        <div>
                          <p className="text-xs text-slate">Coût réel</p>
                          <p className="font-bold text-primary-600">{opp.coutReel}€</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {opp.dismissed ? (
                        <button
                          onClick={() => restoreOpportunite(opp.id)}
                          className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          <Check size={14} />
                          Restaurer
                        </button>
                      ) : (
                        <>
                          <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                            En savoir plus
                          </button>
                          <button
                            onClick={() => dismissOpportunite(opp.id)}
                            className="p-2 text-slate hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Ignorer cette suggestion"
                          >
                            <X size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Info personnalisation */}
      <div className="mt-8 bg-primary-50 border border-primary-100 rounded-xl p-4 flex items-start gap-3">
        <TrendingUp size={18} className="text-primary-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-primary-700">
          Ces suggestions sont personnalisées selon votre TMI ({mockUserData.tmi}%) et votre situation. Plus vous remplissez le simulateur, plus les recommandations sont précises.
        </p>
      </div>
    </div>
  );
}
