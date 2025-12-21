"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import {
  CheckCircle,
  Clock,
  Target,
  ArrowRight,
  Crown,
  Filter,
  ChevronDown,
} from "lucide-react";

// Types
interface Action {
  id: number;
  titre: string;
  description: string;
  statut: "fait" | "en-cours" | "a-faire";
  gain: number;
  difficulte: "facile" | "moyen" | "difficile";
  categorie: string;
}

// Données de démonstration
const actionsDemo: Action[] = [
  {
    id: 1,
    titre: "Optimiser les frais kilométriques",
    description: "Passez du forfait aux frais réels pour vos déplacements professionnels.",
    statut: "fait",
    gain: 450,
    difficulte: "facile",
    categorie: "Déductions",
  },
  {
    id: 2,
    titre: "Changer de régime social",
    description: "Évaluez le passage en EURL/SASU pour optimiser vos cotisations.",
    statut: "en-cours",
    gain: 1200,
    difficulte: "difficile",
    categorie: "Structure",
  },
  {
    id: 3,
    titre: "Déduire les frais de formation",
    description: "Vos formations professionnelles sont déductibles à 100%.",
    statut: "a-faire",
    gain: 350,
    difficulte: "facile",
    categorie: "Déductions",
  },
  {
    id: 4,
    titre: "Crédit d'impôt formation",
    description: "Récupérez jusqu'à 423€ par an pour vos formations.",
    statut: "a-faire",
    gain: 423,
    difficulte: "moyen",
    categorie: "Crédits",
  },
  {
    id: 5,
    titre: "Cotisation retraite complémentaire",
    description: "Les cotisations Madelin sont déductibles du bénéfice.",
    statut: "a-faire",
    gain: 800,
    difficulte: "moyen",
    categorie: "Retraite",
  },
  {
    id: 6,
    titre: "Optimiser la CFE",
    description: "Vérifiez si vous pouvez bénéficier d'exonérations de CFE.",
    statut: "a-faire",
    gain: 350,
    difficulte: "facile",
    categorie: "Taxes",
  },
];

export default function PlanActionPage() {
  const { isPremium } = useAuth();
  const [filter, setFilter] = useState<"tous" | "fait" | "en-cours" | "a-faire">("tous");
  const [showFilters, setShowFilters] = useState(false);

  // Vérifier l'accès Premium
  if (!isPremium) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white border border-gray-200 p-8">
          <div className="w-16 h-16 bg-amber-50 flex items-center justify-center mx-auto mb-6">
            <Crown className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal mb-3">
            Plan d'action personnalisé
          </h1>
          <p className="text-slate mb-6">
            Accédez à votre plan d'action détaillé avec les étapes concrètes
            pour optimiser vos impôts.
          </p>
          <ul className="text-left max-w-md mx-auto mb-8 space-y-3">
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span className="text-charcoal">Actions personnalisées selon votre profil</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span className="text-charcoal">Suivi de votre progression</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span className="text-charcoal">Gains estimés par action</span>
            </li>
          </ul>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 font-semibold hover:bg-primary-600 transition-all"
          >
            <Crown size={20} />
            Débloquer le plan d'action
          </Link>
        </div>
      </div>
    );
  }

  // Filtrer les actions
  const actionsFiltrees = actionsDemo.filter(
    (action) => filter === "tous" || action.statut === filter
  );

  // Stats
  const totalGain = actionsDemo.reduce((sum, a) => sum + a.gain, 0);
  const gainRealise = actionsDemo
    .filter((a) => a.statut === "fait")
    .reduce((sum, a) => sum + a.gain, 0);

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-charcoal mb-2">Plan d'action</h1>
        <p className="text-slate">
          Suivez vos actions d'optimisation fiscale étape par étape
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 p-6">
          <p className="text-sm text-slate mb-2">Économies réalisées</p>
          <p className="text-3xl font-bold text-primary-600">{gainRealise.toLocaleString()}€</p>
          <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all"
              style={{ width: `${(gainRealise / totalGain) * 100}%` }}
            />
          </div>
          <p className="text-sm text-slate mt-2">sur {totalGain.toLocaleString()}€ potentiels</p>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <p className="text-sm text-slate mb-2">Progression</p>
          <div className="flex items-end gap-4">
            <p className="text-3xl font-bold text-charcoal">
              {actionsDemo.filter((a) => a.statut === "fait").length}
            </p>
            <p className="text-slate pb-1">/ {actionsDemo.length} actions réalisées</p>
          </div>
          <div className="mt-4 flex gap-2">
            <span className="flex items-center gap-1 text-sm">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              {actionsDemo.filter((a) => a.statut === "fait").length} faites
            </span>
            <span className="flex items-center gap-1 text-sm">
              <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
              {actionsDemo.filter((a) => a.statut === "en-cours").length} en cours
            </span>
            <span className="flex items-center gap-1 text-sm">
              <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
              {actionsDemo.filter((a) => a.statut === "a-faire").length} à faire
            </span>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-charcoal hover:text-primary-500 transition-colors"
        >
          <Filter size={18} />
          <span>Filtrer</span>
          <ChevronDown size={16} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>

        <div className="hidden md:flex gap-2">
          {(["tous", "a-faire", "en-cours", "fait"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary-500 text-white"
                  : "bg-white border border-gray-200 text-charcoal hover:border-primary-300"
              }`}
            >
              {f === "tous" ? "Toutes" : f === "a-faire" ? "À faire" : f === "en-cours" ? "En cours" : "Faites"}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des actions */}
      <div className="space-y-4">
        {actionsFiltrees.map((action) => (
          <div
            key={action.id}
            className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 flex-shrink-0 flex items-center justify-center ${
                  action.statut === "fait"
                    ? "bg-green-100"
                    : action.statut === "en-cours"
                    ? "bg-amber-100"
                    : "bg-gray-100"
                }`}
              >
                {action.statut === "fait" ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : action.statut === "en-cours" ? (
                  <Clock className="w-5 h-5 text-amber-600" />
                ) : (
                  <Target className="w-5 h-5 text-gray-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">{action.titre}</h3>
                    <p className="text-sm text-slate">{action.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xl font-bold text-primary-600">+{action.gain}€</p>
                    <p className="text-xs text-slate">/ an</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="text-xs bg-gray-100 text-slate px-2 py-1">
                      {action.categorie}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 ${
                        action.difficulte === "facile"
                          ? "bg-green-50 text-green-700"
                          : action.difficulte === "moyen"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {action.difficulte.charAt(0).toUpperCase() + action.difficulte.slice(1)}
                    </span>
                  </div>

                  {action.statut !== "fait" && (
                    <button className="flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 font-medium">
                      Voir le guide <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
