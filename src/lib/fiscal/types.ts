/**
 * Types pour le moteur de calcul fiscal
 * MonFiscalFacile - Algorithme intelligent sans IA
 */

// ============================================
// PROFIL UTILISATEUR
// ============================================

export type Pays = 'france' | 'belgique' | 'suisse' | 'luxembourg';

export type StatutProfessionnel = 
  | 'auto-entrepreneur'
  | 'freelance'
  | 'eurl'
  | 'sasu'
  | 'particulier';

export type TypeActivite = 'service' | 'vente' | 'mixte';

export type SituationFamiliale = 
  | 'celibataire'
  | 'marie'
  | 'pacse'
  | 'divorce'
  | 'veuf';

export type NiveauScolarite = 'maternelle' | 'primaire' | 'college' | 'lycee' | 'superieur';

export interface Enfant {
  age: number;
  scolarite: NiveauScolarite | null;
  fraisGardeMensuel: number; // Crèche, nounou, etc.
  gardeAlternee: boolean;
}

export interface ProfilPersonnel {
  pays: Pays;
  age: number;
  situationFamiliale: SituationFamiliale;
  conjointRevenu: number; // 0 si célibataire
  enfants: Enfant[];
}

export interface ProfilProfessionnel {
  statut: StatutProfessionnel;
  typeActivite: TypeActivite;
  secteur: string;
  dateDebut: Date;
  regimeActuel: 'micro' | 'reel-simplifie' | 'reel-normal' | 'is';
}

export interface ProfilFinancier {
  caAnnuel: number;
  depensesPro: DepensesProfessionnelles;
  autresRevenus: number; // Salaires, revenus fonciers, etc.
  patrimoineImmobilier: boolean;
  creditImmobilier: boolean;
}

export interface DepensesProfessionnelles {
  // Frais fixes
  localPro: number;
  assurancePro: number;
  cfe: number;
  
  // Frais variables
  internetPro: number; // Montant mensuel, % pro sera calculé
  telephonePro: number;
  logiciels: number;
  materielInformatique: number;
  deplacements: number;
  formation: number;
  
  // Véhicule
  vehiculePro: boolean;
  kmAnnuels: number;
  puissanceFiscale: number;
  fraisVehiculeReels: number;
  
  // Divers
  coworking: number;
  fraisBancaires: number;
  comptable: number;
  autres: number;
}

export interface ProfilFiscal {
  tvaAssujetti: boolean;
  versementLiberatoire: boolean;
  optionIS: boolean; // Pour EURL
  declarationCommune: boolean; // Si en couple
}

// Profil complet de l'utilisateur
export interface ProfilUtilisateur {
  personnel: ProfilPersonnel;
  professionnel: ProfilProfessionnel;
  financier: ProfilFinancier;
  fiscal: ProfilFiscal;
}

// ============================================
// RÉSULTATS DE CALCUL
// ============================================

export interface ResultatCalcul {
  impotRevenu: number;
  cotisationsSociales: number;
  tvaAPayer: number;
  cfe: number;
  total: number;
  
  // Détails
  baseImposable: number;
  abattement: number;
  partsFiscales: number;
  tauxMarginal: number;
}

export interface Scenario {
  id: string;
  nom: string;
  description: string;
  resultat: ResultatCalcul;
  actions: ActionOptimisation[];
  economieVsActuel: number;
}

// ============================================
// OPTIMISATIONS
// ============================================

export type NiveauEffort = 'faible' | 'moyen' | 'eleve';
export type Urgence = 'immediate' | 'court-terme' | 'moyen-terme' | 'long-terme';
export type CategorieOptimisation = 
  | 'depenses'
  | 'regime'
  | 'famille'
  | 'investissement'
  | 'timing';

export interface ActionOptimisation {
  id: string;
  titre: string;
  description: string;
  explication: string; // Explication humaine
  categorie: CategorieOptimisation;
  gainEstime: number;
  effort: NiveauEffort;
  urgence: Urgence;
  dateLimite?: Date;
  prerequis: string[];
  risques: string[];
  lienDoc?: string;
}

export interface DiagnosticFiscal {
  profilId: string;
  dateAnalyse: Date;
  
  // Situation actuelle
  situationActuelle: ResultatCalcul;
  tauxOptimisation: number; // 0-100%
  
  // Alertes
  alertes: Alerte[];
  
  // Scénarios calculés
  scenarios: Scenario[];
  
  // Meilleur scénario
  meilleurScenario: Scenario;
  economieMaximale: number;
  
  // Actions recommandées (triées par priorité)
  actionsRecommandees: ActionOptimisation[];
}

export interface Alerte {
  id: string;
  type: 'warning' | 'info' | 'danger' | 'success';
  titre: string;
  message: string;
  actionAssociee?: string; // ID de l'action
  priorite: number;
}

// ============================================
// RÈGLES FISCALES
// ============================================

export interface SeuilFiscal {
  nom: string;
  valeur: number;
  description: string;
  consequence: string;
}

export interface TranchesIR {
  limiteInferieure: number;
  limiteSuperieure: number;
  taux: number;
}

export interface BaremeKilometrique {
  puissance: string;
  jusqu5000: number;
  de5001a20000: string; // Formule
  plusDe20000: number;
}

export interface ReglesFiscalesPays {
  pays: Pays;
  annee: number;
  
  // Régimes micro
  seuilMicroBNC: number;
  seuilMicroBIC_services: number;
  seuilMicroBIC_vente: number;
  abattementBNC: number;
  abattementBIC_services: number;
  abattementBIC_vente: number;
  
  // TVA
  seuilTVA_services: number;
  seuilTVA_vente: number;
  tauxTVA: number;
  
  // Cotisations
  tauxCotisations_services: number;
  tauxCotisations_vente: number;
  
  // IR
  tranchesIR: TranchesIR[];
  
  // Famille
  partEnfant1_2: number;
  partEnfant3Plus: number;
  plafondQuotientFamilial: number;
  
  // Crédits et réductions
  tauxCreditGardeEnfant: number;
  plafondCreditGardeParEnfant: number;
  reductionCollege: number;
  reductionLycee: number;
  reductionSuperieur: number;
  
  // Barème kilométrique
  baremeKm: BaremeKilometrique[];
}
