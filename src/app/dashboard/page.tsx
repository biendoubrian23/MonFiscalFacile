"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, TrendingDown } from "lucide-react";

export default function DashboardPage() {
  // Données simulées (en production, viendraient de l'onboarding)
  const data = {
    caAnnuel: 36000,
    impotActuel: 9500,
    impotOptimise: 7800,
    economie: 1700,
    optimisationActuelle: 35,
    depensesDeclarees: 4800,
    depensesPotentielles: 7200,
  };

  return (
    <main className="min-h-screen bg-offwhite">
      {/* Header Dashboard */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-charcoal">
            MonFiscalFacile
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-charcoal font-medium">
              Dashboard
            </Link>
            <Link href="/simulation" className="text-slate hover:text-charcoal transition-colors">
              Nouvelle simulation
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Message de bienvenue */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-charcoal mb-2">
            Votre situation fiscale
          </h1>
          <p className="text-slate">
            Voici le diagnostic basé sur vos informations.
          </p>
        </div>

        {/* KPIs principaux */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 p-6">
            <p className="text-sm text-slate mb-1">CA annuel estimé</p>
            <p className="text-3xl font-bold text-charcoal">
              {data.caAnnuel.toLocaleString()}€
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-6">
            <p className="text-sm text-slate mb-1">Impôts & charges estimés</p>
            <p className="text-3xl font-bold text-charcoal">
              {data.impotActuel.toLocaleString()}€
            </p>
          </div>
          <div className="bg-white border border-danger/10 p-6">
            <p className="text-sm text-slate mb-1">État optimisation</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-danger" />
              <p className="text-lg font-semibold text-danger">
                Non optimisé
              </p>
            </div>
          </div>
        </div>

        {/* CTA principal */}
        <div className="bg-primary-500 p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-white">
              <p className="text-2xl font-bold mb-1">
                Vous pourriez économiser {data.economie.toLocaleString()}€ / an
              </p>
              <p className="text-primary-100">
                Découvrez les actions concrètes pour réduire vos impôts légalement.
              </p>
            </div>
            <Link
              href="#analyse"
              className="bg-white text-primary-600 px-8 py-3 font-semibold hover:bg-primary-50 transition-all flex items-center gap-2 flex-shrink-0"
            >
              Voir comment
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Section Analyse */}
        <section id="analyse" className="mb-8">
          <h2 className="text-xl font-bold text-charcoal mb-6">
            Diagnostic détaillé
          </h2>

          {/* Jauge d'optimisation */}
          <div className="bg-white border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium text-charcoal">Taux d'optimisation actuel</p>
              <p className="text-2xl font-bold text-danger">{data.optimisationActuelle}%</p>
            </div>
            <div className="h-4 bg-gray-200">
              <div 
                className="h-full bg-danger transition-all"
                style={{ width: `${data.optimisationActuelle}%` }}
              />
            </div>
            <p className="text-sm text-slate mt-2">
              Vous n'utilisez que {data.optimisationActuelle}% des déductions possibles.
            </p>
          </div>

          {/* Alertes */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Alerte 1 */}
            <div className="bg-white border-l-4 border-l-amber-500 border border-gray-200 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-charcoal mb-2">
                    Dépenses sous-déclarées
                  </h3>
                  <p className="text-slate text-sm mb-4">
                    Vous déclarez {data.depensesDeclarees.toLocaleString()}€ mais pourriez déduire jusqu'à {data.depensesPotentielles.toLocaleString()}€.
                  </p>
                  <p className="text-sm text-slate mb-4">
                    Dépenses souvent oubliées :
                  </p>
                  <ul className="text-sm text-charcoal space-y-1 mb-4">
                    <li>• Abonnement internet (usage pro)</li>
                    <li>• Téléphone mobile</li>
                    <li>• Logiciels et abonnements</li>
                    <li>• Matériel informatique</li>
                  </ul>
                  <button className="text-primary-500 font-medium text-sm hover:text-primary-600 transition-colors">
                    Ajouter des dépenses
                  </button>
                </div>
              </div>
            </div>

            {/* Alerte 2 */}
            <div className="bg-white border-l-4 border-l-amber-500 border border-gray-200 p-6">
              <div className="flex items-start gap-3">
                <TrendingDown className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-charcoal mb-2">
                    Régime fiscal non optimal
                  </h3>
                  <p className="text-slate text-sm mb-4">
                    Avec votre profil, un autre régime pourrait être plus avantageux.
                  </p>
                  <div className="bg-gray-50 p-4 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate">Régime actuel</span>
                      <span className="text-charcoal font-medium">{data.impotActuel.toLocaleString()}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Régime alternatif</span>
                      <span className="text-primary-500 font-medium">{data.impotOptimise.toLocaleString()}€</span>
                    </div>
                  </div>
                  <div className="bg-primary-50 p-3 mb-4">
                    <p className="text-sm font-medium text-primary-700">
                      Économie potentielle : {data.economie.toLocaleString()}€ / an
                    </p>
                  </div>
                  <button className="text-primary-500 font-medium text-sm hover:text-primary-600 transition-colors">
                    Simuler le changement
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparatif Avant/Après */}
        <section className="bg-white border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-charcoal mb-6">
            Comparatif Avant / Après
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <p className="text-sm text-slate uppercase tracking-wider mb-2">Actuel</p>
              <p className="text-4xl font-bold text-charcoal">{data.impotActuel.toLocaleString()}€</p>
              <p className="text-sm text-slate">par an</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-500 text-white py-4 px-6">
                <p className="text-sm uppercase tracking-wider mb-1">Économie</p>
                <p className="text-3xl font-bold">+{data.economie.toLocaleString()}€</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-primary-600 uppercase tracking-wider mb-2">Optimisé</p>
              <p className="text-4xl font-bold text-primary-600">{data.impotOptimise.toLocaleString()}€</p>
              <p className="text-sm text-primary-600">par an</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <Link
              href="/pricing"
              className="inline-block bg-primary-500 text-white px-8 py-4 font-semibold hover:bg-primary-600 transition-all"
            >
              Débloquer l'optimisation complète
            </Link>
            <p className="text-sm text-slate mt-3">
              À partir de 12€/mois • Annulation à tout moment
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
