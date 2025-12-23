"use client";

import Link from "next/link";
import {
  PiggyBank,
  Briefcase,
  Sparkles,
  ChevronRight,
  Lock,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function SimulateursAvancesPage() {
  const { isPremium } = useAuth();

  const simulateurs = [
    {
      id: "retraite",
      titre: "Simulateur Retraite",
      description: "Estimez votre future pension et optimisez votre épargne retraite",
      icon: <PiggyBank className="w-8 h-8" />,
      href: "/mon-espace/simulateurs/retraite",
      premium: true,
      fonctionnalites: [
        "Estimation de votre pension",
        "Impact des versements PER",
        "Comparaison avec/sans optimisation",
        "Recommandations personnalisées",
      ],
    },
    {
      id: "dividendes",
      titre: "Simulateur Dividendes",
      description: "Optimisez la répartition salaire/dividendes en SASU ou EURL",
      icon: <Briefcase className="w-8 h-8" />,
      href: "/mon-espace/simulateurs/dividendes",
      premium: true,
      fonctionnalites: [
        "Répartition optimale salaire/dividendes",
        "Comparaison flat tax vs barème",
        "Impact sur la retraite",
        "Simulation pluriannuelle",
      ],
    },
    {
      id: "acre",
      titre: "Simulateur ACRE",
      description: "Vérifiez votre éligibilité et calculez vos économies",
      icon: <Sparkles className="w-8 h-8" />,
      href: "/mon-espace/simulateurs/acre",
      premium: false,
      fonctionnalites: [
        "Test d'éligibilité",
        "Calcul des économies",
        "Durée de l'exonération",
        "Démarches à suivre",
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Simulateurs avancés</h1>
        <p className="text-slate mt-1">
          Outils spécialisés pour des cas de figure spécifiques
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {simulateurs.map((sim) => {
          const isLocked = sim.premium && !isPremium;

          return (
            <div
              key={sim.id}
              className="bg-white border border-gray-100 p-6 flex flex-col"
            >
              <div className={`w-14 h-14 flex items-center justify-center mb-4 ${
                isLocked ? "bg-gray-50 text-slate" : "bg-primary-50 text-primary-500"
              }`}>
                {sim.icon}
              </div>

              <h3 className="font-semibold text-charcoal mb-2">
                {sim.titre}
                {sim.premium && (
                  <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5">
                    Premium
                  </span>
                )}
              </h3>
              <p className="text-sm text-slate mb-4">{sim.description}</p>

              <ul className="space-y-2 flex-1 mb-6">
                {sim.fonctionnalites.map((f, i) => (
                  <li key={i} className="text-sm text-slate flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-400" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={isLocked ? "/mon-espace/abonnement" : sim.href}
                className={`flex items-center justify-center gap-2 py-3 font-medium transition-colors ${
                  isLocked
                    ? "border border-gray-200 text-slate hover:border-primary-200 hover:text-primary-600"
                    : "bg-primary-500 text-white hover:bg-primary-600"
                }`}
              >
                {isLocked ? (
                  <>
                    <Lock size={16} />
                    Débloquer
                  </>
                ) : (
                  <>
                    Accéder
                    <ChevronRight size={16} />
                  </>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
