"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock, Euro, Users, Heart, Home, Sparkles } from "lucide-react";

// Types pour le formulaire simplifié salariés
type FormData = {
  salaireNet: number;
  nbEnfants: number;
  faitDesDons: boolean;
  montantDons: number;
  donsParMois: boolean; // true = par mois, false = par an
  estProprietaire: boolean;
};

const initialFormData: FormData = {
  salaireNet: 2500,
  nbEnfants: 0,
  faitDesDons: false,
  montantDons: 0,
  donsParMois: true,
  estProprietaire: false,
};

// Animation de chargement avec textes aléatoires
function LoadingAnimation({ onFinish }: { onFinish: () => void }) {
  const messages = [
    "Analyse de votre situation fiscale...",
    "Calcul de votre impôt estimé...",
    "Recherche des optimisations possibles...",
    "Identification des déductions oubliées...",
    "Vérification des crédits d'impôt...",
    "Préparation de votre diagnostic personnalisé..."
  ];

  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [progress, setProgress] = useState(0);
  const duration = 5000; // 5 secondes total

  useEffect(() => {
    const startTime = Date.now();
    
    // Générer des durées aléatoires pour chaque message
    const generateRandomDurations = () => {
      const count = messages.length;
      const durations: number[] = [];
      let remaining = duration;
      
      for (let i = 0; i < count - 1; i++) {
        const minDuration = 300;
        const maxDuration = Math.min(1500, remaining - (count - i - 1) * 300);
        const randomDuration = Math.floor(Math.random() * (maxDuration - minDuration)) + minDuration;
        durations.push(randomDuration);
        remaining -= randomDuration;
      }
      durations.push(remaining);
      return durations;
    };

    const durations = generateRandomDurations();
    let elapsed = 0;

    const messageTimers: NodeJS.Timeout[] = [];
    durations.forEach((dur, i) => {
      const timer = setTimeout(() => {
        if (i < messages.length) {
          setCurrentMessage(messages[i]);
        }
      }, elapsed);
      messageTimers.push(timer);
      elapsed += dur;
    });

    const progressInterval = setInterval(() => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      const newProgress = Math.min(elapsedTime / duration, 1);
      setProgress(newProgress);

      if (elapsedTime >= duration) {
        clearInterval(progressInterval);
        onFinish();
      }
    }, 50);

    return () => {
      clearInterval(progressInterval);
      messageTimers.forEach(t => clearTimeout(t));
    };
  }, [onFinish]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-primary-500 animate-pulse" />
        </div>
        
        <p className="text-lg text-charcoal font-medium mb-8 h-8">
          {currentMessage}
        </p>
        
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        
        <p className="text-sm text-slate">
          {Math.round(progress * 100)}%
        </p>
      </div>
    </main>
  );
}

// Calcul simplifié de l'impôt pour un salarié
function calculerImpotSalarie(data: FormData) {
  const salaireAnnuel = data.salaireNet * 12;
  
  // Abattement de 10% pour frais professionnels
  const revenuImposable = salaireAnnuel * 0.9;
  
  // Calcul des parts fiscales
  let parts = 1;
  if (data.nbEnfants === 1) parts += 0.5;
  else if (data.nbEnfants === 2) parts += 1;
  else if (data.nbEnfants >= 3) parts += 1 + (data.nbEnfants - 2);
  
  // Quotient familial
  const quotient = revenuImposable / parts;
  
  // Barème 2024
  let impotParPart = 0;
  if (quotient <= 11294) impotParPart = 0;
  else if (quotient <= 28797) impotParPart = (quotient - 11294) * 0.11;
  else if (quotient <= 82341) impotParPart = (28797 - 11294) * 0.11 + (quotient - 28797) * 0.30;
  else if (quotient <= 177106) impotParPart = (28797 - 11294) * 0.11 + (82341 - 28797) * 0.30 + (quotient - 82341) * 0.41;
  else impotParPart = (28797 - 11294) * 0.11 + (82341 - 28797) * 0.30 + (177106 - 82341) * 0.41 + (quotient - 177106) * 0.45;
  
  let impotBrut = Math.round(impotParPart * parts);
  
  // Réduction pour dons (66% du montant annuel)
  const montantDonsAnnuel = data.donsParMois ? data.montantDons * 12 : data.montantDons;
  const reductionDons = data.faitDesDons ? Math.round(montantDonsAnnuel * 0.66) : 0;
  
  // Impôt final
  const impotFinal = Math.max(0, impotBrut - reductionDons);
  
  // Estimation des économies possibles
  let tauxEconomie = 0.08;
  if (data.nbEnfants > 0) tauxEconomie += 0.03;
  if (!data.faitDesDons) tauxEconomie += 0.02;
  if (data.estProprietaire) tauxEconomie += 0.02;
  
  const economieEstimee = Math.round(impotFinal * tauxEconomie);
  
  return {
    salaireAnnuel,
    revenuImposable: Math.round(revenuImposable),
    parts,
    impotBrut,
    reductionDons,
    impotFinal,
    economieEstimee,
    impotApresOptimisation: impotFinal - economieEstimee,
    tauxImposition: Math.round((impotFinal / salaireAnnuel) * 100 * 10) / 10
  };
}

export default function SimulationPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resultats, setResultats] = useState<ReturnType<typeof calculerImpotSalarie> | null>(null);

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setLoading(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleLoadingFinish = () => {
    const results = calculerImpotSalarie(formData);
    setResultats(results);
    setLoading(false);
    setShowResults(true);
  };

  // Page de chargement
  if (loading) {
    return <LoadingAnimation onFinish={handleLoadingFinish} />;
  }

  // Page de résultats
  if (showResults && resultats) {
    return (
      <main className="min-h-screen bg-offwhite">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-2xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="MonFiscalFacile" width={150} height={40} className="h-8 w-auto" />
            </Link>
            <button
              onClick={() => {
                setShowResults(false);
                setStep(1);
                setFormData(initialFormData);
              }}
              className="text-slate text-sm hover:text-charcoal"
            >
              Nouvelle simulation
            </button>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-6 py-10">
          {/* Titre */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-charcoal mb-2">
              Estimation de votre impôt annuel
            </h1>
            <p className="text-slate">
              Basé sur un salaire net de {formData.salaireNet.toLocaleString()}€/mois
            </p>
          </div>

          {/* Résultat principal */}
          <div className="bg-white border border-gray-200 p-6 mb-6 text-center">
            <p className="text-slate text-sm mb-2">Votre impôt estimé</p>
            <p className="text-5xl font-bold text-charcoal mb-2">
              {resultats.impotFinal.toLocaleString()}€
            </p>
            <p className="text-slate text-sm">par an</p>
          </div>

          {/* Message accrocheur */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white text-center mb-6">
            <p className="text-lg font-semibold mb-2">
              Vous pourriez garder jusqu'à {resultats.economieEstimee.toLocaleString()}€ de plus
            </p>
            <p className="text-primary-100 text-sm">
              en déclarant correctement ce que la plupart des gens oublient
            </p>
          </div>

          {/* Section floutée - Optimisations */}
          <div className="bg-white border border-gray-200 p-6 relative overflow-hidden">
            <div className="filter blur-[4px] pointer-events-none select-none opacity-60">
              <h2 className="text-lg font-bold text-charcoal mb-4">
                Optimisations qui vous concernent
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-charcoal">Frais réels déductibles</p>
                    <p className="text-sm text-slate">Transport, repas, télétravail...</p>
                  </div>
                  <span className="text-lg font-bold text-primary-600">+●●● €</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-charcoal">Crédits d'impôt oubliés</p>
                    <p className="text-sm text-slate">Emploi à domicile, garde d'enfants...</p>
                  </div>
                  <span className="text-lg font-bold text-primary-600">+●●● €</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-charcoal">Réductions fiscales</p>
                    <p className="text-sm text-slate">Dons, investissements, épargne retraite...</p>
                  </div>
                  <span className="text-lg font-bold text-primary-600">+●●● €</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-charcoal">Avantages famille</p>
                    <p className="text-sm text-slate">Frais de scolarité, garde, activités...</p>
                  </div>
                  <span className="text-lg font-bold text-primary-600">+●●● €</span>
                </div>

                <div className="flex justify-between items-center py-3 bg-primary-50 px-4 -mx-4 rounded">
                  <span className="font-semibold text-charcoal">Total économies possibles</span>
                  <span className="font-bold text-xl text-primary-600">+●●●● €/an</span>
                </div>
              </div>
            </div>

            {/* Overlay cliquable */}
            <Link
              href="/connexion"
              className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-10 cursor-pointer hover:bg-white/60 transition-colors"
            >
              <Lock className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-charcoal font-semibold mb-2 text-center text-lg">
                Découvrez comment garder plus d'argent
              </p>
              <p className="text-sm text-slate mb-4 text-center max-w-xs">
                Accédez à votre plan personnalisé pour économiser jusqu'à {resultats.economieEstimee.toLocaleString()}€ par an
              </p>
              <span className="bg-primary-500 text-white px-6 py-3 font-semibold hover:bg-primary-600 transition-all flex items-center gap-2">
                Voir mes optimisations
                <ArrowRight size={18} />
              </span>
            </Link>
          </div>

          {/* Réassurance */}
          <p className="text-center text-xs text-slate mt-8">
            100% légal • Basé sur le code des impôts français • Accompagnement pas à pas
          </p>
        </div>
      </main>
    );
  }

  // Pages du formulaire
  return (
    <main className="min-h-screen bg-offwhite">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="MonFiscalFacile" width={150} height={40} className="h-8 w-auto" />
          </Link>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-12">
        {/* Barre de progression */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate mb-2">
            <span>Étape {step} sur {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Étape 1 : Salaire */}
        {step === 1 && (
          <div className="bg-white border border-gray-200 p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Euro className="w-6 h-6 text-primary-500" />
            </div>
            <h2 className="text-xl font-bold text-charcoal mb-2">
              Quel est votre salaire net mensuel ?
            </h2>
            <p className="text-slate text-sm mb-6">
              Le montant que vous recevez sur votre compte chaque mois
            </p>

            <div className="mb-6">
              <div className="relative">
                <input
                  type="number"
                  value={formData.salaireNet}
                  onChange={(e) => setFormData({ ...formData, salaireNet: Number(e.target.value) })}
                  className="w-full text-3xl font-bold text-center py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  min="0"
                  step="100"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-slate">€</span>
              </div>
              <p className="text-center text-sm text-slate mt-2">par mois</p>
            </div>

            {/* Raccourcis */}
            <div className="flex flex-wrap gap-2 justify-center">
              {[1500, 2000, 2500, 3000, 4000, 5000].map((montant) => (
                <button
                  key={montant}
                  onClick={() => setFormData({ ...formData, salaireNet: montant })}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    formData.salaireNet === montant
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 text-slate hover:bg-gray-200"
                  }`}
                >
                  {montant.toLocaleString()}€
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Étape 2 : Enfants */}
        {step === 2 && (
          <div className="bg-white border border-gray-200 p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary-500" />
            </div>
            <h2 className="text-xl font-bold text-charcoal mb-2">
              Combien d'enfants avez-vous à charge ?
            </h2>
            <p className="text-slate text-sm mb-6">
              Cela influence directement votre quotient familial
            </p>

            <div className="grid grid-cols-5 gap-3">
              {[0, 1, 2, 3, 4].map((nb) => (
                <button
                  key={nb}
                  onClick={() => setFormData({ ...formData, nbEnfants: nb })}
                  className={`py-4 rounded-lg text-xl font-bold transition-all ${
                    formData.nbEnfants === nb
                      ? "bg-primary-500 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-charcoal hover:bg-gray-200"
                  }`}
                >
                  {nb === 4 ? "4+" : nb}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Étape 3 : Dons */}
        {step === 3 && (
          <div className="bg-white border border-gray-200 p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary-500" />
            </div>
            <h2 className="text-xl font-bold text-charcoal mb-2">
              Faites-vous des dons à des associations ?
            </h2>
            <p className="text-slate text-sm mb-6">
              Les dons permettent de réduire vos impôts de 66%
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setFormData({ ...formData, faitDesDons: true })}
                className={`py-6 rounded-lg text-lg font-semibold transition-all ${
                  formData.faitDesDons
                    ? "bg-primary-500 text-white shadow-lg"
                    : "bg-gray-100 text-charcoal hover:bg-gray-200"
                }`}
              >
                Oui
              </button>
              <button
                onClick={() => setFormData({ ...formData, faitDesDons: false, montantDons: 0 })}
                className={`py-6 rounded-lg text-lg font-semibold transition-all ${
                  !formData.faitDesDons
                    ? "bg-primary-500 text-white shadow-lg"
                    : "bg-gray-100 text-charcoal hover:bg-gray-200"
                }`}
              >
                Non
              </button>
            </div>

            {formData.faitDesDons && (
              <div>
                {/* Label */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-sm text-slate">Montant de vos dons (environ)</span>
                  {/* Toggle segmenté style switch */}
                  <div className="inline-flex bg-gray-200 rounded-lg p-0.5">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, donsParMois: true })}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                        formData.donsParMois
                          ? "bg-white text-charcoal shadow-sm"
                          : "text-slate hover:text-charcoal"
                      }`}
                    >
                      par mois
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, donsParMois: false })}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                        !formData.donsParMois
                          ? "bg-white text-charcoal shadow-sm"
                          : "text-slate hover:text-charcoal"
                      }`}
                    >
                      par an
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.montantDons}
                    onChange={(e) => setFormData({ ...formData, montantDons: Number(e.target.value) })}
                    className="w-full text-xl font-bold text-center py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    min="0"
                    step="10"
                    placeholder="10"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-slate">€</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Étape 4 : Propriétaire */}
        {step === 4 && (
          <div className="bg-white border border-gray-200 p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Home className="w-6 h-6 text-primary-500" />
            </div>
            <h2 className="text-xl font-bold text-charcoal mb-2">
              Êtes-vous propriétaire de votre logement ?
            </h2>
            <p className="text-slate text-sm mb-6">
              Certaines déductions sont liées à votre situation immobilière
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setFormData({ ...formData, estProprietaire: true })}
                className={`py-6 rounded-lg text-lg font-semibold transition-all ${
                  formData.estProprietaire
                    ? "bg-primary-500 text-white shadow-lg"
                    : "bg-gray-100 text-charcoal hover:bg-gray-200"
                }`}
              >
                Oui
              </button>
              <button
                onClick={() => setFormData({ ...formData, estProprietaire: false })}
                className={`py-6 rounded-lg text-lg font-semibold transition-all ${
                  !formData.estProprietaire
                    ? "bg-primary-500 text-white shadow-lg"
                    : "bg-gray-100 text-charcoal hover:bg-gray-200"
                }`}
              >
                Non
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-6 py-3 text-slate hover:text-charcoal transition-colors"
            >
              ← Retour
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="bg-primary-500 text-white px-8 py-3 font-semibold hover:bg-primary-600 transition-all flex items-center gap-2"
          >
            {step === totalSteps ? (
              <>
                Voir combien je peux gagner
                <Sparkles size={18} />
              </>
            ) : (
              <>
                Continuer
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
