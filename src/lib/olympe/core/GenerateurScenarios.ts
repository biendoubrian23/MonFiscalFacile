/**
 * OLYMPE - Générateur de Scénarios
 * 
 * Génère des simulations "Et si..." personnalisées
 */

import type {
  DonneesUtilisateur,
  Scenario,
  DifferenceScenario,
} from '../types';
import { CalculateurIR } from './CalculateurIR';

export class GenerateurScenarios {
  private calculateur: CalculateurIR;

  constructor() {
    this.calculateur = new CalculateurIR();
  }

  /**
   * Générer les scénarios pertinents pour l'utilisateur
   */
  generer(donnees: DonneesUtilisateur): Scenario[] {
    const scenarios: Scenario[] = [];

    // Scénario : augmentation de CA de 20%
    if (donnees.revenus.chiffreAffaires) {
      scenarios.push(this.scenarioAugmentationCA(donnees, 0.20));
    }

    // Scénario : passage au régime réel
    if (donnees.options.regime === 'micro') {
      scenarios.push(this.scenarioRegimeReel(donnees));
    }

    // Scénario : ouverture PER maximum
    if (!donnees.charges.perVerse) {
      scenarios.push(this.scenarioPERMax(donnees));
    }

    // Scénario : changement de statut
    if (donnees.profil === 'auto-entrepreneur') {
      scenarios.push(this.scenarioSASU(donnees));
    }

    return scenarios;
  }

  /**
   * Simuler un scénario personnalisé
   */
  simuler(
    donneesBase: DonneesUtilisateur,
    modifications: Partial<DonneesUtilisateur>
  ): Scenario {
    const nouvellesDonnees = this.fusionnerDonnees(donneesBase, modifications);
    const resultatBase = this.calculateur.calculer(donneesBase);
    const resultatModifie = this.calculateur.calculer(nouvellesDonnees);

    return {
      id: 'custom',
      nom: 'Scénario personnalisé',
      description: 'Simulation avec vos modifications',
      donnees: modifications,
      resultat: resultatModifie,
      difference: this.calculerDifference(resultatBase, resultatModifie),
    };
  }

  /**
   * Scénario : augmentation du CA
   */
  private scenarioAugmentationCA(
    donnees: DonneesUtilisateur,
    pourcentage: number
  ): Scenario {
    const caActuel = donnees.revenus.chiffreAffaires || 0;
    const nouveauCA = caActuel * (1 + pourcentage);

    const modifications: Partial<DonneesUtilisateur> = {
      revenus: {
        ...donnees.revenus,
        chiffreAffaires: nouveauCA,
      },
    };

    const nouvellesDonnees = this.fusionnerDonnees(donnees, modifications);
    const resultatBase = this.calculateur.calculer(donnees);
    const resultatModifie = this.calculateur.calculer(nouvellesDonnees);

    return {
      id: 'augmentation-ca-20',
      nom: `CA +${pourcentage * 100}%`,
      description: `Si votre CA passe à ${Math.round(nouveauCA)}€`,
      donnees: modifications,
      resultat: resultatModifie,
      difference: this.calculerDifference(resultatBase, resultatModifie),
    };
  }

  /**
   * Scénario : passage au régime réel
   */
  private scenarioRegimeReel(donnees: DonneesUtilisateur): Scenario {
    const modifications: Partial<DonneesUtilisateur> = {
      options: {
        ...donnees.options,
        regime: 'reel',
      },
    };

    const nouvellesDonnees = this.fusionnerDonnees(donnees, modifications);
    const resultatBase = this.calculateur.calculer(donnees);
    const resultatModifie = this.calculateur.calculer(nouvellesDonnees);

    return {
      id: 'regime-reel',
      nom: 'Régime réel',
      description: 'Si vous passez au régime réel simplifié',
      donnees: modifications,
      resultat: resultatModifie,
      difference: this.calculerDifference(resultatBase, resultatModifie),
    };
  }

  /**
   * Scénario : PER au maximum
   */
  private scenarioPERMax(donnees: DonneesUtilisateur): Scenario {
    const plafondPER = Math.min(
      (donnees.revenus.salaires || donnees.revenus.chiffreAffaires || 0) * 0.10,
      35194
    );

    const modifications: Partial<DonneesUtilisateur> = {
      charges: {
        ...donnees.charges,
        perVerse: plafondPER,
      },
    };

    const nouvellesDonnees = this.fusionnerDonnees(donnees, modifications);
    const resultatBase = this.calculateur.calculer(donnees);
    const resultatModifie = this.calculateur.calculer(nouvellesDonnees);

    return {
      id: 'per-max',
      nom: 'PER maximum',
      description: `Si vous versez ${Math.round(plafondPER)}€ sur un PER`,
      donnees: modifications,
      resultat: resultatModifie,
      difference: this.calculerDifference(resultatBase, resultatModifie),
    };
  }

  /**
   * Scénario : passage en SASU
   */
  private scenarioSASU(donnees: DonneesUtilisateur): Scenario {
    // Simulation simplifiée
    const ca = donnees.revenus.chiffreAffaires || 0;
    const remuneration = ca * 0.5; // 50% en salaire
    const dividendes = ca * 0.3;   // 30% en dividendes

    const modificationsData: DonneesUtilisateur = {
      ...donnees,
      profil: 'dirigeant-sasu',
      revenus: {
        ...donnees.revenus,
        salaires: remuneration,
        dividendes: dividendes,
        chiffreAffaires: undefined,
      },
    };

    const resultatBase = this.calculateur.calculer(donnees);
    const resultatModifie = this.calculateur.calculer(modificationsData);

    return {
      id: 'passage-sasu',
      nom: 'Passage en SASU',
      description: 'Si vous créez une SASU avec rémunération + dividendes',
      donnees: { profil: 'dirigeant-sasu' },
      resultat: resultatModifie,
      difference: this.calculerDifference(resultatBase, resultatModifie),
    };
  }

  /**
   * Fusionner les données de base avec les modifications
   */
  private fusionnerDonnees(
    base: DonneesUtilisateur,
    modifications: Partial<DonneesUtilisateur>
  ): DonneesUtilisateur {
    return {
      ...base,
      ...modifications,
      revenus: {
        ...base.revenus,
        ...(modifications.revenus || {}),
      },
      charges: {
        ...base.charges,
        ...(modifications.charges || {}),
      },
      options: {
        ...base.options,
        ...(modifications.options || {}),
      },
    };
  }

  /**
   * Calculer la différence entre deux résultats
   */
  private calculerDifference(
    avant: { impotNet: number; cotisationsSociales: number; revenuNetApresImpot: number },
    apres: { impotNet: number; cotisationsSociales: number; revenuNetApresImpot: number }
  ): DifferenceScenario {
    return {
      impotDifference: apres.impotNet - avant.impotNet,
      cotisationsDifference: apres.cotisationsSociales - avant.cotisationsSociales,
      netDifference: apres.revenuNetApresImpot - avant.revenuNetApresImpot,
      estAvantageux: apres.revenuNetApresImpot > avant.revenuNetApresImpot,
    };
  }
}
