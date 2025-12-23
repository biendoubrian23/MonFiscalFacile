/**
 * OLYMPE Engine - Le cœur du moteur fiscal
 * 
 * Point d'entrée unique pour toutes les analyses fiscales
 */

import type {
  DonneesUtilisateur,
  AnalyseComplete,
  ResultatCalcul,
  ResultatOptimisation,
  Scenario,
} from '../types';
import { CalculateurIR } from './CalculateurIR';
import { OptimiseurFiscal } from './OptimiseurFiscal';
import { GenerateurScenarios } from './GenerateurScenarios';

export class OlympeEngine {
  private calculateur: CalculateurIR;
  private optimiseur: OptimiseurFiscal;
  private generateurScenarios: GenerateurScenarios;
  
  static readonly VERSION = '1.0.0';

  constructor() {
    this.calculateur = new CalculateurIR();
    this.optimiseur = new OptimiseurFiscal();
    this.generateurScenarios = new GenerateurScenarios();
  }

  /**
   * Analyse complète de la situation fiscale
   */
  analyser(donnees: DonneesUtilisateur): AnalyseComplete {
    // 1. Calcul de la situation actuelle
    const situationActuelle = this.calculateur.calculer(donnees);

    // 2. Identification des optimisations
    const optimisations = this.optimiseur.identifier(donnees, situationActuelle);

    // 3. Génération des scénarios alternatifs
    const scenarios = this.generateurScenarios.generer(donnees);

    return {
      situationActuelle,
      optimisations,
      scenarios,
      dateAnalyse: new Date(),
      versionMoteur: OlympeEngine.VERSION,
    };
  }

  /**
   * Calcul simple sans optimisations
   */
  calculerImpots(donnees: DonneesUtilisateur): ResultatCalcul {
    return this.calculateur.calculer(donnees);
  }

  /**
   * Comparer deux situations
   */
  comparer(avant: DonneesUtilisateur, apres: DonneesUtilisateur): {
    avant: ResultatCalcul;
    apres: ResultatCalcul;
    difference: number;
  } {
    const resultatAvant = this.calculateur.calculer(avant);
    const resultatApres = this.calculateur.calculer(apres);

    return {
      avant: resultatAvant,
      apres: resultatApres,
      difference: resultatApres.impotNet - resultatAvant.impotNet,
    };
  }

  /**
   * Simuler un scénario spécifique
   */
  simulerScenario(
    donneesBase: DonneesUtilisateur,
    modifications: Partial<DonneesUtilisateur>
  ): Scenario {
    return this.generateurScenarios.simuler(donneesBase, modifications);
  }
}

// Singleton pour usage global
let instance: OlympeEngine | null = null;

export function getOlympeEngine(): OlympeEngine {
  if (!instance) {
    instance = new OlympeEngine();
  }
  return instance;
}
