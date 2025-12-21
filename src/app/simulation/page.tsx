"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type FormData = {
  pays: string;
  statut: string;
  activite: string;
  caAnnuel: number;
  depensesMensuelles: number;
  tva: boolean;
};

const initialFormData: FormData = {
  pays: "",
  statut: "",
  activite: "",
  caAnnuel: 36000,
  depensesMensuelles: 400,
  tva: false,
};

export default function SimulationPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const totalSteps = 4;

  const updateFormData = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.pays !== "" && formData.statut !== "";
      case 2: return formData.activite !== "";
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <main className="min-h-screen bg-offwhite">
      {/* Header simplifié */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="text-xl font-bold text-charcoal">
            MonFiscalFacile
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Barre de progression */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate">Étape {step} sur {totalSteps}</span>
            <span className="text-sm text-slate">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-1 bg-gray-200">
            <div 
              className="h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Étape 1 : Situation */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-charcoal mb-2">
                Votre situation
              </h1>
              <p className="text-slate">
                Commençons par quelques informations de base.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Pays
                </label>
                <select
                  value={formData.pays}
                  onChange={(e) => updateFormData("pays", e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-charcoal bg-white focus:border-primary-500 focus:outline-none"
                >
                  <option value="">Sélectionnez votre pays</option>
                  <option value="france">France</option>
                  <option value="belgique">Belgique</option>
                  <option value="suisse">Suisse</option>
                  <option value="luxembourg">Luxembourg</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Statut professionnel
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: "auto-entrepreneur", label: "Auto-entrepreneur / Micro-entreprise" },
                    { value: "freelance", label: "Freelance / Travailleur indépendant" },
                    { value: "eurl", label: "EURL / SASU" },
                    { value: "particulier", label: "Particulier" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFormData("statut", option.value)}
                      className={`border p-4 text-left transition-all ${
                        formData.statut === option.value
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <span className="font-medium text-charcoal">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Étape 2 : Activité */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-charcoal mb-2">
                Votre activité
              </h1>
              <p className="text-slate">
                Quel type d'activité exercez-vous ?
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { value: "service", label: "Prestation de services", desc: "Conseil, développement, design, coaching..." },
                { value: "vente", label: "Vente de produits", desc: "E-commerce, artisanat, revente..." },
                { value: "mixte", label: "Activité mixte", desc: "Services et vente combinés" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateFormData("activite", option.value)}
                  className={`border p-6 text-left transition-all ${
                    formData.activite === option.value
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className="block font-semibold text-charcoal text-lg mb-1">
                    {option.label}
                  </span>
                  <span className="text-slate text-sm">
                    {option.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Étape 3 : Revenus */}
        {step === 3 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-charcoal mb-2">
                Vos revenus
              </h1>
              <p className="text-slate">
                Estimez votre chiffre d'affaires et vos dépenses.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-4">
                  Chiffre d'affaires annuel estimé : <span className="text-primary-500 font-bold">{formData.caAnnuel.toLocaleString()}€</span>
                </label>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="1000"
                  value={formData.caAnnuel}
                  onChange={(e) => updateFormData("caAnnuel", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-slate mt-2">
                  <span>10 000€</span>
                  <span>200 000€</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-4">
                  Dépenses professionnelles mensuelles : <span className="text-primary-500 font-bold">{formData.depensesMensuelles}€</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="50"
                  value={formData.depensesMensuelles}
                  onChange={(e) => updateFormData("depensesMensuelles", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-slate mt-2">
                  <span>0€</span>
                  <span>3 000€</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Étape 4 : TVA */}
        {step === 4 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-charcoal mb-2">
                TVA
              </h1>
              <p className="text-slate">
                Êtes-vous assujetti à la TVA ?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => updateFormData("tva", false)}
                className={`border p-6 text-center transition-all ${
                  !formData.tva
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="block font-semibold text-charcoal text-lg">Non</span>
                <span className="text-sm text-slate">Franchise en base</span>
              </button>
              <button
                onClick={() => updateFormData("tva", true)}
                className={`border p-6 text-center transition-all ${
                  formData.tva
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="block font-semibold text-charcoal text-lg">Oui</span>
                <span className="text-sm text-slate">TVA collectée</span>
              </button>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-4">
              <p className="text-sm text-slate">
                En France, vous êtes exonéré de TVA si votre CA annuel ne dépasse pas 36 800€ (services) ou 91 900€ (vente).
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center gap-2 text-slate hover:text-charcoal transition-colors"
            >
              <ArrowLeft size={20} />
              Retour
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-8 py-3 font-medium transition-all ${
                canProceed()
                  ? "bg-primary-500 text-white hover:bg-primary-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Continuer
              <ArrowRight size={20} />
            </button>
          ) : (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-primary-500 text-white px-8 py-3 font-medium hover:bg-primary-600 transition-all"
            >
              Voir mon diagnostic
              <ArrowRight size={20} />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
