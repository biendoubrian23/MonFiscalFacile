"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  Target,
  TrendingUp,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function DiagnosticPage() {
  const { profile, isPremium } = useAuth();

  // Données de démo
  const diagnostic = {
    score: 45,
    niveau: "Initié",
    economiesTotal: 3590,
    impotActuel: 8500,
    impotOptimise: 4910,
  };

  const optimisations = [
    {
      id: "frais-km",
      titre: "Déclarer vos frais kilométriques",
      description: "Vos trajets domicile-travail peuvent être déduits au réel",
      economie: 450,
      difficulte: "facile",
      statut: "fait",
      categorie: "Déductions",
    },
    {
      id: "per",
      titre: "Ouvrir un Plan Épargne Retraite (PER)",
      description: "Versements déductibles de votre revenu imposable",
      economie: 1200,
      difficulte: "facile",
      statut: "a-faire",
      categorie: "Retraite",
    },
    {
      id: "regime-reel",
      titre: "Évaluer le passage au régime réel",
      description: "Vos charges réelles dépassent l'abattement forfaitaire",
      economie: 890,
      difficulte: "moyen",
      statut: "a-faire",
      categorie: "Régime fiscal",
    },
    {
      id: "dons",
      titre: "Optimiser vos dons aux associations",
      description: "66% de réduction d'impôt sur vos dons",
      economie: 350,
      difficulte: "facile",
      statut: "a-faire",
      categorie: "Déductions",
    },
    {
      id: "statut",
      titre: "Comparer les statuts juridiques",
      description: "Une SASU pourrait être avantageuse à votre niveau de CA",
      economie: 700,
      difficulte: "complexe",
      statut: "a-faire",
      categorie: "Statut juridique",
      premium: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Mon diagnostic fiscal</h1>
        <p className="text-slate mt-1">
          Analyse personnalisée de votre situation
        </p>
      </div>

      {/* Résumé principal */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Score et économies */}
        <div className="bg-white border border-gray-100 p-6">
          <div className="flex items-center gap-6">
            {/* Score circulaire */}
            <div className="relative w-28 h-28 flex-shrink-0">
              <svg className="w-28 h-28 -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  className="fill-none stroke-gray-100"
                  strokeWidth="10"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  className="fill-none stroke-primary-500"
                  strokeWidth="10"
                  strokeLinecap="square"
                  strokeDasharray={`${(diagnostic.score / 100) * 301} 301`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-charcoal">{diagnostic.score}%</span>
                <span className="text-xs text-slate">optimisé</span>
              </div>
            </div>

            <div>
              <p className="text-slate text-sm">Votre niveau</p>
              <p className="text-xl font-semibold text-charcoal">{diagnostic.niveau}</p>
              <div className="mt-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary-500" />
                <span className="text-primary-600 font-semibold">
                  {diagnostic.economiesTotal.toLocaleString()}€
                </span>
                <span className="text-sm text-slate">d'économies possibles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparaison avant/après */}
        <div className="bg-white border border-gray-100 p-6">
          <h3 className="font-semibold text-charcoal mb-4">Votre potentiel</h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-sm text-slate mb-1">Impôt actuel</p>
              <p className="text-2xl font-bold text-red-500">
                {diagnostic.impotActuel.toLocaleString()}€
              </p>
            </div>
            <ArrowRight className="text-slate" />
            <div className="text-center">
              <p className="text-sm text-slate mb-1">Impôt optimisé</p>
              <p className="text-2xl font-bold text-primary-500">
                {diagnostic.impotOptimise.toLocaleString()}€
              </p>
            </div>
          </div>
          <div className="mt-4 bg-primary-50 p-3 text-center">
            <p className="text-primary-700 font-medium">
              Économie : {(diagnostic.impotActuel - diagnostic.impotOptimise).toLocaleString()}€/an
            </p>
          </div>
        </div>
      </div>

      {/* Liste des optimisations */}
      <div>
        <h2 className="font-semibold text-charcoal mb-4">
          Vos optimisations ({optimisations.length})
        </h2>
        
        <div className="space-y-3">
          {optimisations.map((opt) => (
            <div
              key={opt.id}
              className={`bg-white border border-gray-100 p-5 ${
                opt.statut === "fait" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Statut */}
                <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${
                  opt.statut === "fait" ? "bg-green-50" : "bg-gray-50"
                }`}>
                  {opt.statut === "fait" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Target className="w-5 h-5 text-slate" />
                  )}
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className={`font-medium ${
                        opt.statut === "fait" ? "text-slate line-through" : "text-charcoal"
                      }`}>
                        {opt.titre}
                        {opt.premium && !isPremium && (
                          <span className="ml-2 text-xs bg-gray-100 text-slate px-1.5 py-0.5">
                            Premium
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-slate mt-1">{opt.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-semibold text-primary-600">
                        +{opt.economie}€
                      </p>
                      <p className="text-xs text-slate">par an</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-gray-50 text-slate px-2 py-1">
                        {opt.categorie}
                      </span>
                      <span className={`text-xs px-2 py-1 ${
                        opt.difficulte === "facile"
                          ? "bg-green-50 text-green-600"
                          : opt.difficulte === "moyen"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-red-50 text-red-600"
                      }`}>
                        {opt.difficulte}
                      </span>
                    </div>

                    {opt.statut !== "fait" && (
                      <Link
                        href={opt.premium && !isPremium ? "/mon-espace/abonnement" : `/mon-espace/guides/${opt.id}`}
                        className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1"
                      >
                        Voir le guide
                        <ChevronRight size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-100 p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-800 font-medium">Ces recommandations sont personnalisées</p>
          <p className="text-blue-700 text-sm mt-1">
            Elles sont basées sur les informations de votre dernière simulation. 
            Refaites une simulation si votre situation a changé.
          </p>
        </div>
      </div>
    </div>
  );
}
