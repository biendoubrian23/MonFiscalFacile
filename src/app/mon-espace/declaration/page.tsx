"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  FileText,
  Crown,
  ArrowRight,
  CheckCircle,
  Info,
  ExternalLink,
} from "lucide-react";

export default function DeclarationPage() {
  const { isPremium } = useAuth();

  const etapes = [
    {
      numero: 1,
      titre: "Se connecter à impots.gouv.fr",
      description: "Munissez-vous de votre numéro fiscal et mot de passe",
    },
    {
      numero: 2,
      titre: "Vérifier la déclaration pré-remplie",
      description: "Contrôlez les montants salaires, pensions, etc.",
    },
    {
      numero: 3,
      titre: "Renseigner vos revenus complémentaires",
      description: "BIC, BNC, revenus fonciers, plus-values...",
    },
    {
      numero: 4,
      titre: "Ajouter vos charges déductibles",
      description: "PER, pensions alimentaires, dons...",
    },
    {
      numero: 5,
      titre: "Valider et signer",
      description: "Vérifiez le récapitulatif et validez",
    },
  ];

  if (!isPremium) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Aide à la déclaration</h1>
          <p className="text-slate mt-1">
            Guide case par case pour votre déclaration de revenus
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
            L'aide à la déclaration vous guide case par case avec les montants 
            à reporter et des captures d'écran annotées.
          </p>
          <Link
            href="/mon-espace/abonnement"
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 hover:bg-primary-600 transition-colors"
          >
            Passer Premium
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Aperçu des étapes */}
        <div className="bg-white border border-gray-100 p-6">
          <h3 className="font-semibold text-charcoal mb-4">Les grandes étapes (aperçu gratuit)</h3>
          <div className="space-y-4">
            {etapes.map((etape) => (
              <div key={etape.numero} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-semibold text-sm">{etape.numero}</span>
                </div>
                <div>
                  <p className="font-medium text-charcoal">{etape.titre}</p>
                  <p className="text-sm text-slate">{etape.description}</p>
                </div>
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
        <h1 className="text-2xl font-bold text-charcoal">Aide à la déclaration</h1>
        <p className="text-slate mt-1">
          Suivez le guide case par case pour remplir votre déclaration
        </p>
      </div>

      {/* Lien direct */}
      <a
        href="https://www.impots.gouv.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between bg-white border border-gray-100 p-4 hover:border-primary-200 transition-colors"
      >
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary-500" />
          <div>
            <p className="font-medium text-charcoal">Ouvrir impots.gouv.fr</p>
            <p className="text-sm text-slate">Dans un nouvel onglet</p>
          </div>
        </div>
        <ExternalLink className="w-5 h-5 text-slate" />
      </a>

      {/* Cases à remplir */}
      <div className="bg-white border border-gray-100 p-6">
        <h2 className="font-semibold text-charcoal mb-6">
          Vos cases à remplir (basé sur votre profil)
        </h2>

        <div className="space-y-4">
          <div className="border border-gray-100 p-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block bg-primary-100 text-primary-700 px-2 py-0.5 text-sm font-mono mb-2">
                  Case 5HQ
                </span>
                <p className="font-medium text-charcoal">
                  Revenus des micro-entreprises BNC
                </p>
                <p className="text-sm text-slate mt-1">
                  Reportez votre chiffre d'affaires brut annuel
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-charcoal">50 000€</p>
                <p className="text-xs text-slate">Montant à reporter</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-100 p-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block bg-primary-100 text-primary-700 px-2 py-0.5 text-sm font-mono mb-2">
                  Case 6RS
                </span>
                <p className="font-medium text-charcoal">
                  Versements PER
                </p>
                <p className="text-sm text-slate mt-1">
                  Montant versé sur votre Plan Épargne Retraite
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-charcoal">3 000€</p>
                <p className="text-xs text-slate">Montant à reporter</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-100 p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Ces montants sont basés sur votre dernière simulation. 
          Vérifiez toujours avec vos documents officiels.
        </p>
      </div>
    </div>
  );
}
