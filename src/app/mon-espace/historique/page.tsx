"use client";

import { useState } from "react";
import { BarChart3, TrendingDown, TrendingUp, Calendar, ChevronRight, Plus, FileText, Trash2 } from "lucide-react";

interface Simulation {
  id: string;
  date: string;
  annee: number;
  salaireNet: number;
  impotBrut: number;
  impotFinal: number;
  economie: number;
}

const mockSimulations: Simulation[] = [
  {
    id: "1",
    date: "2024-12-24",
    annee: 2024,
    salaireNet: 30000,
    impotBrut: 1664,
    impotFinal: 890,
    economie: 774,
  },
  {
    id: "2",
    date: "2024-04-15",
    annee: 2023,
    salaireNet: 28000,
    impotBrut: 1420,
    impotFinal: 950,
    economie: 470,
  },
  {
    id: "3",
    date: "2023-05-10",
    annee: 2022,
    salaireNet: 26000,
    impotBrut: 1180,
    impotFinal: 880,
    economie: 300,
  },
];

export default function HistoriquePage() {
  const [simulations, setSimulations] = useState<Simulation[]>(mockSimulations);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const years = [...new Set(simulations.map(s => s.annee))].sort((a, b) => b - a);

  const filteredSimulations = selectedYear
    ? simulations.filter(s => s.annee === selectedYear)
    : simulations;

  // Calcul évolution
  const getEvolution = () => {
    if (simulations.length < 2) return null;
    const sorted = [...simulations].sort((a, b) => b.annee - a.annee);
    const current = sorted[0];
    const previous = sorted[1];
    const diff = current.economie - previous.economie;
    const percent = Math.round((diff / previous.economie) * 100);
    return { diff, percent, isPositive: diff > 0 };
  };

  const evolution = getEvolution();

  const totalEconomies = simulations.reduce((sum, s) => sum + s.economie, 0);

  const deleteSimulation = (id: string) => {
    setSimulations(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <BarChart3 size={24} className="text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-charcoal">Mon Historique</h1>
            <p className="text-slate text-sm">Suivez l'évolution de vos économies d'impôts</p>
          </div>
        </div>
      </div>

      {/* Résumé global */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-5">
          <p className="text-xs text-purple-600 font-medium uppercase tracking-wide mb-1">Total économisé</p>
          <p className="text-2xl font-bold text-purple-700">{totalEconomies.toLocaleString()}€</p>
          <p className="text-xs text-purple-500 mt-1">Sur {simulations.length} déclarations</p>
        </div>

        {evolution && (
          <div className={`rounded-2xl p-5 border ${
            evolution.isPositive 
              ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-100" 
              : "bg-gradient-to-br from-red-50 to-orange-50 border-red-100"
          }`}>
            <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${
              evolution.isPositive ? "text-green-600" : "text-red-600"
            }`}>
              Évolution
            </p>
            <div className="flex items-center gap-2">
              {evolution.isPositive ? (
                <TrendingUp size={24} className="text-green-500" />
              ) : (
                <TrendingDown size={24} className="text-red-500" />
              )}
              <p className={`text-2xl font-bold ${
                evolution.isPositive ? "text-green-700" : "text-red-700"
              }`}>
                {evolution.isPositive ? "+" : ""}{evolution.percent}%
              </p>
            </div>
            <p className={`text-xs mt-1 ${
              evolution.isPositive ? "text-green-500" : "text-red-500"
            }`}>
              {evolution.isPositive ? "+" : ""}{evolution.diff}€ vs année précédente
            </p>
          </div>
        )}
      </div>

      {/* Graphique simplifié */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-8">
        <h2 className="font-semibold text-charcoal mb-4">Évolution des économies</h2>
        <div className="flex items-end justify-around h-40 gap-2">
          {[...simulations].sort((a, b) => a.annee - b.annee).map((sim, index) => {
            const maxEco = Math.max(...simulations.map(s => s.economie));
            const heightPercent = (sim.economie / maxEco) * 100;

            return (
              <div key={sim.id} className="flex flex-col items-center flex-1">
                <div className="w-full max-w-16 relative flex justify-center">
                  <div
                    className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${heightPercent}%`, minHeight: "20px" }}
                  />
                  <span className="absolute -top-6 text-xs font-semibold text-primary-600">
                    {sim.economie}€
                  </span>
                </div>
                <p className="text-xs text-slate mt-2 font-medium">{sim.annee}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filtres par année */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <button
          onClick={() => setSelectedYear(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selectedYear === null
              ? "bg-primary-500 text-white"
              : "bg-gray-100 text-slate hover:bg-gray-200"
          }`}
        >
          Toutes
        </button>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedYear === year
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-slate hover:bg-gray-200"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Liste des simulations */}
      <div className="space-y-3">
        <h2 className="font-semibold text-charcoal flex items-center gap-2">
          <FileText size={18} />
          Simulations sauvegardées
        </h2>

        {filteredSimulations.map((sim) => (
          <div
            key={sim.id}
            className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-charcoal">{sim.annee}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-charcoal">Déclaration {sim.annee}</p>
                  <span className="text-xs text-slate">•</span>
                  <span className="text-xs text-slate">
                    {new Date(sim.date).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate">
                    Salaire: <span className="font-medium text-charcoal">{sim.salaireNet.toLocaleString()}€</span>
                  </span>
                  <span className="text-slate">
                    Impôt: <span className="font-medium text-charcoal">{sim.impotFinal.toLocaleString()}€</span>
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-green-600">-{sim.economie}€</p>
                <p className="text-xs text-slate">économisés</p>
              </div>

              <button
                onClick={() => deleteSimulation(sim.id)}
                className="p-2 text-slate hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton nouvelle simulation */}
      <button className="mt-8 w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-medium py-4 rounded-xl transition-colors">
        <Plus size={20} />
        Nouvelle simulation
      </button>
    </div>
  );
}
