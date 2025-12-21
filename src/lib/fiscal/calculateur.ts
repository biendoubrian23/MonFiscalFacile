/**
 * Calculateur fiscal - Cœur de l'algorithme
 * MonFiscalFacile - Moteur de simulation intelligent
 */

import {
  ProfilUtilisateur,
  ResultatCalcul,
  TranchesIR,
  Enfant,
} from './types';
import { reglesFiscalesFrance2024 } from './regles-france';

// ============================================
// CALCUL DES PARTS FISCALES
// ============================================

export function calculerPartsFiscales(profil: ProfilUtilisateur): number {
  const { situationFamiliale, enfants } = profil.personnel;
  let parts = 1;

  // Parts pour la situation maritale
  if (situationFamiliale === 'marie' || situationFamiliale === 'pacse') {
    parts = 2;
  } else if (situationFamiliale === 'veuf' && enfants.length > 0) {
    parts = 2; // Veuf avec enfants = 2 parts
  }

  // Parts pour les enfants
  const nbEnfants = enfants.length;
  if (nbEnfants >= 1) {
    parts += 0.5; // 1er enfant
  }
  if (nbEnfants >= 2) {
    parts += 0.5; // 2ème enfant
  }
  if (nbEnfants >= 3) {
    parts += nbEnfants - 2; // 1 part par enfant à partir du 3ème
  }

  // Demi-part supplémentaire pour parent isolé
  if (
    (situationFamiliale === 'celibataire' || situationFamiliale === 'divorce') &&
    enfants.length > 0
  ) {
    parts += 0.5;
  }

  // Gestion garde alternée (divise par 2 les parts enfants)
  const enfantsGardeAlternee = enfants.filter(e => e.gardeAlternee).length;
  if (enfantsGardeAlternee > 0) {
    // Recalcul simplifié pour garde alternée
    const partsEnfantsNormaux = enfants.filter(e => !e.gardeAlternee).length;
    // Les enfants en garde alternée comptent pour moitié
    parts = parts - (enfantsGardeAlternee * 0.25);
  }

  return parts;
}

// ============================================
// CALCUL IMPÔT SUR LE REVENU (barème progressif)
// ============================================

export function calculerIR(
  revenuImposable: number,
  partsFiscales: number,
  tranches: TranchesIR[]
): { impotBrut: number; impotNet: number; tauxMarginal: number } {
  // Quotient familial
  const quotient = revenuImposable / partsFiscales;

  // Calcul de l'impôt sur le quotient
  let impotQuotient = 0;
  let tauxMarginal = 0;

  for (const tranche of tranches) {
    if (quotient > tranche.limiteInferieure) {
      const montantDansTranche = Math.min(
        quotient - tranche.limiteInferieure,
        tranche.limiteSuperieure - tranche.limiteInferieure
      );
      impotQuotient += montantDansTranche * (tranche.taux / 100);
      
      if (quotient <= tranche.limiteSuperieure) {
        tauxMarginal = tranche.taux;
      }
    }
  }

  // Impôt brut (avant plafonnement)
  const impotBrut = impotQuotient * partsFiscales;

  // Plafonnement du quotient familial
  const avantageQF = calculerAvantageQuotientFamilial(
    revenuImposable,
    partsFiscales,
    tranches
  );
  const plafond = (partsFiscales - 1) * reglesFiscalesFrance2024.plafondQuotientFamilial;
  
  let impotNet = impotBrut;
  if (avantageQF > plafond) {
    impotNet = impotBrut + (avantageQF - plafond);
  }

  return {
    impotBrut,
    impotNet: Math.max(0, impotNet),
    tauxMarginal,
  };
}

function calculerAvantageQuotientFamilial(
  revenuImposable: number,
  partsFiscales: number,
  tranches: TranchesIR[]
): number {
  // Calcul avec 1 part (sans plafonnement pour éviter récursion)
  const quotient1Part = revenuImposable / 1;
  let impot1Part = 0;
  for (const tranche of tranches) {
    if (quotient1Part > tranche.limiteInferieure) {
      const montantDansTranche = Math.min(
        quotient1Part - tranche.limiteInferieure,
        tranche.limiteSuperieure - tranche.limiteInferieure
      );
      impot1Part += montantDansTranche * (tranche.taux / 100);
    }
  }
  
  // Calcul avec toutes les parts
  const quotient = revenuImposable / partsFiscales;
  let impotQuotient = 0;
  for (const tranche of tranches) {
    if (quotient > tranche.limiteInferieure) {
      const montantDansTranche = Math.min(
        quotient - tranche.limiteInferieure,
        tranche.limiteSuperieure - tranche.limiteInferieure
      );
      impotQuotient += montantDansTranche * (tranche.taux / 100);
    }
  }
  const impotAvecParts = impotQuotient * partsFiscales;

  return impot1Part - impotAvecParts;
}

// ============================================
// CALCUL COTISATIONS SOCIALES (Micro-entreprise)
// ============================================

export function calculerCotisationsMicro(
  caAnnuel: number,
  typeActivite: 'service' | 'vente' | 'mixte',
  caVente: number = 0 // Pour activité mixte
): number {
  const regles = reglesFiscalesFrance2024;
  
  if (typeActivite === 'vente') {
    return caAnnuel * (regles.tauxCotisations_vente / 100);
  } else if (typeActivite === 'service') {
    return caAnnuel * (regles.tauxCotisations_services / 100);
  } else {
    // Mixte : calcul au prorata
    const caServices = caAnnuel - caVente;
    return (
      caVente * (regles.tauxCotisations_vente / 100) +
      caServices * (regles.tauxCotisations_services / 100)
    );
  }
}

// ============================================
// CALCUL BASE IMPOSABLE (Micro-entreprise)
// ============================================

export function calculerBaseImposableMicro(
  caAnnuel: number,
  typeActivite: 'service' | 'vente' | 'mixte',
  caVente: number = 0
): { baseImposable: number; abattement: number } {
  const regles = reglesFiscalesFrance2024;
  
  let abattement: number;
  
  if (typeActivite === 'vente') {
    abattement = regles.abattementBIC_vente;
  } else if (typeActivite === 'service') {
    abattement = regles.abattementBNC;
  } else {
    // Mixte : moyenne pondérée des abattements
    const caServices = caAnnuel - caVente;
    abattement = 
      (caVente * regles.abattementBIC_vente + caServices * regles.abattementBNC) / caAnnuel;
  }

  const baseImposable = caAnnuel * (1 - abattement / 100);
  
  return { baseImposable, abattement };
}

// ============================================
// CALCUL CRÉDITS D'IMPÔT FAMILLE
// ============================================

export function calculerCreditsImpotFamille(enfants: Enfant[]): {
  creditGarde: number;
  reductionScolarite: number;
  total: number;
} {
  const regles = reglesFiscalesFrance2024;
  let creditGarde = 0;
  let reductionScolarite = 0;

  for (const enfant of enfants) {
    // Crédit garde (enfants < 6 ans)
    if (enfant.age < 6 && enfant.fraisGardeMensuel > 0) {
      const fraisAnnuels = enfant.fraisGardeMensuel * 12;
      const creditPotentiel = fraisAnnuels * (regles.tauxCreditGardeEnfant / 100);
      creditGarde += Math.min(creditPotentiel, regles.plafondCreditGardeParEnfant);
    }

    // Réductions scolarité
    if (enfant.scolarite === 'college') {
      reductionScolarite += regles.reductionCollege;
    } else if (enfant.scolarite === 'lycee') {
      reductionScolarite += regles.reductionLycee;
    } else if (enfant.scolarite === 'superieur') {
      reductionScolarite += regles.reductionSuperieur;
    }
  }

  return {
    creditGarde,
    reductionScolarite,
    total: creditGarde + reductionScolarite,
  };
}

// ============================================
// CALCUL FRAIS KILOMÉTRIQUES
// ============================================

export function calculerFraisKilometriques(
  kmAnnuels: number,
  puissanceFiscale: number
): number {
  const regles = reglesFiscalesFrance2024;
  
  // Déterminer la ligne du barème
  let ligne: typeof regles.baremeKm[0];
  if (puissanceFiscale <= 3) {
    ligne = regles.baremeKm[0];
  } else if (puissanceFiscale === 4) {
    ligne = regles.baremeKm[1];
  } else if (puissanceFiscale === 5) {
    ligne = regles.baremeKm[2];
  } else if (puissanceFiscale === 6) {
    ligne = regles.baremeKm[3];
  } else {
    ligne = regles.baremeKm[4];
  }

  // Appliquer le barème
  if (kmAnnuels <= 5000) {
    return kmAnnuels * ligne.jusqu5000;
  } else if (kmAnnuels <= 20000) {
    // Évaluer la formule
    const formula = ligne.de5001a20000.replace('d', kmAnnuels.toString());
    return eval(formula);
  } else {
    return kmAnnuels * ligne.plusDe20000;
  }
}

// ============================================
// CALCUL COMPLET - SITUATION ACTUELLE
// ============================================

export function calculerSituationActuelle(profil: ProfilUtilisateur): ResultatCalcul {
  const regles = reglesFiscalesFrance2024;
  const { professionnel, financier, personnel, fiscal } = profil;

  // 1. Calcul des cotisations sociales
  let cotisationsSociales = 0;
  if (professionnel.statut === 'auto-entrepreneur') {
    cotisationsSociales = calculerCotisationsMicro(
      financier.caAnnuel,
      professionnel.typeActivite
    );
  }

  // 2. Calcul de la base imposable
  let baseImposable: number;
  let abattement: number;

  if (professionnel.regimeActuel === 'micro') {
    const result = calculerBaseImposableMicro(
      financier.caAnnuel,
      professionnel.typeActivite
    );
    baseImposable = result.baseImposable;
    abattement = result.abattement;
  } else {
    // Régime réel : CA - frais réels
    const fraisReels = calculerTotalDepenses(financier.depensesPro);
    baseImposable = Math.max(0, financier.caAnnuel - fraisReels);
    abattement = 0;
  }

  // Ajouter autres revenus
  baseImposable += financier.autresRevenus + personnel.conjointRevenu;

  // 3. Calcul des parts fiscales
  const partsFiscales = calculerPartsFiscales(profil);

  // 4. Calcul de l'IR
  const { impotNet, tauxMarginal } = calculerIR(
    baseImposable,
    partsFiscales,
    regles.tranchesIR
  );

  // 5. Crédits d'impôt famille
  const creditsFamille = calculerCreditsImpotFamille(personnel.enfants);
  const impotRevenu = Math.max(0, impotNet - creditsFamille.total);

  // 6. TVA (si applicable)
  let tvaAPayer = 0;
  if (fiscal.tvaAssujetti) {
    // Simplifié : TVA collectée - TVA déductible (estimée à 20% des dépenses)
    const tvaCollectee = financier.caAnnuel * (regles.tauxTVA / 100);
    const tvaDeductible = calculerTotalDepenses(financier.depensesPro) * (regles.tauxTVA / 100);
    tvaAPayer = tvaCollectee - tvaDeductible;
  }

  // 7. CFE (estimée)
  const cfe = financier.depensesPro.cfe || 500; // Valeur par défaut

  // Total
  const total = impotRevenu + cotisationsSociales + tvaAPayer + cfe;

  return {
    impotRevenu,
    cotisationsSociales,
    tvaAPayer,
    cfe,
    total,
    baseImposable,
    abattement,
    partsFiscales,
    tauxMarginal,
  };
}

// ============================================
// HELPERS
// ============================================

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
    depenses.autres +
    (depenses.vehiculePro
      ? calculerFraisKilometriques(depenses.kmAnnuels, depenses.puissanceFiscale)
      : 0)
  );
}

// ============================================
// SIMULATION RÉGIME RÉEL
// ============================================

export function simulerRegimeReel(profil: ProfilUtilisateur): ResultatCalcul {
  // Créer une copie du profil avec régime réel
  const profilReel: ProfilUtilisateur = {
    ...profil,
    professionnel: {
      ...profil.professionnel,
      regimeActuel: 'reel-simplifie',
    },
  };

  return calculerSituationActuelle(profilReel);
}

// ============================================
// COMPARAISON MICRO vs RÉEL
// ============================================

export function comparerRegimes(profil: ProfilUtilisateur): {
  micro: ResultatCalcul;
  reel: ResultatCalcul;
  meilleurRegime: 'micro' | 'reel';
  economie: number;
} {
  // Forcer le calcul en micro
  const profilMicro = {
    ...profil,
    professionnel: { ...profil.professionnel, regimeActuel: 'micro' as const },
  };
  const micro = calculerSituationActuelle(profilMicro);

  // Forcer le calcul en réel
  const reel = simulerRegimeReel(profil);

  const meilleurRegime = micro.total <= reel.total ? 'micro' : 'reel';
  const economie = Math.abs(micro.total - reel.total);

  return { micro, reel, meilleurRegime, economie };
}
