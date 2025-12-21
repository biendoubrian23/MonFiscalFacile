"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  History,
  TrendingUp,
  Calendar,
  MoreVertical,
  Trash2,
  Copy,
  Eye,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Lock,
  Crown,
  Info,
} from "lucide-react";

interface Simulation {
  id: string;
  nom: string;
  date: string;
  chiffreAffaires: number;
  statut: string;
  economies: number;
  totalCharges: number;
}

// Données de démonstration
const simulationsDemo: Simulation[] = [
  {
    id: "1",
    nom: "Ma situation actuelle",
    date: "2025-12-20",
    chiffreAffaires: 65000,
    statut: "Micro-entreprise",
    economies: 3590,
    totalCharges: 18420,
  },
  {
    id: "2",
    nom: "Scénario EURL",
    date: "2025-12-18",
    chiffreAffaires: 65000,
    statut: "EURL à l'IS",
    economies: 2100,
    totalCharges: 16320,
  },
  {
    id: "3",
    nom: "Test revenus 80k",
    date: "2025-12-15",
    chiffreAffaires: 80000,
    statut: "Micro-entreprise",
    economies: 4200,
    totalCharges: 22100,
  },
];

export default function SimulationsPage() {
  const { isPremium } = useAuth();
  const [simulations] = useState(simulationsDemo);
  const [recherche, setRecherche] = useState("");
  const [menuOuvert, setMenuOuvert] = useState<string | null>(null);

  // Filtrer les simulations
  const simulationsFiltrees = simulations.filter(
    (s) =>
      s.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      s.statut.toLowerCase().includes(recherche.toLowerCase())
  );

  // Limiter pour les utilisateurs gratuits
  const simulationsAffichees = isPremium
    ? simulationsFiltrees
    : simulationsFiltrees.slice(0, 1);

  // Formater la date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-charcoal mb-1">Mes simulations</h1>
          <p className="text-slate text-sm">
            Retrouvez et comparez toutes vos simulations
          </p>
        </div>
        <Link
          href="/simulation"
          className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-3 rounded-lg font-semibold transition-all"
        >
          <Plus size={20} />
          <span>Nouvelle simulation</span>
        </Link>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
            <input
              type="text"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Rechercher une simulation..."
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-charcoal focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-slate hover:bg-gray-50 transition-colors">
              <Filter size={18} />
              <span className="hidden sm:inline">Filtrer</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-slate hover:bg-gray-50 transition-colors">
              <ArrowUpDown size={18} />
              <span className="hidden sm:inline">Trier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate text-sm mb-1">
            <History size={16} />
            Total simulations
          </div>
          <p className="text-2xl font-bold text-charcoal">{simulations.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate text-sm mb-1">
            <TrendingUp size={16} />
            Meilleure économie
          </div>
          <p className="text-2xl font-bold text-primary-500">
            +{Math.max(...simulations.map((s) => s.economies)).toLocaleString()}€
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate text-sm mb-1">
            <Calendar size={16} />
            Dernière simulation
          </div>
          <p className="text-lg font-semibold text-charcoal">
            {formatDate(simulations[0]?.date || "")}
          </p>
        </div>
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-90 mb-1">CA moyen simulé</p>
          <p className="text-2xl font-bold">
            {Math.round(
              simulations.reduce((sum, s) => sum + s.chiffreAffaires, 0) / simulations.length
            ).toLocaleString()}
            €
          </p>
        </div>
      </div>

      {/* Liste des simulations */}
      <div className="space-y-4">
        {simulationsAffichees.map((simulation) => (
          <div
            key={simulation.id}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-md transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Infos principales */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <History className="w-5 h-5 text-primary-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-charcoal truncate">{simulation.nom}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-sm text-slate">{formatDate(simulation.date)}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="text-sm text-slate">{simulation.statut}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Métriques */}
              <div className="flex items-center gap-6 sm:gap-8">
                <div className="text-center">
                  <p className="text-xs text-slate mb-0.5">CA</p>
                  <p className="font-semibold text-charcoal">
                    {simulation.chiffreAffaires.toLocaleString()}€
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate mb-0.5">Charges</p>
                  <p className="font-semibold text-charcoal">
                    {simulation.totalCharges.toLocaleString()}€
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate mb-0.5">Économies</p>
                  <p className="font-bold text-primary-500">
                    +{simulation.economies.toLocaleString()}€
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/dashboard?id=${simulation.id}`}
                  className="flex items-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-600 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Eye size={18} />
                  <span className="hidden sm:inline">Voir</span>
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setMenuOuvert(menuOuvert === simulation.id ? null : simulation.id)}
                    className="p-2 text-slate hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical size={20} />
                  </button>
                  {menuOuvert === simulation.id && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                      <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-charcoal hover:bg-gray-50 transition-colors">
                        <Copy size={16} />
                        Dupliquer
                      </button>
                      <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 size={16} />
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Message si limité */}
        {!isPremium && simulationsFiltrees.length > 1 && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 text-center">
            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="font-semibold text-charcoal mb-2">
              +{simulationsFiltrees.length - 1} simulations masquées
            </h3>
            <p className="text-sm text-slate mb-4 max-w-md mx-auto">
              Passez en Premium pour accéder à toutes vos simulations et les comparer entre elles.
            </p>
            <Link
              href="/mon-espace/abonnement"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <Crown size={18} />
              Débloquer l'historique
            </Link>
          </div>
        )}
      </div>

      {/* Infobulle explicative */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Comment ça marche ?</h4>
            <p className="text-sm text-blue-700">
              Chaque simulation est automatiquement sauvegardée. Vous pouvez les consulter,
              les comparer et les dupliquer pour tester différents scénarios. Les économies
              affichées représentent le gain potentiel par rapport à votre situation actuelle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
