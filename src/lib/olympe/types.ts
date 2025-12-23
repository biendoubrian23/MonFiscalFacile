/**
 * OLYMPE - Types principaux du moteur fiscal
 * 
 * Types partagés entre tous les modules
 */

// ============================================================
// PROFILS UTILISATEUR
// ============================================================

export type TypeProfil = 
  | 'salarie'
  | 'auto-entrepreneur'
  | 'tns'           // Travailleur Non Salarié (artisan, commerçant)
  | 'liberal'       // Profession libérale
  | 'dirigeant-sasu'
  | 'dirigeant-eurl'
  | 'investisseur'
  | 'mixte';        // Plusieurs sources de revenus

export type TypeActivite = 
  | 'vente-marchandises'
  | 'prestation-service-bic'
  | 'prestation-service-bnc'
  | 'profession-liberale'
  | 'location-meublee'
  | 'location-nue';

export type SituationFamiliale = 
  | 'celibataire'
  | 'marie'
  | 'pacse'
  | 'divorce'
  | 'veuf';

// ============================================================
// DONNÉES D'ENTRÉE
// ============================================================

export interface DonneesUtilisateur {
  // Identité
  profil: TypeProfil;
  situationFamiliale: SituationFamiliale;
  nombreParts: number;
  
  // Revenus
  revenus: RevenusDetail;
  
  // Charges déductibles
  charges: ChargesDeductibles;
  
  // Options fiscales
  options: OptionsFiscales;
}

export interface RevenusDetail {
  salaires?: number;
  chiffreAffaires?: number;
  typeActivite?: TypeActivite;
  dividendes?: number;
  revenusFonciers?: number;
  plusValues?: number;
  autresRevenus?: number;
}

export interface ChargesDeductibles {
  fraisReels?: number;
  pensionAlimentaire?: number;
  perVerse?: number;
  dons?: number;
  interetsEmprunt?: number;
  autresCharges?: number;
}

export interface OptionsFiscales {
  regime: 'micro' | 'reel';
  optionFraisReels: boolean;
  optionFlatTax: boolean;
}

// ============================================================
// RÉSULTATS DE CALCUL
// ============================================================

export interface ResultatCalcul {
  // Montants calculés
  revenuBrutGlobal: number;
  revenuNetImposable: number;
  impotBrut: number;
  decote: number;
  reductionsImpot: number;
  impotNet: number;
  
  // Cotisations
  cotisationsSociales: number;
  csgCrds: number;
  
  // Résumé
  chargesFiscalesTotales: number;
  revenuNetApresImpot: number;
  tauxImpositionMoyen: number;
  tauxMarginal: number;
  
  // Détail par tranche
  detailTranches: DetailTranche[];
}

export interface DetailTranche {
  tranche: number;
  tauxTranche: number;
  baseImposable: number;
  impotTranche: number;
}

// ============================================================
// OPTIMISATIONS
// ============================================================

export type CategorieOptimisation = 
  | 'regime-fiscal'
  | 'deductions'
  | 'statut-juridique'
  | 'retraite'
  | 'investissement';

export type NiveauDifficulte = 'facile' | 'moyen' | 'complexe';

export interface Optimisation {
  id: string;
  titre: string;
  description: string;
  economieEstimee: number;
  categorie: CategorieOptimisation;
  difficulte: NiveauDifficulte;
  priorite: number; // 1 = plus prioritaire
  
  // Conditions d'applicabilité
  applicable: boolean;
  raisonNonApplicable?: string;
  
  // Pour le guide pas à pas
  parcoursId?: string;
}

export interface ResultatOptimisation {
  optimisations: Optimisation[];
  economieTotaleEstimee: number;
  scoreOptimisation: number; // 0-100
}

// ============================================================
// SCÉNARIOS
// ============================================================

export interface Scenario {
  id: string;
  nom: string;
  description: string;
  donnees: Partial<DonneesUtilisateur>;
  resultat: ResultatCalcul;
  difference: DifferenceScenario;
}

export interface DifferenceScenario {
  impotDifference: number;
  cotisationsDifference: number;
  netDifference: number;
  estAvantageux: boolean;
}

// ============================================================
// ANALYSE COMPLÈTE
// ============================================================

export interface AnalyseComplete {
  // Calcul de base
  situationActuelle: ResultatCalcul;
  
  // Optimisations recommandées
  optimisations: ResultatOptimisation;
  
  // Scénarios alternatifs
  scenarios: Scenario[];
  
  // Métadonnées
  dateAnalyse: Date;
  versionMoteur: string;
}
