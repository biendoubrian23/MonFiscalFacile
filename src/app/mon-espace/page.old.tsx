"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Crown,
  FileText,
  Calculator,
  Target,
} from "lucide-react";

export default function MonEspacePage() {
  const { profile, isPremium } = useAuth();

  // Données de démonstration - en production, charger depuis Supabase
  const stats = {
    economiesPotentielles: 3590,
    actionsRealisees: 2,
    actionsTotal: 6,
    prochaineEcheance: "15 janvier 2025",
    echeanceLabel: "Acompte TVA",
  };

  const dernieresActions = [
    { id: 1, titre: "Optimiser les frais kilométriques", statut: "fait", gain: 450 },
    { id: 2, titre: "Changer de statut social", statut: "en-cours", gain: 1200 },
    { id: 3, titre: "Déduire les frais de formation", statut: "a-faire", gain: 350 },
  ];

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-charcoal mb-2">
          Bonjour{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""} 👋
        </h1>
        <p className="text-slate">
          Voici le résumé de votre optimisation fiscale
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Économies potentielles */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-primary-50 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-500" />
            </div>
            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1">
              Cette année
            </span>
          </div>
          <p className="text-3xl font-bold text-charcoal mb-1">
            {stats.economiesPotentielles.toLocaleString()}€
          </p>
          <p className="text-sm text-slate">Économies potentielles</p>
        </div>

        {/* Actions réalisées */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-charcoal mb-1">
            {stats.actionsRealisees} / {stats.actionsTotal}
          </p>
          <p className="text-sm text-slate">Actions réalisées</p>
          {/* Progress bar */}
          <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${(stats.actionsRealisees / stats.actionsTotal) * 100}%` }}
            />
          </div>
        </div>

        {/* Prochaine échéance */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-amber-50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
            {!isPremium && (
              <span className="text-xs font-medium text-slate bg-gray-100 px-2 py-1">
                Premium
              </span>
            )}
          </div>
          {isPremium ? (
            <>
              <p className="text-xl font-bold text-charcoal mb-1">
                {stats.prochaineEcheance}
              </p>
              <p className="text-sm text-slate">{stats.echeanceLabel}</p>
            </>
          ) : (
            <>
              <p className="text-lg font-medium text-charcoal mb-1">
                Rappels fiscaux
              </p>
              <p className="text-sm text-slate">Débloquez pour voir vos échéances</p>
            </>
          )}
        </div>
      </div>

      {/* Actions & CTA Premium */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Liste des actions */}
        <div className="lg:col-span-2 bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-charcoal">Vos actions</h2>
            {isPremium && (
              <Link
                href="/mon-espace/plan-action"
                className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1"
              >
                Voir tout <ArrowRight size={14} />
              </Link>
            )}
          </div>

          <div className="space-y-4">
            {dernieresActions.map((action) => (
              <div
                key={action.id}
                className="flex items-center gap-4 p-4 border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div
                  className={`w-8 h-8 flex-shrink-0 flex items-center justify-center ${
                    action.statut === "fait"
                      ? "bg-green-100"
                      : action.statut === "en-cours"
                      ? "bg-amber-100"
                      : "bg-gray-100"
                  }`}
                >
                  {action.statut === "fait" ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : action.statut === "en-cours" ? (
                    <Clock className="w-4 h-4 text-amber-600" />
                  ) : (
                    <Target className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-charcoal truncate">{action.titre}</p>
                  <p className="text-sm text-slate">
                    {action.statut === "fait"
                      ? "Réalisée"
                      : action.statut === "en-cours"
                      ? "En cours"
                      : "À faire"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary-600">+{action.gain}€</p>
                  <p className="text-xs text-slate">/ an</p>
                </div>
              </div>
            ))}
          </div>

          {!isPremium && (
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 text-center">
              <p className="text-sm text-slate mb-3">
                Débloquez toutes les actions personnalisées
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-primary-500 text-white px-4 py-2 text-sm font-semibold hover:bg-primary-600 transition-all"
              >
                <Crown size={16} />
                Passer Premium
              </Link>
            </div>
          )}
        </div>

        {/* Panneau latéral */}
        <div className="space-y-6">
          {/* CTA Simulation */}
          <div className="bg-white border border-gray-200 p-6">
            <div className="w-12 h-12 bg-primary-50 flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="font-bold text-charcoal mb-2">Nouvelle simulation</h3>
            <p className="text-sm text-slate mb-4">
              Testez d'autres scénarios pour optimiser davantage.
            </p>
            <Link
              href="/simulation"
              className="block w-full text-center bg-primary-500 text-white py-3 font-semibold hover:bg-primary-600 transition-all"
            >
              Lancer une simulation
            </Link>
          </div>

          {/* Guides (Premium) */}
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              {!isPremium && (
                <span className="text-xs font-medium text-slate bg-gray-100 px-2 py-1">
                  Premium
                </span>
              )}
            </div>
            <h3 className="font-bold text-charcoal mb-2">Guides pratiques</h3>
            <p className="text-sm text-slate mb-4">
              {isPremium
                ? "Accédez à tous nos guides détaillés."
                : "Débloquez les guides étape par étape."}
            </p>
            <Link
              href={isPremium ? "/mon-espace/guides" : "/pricing"}
              className={`block w-full text-center py-3 font-semibold transition-all ${
                isPremium
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-100 text-charcoal hover:bg-gray-200"
              }`}
            >
              {isPremium ? "Voir les guides" : "Débloquer"}
            </Link>
          </div>

          {/* Alertes */}
          {isPremium && (
            <div className="bg-amber-50 border border-amber-200 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800 mb-1">Échéance proche</p>
                  <p className="text-sm text-amber-700">
                    N'oubliez pas votre acompte TVA avant le 15 janvier.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
