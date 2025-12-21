/**
 * Moteur d'optimisation fiscale
 * MonFiscalFacile - Génération de recommandations intelligentes
 */

import {
  ProfilUtilisateur,
  DiagnosticFiscal,
  ActionOptimisation,
  Alerte,
  Scenario,
  ResultatCalcul,
} from './types';
import {
  calculerSituationActuelle,
  comparerRegimes,
  calculerCreditsImpotFamille,
  calculerFraisKilometriques,
} from './calculateur';
import {
  reglesFiscalesFrance2024,
  depensesTypesFreelance,
  seuilsAlerte,
} from './regles-france';

// ============================================
// GÉNÉRATION DU DIAGNOSTIC COMPLET
// ============================================

export function genererDiagnostic(profil: ProfilUtilisateur): DiagnosticFiscal {
  const situationActuelle = calculerSituationActuelle(profil);
  const alertes = detecterAlertes(profil, situationActuelle);
  const scenarios = genererScenarios(profil, situationActuelle);
  const actionsRecommandees = genererActions(profil, situationActuelle, alertes);

  // Trouver le meilleur scénario
  const meilleurScenario = scenarios.reduce((best, current) =>
    current.economieVsActuel > best.economieVsActuel ? current : best
  );

  // Calculer le taux d'optimisation actuel
  const tauxOptimisation = calculerTauxOptimisation(profil, situationActuelle);

  return {
    profilId: generateId(),
    dateAnalyse: new Date(),
    situationActuelle,
    tauxOptimisation,
    alertes,
    scenarios,
    meilleurScenario,
    economieMaximale: meilleurScenario.economieVsActuel,
    actionsRecommandees: trierActionsPriorite(actionsRecommandees),
  };
}

// ============================================
// DÉTECTION DES ALERTES
// ============================================

function detecterAlertes(
  profil: ProfilUtilisateur,
  situation: ResultatCalcul
): Alerte[] {
  const alertes: Alerte[] = [];
  const regles = reglesFiscalesFrance2024;

  // 1. Alerte seuil micro-entreprise
  if (profil.professionnel.statut === 'auto-entrepreneur') {
    const seuil =
      profil.professionnel.typeActivite === 'vente'
        ? regles.seuilMicroBIC_vente
        : regles.seuilMicroBNC;

    const pourcentage = (profil.financier.caAnnuel / seuil) * 100;

    if (pourcentage >= seuilsAlerte.pourcentageDangerSeuil) {
      alertes.push({
        id: 'seuil-danger',
        type: 'danger',
        titre: 'Seuil micro-entreprise bientôt atteint',
        message: `Votre CA (${profil.financier.caAnnuel.toLocaleString()}€) atteint ${Math.round(pourcentage)}% du seuil. Vous devrez basculer en régime réel l'année prochaine.`,
        actionAssociee: 'simuler-reel',
        priorite: 1,
      });
    } else if (pourcentage >= seuilsAlerte.pourcentageAlerteSeuil) {
      alertes.push({
        id: 'seuil-attention',
        type: 'warning',
        titre: 'Vous approchez du seuil micro-entreprise',
        message: `Votre CA atteint ${Math.round(pourcentage)}% du seuil de ${seuil.toLocaleString()}€. Anticipez un éventuel changement de régime.`,
        actionAssociee: 'simuler-reel',
        priorite: 2,
      });
    }
  }

  // 2. Alerte TVA
  if (!profil.fiscal.tvaAssujetti) {
    const seuilTVA =
      profil.professionnel.typeActivite === 'vente'
        ? regles.seuilTVA_vente
        : regles.seuilTVA_services;

    const pourcentageTVA = (profil.financier.caAnnuel / seuilTVA) * 100;

    if (pourcentageTVA >= seuilsAlerte.pourcentageDangerSeuil) {
      alertes.push({
        id: 'tva-danger',
        type: 'danger',
        titre: 'Assujettissement TVA imminent',
        message: `Votre CA dépasse bientôt ${seuilTVA.toLocaleString()}€. Vous devrez facturer et déclarer la TVA.`,
        priorite: 1,
      });
    }
  }

  // 3. Alerte régime non optimal
  const comparaison = comparerRegimes(profil);
  if (
    comparaison.economie >= seuilsAlerte.differenceMinimaleChangementRegime &&
    comparaison.meilleurRegime !== profil.professionnel.regimeActuel
  ) {
    alertes.push({
      id: 'regime-non-optimal',
      type: 'warning',
      titre: 'Régime fiscal non optimal',
      message: `Le régime ${comparaison.meilleurRegime === 'reel' ? 'réel' : 'micro'} vous ferait économiser ${comparaison.economie.toLocaleString()}€/an.`,
      actionAssociee: 'changer-regime',
      priorite: 2,
    });
  }

  // 4. Alerte dépenses sous-déclarées
  const depensesMoyennes = estimerDepensesMoyennesSecteur(profil);
  const depensesActuelles = calculerTotalDepenses(profil.financier.depensesPro);
  const pourcentageDepenses = (depensesActuelles / depensesMoyennes) * 100;

  if (pourcentageDepenses < seuilsAlerte.pourcentageDepensesMoyennes) {
    alertes.push({
      id: 'depenses-sous-declarees',
      type: 'warning',
      titre: 'Dépenses professionnelles sous-déclarées',
      message: `Vos dépenses semblent inférieures à la moyenne de votre secteur. Vous oubliez peut-être certains frais déductibles.`,
      actionAssociee: 'ajouter-depenses',
      priorite: 3,
    });
  }

  // 5. Alerte garde enfants
  const enfantsMoins6Ans = profil.personnel.enfants.filter(e => e.age < 6);
  const enfantsSansGarde = enfantsMoins6Ans.filter(e => e.fraisGardeMensuel === 0);
  
  if (enfantsSansGarde.length > 0 && enfantsMoins6Ans.length > 0) {
    alertes.push({
      id: 'garde-enfants',
      type: 'info',
      titre: 'Crédit garde d\'enfants non utilisé',
      message: `Vous avez ${enfantsMoins6Ans.length} enfant(s) de moins de 6 ans. N'oubliez pas de déclarer vos frais de garde (crèche, nounou) pour bénéficier du crédit d'impôt.`,
      actionAssociee: 'declarer-garde',
      priorite: 4,
    });
  }

  // 6. Alerte frais scolarité
  const enfantsScolarises = profil.personnel.enfants.filter(
    e => e.scolarite && ['college', 'lycee', 'superieur'].includes(e.scolarite)
  );
  
  if (enfantsScolarises.length > 0) {
    const creditsPotentiels = calculerCreditsImpotFamille(enfantsScolarises);
    if (creditsPotentiels.reductionScolarite > 0) {
      alertes.push({
        id: 'frais-scolarite',
        type: 'info',
        titre: 'Réduction frais de scolarité disponible',
        message: `Vous pouvez bénéficier d'une réduction de ${creditsPotentiels.reductionScolarite}€ pour vos enfants scolarisés.`,
        priorite: 5,
      });
    }
  }

  // 7. Alerte véhicule
  if (
    profil.financier.depensesPro.vehiculePro &&
    profil.financier.depensesPro.kmAnnuels > 5000
  ) {
    const fraisBareme = calculerFraisKilometriques(
      profil.financier.depensesPro.kmAnnuels,
      profil.financier.depensesPro.puissanceFiscale
    );
    const fraisReels = profil.financier.depensesPro.fraisVehiculeReels;

    if (Math.abs(fraisBareme - fraisReels) > 500) {
      const meilleur = fraisBareme > fraisReels ? 'barème kilométrique' : 'frais réels';
      alertes.push({
        id: 'vehicule-optimisation',
        type: 'info',
        titre: 'Optimisation frais de véhicule possible',
        message: `Le ${meilleur} serait plus avantageux pour vous (différence : ${Math.abs(fraisBareme - fraisReels).toLocaleString()}€).`,
        actionAssociee: 'optimiser-vehicule',
        priorite: 4,
      });
    }
  }

  return alertes;
}

// ============================================
// GÉNÉRATION DES SCÉNARIOS
// ============================================

function genererScenarios(
  profil: ProfilUtilisateur,
  situationActuelle: ResultatCalcul
): Scenario[] {
  const scenarios: Scenario[] = [];

  // Scénario 0 : Situation actuelle (référence)
  scenarios.push({
    id: 'actuel',
    nom: 'Situation actuelle',
    description: 'Votre situation fiscale sans modification',
    resultat: situationActuelle,
    actions: [],
    economieVsActuel: 0,
  });

  // Scénario 1 : Optimisation des dépenses
  const scenarioDepenses = simulerAjoutDepenses(profil);
  if (scenarioDepenses) {
    scenarios.push({
      ...scenarioDepenses,
      economieVsActuel: situationActuelle.total - scenarioDepenses.resultat.total,
    });
  }

  // Scénario 2 : Changement de régime
  const comparaison = comparerRegimes(profil);
  if (comparaison.economie >= 100) {
    const nouveauRegime = comparaison.meilleurRegime === 'reel' ? comparaison.reel : comparaison.micro;
    scenarios.push({
      id: 'changement-regime',
      nom: `Passage au régime ${comparaison.meilleurRegime === 'reel' ? 'réel' : 'micro'}`,
      description: `Simulation avec le régime ${comparaison.meilleurRegime}`,
      resultat: nouveauRegime,
      actions: [genererActionChangementRegime(comparaison.meilleurRegime)],
      economieVsActuel: comparaison.economie,
    });
  }

  // Scénario 3 : Optimisation familiale
  const scenarioFamille = simulerOptimisationFamille(profil);
  if (scenarioFamille && scenarioFamille.economieVsActuel > 0) {
    scenarios.push(scenarioFamille);
  }

  // Scénario 4 : Combinaison optimale (tous les leviers)
  const scenarioOptimal = simulerCombinaisonOptimale(profil, situationActuelle);
  scenarios.push(scenarioOptimal);

  return scenarios;
}

// ============================================
// GÉNÉRATION DES ACTIONS
// ============================================

function genererActions(
  profil: ProfilUtilisateur,
  situation: ResultatCalcul,
  alertes: Alerte[]
): ActionOptimisation[] {
  const actions: ActionOptimisation[] = [];

  // Actions basées sur les alertes
  for (const alerte of alertes) {
    if (alerte.actionAssociee) {
      const action = creerActionDepuisAlerte(alerte, profil);
      if (action) {
        actions.push(action);
      }
    }
  }

  // Actions génériques toujours proposées
  actions.push({
    id: 'verifier-depenses',
    titre: 'Vérifier vos dépenses déductibles',
    description: 'Passez en revue les dépenses professionnelles souvent oubliées',
    explication: 'Beaucoup d\'indépendants oublient de déduire certains frais. Vérifiez si vous déclarez bien tous vos frais pro.',
    categorie: 'depenses',
    gainEstime: estimerGainDepensesManquantes(profil),
    effort: 'faible',
    urgence: 'court-terme',
    prerequis: [],
    risques: [],
  });

  // Action spécifique : timing fiscal
  const moisActuel = new Date().getMonth();
  if (moisActuel >= 9) { // Octobre à Décembre
    actions.push({
      id: 'timing-fiscal',
      titre: 'Optimisation de fin d\'année',
      description: 'Effectuez vos achats pro avant le 31 décembre',
      explication: 'Les dépenses faites avant le 31/12 seront déductibles cette année. Anticipez vos besoins !',
      categorie: 'timing',
      gainEstime: 0, // Dépend des achats
      effort: 'faible',
      urgence: 'immediate',
      dateLimite: new Date(new Date().getFullYear(), 11, 31),
      prerequis: [],
      risques: [],
    });
  }

  return actions;
}

// ============================================
// HELPERS
// ============================================

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function calculerTauxOptimisation(
  profil: ProfilUtilisateur,
  situation: ResultatCalcul
): number {
  // Calculer le potentiel maximal d'économies
  const scenarioOptimal = simulerCombinaisonOptimale(profil, situation);
  const economieMax = scenarioOptimal.economieVsActuel;
  
  if (economieMax <= 0) return 100;
  
  // Si économie max = 2000€, et actuellement on perd tout, taux = 0%
  // Si économie max = 0€, taux = 100%
  const tauxPerdu = (economieMax / situation.total) * 100;
  return Math.max(0, Math.min(100, 100 - tauxPerdu));
}

function estimerDepensesMoyennesSecteur(profil: ProfilUtilisateur): number {
  // Estimation basée sur les moyennes du secteur
  let total = 0;
  for (const dep of depensesTypesFreelance) {
    if (
      dep.categoriesApplicables.includes('tous') ||
      dep.categoriesApplicables.includes(profil.professionnel.typeActivite)
    ) {
      total += dep.montantMoyenMensuel * (dep.pourcentageProMoyen / 100) * 12;
    }
  }
  return total;
}

function calculerTotalDepenses(depenses: ProfilUtilisateur['financier']['depensesPro']): number {
  return (
    depenses.localPro +
    depenses.assurancePro +
    depenses.cfe +
    depenses.internetPro * 12 +
    depenses.telephonePro * 12 +
    depenses.logiciels * 12 +
    depenses.materielInformatique +
    depenses.deplacements +
    depenses.formation +
    depenses.coworking * 12 +
    depenses.fraisBancaires * 12 +
    depenses.comptable +
    depenses.autres
  );
}

function estimerGainDepensesManquantes(profil: ProfilUtilisateur): number {
  const depensesMoyennes = estimerDepensesMoyennesSecteur(profil);
  const depensesActuelles = calculerTotalDepenses(profil.financier.depensesPro);
  const manque = Math.max(0, depensesMoyennes - depensesActuelles);
  
  // Gain estimé = manque * taux marginal (simplifié)
  return Math.round(manque * 0.3); // ~30% d'économie en moyenne
}

function simulerAjoutDepenses(profil: ProfilUtilisateur): Scenario | null {
  const depensesManquantes = identifierDepensesManquantes(profil);
  if (depensesManquantes.length === 0) return null;

  // Simuler l'ajout de ces dépenses
  const totalAjout = depensesManquantes.reduce(
    (sum, d) => sum + d.montantMoyenMensuel * (d.pourcentageProMoyen / 100) * 12,
    0
  );

  const profilModifie = { ...profil };
  profilModifie.financier.depensesPro.autres += totalAjout;

  const nouveauResultat = calculerSituationActuelle(profilModifie);

  return {
    id: 'optimisation-depenses',
    nom: 'Ajout dépenses manquantes',
    description: `Ajouter ${depensesManquantes.length} postes de dépenses`,
    resultat: nouveauResultat,
    actions: depensesManquantes.map(d => ({
      id: `ajouter-${d.nom.toLowerCase().replace(/\s/g, '-')}`,
      titre: `Déclarer ${d.nom}`,
      description: d.description,
      explication: `Montant estimé : ${d.montantMoyenMensuel}€/mois`,
      categorie: 'depenses' as const,
      gainEstime: Math.round(d.montantMoyenMensuel * (d.pourcentageProMoyen / 100) * 12 * 0.3),
      effort: 'faible' as const,
      urgence: 'court-terme' as const,
      prerequis: [],
      risques: [],
    })),
    economieVsActuel: 0, // Sera calculé
  };
}

function identifierDepensesManquantes(
  profil: ProfilUtilisateur
): typeof depensesTypesFreelance {
  const depenses = profil.financier.depensesPro;
  const manquantes: typeof depensesTypesFreelance = [];

  for (const depType of depensesTypesFreelance) {
    // Vérifier si cette dépense est applicable
    if (
      !depType.categoriesApplicables.includes('tous') &&
      !depType.categoriesApplicables.includes(profil.professionnel.typeActivite) &&
      !depType.categoriesApplicables.includes(profil.professionnel.regimeActuel)
    ) {
      continue;
    }

    // Vérifier si déjà déclarée
    const nomNormalise = depType.nom.toLowerCase();
    if (
      (nomNormalise.includes('internet') && depenses.internetPro > 0) ||
      (nomNormalise.includes('téléphone') && depenses.telephonePro > 0) ||
      (nomNormalise.includes('logiciel') && depenses.logiciels > 0) ||
      (nomNormalise.includes('matériel') && depenses.materielInformatique > 0) ||
      (nomNormalise.includes('coworking') && depenses.coworking > 0) ||
      (nomNormalise.includes('local') && depenses.localPro > 0) ||
      (nomNormalise.includes('assurance') && depenses.assurancePro > 0) ||
      (nomNormalise.includes('bancaire') && depenses.fraisBancaires > 0) ||
      (nomNormalise.includes('comptable') && depenses.comptable > 0) ||
      (nomNormalise.includes('formation') && depenses.formation > 0) ||
      (nomNormalise.includes('déplacement') && depenses.deplacements > 0)
    ) {
      continue;
    }

    manquantes.push(depType);
  }

  return manquantes;
}

function genererActionChangementRegime(regime: 'micro' | 'reel'): ActionOptimisation {
  return {
    id: 'changer-regime',
    titre: `Passer au régime ${regime === 'reel' ? 'réel simplifié' : 'micro'}`,
    description: `Changement de régime fiscal pour optimiser vos impôts`,
    explication:
      regime === 'reel'
        ? 'Le régime réel vous permet de déduire vos frais réels au lieu d\'un abattement forfaitaire.'
        : 'Le régime micro est plus simple et peut être avantageux si vos frais sont faibles.',
    categorie: 'regime',
    gainEstime: 0, // Calculé ailleurs
    effort: 'moyen',
    urgence: 'moyen-terme',
    prerequis: regime === 'reel' ? ['Tenir une comptabilité', 'Éventuellement un expert-comptable'] : [],
    risques: regime === 'reel' ? ['Plus de gestion administrative'] : ['Perte de déductibilité des frais réels'],
  };
}

function simulerOptimisationFamille(profil: ProfilUtilisateur): Scenario | null {
  const credits = calculerCreditsImpotFamille(profil.personnel.enfants);
  if (credits.total <= 0) return null;

  const profilModifie = { ...profil };
  // Les crédits sont déjà pris en compte dans le calcul, donc simuler un avant/après

  return {
    id: 'optimisation-famille',
    nom: 'Optimisation avantages familiaux',
    description: 'Maximiser les crédits et réductions liés à la famille',
    resultat: calculerSituationActuelle(profilModifie),
    actions: [
      {
        id: 'declarer-garde',
        titre: 'Déclarer les frais de garde',
        description: 'Crèche, nounou, garde périscolaire...',
        explication: `Récupérez 50% de vos frais de garde (max ${reglesFiscalesFrance2024.plafondCreditGardeParEnfant}€ de crédit par enfant)`,
        categorie: 'famille',
        gainEstime: credits.creditGarde,
        effort: 'faible',
        urgence: 'court-terme',
        prerequis: ['Attestation employeur ou structure de garde'],
        risques: [],
      },
    ],
    economieVsActuel: credits.total,
  };
}

function simulerCombinaisonOptimale(
  profil: ProfilUtilisateur,
  situationActuelle: ResultatCalcul
): Scenario {
  // Combiner toutes les optimisations possibles
  let profilOptimise = JSON.parse(JSON.stringify(profil));

  // 1. Ajouter les dépenses manquantes
  const depensesManquantes = identifierDepensesManquantes(profil);
  const ajoutDepenses = depensesManquantes.reduce(
    (sum, d) => sum + d.montantMoyenMensuel * (d.pourcentageProMoyen / 100) * 12,
    0
  );
  profilOptimise.financier.depensesPro.autres += ajoutDepenses;

  // 2. Vérifier si le régime réel serait meilleur
  const comparaison = comparerRegimes(profilOptimise);
  if (comparaison.meilleurRegime === 'reel') {
    profilOptimise.professionnel.regimeActuel = 'reel-simplifie';
  }

  // 3. Calculer le résultat optimal
  const resultatOptimal = calculerSituationActuelle(profilOptimise);
  const economie = situationActuelle.total - resultatOptimal.total;

  return {
    id: 'combinaison-optimale',
    nom: 'Optimisation maximale',
    description: 'Toutes les optimisations combinées',
    resultat: resultatOptimal,
    actions: [],
    economieVsActuel: Math.max(0, economie),
  };
}

function creerActionDepuisAlerte(
  alerte: Alerte,
  profil: ProfilUtilisateur
): ActionOptimisation | null {
  switch (alerte.actionAssociee) {
    case 'simuler-reel':
    case 'changer-regime':
      const comp = comparerRegimes(profil);
      return genererActionChangementRegime(comp.meilleurRegime);

    case 'ajouter-depenses':
      return {
        id: 'ajouter-depenses',
        titre: 'Ajouter des dépenses professionnelles',
        description: 'Vérifiez les frais que vous oubliez peut-être de déduire',
        explication: 'Internet, téléphone, logiciels, matériel... Ces dépenses sont souvent sous-déclarées.',
        categorie: 'depenses',
        gainEstime: estimerGainDepensesManquantes(profil),
        effort: 'faible',
        urgence: 'court-terme',
        prerequis: ['Justificatifs des dépenses'],
        risques: [],
      };

    case 'declarer-garde':
      const credits = calculerCreditsImpotFamille(profil.personnel.enfants);
      return {
        id: 'declarer-garde',
        titre: 'Déclarer les frais de garde',
        description: 'Récupérez jusqu\'à 50% de vos frais de crèche ou nounou',
        explication: `Crédit d'impôt pouvant aller jusqu'à ${reglesFiscalesFrance2024.plafondCreditGardeParEnfant}€ par enfant de moins de 6 ans.`,
        categorie: 'famille',
        gainEstime: credits.creditGarde,
        effort: 'faible',
        urgence: 'court-terme',
        prerequis: ['Attestation de la structure de garde'],
        risques: [],
      };

    default:
      return null;
  }
}

function trierActionsPriorite(actions: ActionOptimisation[]): ActionOptimisation[] {
  return actions.sort((a, b) => {
    // Priorité : gain élevé + effort faible + urgence
    const scoreA = a.gainEstime * (a.effort === 'faible' ? 3 : a.effort === 'moyen' ? 2 : 1);
    const scoreB = b.gainEstime * (b.effort === 'faible' ? 3 : b.effort === 'moyen' ? 2 : 1);
    return scoreB - scoreA;
  });
}
