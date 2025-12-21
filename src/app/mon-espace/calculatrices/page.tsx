"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Calculator,
  Car,
  Receipt,
  Percent,
  TrendingUp,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Lock,
  Crown,
  Sparkles,
} from "lucide-react";

// Composant Tooltip
function Tooltip({ children, content }: { children: React.ReactNode; content: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="cursor-help"
      >
        {children}
      </div>
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-charcoal text-white text-sm rounded-lg shadow-lg">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-charcoal"></div>
        </div>
      )}
    </div>
  );
}

// Calculatrice Frais Kilométriques
function CalculatriceKm({ isPremium }: { isPremium: boolean }) {
  const [km, setKm] = useState(10000);
  const [cv, setCv] = useState(5);
  const [ouvert, setOuvert] = useState(true);

  // Barème 2024
  const bareme: { [key: number]: { d: number; k: number; fixe: number } } = {
    3: { d: 0.529, k: 0.316, fixe: 1065 },
    4: { d: 0.606, k: 0.340, fixe: 1330 },
    5: { d: 0.636, k: 0.357, fixe: 1395 },
    6: { d: 0.665, k: 0.374, fixe: 1457 },
    7: { d: 0.697, k: 0.394, fixe: 1515 },
  };

  const cvEffectif = Math.min(Math.max(cv, 3), 7);
  const params = bareme[cvEffectif];
  
  let frais = 0;
  if (km <= 5000) {
    frais = km * params.d;
  } else if (km <= 20000) {
    frais = km * params.k + params.fixe;
  } else {
    frais = km * params.d * 1.018;
  }

  const economieIR = Math.round(frais * 0.3); // Estimation TMI 30%

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOuvert(!ouvert)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Car className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-charcoal">Frais kilométriques</h3>
            <p className="text-sm text-slate">Calculez vos indemnités km déductibles</p>
          </div>
        </div>
        {ouvert ? <ChevronUp className="text-slate" /> : <ChevronDown className="text-slate" />}
      </button>

      {ouvert && (
        <div className="p-5 pt-0 border-t border-gray-100">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-2">
                  Kilomètres parcourus (pro)
                  <Tooltip content="Ne comptez que les déplacements professionnels : clients, réunions, formations... Pas les trajets domicile-travail sauf cas particuliers.">
                    <HelpCircle size={16} className="text-slate" />
                  </Tooltip>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={km}
                    onChange={(e) => setKm(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate">km</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={km}
                  onChange={(e) => setKm(Number(e.target.value))}
                  className="w-full mt-2 accent-primary-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-2">
                  Puissance fiscale (CV)
                  <Tooltip content="Trouvez cette info sur votre carte grise, case P.6. Plus la puissance est élevée, plus le barème est avantageux.">
                    <HelpCircle size={16} className="text-slate" />
                  </Tooltip>
                </label>
                <div className="flex gap-2">
                  {[3, 4, 5, 6, 7].map((cvOption) => (
                    <button
                      key={cvOption}
                      onClick={() => setCv(cvOption)}
                      className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                        cv === cvOption
                          ? "bg-primary-500 text-white"
                          : "bg-gray-100 text-charcoal hover:bg-gray-200"
                      }`}
                    >
                      {cvOption} CV
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Résultat */}
            <div className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-xl p-5">
              <p className="text-sm text-slate mb-2">Frais déductibles</p>
              <p className="text-4xl font-bold text-charcoal mb-1">
                {Math.round(frais).toLocaleString()}€
              </p>
              <p className="text-sm text-slate mb-4">par an</p>

              <div className="bg-white/80 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-charcoal">Économie d'impôt estimée</span>
                  <span className="font-bold text-primary-600">~{economieIR.toLocaleString()}€</span>
                </div>
                <p className="text-xs text-slate mt-1">
                  Estimation basée sur un TMI de 30%
                </p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-4 flex items-start gap-2 text-sm text-slate bg-gray-50 rounded-lg p-3">
            <Info size={16} className="flex-shrink-0 mt-0.5" />
            <p>
              <strong>Astuce :</strong> Conservez un carnet de bord de vos déplacements
              (date, destination, motif, km). C'est obligatoire en cas de contrôle fiscal.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Calculatrice Cotisations
function CalculatriceCotisations({ isPremium }: { isPremium: boolean }) {
  const [ca, setCa] = useState(50000);
  const [activite, setActivite] = useState<"services" | "commerce">("services");
  const [ouvert, setOuvert] = useState(false);

  const tauxCotisations = activite === "services" ? 0.22 : 0.127;
  const cotisations = Math.round(ca * tauxCotisations);
  const netApresCharges = ca - cotisations;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOuvert(!ouvert)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Receipt className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-charcoal">Cotisations sociales</h3>
            <p className="text-sm text-slate">Estimez vos charges URSSAF</p>
          </div>
        </div>
        {ouvert ? <ChevronUp className="text-slate" /> : <ChevronDown className="text-slate" />}
      </button>

      {ouvert && (
        <div className="p-5 pt-0 border-t border-gray-100">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-2">
                  Chiffre d'affaires annuel
                  <Tooltip content="Le CA total encaissé sur l'année, avant toute déduction.">
                    <HelpCircle size={16} className="text-slate" />
                  </Tooltip>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={ca}
                    onChange={(e) => setCa(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate">€</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-charcoal mb-2 block">Type d'activité</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActivite("services")}
                    className={`py-3 rounded-lg font-medium transition-all ${
                      activite === "services"
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-charcoal hover:bg-gray-200"
                    }`}
                  >
                    Services (22%)
                  </button>
                  <button
                    onClick={() => setActivite("commerce")}
                    className={`py-3 rounded-lg font-medium transition-all ${
                      activite === "commerce"
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-charcoal hover:bg-gray-200"
                    }`}
                  >
                    Commerce (12.7%)
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-primary-50 rounded-xl p-5">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate">Cotisations sociales</p>
                  <p className="text-3xl font-bold text-charcoal">{cotisations.toLocaleString()}€</p>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div>
                  <p className="text-sm text-slate">Net après cotisations</p>
                  <p className="text-2xl font-bold text-primary-600">{netApresCharges.toLocaleString()}€</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Calculatrice TVA (Premium)
function CalculatriceTVA({ isPremium }: { isPremium: boolean }) {
  const [ouvert, setOuvert] = useState(false);

  if (!isPremium) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden opacity-90">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Percent className="w-6 h-6 text-amber-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-charcoal">Calculatrice TVA</h3>
              <p className="text-sm text-slate">Gérez votre TVA collectée et déductible</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-amber-100 px-3 py-1.5 rounded-full">
            <Lock size={14} className="text-amber-600" />
            <span className="text-sm font-medium text-amber-700">Premium</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOuvert(!ouvert)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
            <Percent className="w-6 h-6 text-amber-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-charcoal">Calculatrice TVA</h3>
            <p className="text-sm text-slate">Gérez votre TVA collectée et déductible</p>
          </div>
        </div>
        {ouvert ? <ChevronUp className="text-slate" /> : <ChevronDown className="text-slate" />}
      </button>

      {ouvert && (
        <div className="p-5 pt-0 border-t border-gray-100">
          <p className="text-slate text-center py-8">
            Outil TVA disponible prochainement...
          </p>
        </div>
      )}
    </div>
  );
}

export default function CalculatricesPage() {
  const { isPremium } = useAuth();

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal">Calculatrices</h1>
          <span className="bg-primary-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            <Sparkles size={12} />
            Nouveau
          </span>
        </div>
        <p className="text-slate">
          Outils pratiques pour estimer vos charges et optimisations
        </p>
      </div>

      {/* Liste des calculatrices */}
      <div className="space-y-4">
        <CalculatriceKm isPremium={isPremium} />
        <CalculatriceCotisations isPremium={isPremium} />
        <CalculatriceTVA isPremium={isPremium} />
      </div>

      {/* CTA Premium si non premium */}
      {!isPremium && (
        <div className="mt-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white text-center">
          <Crown className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h3 className="text-xl font-bold mb-2">Débloquez tous les outils</h3>
          <p className="opacity-90 mb-4 max-w-md mx-auto">
            Accédez à la calculatrice TVA, aux simulateurs avancés et bien plus encore.
          </p>
          <a
            href="/mon-espace/abonnement"
            className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Passer Premium
          </a>
        </div>
      )}
    </div>
  );
}
