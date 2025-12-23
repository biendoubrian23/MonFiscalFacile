"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  Scale,
  Check,
  X,
  Info,
  ArrowRight,
  Crown,
} from "lucide-react";

export default function ComparateurPage() {
  const { isPremium } = useAuth();

  // Données comparatives
  const statuts = [
    {
      id: "ae",
      nom: "Auto-Entrepreneur",
      description: "Idéal pour démarrer, simple à gérer",
      avantages: [
        "Création gratuite et rapide",
        "Comptabilité ultra-simplifiée",
        "Charges proportionnelles au CA",
      ],
      inconvenients: [
        "Plafonds de CA limités",
        "Pas de déduction de charges",
        "Protection sociale limitée",
      ],
      pourQui: "Débutants, activités accessoires",
      cotisations: "22%",
      ir: "Barème progressif",
    },
    {
      id: "eurl",
      nom: "EURL",
      description: "Société unipersonnelle, plus de flexibilité",
      avantages: [
        "Pas de plafond de CA",
        "Déduction des charges réelles",
        "Option IS ou IR",
      ],
      inconvenients: [
        "Comptabilité obligatoire",
        "Frais de création (~500€)",
        "Cotisations TNS élevées",
      ],
      pourQui: "CA > 40k€, charges importantes",
      cotisations: "~45%",
      ir: "IS 15% puis 25%",
    },
    {
      id: "sasu",
      nom: "SASU",
      description: "Société avec président, optimisation possible",
      avantages: [
        "Dividendes à flat tax",
        "Statut salarié du dirigeant",
        "Crédibilité renforcée",
      ],
      inconvenients: [
        "Charges salariales élevées",
        "Cotisations retraite faibles",
        "Gestion plus complexe",
      ],
      pourQui: "CA > 70k€, optimisation fiscale",
      cotisations: "~70% sur salaire",
      ir: "Flat tax 30% dividendes",
    },
  ];

  if (!isPremium) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Comparateur de statuts</h1>
          <p className="text-slate mt-1">
            Trouvez le statut juridique optimal pour votre activité
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
            Le comparateur de statuts analyse votre situation personnelle et vous recommande 
            le meilleur choix entre AE, EURL et SASU.
          </p>
          <Link
            href="/mon-espace/abonnement"
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 hover:bg-primary-600 transition-colors"
          >
            Passer Premium
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Aperçu flou */}
        <div className="opacity-40 pointer-events-none blur-sm">
          <div className="grid md:grid-cols-3 gap-4">
            {statuts.map((statut) => (
              <div key={statut.id} className="bg-white border border-gray-100 p-4">
                <h3 className="font-semibold text-charcoal">{statut.nom}</h3>
                <p className="text-sm text-slate mt-1">{statut.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Comparateur de statuts</h1>
        <p className="text-slate mt-1">
          Comparez les différents statuts juridiques pour votre activité
        </p>
      </div>

      {/* Tableau comparatif */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-100">
          <thead>
            <tr>
              <th className="p-4 text-left text-sm font-medium text-slate border-b border-gray-100"></th>
              {statuts.map((statut) => (
                <th key={statut.id} className="p-4 text-left border-b border-gray-100">
                  <span className="font-semibold text-charcoal">{statut.nom}</span>
                  <span className="block text-xs text-slate font-normal mt-1">
                    {statut.description}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 font-medium text-sm text-charcoal border-b border-gray-50">
                Cotisations sociales
              </td>
              {statuts.map((statut) => (
                <td key={statut.id} className="p-4 text-sm border-b border-gray-50">
                  {statut.cotisations}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-medium text-sm text-charcoal border-b border-gray-50">
                Imposition
              </td>
              {statuts.map((statut) => (
                <td key={statut.id} className="p-4 text-sm border-b border-gray-50">
                  {statut.ir}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-medium text-sm text-charcoal border-b border-gray-50">
                Idéal pour
              </td>
              {statuts.map((statut) => (
                <td key={statut.id} className="p-4 text-sm border-b border-gray-50">
                  {statut.pourQui}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cards détaillées */}
      <div className="grid md:grid-cols-3 gap-6">
        {statuts.map((statut) => (
          <div key={statut.id} className="bg-white border border-gray-100 p-6">
            <h3 className="font-semibold text-charcoal mb-4">{statut.nom}</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-green-600 uppercase mb-2">Avantages</p>
                <ul className="space-y-2">
                  {statut.avantages.map((av, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate">{av}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="text-xs font-medium text-red-600 uppercase mb-2">Inconvénients</p>
                <ul className="space-y-2">
                  {statut.inconvenients.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-100 p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Ces informations sont générales. Pour une recommandation personnalisée basée 
          sur votre CA et vos charges, utilisez notre simulateur de scénarios.
        </p>
      </div>
    </div>
  );
}
