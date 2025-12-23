"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Crown, ArrowRight, Info, Check } from "lucide-react";
import Link from "next/link";

export default function SimulateurDividendesPage() {
  const { isPremium } = useAuth();
  const [resultatNet, setResultatNet] = useState(80000);
  const [salaireBrut, setSalaireBrut] = useState(40000);

  // Calculs simplifiés
  const dividendesBruts = resultatNet - salaireBrut - (salaireBrut * 0.45); // Après charges patronales
  const flatTax = dividendesBruts * 0.30;
  const netApresFlat = dividendesBruts - flatTax;

  // Abattement 40% + barème progressif (simplifié)
  const baseBareme = dividendesBruts * 0.6;
  const irBareme = baseBareme * 0.30; // Approximation TMI 30%
  const prelevement = dividendesBruts * 0.172; // PS
  const netApresBareme = dividendesBruts - irBareme - prelevement;

  const meilleureOption = netApresFlat > netApresBareme ? "flat" : "bareme";

  if (!isPremium) {
    return (
      <div className="space-y-8 max-w-2xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Simulateur Dividendes</h1>
          <p className="text-slate mt-1">
            Optimisez la répartition salaire/dividendes
          </p>
        </div>

        <div className="bg-white border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-amber-50 flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-xl font-semibold text-charcoal mb-2">
            Fonctionnalité Premium
          </h2>
          <p className="text-slate max-w-md mx-auto mb-6">
            Le simulateur dividendes vous aide à trouver la répartition optimale 
            entre salaire et dividendes pour votre SASU ou EURL.
          </p>
          <Link
            href="/mon-espace/abonnement"
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 hover:bg-primary-600 transition-colors"
          >
            Passer Premium
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Simulateur Dividendes</h1>
        <p className="text-slate mt-1">
          Trouvez la répartition optimale salaire/dividendes (SASU)
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Paramètres */}
        <div className="bg-white border border-gray-100 p-6 space-y-6">
          <h2 className="font-semibold text-charcoal">Vos paramètres</h2>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-slate">Résultat net société</label>
              <span className="font-medium text-charcoal">{resultatNet.toLocaleString()}€</span>
            </div>
            <input
              type="range"
              min={30000}
              max={200000}
              step={5000}
              value={resultatNet}
              onChange={(e) => setResultatNet(Number(e.target.value))}
              className="w-full accent-primary-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-slate">Salaire brut annuel</label>
              <span className="font-medium text-charcoal">{salaireBrut.toLocaleString()}€</span>
            </div>
            <input
              type="range"
              min={0}
              max={resultatNet * 0.7}
              step={2000}
              value={salaireBrut}
              onChange={(e) => setSalaireBrut(Number(e.target.value))}
              className="w-full accent-primary-500"
            />
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-slate">Dividendes bruts</span>
              <span className="font-medium text-charcoal">
                {Math.max(0, dividendesBruts).toLocaleString()}€
              </span>
            </div>
          </div>
        </div>

        {/* Flat Tax */}
        <div className={`bg-white border p-6 ${
          meilleureOption === "flat" ? "border-primary-500" : "border-gray-100"
        }`}>
          {meilleureOption === "flat" && (
            <div className="flex items-center gap-2 text-primary-600 mb-4">
              <Check size={18} />
              <span className="text-sm font-medium">Option recommandée</span>
            </div>
          )}
          <h3 className="font-semibold text-charcoal mb-4">Flat Tax (PFU)</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate">Dividendes bruts</span>
              <span className="text-charcoal">{Math.max(0, dividendesBruts).toLocaleString()}€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate">Prélèvement (30%)</span>
              <span className="text-red-500">-{flatTax.toLocaleString()}€</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-100">
              <span className="font-medium text-charcoal">Net perçu</span>
              <span className="font-bold text-charcoal text-lg">
                {Math.max(0, netApresFlat).toLocaleString()}€
              </span>
            </div>
          </div>
        </div>

        {/* Barème progressif */}
        <div className={`bg-white border p-6 ${
          meilleureOption === "bareme" ? "border-primary-500" : "border-gray-100"
        }`}>
          {meilleureOption === "bareme" && (
            <div className="flex items-center gap-2 text-primary-600 mb-4">
              <Check size={18} />
              <span className="text-sm font-medium">Option recommandée</span>
            </div>
          )}
          <h3 className="font-semibold text-charcoal mb-4">Barème progressif</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate">Dividendes bruts</span>
              <span className="text-charcoal">{Math.max(0, dividendesBruts).toLocaleString()}€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate">Abattement 40%</span>
              <span className="text-green-500">-{Math.round(dividendesBruts * 0.4).toLocaleString()}€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate">IR + PS</span>
              <span className="text-red-500">-{Math.round(irBareme + prelevement).toLocaleString()}€</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-100">
              <span className="font-medium text-charcoal">Net perçu</span>
              <span className="font-bold text-charcoal text-lg">
                {Math.max(0, netApresBareme).toLocaleString()}€
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Différence */}
      <div className="bg-primary-50 border border-primary-100 p-6 text-center">
        <p className="text-sm text-primary-700 mb-2">
          En choisissant l'option optimale, vous gagnez
        </p>
        <p className="text-3xl font-bold text-primary-600">
          {Math.abs(netApresFlat - netApresBareme).toLocaleString()}€
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Cette simulation est simplifiée. Le choix optimal dépend de nombreux facteurs : 
          autres revenus du foyer, réductions d'impôt, objectifs patrimoniaux...
          Consultez un expert-comptable pour un conseil personnalisé.
        </p>
      </div>
    </div>
  );
}
