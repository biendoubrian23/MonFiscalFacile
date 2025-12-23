/**
 * OLYMPE - Optimiseur Fiscal
 * 
 * Identifie les optimisations applicables selon le profil
 */

import type {
  DonneesUtilisateur,
  ResultatCalcul,
  ResultatOptimisation,
  Optimisation,
} from '../types';
import { PLAFONDS_MICRO, ABATTEMENTS, PLAFONDS_PER } from '../rules/baremes';

export class OptimiseurFiscal {
  /**
   * Identifier toutes les optimisations applicables
   */
  identifier(
    donnees: DonneesUtilisateur,
    resultatActuel: ResultatCalcul
  ): ResultatOptimisation {
    const optimisations: Optimisation[] = [];
    let priorite = 1;

    // Vérifier chaque stratégie d'optimisation
    const strategiesOptimisation = [
      this.verifierRegimeReel.bind(this),
      this.verifierFraisReels.bind(this),
      this.verifierPER.bind(this),
      this.verifierChangementStatut.bind(this),
      this.verifierFraisKilometriques.bind(this),
    ];

    for (const strategie of strategiesOptimisation) {
      const optimisation = strategie(donnees, resultatActuel, priorite);
      if (optimisation) {
        optimisations.push(optimisation);
        if (optimisation.applicable) priorite++;
      }
    }

    // Trier par priorité
    optimisations.sort((a, b) => a.priorite - b.priorite);

    // Calculer l'économie totale
    const economieTotaleEstimee = optimisations
      .filter(o => o.applicable)
      .reduce((sum, o) => sum + o.economieEstimee, 0);

    // Calculer le score d'optimisation
    const scoreOptimisation = this.calculerScore(optimisations, resultatActuel);

    return {
      optimisations,
      economieTotaleEstimee,
      scoreOptimisation,
    };
  }

  /**
   * Vérifier l'intérêt du régime réel vs micro
   */
  private verifierRegimeReel(
    donnees: DonneesUtilisateur,
    resultat: ResultatCalcul,
    priorite: number
  ): Optimisation | null {
    if (donnees.profil !== 'auto-entrepreneur') return null;
    if (donnees.options.regime === 'reel') return null;

    const ca = donnees.revenus.chiffreAffaires || 0;
    const chargesReelles = donnees.charges.fraisReels || 0;
    
    // Calculer l'abattement micro
    let tauxAbattement = ABATTEMENTS.microBNC;
    if (donnees.revenus.typeActivite === 'vente-marchandises') {
      tauxAbattement = ABATTEMENTS.microBIC.vente;
    } else if (donnees.revenus.typeActivite === 'prestation-service-bic') {
      tauxAbattement = ABATTEMENTS.microBIC.service;
    }
    
    const abattementMicro = ca * tauxAbattement;
    const economie = chargesReelles > abattementMicro 
      ? (chargesReelles - abattementMicro) * (resultat.tauxMarginal / 100)
      : 0;

    const applicable = economie > 500;

    return {
      id: 'regime-reel',
      titre: 'Passer au régime réel',
      description: applicable
        ? `Vos charges réelles (${chargesReelles}€) dépassent l'abattement forfaitaire`
        : 'Le régime micro est plus avantageux pour vous',
      economieEstimee: Math.round(economie),
      categorie: 'regime-fiscal',
      difficulte: 'moyen',
      priorite: applicable ? priorite : 99,
      applicable,
      raisonNonApplicable: applicable ? undefined : 'Abattement micro supérieur aux charges réelles',
      parcoursId: 'parcours-regime-reel',
    };
  }

  /**
   * Vérifier l'intérêt des frais réels vs 10%
   */
  private verifierFraisReels(
    donnees: DonneesUtilisateur,
    resultat: ResultatCalcul,
    priorite: number
  ): Optimisation | null {
    if (!donnees.revenus.salaires) return null;
    if (donnees.options.optionFraisReels) return null;

    const salaires = donnees.revenus.salaires;
    const abattement10 = Math.min(
      Math.max(salaires * 0.10, ABATTEMENTS.fraisPro10.minimum),
      ABATTEMENTS.fraisPro10.maximum
    );
    
    const fraisReels = donnees.charges.fraisReels || 0;
    const economie = fraisReels > abattement10
      ? (fraisReels - abattement10) * (resultat.tauxMarginal / 100)
      : 0;

    const applicable = economie > 200;

    return {
      id: 'frais-reels',
      titre: 'Déclarer vos frais réels',
      description: applicable
        ? `Vos frais réels sont plus avantageux que l'abattement de 10%`
        : `L'abattement de 10% (${Math.round(abattement10)}€) est plus intéressant`,
      economieEstimee: Math.round(economie),
      categorie: 'deductions',
      difficulte: 'facile',
      priorite: applicable ? priorite : 99,
      applicable,
      parcoursId: 'parcours-frais-reels',
    };
  }

  /**
   * Vérifier l'intérêt d'ouvrir un PER
   */
  private verifierPER(
    donnees: DonneesUtilisateur,
    resultat: ResultatCalcul,
    priorite: number
  ): Optimisation | null {
    if (donnees.charges.perVerse && donnees.charges.perVerse > 0) return null;
    if (resultat.tauxMarginal <= 11) return null;

    const plafondPER = Math.min(
      resultat.revenuNetImposable * PLAFONDS_PER.tauxRevenu,
      PLAFONDS_PER.maximum
    );
    
    const economieMax = plafondPER * (resultat.tauxMarginal / 100);
    const applicable = economieMax > 500;

    return {
      id: 'ouvrir-per',
      titre: 'Ouvrir un Plan Épargne Retraite',
      description: `Vous pouvez déduire jusqu'à ${Math.round(plafondPER)}€ de versements`,
      economieEstimee: Math.round(economieMax),
      categorie: 'retraite',
      difficulte: 'facile',
      priorite: applicable ? priorite : 99,
      applicable,
      parcoursId: 'parcours-per',
    };
  }

  /**
   * Vérifier l'intérêt de changer de statut
   */
  private verifierChangementStatut(
    donnees: DonneesUtilisateur,
    resultat: ResultatCalcul,
    priorite: number
  ): Optimisation | null {
    if (donnees.profil !== 'auto-entrepreneur') return null;

    const ca = donnees.revenus.chiffreAffaires || 0;
    const seuilVente = PLAFONDS_MICRO.venteMarchandises * 0.7;
    const seuilService = PLAFONDS_MICRO.prestationService * 0.7;

    const proche = (donnees.revenus.typeActivite === 'vente-marchandises' && ca > seuilVente)
      || (ca > seuilService);

    if (!proche && ca < 40000) return null;

    return {
      id: 'changement-statut',
      titre: 'Envisager la création de société',
      description: proche 
        ? 'Vous approchez des plafonds micro-entreprise'
        : 'Une société pourrait être plus avantageuse à votre niveau de CA',
      economieEstimee: 0, // À calculer avec le comparateur
      categorie: 'statut-juridique',
      difficulte: 'complexe',
      priorite,
      applicable: true,
      parcoursId: 'parcours-creation-societe',
    };
  }

  /**
   * Vérifier l'intérêt des frais kilométriques
   */
  private verifierFraisKilometriques(
    donnees: DonneesUtilisateur,
    resultat: ResultatCalcul,
    priorite: number
  ): Optimisation | null {
    if (!donnees.revenus.salaires) return null;
    if (donnees.options.optionFraisReels) return null;

    // Estimation : 30km/jour, 220 jours
    const kmEstimes = 30 * 220 * 2;
    const fraisKmEstimes = kmEstimes * 0.40;

    const abattement10 = Math.min(donnees.revenus.salaires * 0.10, ABATTEMENTS.fraisPro10.maximum);
    const economie = fraisKmEstimes > abattement10
      ? (fraisKmEstimes - abattement10) * (resultat.tauxMarginal / 100)
      : 0;

    return {
      id: 'frais-km',
      titre: 'Calculer vos frais kilométriques',
      description: 'Vérifiez si vos trajets domicile-travail sont déductibles',
      economieEstimee: Math.round(economie),
      categorie: 'deductions',
      difficulte: 'facile',
      priorite: economie > 0 ? priorite : 99,
      applicable: true,
      parcoursId: 'parcours-frais-km',
    };
  }

  /**
   * Calculer le score d'optimisation (0-100)
   */
  private calculerScore(
    optimisations: Optimisation[],
    resultat: ResultatCalcul
  ): number {
    const applicables = optimisations.filter(o => o.applicable);
    
    if (applicables.length === 0) return 100;

    // Plus il y a d'économies potentielles, plus le score est bas
    const economieMax = applicables.reduce((sum, o) => sum + o.economieEstimee, 0);
    const ratio = economieMax / Math.max(resultat.impotNet, 1);

    return Math.round(Math.max(0, 100 - (ratio * 100)));
  }
}
