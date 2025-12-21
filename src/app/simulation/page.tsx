"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Plus, X, Info } from "lucide-react";

// Composant Infobulle
function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  
  return (
    <span className="relative inline-block ml-1">
      <button
        type="button"
        onClick={() => setShow(!show)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="text-slate hover:text-primary-500 transition-colors"
        aria-label="Plus d'informations"
      >
        <Info size={16} />
      </button>
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-charcoal text-white text-xs rounded-lg shadow-lg">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-charcoal"></div>
        </div>
      )}
    </span>
  );
}

type SituationFamiliale = 'celibataire' | 'marie' | 'pacse' | 'divorce' | 'veuf';
type Scolarite = 'maternelle' | 'primaire' | 'college' | 'lycee' | 'superieur' | null;

type EnfantData = {
  age: number;
  scolarite: Scolarite;
  fraisGarde: number;
};

type FormData = {
  // Étape 1: Situation
  pays: string;
  statut: string;
  situationFamiliale: SituationFamiliale;
  
  // Étape 2: Famille (conditionnelle)
  nbEnfants: number;
  enfants: EnfantData[];
  conjointRevenu: number;
  
  // Étape 3: Activité
  activite: string;
  
  // Étape 4: Revenus
  caAnnuel: number;
  depensesMensuelles: number;
  kmAnnuels: number;
  puissanceFiscale: '3' | '5' | '7';
  
  // Étape 5: Fiscal
  tva: boolean;
};

const initialFormData: FormData = {
  pays: "",
  statut: "",
  situationFamiliale: "celibataire",
  nbEnfants: 0,
  enfants: [],
  conjointRevenu: 0,
  activite: "",
  caAnnuel: 36000,
  depensesMensuelles: 400,
  kmAnnuels: 0,
  puissanceFiscale: '5',
  tva: false,
};

export default function SimulationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  
  // Nombre d'étapes dynamique selon la situation
  const hasFamily = formData.situationFamiliale !== 'celibataire' || formData.nbEnfants > 0;
  const totalSteps = hasFamily ? 5 : 4;

  const updateFormData = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const ajouterEnfant = () => {
    setFormData(prev => ({
      ...prev,
      nbEnfants: prev.nbEnfants + 1,
      enfants: [...prev.enfants, { age: 5, scolarite: null, fraisGarde: 0 }],
    }));
  };

  const supprimerEnfant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      nbEnfants: Math.max(0, prev.nbEnfants - 1),
      enfants: prev.enfants.filter((_, i) => i !== index),
    }));
  };

  const updateEnfant = (index: number, field: keyof EnfantData, value: number | Scolarite) => {
    setFormData(prev => ({
      ...prev,
      enfants: prev.enfants.map((e, i) => 
        i === index ? { ...e, [field]: value } : e
      ),
    }));
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
      case 2: 
        if (hasFamily) return true; // Étape famille optionnelle
        return formData.activite !== "";
      case 3: 
        if (hasFamily) return formData.activite !== "";
        return true;
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  };

  // Sauvegarde en localStorage pour persister les données
  useEffect(() => {
    const saved = localStorage.getItem('mff_simulation');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        // Ignorer
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mff_simulation', JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = () => {
    // Sauvegarder et rediriger vers le dashboard
    localStorage.setItem('mff_simulation', JSON.stringify(formData));
    router.push('/dashboard');
  };

  // Déterminer le contenu de l'étape actuelle
  const getStepContent = () => {
    if (hasFamily) {
      // 5 étapes
      switch (step) {
        case 1: return 'situation';
        case 2: return 'famille';
        case 3: return 'activite';
        case 4: return 'revenus';
        case 5: return 'fiscal';
        default: return 'situation';
      }
    } else {
      // 4 étapes
      switch (step) {
        case 1: return 'situation';
        case 2: return 'activite';
        case 3: return 'revenus';
        case 4: return 'fiscal';
        default: return 'situation';
      }
    }
  };

  const currentContent = getStepContent();

  return (
    <main className="min-h-screen bg-offwhite">
      {/* Header simplifié */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="MonFiscalFacile" width={150} height={40} className="h-8 w-auto" />
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
        {currentContent === 'situation' && (
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
                  title="Sélectionnez votre pays de résidence"
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

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Situation familiale
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "celibataire", label: "Célibataire" },
                    { value: "marie", label: "Marié(e)" },
                    { value: "pacse", label: "Pacsé(e)" },
                    { value: "divorce", label: "Divorcé(e)" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFormData("situationFamiliale", option.value as SituationFamiliale)}
                      className={`border p-3 text-center transition-all ${
                        formData.situationFamiliale === option.value
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <span className="font-medium text-charcoal text-sm">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Avez-vous des enfants à charge ?
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      if (formData.nbEnfants === 0) ajouterEnfant();
                    }}
                    className={`flex-1 border p-3 text-center transition-all ${
                      formData.nbEnfants > 0
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <span className="font-medium text-charcoal">Oui</span>
                  </button>
                  <button
                    onClick={() => updateFormData("nbEnfants", 0)}
                    className={`flex-1 border p-3 text-center transition-all ${
                      formData.nbEnfants === 0
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <span className="font-medium text-charcoal">Non</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Étape Famille (conditionnelle) */}
        {currentContent === 'famille' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-charcoal mb-2">
                Votre famille
              </h1>
              <p className="text-slate">
                Ces informations nous permettent d'optimiser vos avantages fiscaux.
              </p>
            </div>

            {(formData.situationFamiliale === 'marie' || formData.situationFamiliale === 'pacse') && (
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Revenus annuels de votre conjoint(e)
                </label>
                <input
                  type="number"
                  value={formData.conjointRevenu}
                  onChange={(e) => updateFormData("conjointRevenu", parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-300 px-4 py-3 text-charcoal bg-white focus:border-primary-500 focus:outline-none"
                  placeholder="0"
                />
                <p className="text-xs text-slate mt-1">Laissez 0 si sans revenus</p>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-charcoal">
                  Vos enfants à charge ({formData.nbEnfants})
                </label>
                <button
                  onClick={ajouterEnfant}
                  className="flex items-center gap-1 text-primary-500 hover:text-primary-600 text-sm font-medium"
                >
                  <Plus size={16} />
                  Ajouter
                </button>
              </div>

              <div className="space-y-4">
                {formData.enfants.map((enfant, index) => (
                  <div key={index} className="bg-white border border-gray-200 p-4">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-medium text-charcoal">Enfant {index + 1}</span>
                      <button
                        onClick={() => supprimerEnfant(index)}
                        className="text-slate hover:text-danger transition-colors"
                        aria-label="Supprimer cet enfant"
                        title="Supprimer"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate mb-1">Âge</label>
                        <input
                          type="number"
                          value={enfant.age}
                          onChange={(e) => updateEnfant(index, 'age', parseInt(e.target.value) || 0)}
                          className="w-full border border-gray-300 px-3 py-2 text-charcoal bg-white focus:border-primary-500 focus:outline-none text-sm"
                          min="0"
                          max="25"
                          title="Âge de l'enfant"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate mb-1">Scolarité</label>
                        <select
                          value={enfant.scolarite || ''}
                          onChange={(e) => updateEnfant(index, 'scolarite', e.target.value as Scolarite || null)}
                          className="w-full border border-gray-300 px-3 py-2 text-charcoal bg-white focus:border-primary-500 focus:outline-none text-sm"
                          title="Niveau de scolarité"
                        >
                          <option value="">Non scolarisé</option>
                          <option value="maternelle">Maternelle</option>
                          <option value="primaire">Primaire</option>
                          <option value="college">Collège</option>
                          <option value="lycee">Lycée</option>
                          <option value="superieur">Supérieur</option>
                        </select>
                      </div>
                    </div>

                    {enfant.age < 6 && (
                      <div className="mt-4">
                        <label className="block text-xs text-slate mb-1">
                          Frais de garde mensuels (crèche, nounou...)
                        </label>
                        <input
                          type="number"
                          value={enfant.fraisGarde}
                          onChange={(e) => updateEnfant(index, 'fraisGarde', parseInt(e.target.value) || 0)}
                          className="w-full border border-gray-300 px-3 py-2 text-charcoal bg-white focus:border-primary-500 focus:outline-none text-sm"
                          placeholder="0"
                          title="Frais de garde mensuels"
                        />
                        <p className="text-xs text-primary-600 mt-1">
                          Crédit d'impôt de 50% sur ces frais
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                {formData.enfants.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 border border-gray-200">
                    <p className="text-slate text-sm mb-4">Aucun enfant ajouté</p>
                    <button
                      onClick={ajouterEnfant}
                      className="text-primary-500 hover:text-primary-600 font-medium text-sm"
                    >
                      Ajouter un enfant
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Étape Activité */}
        {currentContent === 'activite' && (
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

        {/* Étape Revenus */}
        {currentContent === 'revenus' && (
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
                  title="Chiffre d'affaires annuel"
                />
                <div className="flex justify-between text-xs text-slate mt-2">
                  <span>10 000€</span>
                  <span>200 000€</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-4">
                  Dépenses professionnelles mensuelles : <span className="text-primary-500 font-bold">{formData.depensesMensuelles}€</span>                  <Tooltip text="Incluez vos achats de matériel, abonnements logiciels, téléphone, internet pro, formations, etc. Ces dépenses sont déductibles de votre revenu imposable." />                </label>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="50"
                  value={formData.depensesMensuelles}
                  onChange={(e) => updateFormData("depensesMensuelles", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-primary-500"
                  title="Dépenses professionnelles mensuelles"
                />
                <div className="flex justify-between text-xs text-slate mt-2">
                  <span>0€</span>
                  <span>3 000€</span>
                </div>
              </div>

              {/* Frais kilométriques */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-4">
                  Kilomètres professionnels annuels : <span className="text-primary-500 font-bold">{formData.kmAnnuels?.toLocaleString() || 0} km</span>
                  <Tooltip text="Kilomètres parcourus pour vos déplacements professionnels (clients, réunions, formations). Le barème kilométrique permet de déduire ces frais de vos revenus." />
                </label>
                <input
                  type="range"
                  min="0"
                  max="30000"
                  step="500"
                  value={formData.kmAnnuels || 0}
                  onChange={(e) => updateFormData("kmAnnuels", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-primary-500"
                  title="Kilomètres professionnels annuels"
                />
                <div className="flex justify-between text-xs text-slate mt-2">
                  <span>0 km</span>
                  <span>30 000 km</span>
                </div>
                {(formData.kmAnnuels || 0) > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-slate mb-2">
                      Puissance fiscale du véhicule
                      <Tooltip text="CV = Chevaux fiscaux. C'est la puissance administrative de votre véhicule (indiquée sur la carte grise). Plus elle est élevée, plus le montant déductible par km est important : 3CV ≈ 0,53€/km, 5CV ≈ 0,59€/km, 7CV+ ≈ 0,63€/km." />
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                    {(['3', '5', '7'] as const).map((cv) => (
                      <button
                        key={cv}
                        onClick={() => updateFormData("puissanceFiscale", cv)}
                        className={`border p-3 text-center transition-all ${
                          formData.puissanceFiscale === cv
                            ? "border-primary-500 bg-primary-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <span className="block font-semibold text-charcoal">{cv} CV</span>
                      </button>
                    ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Étape Fiscal (TVA + Résumé) */}
        {currentContent === 'fiscal' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-charcoal mb-2">
                Situation fiscale
              </h1>
              <p className="text-slate">
                Dernières informations pour votre diagnostic.
              </p>
            </div>

            {/* TVA */}
            <div>
              <h2 className="text-lg font-semibold text-charcoal mb-4">TVA</h2>
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
              <div className="mt-4 bg-gray-50 border border-gray-200 p-4">
                <p className="text-sm text-slate">
                  En France, vous êtes exonéré de TVA si votre CA annuel ne dépasse pas 36 800€ (services) ou 91 900€ (vente).
                </p>
              </div>
            </div>

            {/* Récapitulatif */}
            <div className="mt-8 bg-primary-50 border border-primary-200 p-6">
              <h2 className="text-lg font-semibold text-charcoal mb-4">Récapitulatif de votre profil</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate">Statut</span>
                  <span className="font-medium text-charcoal capitalize">{formData.statut.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate">Situation</span>
                  <span className="font-medium text-charcoal capitalize">{formData.situationFamiliale}</span>
                </div>
                {formData.nbEnfants > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate">Enfants</span>
                    <span className="font-medium text-charcoal">{formData.nbEnfants} enfant{formData.nbEnfants > 1 ? 's' : ''}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate">Activité</span>
                  <span className="font-medium text-charcoal capitalize">{formData.activite}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate">CA estimé</span>
                  <span className="font-medium text-charcoal">{formData.caAnnuel.toLocaleString()}€/an</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate">Dépenses</span>
                  <span className="font-medium text-charcoal">{formData.depensesMensuelles}€/mois</span>
                </div>
                {(formData.kmAnnuels || 0) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate">Frais km</span>
                    <span className="font-medium text-charcoal">{formData.kmAnnuels?.toLocaleString()} km ({formData.puissanceFiscale} CV)</span>
                  </div>
                )}
              </div>
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
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-primary-500 text-white px-8 py-3 font-medium hover:bg-primary-600 transition-all"
            >
              Voir mon diagnostic
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
