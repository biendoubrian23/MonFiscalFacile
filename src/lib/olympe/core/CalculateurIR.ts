/**
 * OLYMPE - Calculateur d'Impôt sur le Revenu
 * 
 * Calcule l'IR avec toutes les subtilités françaises
 */

import type {
  DonneesUtilisateur,
  ResultatCalcul,
  DetailTranche,
} from '../types';
import { TRANCHES_IR_2025, DECOTE, ABATTEMENTS } from '../rules/baremes';

export class CalculateurIR {
  /**
   * Calcul complet de l'impôt
   */
  calculer(donnees: DonneesUtilisateur): ResultatCalcul {
    // Étape 1 : Calculer le revenu brut global
    const revenuBrutGlobal = this.calculerRevenuBrutGlobal(donnees);

    // Étape 2 : Appliquer les abattements et charges
    const revenuNetImposable = this.calculerRevenuNetImposable(donnees, revenuBrutGlobal);

    // Étape 3 : Appliquer le quotient familial
    const quotientFamilial = revenuNetImposable / donnees.nombreParts;

    // Étape 4 : Calculer l'impôt brut par tranches
    const { impotParPart, detailTranches } = this.calculerParTranches(quotientFamilial);
    const impotBrut = impotParPart * donnees.nombreParts;

    // Étape 5 : Appliquer la décote si applicable
    const decote = this.calculerDecote(impotBrut, donnees);

    // Étape 6 : Appliquer les réductions d'impôt
    const reductionsImpot = this.calculerReductions(donnees);

    // Étape 7 : Calculer l'impôt net
    const impotNet = Math.max(0, impotBrut - decote - reductionsImpot);

    // Étape 8 : Calculer les cotisations sociales
    const cotisationsSociales = this.calculerCotisations(donnees);
    const csgCrds = this.calculerCSGCRDS(donnees);

    // Résumé
    const chargesFiscalesTotales = impotNet + cotisationsSociales + csgCrds;
    const revenuNetApresImpot = revenuBrutGlobal - chargesFiscalesTotales;
    const tauxImpositionMoyen = revenuBrutGlobal > 0 
      ? (chargesFiscalesTotales / revenuBrutGlobal) * 100 
      : 0;
    const tauxMarginal = this.determinerTauxMarginal(quotientFamilial);

    return {
      revenuBrutGlobal,
      revenuNetImposable,
      impotBrut,
      decote,
      reductionsImpot,
      impotNet,
      cotisationsSociales,
      csgCrds,
      chargesFiscalesTotales,
      revenuNetApresImpot,
      tauxImpositionMoyen,
      tauxMarginal,
      detailTranches,
    };
  }

  /**
   * Calcul du revenu brut global
   */
  private calculerRevenuBrutGlobal(donnees: DonneesUtilisateur): number {
    const revenus = donnees.revenus;
    let total = 0;

    // Salaires
    if (revenus.salaires) {
      total += revenus.salaires;
    }

    // Chiffre d'affaires (selon régime)
    if (revenus.chiffreAffaires) {
      total += this.calculerRevenuActivite(
        revenus.chiffreAffaires,
        revenus.typeActivite,
        donnees.options.regime
      );
    }

    // Dividendes (si option barème)
    if (revenus.dividendes && !donnees.options.optionFlatTax) {
      total += revenus.dividendes * 0.6; // Abattement 40%
    }

    // Revenus fonciers
    if (revenus.revenusFonciers) {
      total += revenus.revenusFonciers;
    }

    // Autres revenus
    if (revenus.autresRevenus) {
      total += revenus.autresRevenus;
    }

    return total;
  }

  /**
   * Calcul du revenu d'activité selon le régime
   */
  private calculerRevenuActivite(
    ca: number,
    typeActivite: string | undefined,
    regime: 'micro' | 'reel'
  ): number {
    if (regime === 'micro') {
      // Abattement forfaitaire selon l'activité
      switch (typeActivite) {
        case 'vente-marchandises':
          return ca * (1 - ABATTEMENTS.microBIC.vente);
        case 'prestation-service-bic':
          return ca * (1 - ABATTEMENTS.microBIC.service);
        case 'prestation-service-bnc':
        case 'profession-liberale':
          return ca * (1 - ABATTEMENTS.microBNC);
        default:
          return ca * (1 - ABATTEMENTS.microBNC);
      }
    }
    
    // Régime réel : le CA est déjà un bénéfice net
    return ca;
  }

  /**
   * Calcul du revenu net imposable
   */
  private calculerRevenuNetImposable(
    donnees: DonneesUtilisateur,
    revenuBrut: number
  ): number {
    let revenuNet = revenuBrut;

    // Abattement 10% ou frais réels pour les salaires
    if (donnees.revenus.salaires) {
      if (donnees.options.optionFraisReels && donnees.charges.fraisReels) {
        revenuNet -= donnees.charges.fraisReels;
      } else {
        const abattement = Math.min(
          Math.max(donnees.revenus.salaires * ABATTEMENTS.fraisPro10.taux, ABATTEMENTS.fraisPro10.minimum),
          ABATTEMENTS.fraisPro10.maximum
        );
        revenuNet -= abattement;
      }
    }

    // Charges déductibles
    const charges = donnees.charges;
    if (charges.pensionAlimentaire) revenuNet -= charges.pensionAlimentaire;
    if (charges.perVerse) revenuNet -= charges.perVerse;
    if (charges.autresCharges) revenuNet -= charges.autresCharges;

    return Math.max(0, revenuNet);
  }

  /**
   * Calcul par tranches
   */
  private calculerParTranches(quotient: number): {
    impotParPart: number;
    detailTranches: DetailTranche[];
  } {
    let impot = 0;
    const detailTranches: DetailTranche[] = [];

    for (let i = 0; i < TRANCHES_IR_2025.length; i++) {
      const tranche = TRANCHES_IR_2025[i];
      const min = i === 0 ? 0 : TRANCHES_IR_2025[i - 1].max;
      const max = tranche.max;

      if (quotient <= min) break;

      const baseImposable = Math.min(quotient, max) - min;
      const impotTranche = baseImposable * tranche.taux;

      detailTranches.push({
        tranche: i + 1,
        tauxTranche: tranche.taux * 100,
        baseImposable,
        impotTranche,
      });

      impot += impotTranche;
    }

    return { impotParPart: impot, detailTranches };
  }

  /**
   * Calcul de la décote
   */
  private calculerDecote(impotBrut: number, donnees: DonneesUtilisateur): number {
    const estCouple = ['marie', 'pacse'].includes(donnees.situationFamiliale);
    const seuil = estCouple ? DECOTE.seuilCouple : DECOTE.seuilCelibataire;
    const plafond = estCouple ? DECOTE.plafondCouple : DECOTE.plafondCelibataire;

    if (impotBrut > seuil) return 0;

    const decote = plafond - (impotBrut * DECOTE.tauxDecote);
    return Math.max(0, Math.min(decote, impotBrut));
  }

  /**
   * Calcul des réductions d'impôt
   */
  private calculerReductions(donnees: DonneesUtilisateur): number {
    let reductions = 0;

    // Réduction pour dons
    if (donnees.charges.dons) {
      reductions += donnees.charges.dons * 0.66; // Simplification
    }

    return reductions;
  }

  /**
   * Calcul des cotisations sociales
   */
  private calculerCotisations(donnees: DonneesUtilisateur): number {
    // Simplifié - sera développé dans le module dédié
    if (donnees.profil === 'auto-entrepreneur' && donnees.revenus.chiffreAffaires) {
      return donnees.revenus.chiffreAffaires * 0.22; // Approximation
    }
    return 0;
  }

  /**
   * Calcul CSG/CRDS
   */
  private calculerCSGCRDS(donnees: DonneesUtilisateur): number {
    // Simplifié
    return 0;
  }

  /**
   * Déterminer le taux marginal d'imposition
   */
  private determinerTauxMarginal(quotient: number): number {
    for (let i = TRANCHES_IR_2025.length - 1; i >= 0; i--) {
      const tranche = TRANCHES_IR_2025[i];
      const min = i === 0 ? 0 : TRANCHES_IR_2025[i - 1].max;
      
      if (quotient > min) {
        return tranche.taux * 100;
      }
    }
    return 0;
  }
}
