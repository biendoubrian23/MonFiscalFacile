"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Crown, ArrowRight, Info } from "lucide-react";
import Link from "next/link";

export default function SimulateurRetraitePage() {
  const { isPremium } = useAuth();
  const [ageActuel, setAgeActuel] = useState(35);
  const [ageDepart, setAgeDepart] = useState(64);
  const [revenusAnnuels, setRevenusAnnuels] = useState(40000);
  const [versementPER, setVersementPER] = useState(200);

  // Calcul simplifié
  const anneesCotisation = ageDepart - 25;
  const pensionEstimee = Math.round((revenusAnnuels * 0.5 * anneesCotisation) / 43);
  const capitalPER = versementPER * 12 * (ageDepart - ageActuel);
  const rentePerMensuelle = Math.round(capitalPER * 0.04 / 12);

  if (!isPremium) {
    return (
      <div className="space-y-8 max-w-2xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Simulateur Retraite</h1>
          <p className="text-slate mt-1">
            Estimez votre future pension et optimisez votre épargne
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
            Le simulateur retraite vous permet d'estimer votre pension et 
            d'optimiser vos versements PER pour préparer sereinement l'avenir.
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
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Simulateur Retraite</h1>
        <p className="text-slate mt-1">
          Estimez votre future pension et optimisez votre épargne
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Paramètres */}
        <div className="bg-white border border-gray-100 p-6 space-y-6">
          <h2 className="font-semibold text-charcoal">Vos paramètres</h2>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-slate">Âge actuel</label>
              <span className="font-medium text-charcoal">{ageActuel} ans</span>
            </div>
            <input
              type="range"
              min={18}
              max={60}
              value={ageActuel}
              onChange={(e) => setAgeActuel(Number(e.target.value))}
              className="w-full accent-primary-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-slate">Âge de départ souhaité</label>
              <span className="font-medium text-charcoal">{ageDepart} ans</span>
            </div>
            <input
              type="range"
              min={62}
              max={70}
              value={ageDepart}
              onChange={(e) => setAgeDepart(Number(e.target.value))}
              className="w-full accent-primary-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-slate">Revenus annuels moyens</label>
              <span className="font-medium text-charcoal">{revenusAnnuels.toLocaleString()}€</span>
            </div>
            <input
              type="range"
              min={15000}
              max={150000}
              step={1000}
              value={revenusAnnuels}
              onChange={(e) => setRevenusAnnuels(Number(e.target.value))}
              className="w-full accent-primary-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-slate">Versement PER mensuel</label>
              <span className="font-medium text-charcoal">{versementPER}€/mois</span>
            </div>
            <input
              type="range"
              min={0}
              max={1000}
              step={50}
              value={versementPER}
              onChange={(e) => setVersementPER(Number(e.target.value))}
              className="w-full accent-primary-500"
            />
          </div>
        </div>

        {/* Résultats */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 p-6">
            <p className="text-sm text-slate mb-2">Pension estimée (régime de base)</p>
            <p className="text-3xl font-bold text-charcoal">
              {pensionEstimee.toLocaleString()}€<span className="text-lg font-normal text-slate">/mois</span>
            </p>
            <p className="text-xs text-slate mt-2">
              Estimation basée sur {anneesCotisation} années de cotisation
            </p>
          </div>

          <div className="bg-primary-50 border border-primary-100 p-6">
            <p className="text-sm text-primary-700 mb-2">Rente PER estimée</p>
            <p className="text-3xl font-bold text-primary-600">
              +{rentePerMensuelle.toLocaleString()}€<span className="text-lg font-normal">/mois</span>
            </p>
            <p className="text-xs text-primary-600 mt-2">
              Capital PER accumulé : {capitalPER.toLocaleString()}€
            </p>
          </div>

          <div className="bg-green-50 border border-green-100 p-6">
            <p className="text-sm text-green-700 mb-2">Total estimé</p>
            <p className="text-3xl font-bold text-green-600">
              {(pensionEstimee + rentePerMensuelle).toLocaleString()}€<span className="text-lg font-normal">/mois</span>
            </p>
            <p className="text-xs text-green-600 mt-2">
              Soit {Math.round((pensionEstimee + rentePerMensuelle) / (revenusAnnuels / 12) * 100)}% de vos revenus actuels
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Ces estimations sont indicatives. Pour une simulation précise, consultez 
          votre relevé de carrière sur info-retraite.fr et contactez un conseiller.
        </p>
      </div>
    </div>
  );
}
