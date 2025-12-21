"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, TrendingDown, TrendingUp, Check, Lightbulb, ChevronRight } from "lucide-react";
import { genererDiagnostic } from "@/lib/fiscal/optimiseur";
import type { 
  ProfilUtilisateur, 
  DiagnosticFiscal, 
  StatutProfessionnel, 
  TypeActivite, 
  Enfant,
  SituationFamiliale,
  Alerte,
  ActionOptimisation
} from "@/lib/fiscal/types";

export default function DashboardPage() {
  const [diagnostic, setDiagnostic] = useState<DiagnosticFiscal | null>(null);
  const [profil, setProfil] = useState<ProfilUtilisateur | null>(null);
  const [loading, setLoading] = useState(true);

  // Charger les données de l'onboarding et générer le diagnostic
  useEffect(() => {
    const saved = localStorage.getItem('mff_simulation');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        
        // Convertir les données du formulaire en ProfilUtilisateur (structure complète)
        const profilConverti: ProfilUtilisateur = {
          personnel: {
            pays: data.pays || 'france',
            age: 35, // Valeur par défaut, à demander dans le formulaire si besoin
            situationFamiliale: data.situationFamiliale || 'celibataire',
            conjointRevenu: data.conjointRevenu || 0,
            enfants: convertirEnfants(data.enfants || []),
          },
          professionnel: {
            statut: convertirStatut(data.statut),
            typeActivite: convertirActivite(data.activite),
            secteur: 'autre',
            dateDebut: new Date(),
            regimeActuel: data.statut === 'auto-entrepreneur' ? 'micro' : 'reel-simplifie',
          },
          financier: {
            caAnnuel: data.caAnnuel || 36000,
            depensesPro: {
              localPro: 0,
              assurancePro: 0,
              cfe: 0,
              internetPro: Math.round((data.depensesMensuelles || 0) * 0.1),
              telephonePro: Math.round((data.depensesMensuelles || 0) * 0.05),
              logiciels: Math.round((data.depensesMensuelles || 0) * 0.2),
              materielInformatique: Math.round((data.depensesMensuelles || 0) * 0.15),
              deplacements: 0,
              formation: Math.round((data.depensesMensuelles || 0) * 0.1),
              vehiculePro: (data.kmAnnuels || 0) > 0,
              kmAnnuels: data.kmAnnuels || 0,
              puissanceFiscale: parseInt(data.puissanceFiscale || '5'),
              fraisVehiculeReels: 0,
              coworking: Math.round((data.depensesMensuelles || 0) * 0.3),
              fraisBancaires: Math.round((data.depensesMensuelles || 0) * 0.05),
              comptable: Math.round((data.depensesMensuelles || 0) * 0.05),
              autres: 0,
            },
            autresRevenus: 0,
            patrimoineImmobilier: false,
            creditImmobilier: false,
          },
          fiscal: {
            tvaAssujetti: data.tva || false,
            versementLiberatoire: false,
            optionIS: false,
            declarationCommune: data.situationFamiliale === 'marie' || data.situationFamiliale === 'pacse',
          },
        };
        
        setProfil(profilConverti);
        
        // Générer le diagnostic
        const diag = genererDiagnostic(profilConverti);
        setDiagnostic(diag);
      } catch (e) {
        console.error('Erreur de parsing:', e);
      }
    }
    setLoading(false);
  }, []);

  // Fonctions de conversion
  function convertirStatut(statut: string): StatutProfessionnel {
    const mapping: Record<string, StatutProfessionnel> = {
      'auto-entrepreneur': 'auto-entrepreneur',
      'freelance': 'freelance',
      'eurl': 'eurl',
      'particulier': 'particulier',
    };
    return mapping[statut] || 'auto-entrepreneur';
  }

  function convertirActivite(activite: string): TypeActivite {
    const mapping: Record<string, TypeActivite> = {
      'service': 'service',
      'vente': 'vente',
      'mixte': 'mixte',
    };
    return mapping[activite] || 'service';
  }

  function convertirEnfants(enfants: { age: number; scolarite: string | null; fraisGarde: number }[]): Enfant[] {
    return enfants.map(e => ({
      age: e.age,
      scolarite: e.scolarite as Enfant['scolarite'],
      fraisGardeMensuel: e.fraisGarde || 0,
      gardeAlternee: false,
    }));
  }

  // États de chargement ou pas de données
  if (loading) {
    return (
      <main className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-slate">Analyse en cours...</p>
        </div>
      </main>
    );
  }

  if (!profil || !diagnostic) {
    return (
      <main className="min-h-screen bg-offwhite">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <Link href="/" className="text-xl font-bold text-charcoal">
              MonFiscalFacile
            </Link>
          </div>
        </header>
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-bold text-charcoal mb-4">
            Aucune donnée trouvée
          </h1>
          <p className="text-slate mb-8">
            Faites d'abord une simulation pour voir votre diagnostic fiscal personnalisé.
          </p>
          <Link 
            href="/simulation"
            className="inline-block bg-primary-500 text-white px-8 py-4 font-semibold hover:bg-primary-600 transition-all"
          >
            Commencer la simulation
          </Link>
        </div>
      </main>
    );
  }

  // Extraire les données pour l'affichage
  const { situationActuelle, meilleurScenario, alertes, actionsRecommandees, tauxOptimisation, economieMaximale } = diagnostic;
  const nbActionsUrgentes = actionsRecommandees.filter((a: ActionOptimisation) => a.urgence === 'immediate').length;

  // Déterminer la couleur du score
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-primary-600';
    if (score >= 40) return 'text-amber-500';
    return 'text-danger';
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return 'bg-primary-500';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-danger';
  };

  const getAlertColor = (type: Alerte['type']) => {
    switch (type) {
      case 'danger': return 'border-l-danger text-danger';
      case 'warning': return 'border-l-amber-500 text-amber-500';
      case 'success': return 'border-l-primary-500 text-primary-500';
      default: return 'border-l-blue-500 text-blue-500';
    }
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
            Votre diagnostic fiscal
          </h1>
          <p className="text-slate">
            Basé sur votre profil de {profil.professionnel.statut.replace('-', ' ')} avec un CA de {profil.financier.caAnnuel.toLocaleString()}€
            {profil.personnel.enfants.length > 0 && ` et ${profil.personnel.enfants.length} enfant${profil.personnel.enfants.length > 1 ? 's' : ''}`}
          </p>
        </div>

        {/* KPIs principaux */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 p-6">
            <p className="text-sm text-slate mb-1">Chiffre d'affaires</p>
            <p className="text-3xl font-bold text-charcoal">
              {profil.financier.caAnnuel.toLocaleString()}€
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-6">
            <p className="text-sm text-slate mb-1">Cotisations et impôts</p>
            <p className="text-3xl font-bold text-charcoal">
              {situationActuelle.total.toLocaleString()}€
            </p>
            <p className="text-xs text-slate mt-1">
              {Math.round((situationActuelle.total / profil.financier.caAnnuel) * 100)}% du CA
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-6">
            <p className="text-sm text-slate mb-1">Revenu net estimé</p>
            <p className="text-3xl font-bold text-primary-600">
              {(profil.financier.caAnnuel - situationActuelle.total).toLocaleString()}€
            </p>
          </div>
          <div className={`bg-white border p-6 ${nbActionsUrgentes > 0 ? 'border-danger/30' : 'border-primary-200'}`}>
            <p className="text-sm text-slate mb-1">Score optimisation</p>
            <div className="flex items-center gap-2">
              <p className={`text-3xl font-bold ${getScoreColor(tauxOptimisation)}`}>
                {tauxOptimisation}%
              </p>
            </div>
            {nbActionsUrgentes > 0 && (
              <p className="text-xs text-danger mt-1">
                {nbActionsUrgentes} action{nbActionsUrgentes > 1 ? 's' : ''} urgente{nbActionsUrgentes > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {/* CTA économie */}
        {economieMaximale > 0 && (
          <div className="bg-primary-500 p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="text-white">
                <p className="text-2xl font-bold mb-1">
                  Économie potentielle : {economieMaximale.toLocaleString()}€ / an
                </p>
                <p className="text-primary-100">
                  {actionsRecommandees.length} optimisation{actionsRecommandees.length > 1 ? 's' : ''} identifiée{actionsRecommandees.length > 1 ? 's' : ''} pour votre profil.
                </p>
              </div>
              <a
                href="#actions"
                className="bg-white text-primary-600 px-8 py-3 font-semibold hover:bg-primary-50 transition-all flex items-center gap-2 flex-shrink-0"
              >
                Voir les actions
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        )}

        {/* Alertes */}
        {alertes.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-charcoal mb-4">
              Points d'attention
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {alertes.slice(0, 4).map((alerte: Alerte) => (
                <div 
                  key={alerte.id}
                  className={`bg-white border-l-4 border border-gray-200 p-5 ${getAlertColor(alerte.type).split(' ')[0]}`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${getAlertColor(alerte.type).split(' ')[1]}`} />
                    <div>
                      <h3 className="font-semibold text-charcoal mb-1">
                        {alerte.titre}
                      </h3>
                      <p className="text-slate text-sm">
                        {alerte.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Jauge d'optimisation */}
        <section className="mb-8">
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium text-charcoal">Niveau d'optimisation</p>
              <p className={`text-2xl font-bold ${getScoreColor(tauxOptimisation)}`}>
                {tauxOptimisation}%
              </p>
            </div>
            <div className="h-4 bg-gray-200">
              <div 
                className={`h-full transition-all ${getScoreBg(tauxOptimisation)}`}
                style={{ width: `${tauxOptimisation}%` }}
              />
            </div>
            <p className="text-sm text-slate mt-2">
              {tauxOptimisation < 50 
                ? `Vous pourriez optimiser davantage votre situation fiscale.`
                : tauxOptimisation < 80 
                ? `Bonne optimisation, quelques améliorations possibles.`
                : `Excellente optimisation de votre situation.`
              }
            </p>
          </div>
        </section>

        {/* Actions recommandées */}
        <section id="actions" className="mb-8">
          <h2 className="text-xl font-bold text-charcoal mb-4">
            Actions recommandées
          </h2>
          
          {actionsRecommandees.length === 0 ? (
            <div className="bg-white border border-gray-200 p-8 text-center">
              <Check className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-charcoal mb-2">
                Votre situation est bien optimisée
              </p>
              <p className="text-slate">
                Aucune action urgente à effectuer pour le moment.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {actionsRecommandees.slice(0, 6).map((action: ActionOptimisation) => (
                <div 
                  key={action.id}
                  className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${
                        action.urgence === 'immediate' ? 'bg-danger/10' :
                        action.urgence === 'court-terme' ? 'bg-amber-100' :
                        'bg-primary-50'
                      }`}>
                        {action.urgence === 'immediate' ? (
                          <TrendingDown className="w-5 h-5 text-danger" />
                        ) : action.urgence === 'court-terme' ? (
                          <Lightbulb className="w-5 h-5 text-amber-600" />
                        ) : (
                          <TrendingUp className="w-5 h-5 text-primary-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-charcoal">
                            {action.titre}
                          </h3>
                          <span className={`text-xs px-2 py-0.5 ${
                            action.urgence === 'immediate' ? 'bg-danger/10 text-danger' :
                            action.urgence === 'court-terme' ? 'bg-amber-100 text-amber-700' :
                            'bg-primary-50 text-primary-700'
                          }`}>
                            {action.urgence === 'immediate' ? 'Urgent' :
                             action.urgence === 'court-terme' ? 'Recommandé' :
                             'Optionnel'}
                          </span>
                          <span className={`text-xs px-2 py-0.5 bg-gray-100 text-gray-600`}>
                            Effort {action.effort}
                          </span>
                        </div>
                        <p className="text-slate text-sm mb-3">
                          {action.description}
                        </p>
                        {action.gainEstime > 0 && (
                          <div className="inline-block bg-primary-50 px-3 py-1">
                            <p className="text-sm font-medium text-primary-700">
                              Économie estimée : +{action.gainEstime.toLocaleString()}€ / an
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Scénario optimal */}
        {meilleurScenario && meilleurScenario.economieVsActuel > 0 && (
          <section className="mb-8">
            <div className="bg-white border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-charcoal mb-6">
                Scénario optimisé : {meilleurScenario.nom}
              </h2>
              <p className="text-slate mb-6">{meilleurScenario.description}</p>
              
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <p className="text-sm text-slate uppercase tracking-wider mb-2">
                    Situation actuelle
                  </p>
                  <p className="text-4xl font-bold text-charcoal">
                    {situationActuelle.total.toLocaleString()}€
                  </p>
                  <p className="text-sm text-slate">par an en charges</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary-500 text-white py-4 px-6">
                    <p className="text-sm uppercase tracking-wider mb-1">Économie</p>
                    <p className="text-3xl font-bold">
                      +{meilleurScenario.economieVsActuel.toLocaleString()}€
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-primary-600 uppercase tracking-wider mb-2">
                    Après optimisation
                  </p>
                  <p className="text-4xl font-bold text-primary-600">
                    {meilleurScenario.resultat.total.toLocaleString()}€
                  </p>
                  <p className="text-sm text-primary-600">par an en charges</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Détail des calculs */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-charcoal mb-4">
            Détail de vos prélèvements
          </h2>
          <div className="bg-white border border-gray-200 p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-slate">Cotisations sociales</span>
                <span className="font-semibold text-charcoal">
                  {situationActuelle.cotisationsSociales.toLocaleString()}€
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-slate">Impôt sur le revenu</span>
                <span className="font-semibold text-charcoal">
                  {situationActuelle.impotRevenu.toLocaleString()}€
                </span>
              </div>
              {situationActuelle.cfe > 0 && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-slate">CFE</span>
                  <span className="font-semibold text-charcoal">
                    {situationActuelle.cfe.toLocaleString()}€
                  </span>
                </div>
              )}
              {situationActuelle.tvaAPayer > 0 && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-slate">TVA à payer</span>
                  <span className="font-semibold text-charcoal">
                    {situationActuelle.tvaAPayer.toLocaleString()}€
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center py-3 bg-gray-50 px-4 -mx-6 mb-0">
                <span className="font-medium text-charcoal">Total prélèvements</span>
                <span className="font-bold text-xl text-charcoal">
                  {situationActuelle.total.toLocaleString()}€
                </span>
              </div>
            </div>
            
            {/* Détails techniques */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-slate mb-2">Détails du calcul :</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-slate">Base imposable</p>
                  <p className="font-medium text-charcoal">{situationActuelle.baseImposable.toLocaleString()}€</p>
                </div>
                <div>
                  <p className="text-slate">Abattement</p>
                  <p className="font-medium text-charcoal">{situationActuelle.abattement.toLocaleString()}€</p>
                </div>
                <div>
                  <p className="text-slate">Parts fiscales</p>
                  <p className="font-medium text-charcoal">{situationActuelle.partsFiscales}</p>
                </div>
                <div>
                  <p className="text-slate">Taux marginal</p>
                  <p className="font-medium text-charcoal">{situationActuelle.tauxMarginal}%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-white border border-gray-200 p-8 text-center">
          <h2 className="text-xl font-bold text-charcoal mb-2">
            Passez à l'action
          </h2>
          <p className="text-slate mb-6">
            Accédez à l'accompagnement complet pour mettre en place ces optimisations.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-primary-500 text-white px-8 py-4 font-semibold hover:bg-primary-600 transition-all"
          >
            Voir les offres
          </Link>
          <p className="text-sm text-slate mt-3">
            À partir de 12€/mois, annulation à tout moment
          </p>
        </section>
      </div>
    </main>
  );
}
