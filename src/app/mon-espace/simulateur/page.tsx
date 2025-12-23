"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Info,
} from "lucide-react";

// Types
interface DonneesSimulation {
  chiffreAffaires: number;
  depensesPro: number;
  fraisKm: number;
  versementPER: number;
}

export default function SimulateurPage() {
  const { isPremium } = useAuth();

  // Données de base (situation actuelle)
  const [donneesBase] = useState<DonneesSimulation>({
    chiffreAffaires: 50000,
    depensesPro: 8000,
    fraisKm: 3000,
    versementPER: 0,
  });

  // Données modifiées
  const [donnees, setDonnees] = useState<DonneesSimulation>({ ...donneesBase });

  // Calcul simplifié des impôts
  const calculerImpots = (data: DonneesSimulation): number => {
    const revenuImposable = data.chiffreAffaires * 0.66 - data.versementPER;
    
    // Tranches simplifiées
    let impot = 0;
    if (revenuImposable > 11520) {
      impot += Math.min(revenuImposable - 11520, 17853) * 0.11;
    }
    if (revenuImposable > 29373) {
      impot += Math.min(revenuImposable - 29373, 54615) * 0.30;
    }
    if (revenuImposable > 83988) {
      impot += (revenuImposable - 83988) * 0.41;
    }
    
    // Cotisations sociales simplifiées
    const cotisations = data.chiffreAffaires * 0.22;
    
    return Math.round(impot + cotisations);
  };

  const impotBase = useMemo(() => calculerImpots(donneesBase), [donneesBase]);
  const impotModifie = useMemo(() => calculerImpots(donnees), [donnees]);
  const difference = impotModifie - impotBase;

  const resetSimulation = () => {
    setDonnees({ ...donneesBase });
  };

  const sliders = [
    {
      id: "chiffreAffaires",
      label: "Chiffre d'affaires",
      value: donnees.chiffreAffaires,
      min: 0,
      max: 150000,
      step: 1000,
      format: (v: number) => `${v.toLocaleString()}€`,
    },
    {
      id: "depensesPro",
      label: "Dépenses professionnelles",
      value: donnees.depensesPro,
      min: 0,
      max: 50000,
      step: 500,
      format: (v: number) => `${v.toLocaleString()}€`,
    },
    {
      id: "fraisKm",
      label: "Frais kilométriques",
      value: donnees.fraisKm,
      min: 0,
      max: 15000,
      step: 250,
      format: (v: number) => `${v.toLocaleString()}€`,
    },
    {
      id: "versementPER",
      label: "Versement PER",
      value: donnees.versementPER,
      min: 0,
      max: 35000,
      step: 500,
      format: (v: number) => `${v.toLocaleString()}€`,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Simulateur "Et si..."</h1>
        <p className="text-slate mt-1">
          Modifiez les paramètres et voyez l'impact sur vos impôts en temps réel
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Panneau de contrôle */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-charcoal">Paramètres</h2>
              <button
                onClick={resetSimulation}
                className="text-sm text-slate hover:text-charcoal flex items-center gap-1"
              >
                <RefreshCw size={14} />
                Réinitialiser
              </button>
            </div>

            <div className="space-y-6">
              {sliders.map((slider) => (
                <div key={slider.id}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-charcoal font-medium">
                      {slider.label}
                    </label>
                    <span className="text-sm font-semibold text-primary-600">
                      {slider.format(slider.value)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={slider.value}
                    onChange={(e) =>
                      setDonnees({
                        ...donnees,
                        [slider.id]: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-100 appearance-none cursor-pointer accent-primary-500"
                  />
                  <div className="flex justify-between text-xs text-slate mt-1">
                    <span>{slider.format(slider.min)}</span>
                    <span>{slider.format(slider.max)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scénarios rapides */}
          <div className="bg-white border border-gray-100 p-6">
            <h3 className="font-semibold text-charcoal mb-4">Scénarios rapides</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDonnees({ ...donnees, chiffreAffaires: donnees.chiffreAffaires * 1.2 })}
                className="p-3 border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-all text-left"
              >
                <span className="text-sm font-medium text-charcoal">CA +20%</span>
                <span className="block text-xs text-slate mt-1">
                  {(donnees.chiffreAffaires * 1.2).toLocaleString()}€
                </span>
              </button>
              <button
                onClick={() => setDonnees({ ...donnees, versementPER: 5000 })}
                className="p-3 border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-all text-left"
              >
                <span className="text-sm font-medium text-charcoal">PER 5000€</span>
                <span className="block text-xs text-slate mt-1">Épargne retraite</span>
              </button>
              <button
                onClick={() => setDonnees({ ...donnees, depensesPro: donnees.depensesPro + 5000 })}
                className="p-3 border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-all text-left"
              >
                <span className="text-sm font-medium text-charcoal">+5000€ dépenses</span>
                <span className="block text-xs text-slate mt-1">Matériel, formation...</span>
              </button>
              <button
                onClick={() => setDonnees({ ...donneesBase, chiffreAffaires: 80000 })}
                className="p-3 border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-all text-left"
              >
                <span className="text-sm font-medium text-charcoal">CA 80 000€</span>
                <span className="block text-xs text-slate mt-1">Proche des seuils</span>
              </button>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="space-y-6">
          {/* Comparaison principale */}
          <div className="bg-white border border-gray-100 p-6">
            <h2 className="font-semibold text-charcoal mb-6">Résultat</h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-slate mb-1">Situation actuelle</p>
                <p className="text-3xl font-bold text-charcoal">
                  {impotBase.toLocaleString()}€
                </p>
                <p className="text-xs text-slate">charges fiscales/an</p>
              </div>
              <div>
                <p className="text-sm text-slate mb-1">Avec ces paramètres</p>
                <p className="text-3xl font-bold text-primary-600">
                  {impotModifie.toLocaleString()}€
                </p>
                <p className="text-xs text-slate">charges fiscales/an</p>
              </div>
            </div>

            {/* Différence */}
            <div className={`p-4 flex items-center justify-center gap-3 ${
              difference < 0 
                ? "bg-green-50"
                : difference > 0
                ? "bg-red-50"
                : "bg-gray-50"
            }`}>
              {difference < 0 ? (
                <>
                  <TrendingDown className="w-6 h-6 text-green-500" />
                  <span className="text-xl font-bold text-green-600">
                    Vous économisez {Math.abs(difference).toLocaleString()}€/an
                  </span>
                </>
              ) : difference > 0 ? (
                <>
                  <TrendingUp className="w-6 h-6 text-red-500" />
                  <span className="text-xl font-bold text-red-600">
                    Vous payez {difference.toLocaleString()}€/an de plus
                  </span>
                </>
              ) : (
                <>
                  <Minus className="w-6 h-6 text-slate" />
                  <span className="text-xl font-bold text-slate">
                    Pas de changement
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Graphique simplifié */}
          <div className="bg-white border border-gray-100 p-6">
            <h3 className="font-semibold text-charcoal mb-4">Comparaison visuelle</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate">Actuel</span>
                  <span className="font-medium">{impotBase.toLocaleString()}€</span>
                </div>
                <div className="h-8 bg-gray-100">
                  <div
                    className="h-full bg-gray-400"
                    style={{ width: `${Math.min((impotBase / 30000) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate">Simulé</span>
                  <span className="font-medium text-primary-600">
                    {impotModifie.toLocaleString()}€
                  </span>
                </div>
                <div className="h-8 bg-gray-100">
                  <div
                    className="h-full bg-primary-500"
                    style={{ width: `${Math.min((impotModifie / 30000) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-100 p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              Ces calculs sont des estimations simplifiées. 
              Pour un résultat précis, faites une simulation complète.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
