"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, Info, TrendingDown, Wallet, PiggyBank, Calendar, Percent, ArrowRight } from "lucide-react";
import { genererDiagnostic } from "@/lib/fiscal/optimiseur";
import { useAuth } from "@/contexts/AuthContext";
import type { ProfilUtilisateur } from "@/lib/fiscal/types";

// Composant Infobulle simple
function Infobulle({ texte }: { texte: string }) {
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
        <Info size={14} />
      </button>
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-charcoal text-white text-xs rounded-lg shadow-lg">
          {texte}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-charcoal"></div>
        </div>
      )}
    </span>
  );
}

// Formater un montant sans virgule
function formatMontant(montant: number): string {
  return Math.round(montant).toLocaleString('fr-FR');
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [profil, setProfil] = useState<ProfilUtilisateur | null>(null);
  const [diagnostic, setDiagnostic] = useState<ReturnType<typeof genererDiagnostic> | null>(null);

  useEffect(() => {
    const savedProfil = localStorage.getItem("simulation_profil");
    if (savedProfil) {
      try {
        const parsed = JSON.parse(savedProfil);
        setProfil(parsed);
        const diag = genererDiagnostic(parsed);
        setDiagnostic(diag);
      } catch (e) {
        console.error("Erreur parsing profil:", e);
      }
    }
  }, []);

  if (!profil || !diagnostic) {
    return (
      <main className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate mb-4">Aucune simulation trouvée.</p>
          <Link href="/simulation" className="text-primary-600 font-semibold hover:underline">
            Lancer une simulation
          </Link>
        </div>
      </main>
    );
  }

  const { situationActuelle, meilleurScenario } = diagnostic;
  const avant = Math.round(situationActuelle.total);
  const economie = Math.round(meilleurScenario?.economieVsActuel || 0);
  const apres = avant - economie; // Calcul correct : après = avant - économie
  const caAnnuel = Math.round(profil.financier.caAnnuel);
  const revenuNet = caAnnuel - avant;
  const revenuNetApres = caAnnuel - apres;
  const tauxPrelevement = Math.round((avant / caAnnuel) * 100);
  const tauxApres = Math.round((apres / caAnnuel) * 100);
  const economieParMois = Math.round(economie / 12);

  return (
    <main className="min-h-screen bg-offwhite">
      {/* Header simple */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="MonFiscalFacile" width={150} height={40} className="h-8 w-auto" />
          </Link>
          <Link href="/simulation" className="text-slate text-sm hover:text-charcoal">
            Nouvelle simulation
          </Link>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-xl sm:text-2xl font-bold text-charcoal mb-2 text-center">
          Votre diagnostic fiscal
        </h1>
        <p className="text-slate text-center mb-8">
          Basé sur un chiffre d'affaires de <span className="font-semibold">{formatMontant(caAnnuel)}€</span> par an
        </p>

        {/* BLOC 1 : Résumé principal - 2 colonnes */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Ce que vous payez */}
          <div className="bg-white border border-gray-200 p-4 sm:p-6 text-center">
            <p className="text-slate text-xs sm:text-sm mb-1 flex items-center justify-center">
              Aujourd'hui vous payez
              <Infobulle texte="C'est le total de vos impôts et cotisations sociales par an, avec votre situation actuelle." />
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-danger break-words">
              {formatMontant(avant)}€
            </p>
            <p className="text-xs text-slate mt-1">par an</p>
          </div>

          {/* Après optimisation */}
          <div className="bg-primary-50 border border-primary-200 p-4 sm:p-6 text-center">
            <p className="text-primary-700 text-xs sm:text-sm mb-1 flex items-center justify-center">
              Vous pourriez payer
              <Infobulle texte="C'est ce que vous paieriez après avoir mis en place les optimisations légales adaptées à votre profil." />
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 break-words">
              {formatMontant(apres)}€
            </p>
            <p className="text-xs text-primary-600 mt-1">par an</p>
          </div>
        </div>

        {/* BLOC 2 : Économie mise en avant */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 sm:p-8 text-center text-white mb-6">
          <p className="text-sm sm:text-base mb-2 opacity-90">Vous pouvez économiser</p>
          <p className="text-4xl sm:text-5xl font-bold mb-2">{formatMontant(economie)}€</p>
          <p className="text-sm opacity-90">soit <span className="font-semibold">{formatMontant(economieParMois)}€ par mois</span> dans votre poche</p>
        </div>

        {/* BLOC 3 : Détails complémentaires - 4 petites cartes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {/* Revenu net actuel */}
          <div className="bg-white border border-gray-200 p-3 sm:p-4 text-center">
            <Wallet className="w-5 h-5 text-slate mx-auto mb-1" />
            <p className="text-xs text-slate mb-1">Revenu net actuel</p>
            <p className="text-lg sm:text-xl font-bold text-charcoal">{formatMontant(revenuNet)}€</p>
          </div>

          {/* Revenu net après */}
          <div className="bg-white border border-gray-200 p-3 sm:p-4 text-center">
            <PiggyBank className="w-5 h-5 text-primary-500 mx-auto mb-1" />
            <p className="text-xs text-slate mb-1">Revenu net possible</p>
            <p className="text-lg sm:text-xl font-bold text-primary-600">{formatMontant(revenuNetApres)}€</p>
          </div>

          {/* Taux prélèvement actuel */}
          <div className="bg-white border border-gray-200 p-3 sm:p-4 text-center">
            <Percent className="w-5 h-5 text-slate mx-auto mb-1" />
            <p className="text-xs text-slate mb-1">Taux actuel</p>
            <p className="text-lg sm:text-xl font-bold text-charcoal">{tauxPrelevement}%</p>
          </div>

          {/* Taux après */}
          <div className="bg-white border border-gray-200 p-3 sm:p-4 text-center">
            <TrendingDown className="w-5 h-5 text-primary-500 mx-auto mb-1" />
            <p className="text-xs text-slate mb-1">Taux optimisé</p>
            <p className="text-lg sm:text-xl font-bold text-primary-600">{tauxApres}%</p>
          </div>
        </div>

        {/* BLOC 4 : Comparaison simple avant/après */}
        <div className="bg-white border border-gray-200 p-4 sm:p-6 mb-6">
          <h2 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            En résumé sur 1 an
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-slate">Votre chiffre d'affaires</span>
              <span className="font-semibold text-charcoal">{formatMontant(caAnnuel)}€</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-slate">Impôts + cotisations (actuellement)</span>
              <span className="font-semibold text-danger">- {formatMontant(avant)}€</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-slate">Impôts + cotisations (après optimisation)</span>
              <span className="font-semibold text-primary-600">- {formatMontant(apres)}€</span>
            </div>
            <div className="flex justify-between items-center py-2 bg-primary-50 px-3 -mx-3 rounded">
              <span className="font-semibold text-charcoal">Gain annuel</span>
              <span className="font-bold text-xl text-primary-600">+{formatMontant(economie)}€</span>
            </div>
          </div>
        </div>

        {/* BLOC 5 : Section floutée - Comment optimiser */}
        <div className="bg-white border border-gray-200 p-6 relative overflow-hidden mb-6">
          <div className="filter blur-[3px] pointer-events-none select-none opacity-70">
            <h2 className="text-lg font-bold text-charcoal mb-4">Comment économiser {formatMontant(economie)}€ ?</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate text-sm">
              <li>Déclarer vos frais réels pour maximiser vos déductions fiscales</li>
              <li>Choisir le bon statut fiscal adapté à votre activité et revenus</li>
              <li>Optimiser vos charges professionnelles (loyer, matériel, déplacements)</li>
              <li>Profiter des exonérations et crédits d'impôt auxquels vous avez droit</li>
              <li>Adapter votre mode de rémunération pour réduire les cotisations</li>
              <li>Utiliser les dispositifs d'épargne retraite (PER) pour réduire l'impôt</li>
              <li>Suivre un guide pas à pas pour tout mettre en place facilement</li>
            </ul>
          </div>
          {/* Overlay pour débloquer - opacité réduite */}
          <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center z-10">
            <Lock className="w-10 h-10 text-gray-400 mb-4" />
            <p className="text-charcoal font-semibold mb-2 text-center">Débloquez votre plan d'optimisation</p>
            <p className="text-sm text-slate mb-4 text-center max-w-xs px-4">
              Découvrez exactement quoi faire pour économiser {formatMontant(economie)}€ par an.
            </p>
            <Link 
              href={user ? "/mon-espace" : "/connexion"} 
              className="bg-primary-500 text-white px-6 py-3 font-semibold hover:bg-primary-600 transition-all flex items-center gap-2"
            >
              Débloquer mes optimisations
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Petit texte de réassurance */}
        <p className="text-center text-xs text-slate mt-8">
          100% légal • Adapté à votre situation • Accompagnement pas à pas
        </p>
      </div>
    </main>
  );
}
