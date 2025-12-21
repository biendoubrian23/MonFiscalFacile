"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Crown,
  ArrowRight,
  FileText,
  Calculator,
  Building2,
  Coins,
  Search,
} from "lucide-react";

interface Guide {
  id: number;
  titre: string;
  description: string;
  duree: string;
  categorie: string;
  icon: React.ReactNode;
  nouveau?: boolean;
}

// Données de démonstration
const guidesDemo: Guide[] = [
  {
    id: 1,
    titre: "Optimiser vos frais kilométriques",
    description: "Calculez et déclarez vos frais de déplacement pour maximiser vos déductions.",
    duree: "10 min",
    categorie: "Déductions",
    icon: <Calculator className="w-6 h-6" />,
  },
  {
    id: 2,
    titre: "Passer de micro-entreprise à EURL",
    description: "Étapes détaillées pour changer de statut et optimiser vos cotisations.",
    duree: "25 min",
    categorie: "Structure",
    icon: <Building2 className="w-6 h-6" />,
    nouveau: true,
  },
  {
    id: 3,
    titre: "Déduire vos frais de formation",
    description: "Tout savoir sur la déduction des formations professionnelles.",
    duree: "8 min",
    categorie: "Déductions",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: 4,
    titre: "Comprendre et réduire votre CFE",
    description: "Guide complet sur la Cotisation Foncière des Entreprises.",
    duree: "12 min",
    categorie: "Taxes",
    icon: <Coins className="w-6 h-6" />,
  },
  {
    id: 5,
    titre: "Crédit d'impôt formation du dirigeant",
    description: "Comment récupérer jusqu'à 423€ par an grâce à vos formations.",
    duree: "7 min",
    categorie: "Crédits",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: 6,
    titre: "Préparer sa déclaration de revenus",
    description: "Checklist complète pour ne rien oublier lors de votre déclaration.",
    duree: "15 min",
    categorie: "Déclaration",
    icon: <FileText className="w-6 h-6" />,
    nouveau: true,
  },
];

export default function GuidesPage() {
  const { isPremium } = useAuth();
  const [recherche, setRecherche] = useState("");
  const [categorieActive, setCategorieActive] = useState<string | null>(null);

  // Vérifier l'accès Premium
  if (!isPremium) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white border border-gray-200 p-8">
          <div className="w-16 h-16 bg-amber-50 flex items-center justify-center mx-auto mb-6">
            <Crown className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal mb-3">
            Guides pratiques
          </h1>
          <p className="text-slate mb-6">
            Accédez à nos guides étape par étape pour mettre en place chaque
            optimisation fiscale.
          </p>
          <ul className="text-left max-w-md mx-auto mb-8 space-y-3">
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span className="text-charcoal">Guides détaillés étape par étape</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span className="text-charcoal">Modèles de documents à télécharger</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span className="text-charcoal">Vidéos explicatives</span>
            </li>
          </ul>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 font-semibold hover:bg-primary-600 transition-all"
          >
            <Crown size={20} />
            Débloquer les guides
          </Link>
        </div>
      </div>
    );
  }

  // Catégories uniques
  const categories = Array.from(new Set(guidesDemo.map((g) => g.categorie)));

  // Filtrer les guides
  const guidesFiltres = guidesDemo.filter((guide) => {
    const matchRecherche =
      recherche === "" ||
      guide.titre.toLowerCase().includes(recherche.toLowerCase()) ||
      guide.description.toLowerCase().includes(recherche.toLowerCase());
    const matchCategorie =
      categorieActive === null || guide.categorie === categorieActive;
    return matchRecherche && matchCategorie;
  });

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-charcoal mb-2">Guides pratiques</h1>
        <p className="text-slate">
          Tutoriels détaillés pour mettre en place vos optimisations
        </p>
      </div>

      {/* Recherche et filtres */}
      <div className="mb-8 space-y-4">
        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher un guide..."
            className="w-full border border-gray-300 pl-12 pr-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none"
          />
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategorieActive(null)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              categorieActive === null
                ? "bg-primary-500 text-white"
                : "bg-white border border-gray-200 text-charcoal hover:border-primary-300"
            }`}
          >
            Tous
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategorieActive(cat)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                categorieActive === cat
                  ? "bg-primary-500 text-white"
                  : "bg-white border border-gray-200 text-charcoal hover:border-primary-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des guides */}
      <div className="grid md:grid-cols-2 gap-6">
        {guidesFiltres.map((guide) => (
          <div
            key={guide.id}
            className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary-50 flex items-center justify-center text-primary-500">
                {guide.icon}
              </div>
              <div className="flex items-center gap-2">
                {guide.nouveau && (
                  <span className="text-xs font-medium bg-primary-500 text-white px-2 py-1">
                    Nouveau
                  </span>
                )}
                <span className="text-xs text-slate flex items-center gap-1">
                  <Clock size={12} />
                  {guide.duree}
                </span>
              </div>
            </div>

            <h3 className="font-semibold text-charcoal mb-2 group-hover:text-primary-600 transition-colors">
              {guide.titre}
            </h3>
            <p className="text-sm text-slate mb-4">{guide.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-xs bg-gray-100 text-slate px-2 py-1">
                {guide.categorie}
              </span>
              <span className="text-sm text-primary-500 group-hover:text-primary-600 flex items-center gap-1 font-medium">
                Lire <ArrowRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {guidesFiltres.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-slate mb-2">Aucun guide trouvé</p>
          <button
            onClick={() => {
              setRecherche("");
              setCategorieActive(null);
            }}
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
