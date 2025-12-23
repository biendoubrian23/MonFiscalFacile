"use client";

import { useState } from "react";
import {
  Search,
  ChevronRight,
  BookOpen,
} from "lucide-react";

interface Terme {
  id: string;
  terme: string;
  definition: string;
  exemple?: string;
  categorie: string;
}

const termes: Terme[] = [
  {
    id: "abattement",
    terme: "Abattement",
    definition: "Réduction forfaitaire appliquée sur un revenu avant calcul de l'impôt. Par exemple, l'abattement de 10% sur les salaires pour frais professionnels.",
    exemple: "Salaire de 30 000€ → abattement de 3 000€ → base imposable de 27 000€",
    categorie: "Calcul de l'impôt",
  },
  {
    id: "bic",
    terme: "BIC (Bénéfices Industriels et Commerciaux)",
    definition: "Catégorie de revenus pour les activités commerciales, artisanales ou industrielles.",
    exemple: "Un commerçant, un artisan ou un prestataire de services commercial déclare en BIC.",
    categorie: "Catégories de revenus",
  },
  {
    id: "bnc",
    terme: "BNC (Bénéfices Non Commerciaux)",
    definition: "Catégorie de revenus pour les professions libérales et activités non commerciales.",
    exemple: "Un consultant, médecin ou avocat déclare en BNC.",
    categorie: "Catégories de revenus",
  },
  {
    id: "decote",
    terme: "Décote",
    definition: "Réduction d'impôt accordée aux foyers modestes. Elle diminue progressivement l'impôt jusqu'à un certain seuil.",
    categorie: "Calcul de l'impôt",
  },
  {
    id: "flat-tax",
    terme: "Flat Tax (PFU)",
    definition: "Prélèvement Forfaitaire Unique de 30% sur les revenus du capital (dividendes, intérêts, plus-values).",
    exemple: "Dividendes de 10 000€ → flat tax de 3 000€ (30%)",
    categorie: "Imposition du capital",
  },
  {
    id: "micro-entreprise",
    terme: "Micro-entreprise",
    definition: "Régime fiscal simplifié avec abattement forfaitaire et plafonds de CA. Anciennement auto-entrepreneur.",
    categorie: "Statuts",
  },
  {
    id: "per",
    terme: "PER (Plan Épargne Retraite)",
    definition: "Produit d'épargne retraite dont les versements sont déductibles du revenu imposable.",
    exemple: "Versement PER de 5 000€ → économie d'impôt de 1 500€ (TMI 30%)",
    categorie: "Épargne & Retraite",
  },
  {
    id: "quotient-familial",
    terme: "Quotient familial",
    definition: "Mécanisme divisant le revenu imposable par un nombre de parts selon la composition du foyer.",
    exemple: "Couple marié avec 2 enfants = 3 parts fiscales",
    categorie: "Calcul de l'impôt",
  },
  {
    id: "regime-reel",
    terme: "Régime réel",
    definition: "Mode d'imposition où les charges réelles sont déduites du chiffre d'affaires, contrairement au régime micro.",
    categorie: "Régimes fiscaux",
  },
  {
    id: "tmi",
    terme: "TMI (Taux Marginal d'Imposition)",
    definition: "Taux d'imposition de la dernière tranche atteinte. C'est le taux appliqué au dernier euro gagné.",
    exemple: "Revenu dans la tranche 30% → TMI de 30%",
    categorie: "Calcul de l'impôt",
  },
  {
    id: "tns",
    terme: "TNS (Travailleur Non Salarié)",
    definition: "Statut social des indépendants affiliés à la Sécurité Sociale des Indépendants.",
    categorie: "Statuts",
  },
  {
    id: "urssaf",
    terme: "URSSAF",
    definition: "Organisme qui collecte les cotisations sociales des entreprises et travailleurs indépendants.",
    categorie: "Organismes",
  },
];

const categories = [...new Set(termes.map(t => t.categorie))];

export default function GlossairePage() {
  const [recherche, setRecherche] = useState("");
  const [categorieActive, setCategorieActive] = useState<string | null>(null);
  const [termeOuvert, setTermeOuvert] = useState<string | null>(null);

  const termesFiltres = termes.filter((t) => {
    const matchRecherche = t.terme.toLowerCase().includes(recherche.toLowerCase()) ||
      t.definition.toLowerCase().includes(recherche.toLowerCase());
    const matchCategorie = !categorieActive || t.categorie === categorieActive;
    return matchRecherche && matchCategorie;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Glossaire fiscal</h1>
        <p className="text-slate mt-1">
          Tous les termes fiscaux expliqués simplement
        </p>
      </div>

      {/* Recherche */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher un terme..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:border-primary-500 focus:outline-none"
        />
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategorieActive(null)}
          className={`px-3 py-1.5 text-sm ${
            !categorieActive
              ? "bg-primary-500 text-white"
              : "bg-gray-100 text-slate hover:bg-gray-200"
          }`}
        >
          Tous
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategorieActive(cat)}
            className={`px-3 py-1.5 text-sm ${
              categorieActive === cat
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-slate hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Liste des termes */}
      <div className="space-y-2">
        {termesFiltres.length === 0 ? (
          <div className="bg-white border border-gray-100 p-8 text-center">
            <BookOpen className="w-12 h-12 text-slate mx-auto mb-3" />
            <p className="text-slate">Aucun terme trouvé</p>
          </div>
        ) : (
          termesFiltres.map((terme) => (
            <div
              key={terme.id}
              className="bg-white border border-gray-100"
            >
              <button
                onClick={() => setTermeOuvert(termeOuvert === terme.id ? null : terme.id)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div>
                  <span className="font-medium text-charcoal">{terme.terme}</span>
                  <span className="ml-3 text-xs bg-gray-100 text-slate px-2 py-0.5">
                    {terme.categorie}
                  </span>
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-slate transition-transform ${
                    termeOuvert === terme.id ? "rotate-90" : ""
                  }`}
                />
              </button>

              {termeOuvert === terme.id && (
                <div className="px-4 pb-4 border-t border-gray-50">
                  <p className="text-slate mt-4">{terme.definition}</p>
                  {terme.exemple && (
                    <div className="mt-3 bg-primary-50 p-3">
                      <p className="text-xs text-primary-600 font-medium mb-1">Exemple</p>
                      <p className="text-sm text-primary-700">{terme.exemple}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="text-center text-sm text-slate">
        {termesFiltres.length} terme{termesFiltres.length > 1 ? "s" : ""} affiché{termesFiltres.length > 1 ? "s" : ""}
      </div>
    </div>
  );
}
