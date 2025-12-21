/**
 * Base de données des règles fiscales françaises 2024
 * MonFiscalFacile - Données de référence
 */

import { ReglesFiscalesPays, TranchesIR, BaremeKilometrique } from './types';

// Tranches d'impôt sur le revenu 2024 (revenus 2023)
const tranchesIR2024: TranchesIR[] = [
  { limiteInferieure: 0, limiteSuperieure: 11294, taux: 0 },
  { limiteInferieure: 11294, limiteSuperieure: 28797, taux: 11 },
  { limiteInferieure: 28797, limiteSuperieure: 82341, taux: 30 },
  { limiteInferieure: 82341, limiteSuperieure: 177106, taux: 41 },
  { limiteInferieure: 177106, limiteSuperieure: Infinity, taux: 45 },
];

// Barème kilométrique 2024
const baremeKm2024: BaremeKilometrique[] = [
  { puissance: '3CV', jusqu5000: 0.529, de5001a20000: '(d * 0.316) + 1065', plusDe20000: 0.370 },
  { puissance: '4CV', jusqu5000: 0.606, de5001a20000: '(d * 0.340) + 1330', plusDe20000: 0.407 },
  { puissance: '5CV', jusqu5000: 0.636, de5001a20000: '(d * 0.357) + 1395', plusDe20000: 0.427 },
  { puissance: '6CV', jusqu5000: 0.665, de5001a20000: '(d * 0.374) + 1457', plusDe20000: 0.447 },
  { puissance: '7CV+', jusqu5000: 0.697, de5001a20000: '(d * 0.394) + 1515', plusDe20000: 0.470 },
];

export const reglesFiscalesFrance2024: ReglesFiscalesPays = {
  pays: 'france',
  annee: 2024,
  
  // ============================================
  // RÉGIMES MICRO-ENTREPRISE
  // ============================================
  
  // Seuils de chiffre d'affaires
  seuilMicroBNC: 77700, // Prestations de services BNC
  seuilMicroBIC_services: 77700, // Prestations de services BIC
  seuilMicroBIC_vente: 188700, // Vente de marchandises
  
  // Abattements forfaitaires
  abattementBNC: 34, // 34% pour les BNC
  abattementBIC_services: 50, // 50% pour les BIC services
  abattementBIC_vente: 71, // 71% pour la vente
  
  // ============================================
  // TVA
  // ============================================
  
  // Seuils de franchise en base de TVA
  seuilTVA_services: 36800, // Franchise de base services
  seuilTVA_vente: 91900, // Franchise de base vente
  tauxTVA: 20, // Taux normal
  
  // ============================================
  // COTISATIONS SOCIALES (URSSAF)
  // ============================================
  
  // Taux de cotisations micro-entreprise
  tauxCotisations_services: 21.1, // Prestations de services BIC/BNC
  tauxCotisations_vente: 12.3, // Vente de marchandises
  
  // ============================================
  // IMPÔT SUR LE REVENU
  // ============================================
  
  tranchesIR: tranchesIR2024,
  
  // ============================================
  // QUOTIENT FAMILIAL
  // ============================================
  
  // Parts fiscales pour les enfants
  partEnfant1_2: 0.5, // 0.5 part pour les 2 premiers enfants
  partEnfant3Plus: 1, // 1 part à partir du 3ème enfant
  
  // Plafonnement de l'avantage du quotient familial
  plafondQuotientFamilial: 1759, // Par demi-part
  
  // ============================================
  // CRÉDITS ET RÉDUCTIONS D'IMPÔT
  // ============================================
  
  // Garde d'enfants de moins de 6 ans
  tauxCreditGardeEnfant: 50, // 50% des frais
  plafondCreditGardeParEnfant: 3500, // Max 3500€ de crédit par enfant (soit 7000€ de frais)
  
  // Réductions pour frais de scolarité
  reductionCollege: 61, // Par enfant au collège
  reductionLycee: 153, // Par enfant au lycée
  reductionSuperieur: 183, // Par enfant dans le supérieur
  
  // ============================================
  // VÉHICULE
  // ============================================
  
  baremeKm: baremeKm2024,
};

// ============================================
// DÉPENSES TYPES PAR SECTEUR
// ============================================

export interface DepenseType {
  nom: string;
  description: string;
  montantMoyenMensuel: number;
  pourcentageProMoyen: number;
  categoriesApplicables: string[];
}

export const depensesTypesFreelance: DepenseType[] = [
  {
    nom: 'Internet',
    description: 'Abonnement internet utilisé pour le travail',
    montantMoyenMensuel: 40,
    pourcentageProMoyen: 50,
    categoriesApplicables: ['tous'],
  },
  {
    nom: 'Téléphone mobile',
    description: 'Forfait téléphone utilisé pour le travail',
    montantMoyenMensuel: 30,
    pourcentageProMoyen: 50,
    categoriesApplicables: ['tous'],
  },
  {
    nom: 'Logiciels et abonnements',
    description: 'Adobe, Office 365, outils métier, etc.',
    montantMoyenMensuel: 80,
    pourcentageProMoyen: 100,
    categoriesApplicables: ['service', 'mixte'],
  },
  {
    nom: 'Matériel informatique',
    description: 'Ordinateur, écran, clavier, souris (amorti sur 3 ans)',
    montantMoyenMensuel: 50, // Équivalent mensuel d'un amortissement
    pourcentageProMoyen: 100,
    categoriesApplicables: ['tous'],
  },
  {
    nom: 'Coworking',
    description: 'Espace de travail partagé',
    montantMoyenMensuel: 250,
    pourcentageProMoyen: 100,
    categoriesApplicables: ['service', 'mixte'],
  },
  {
    nom: 'Local professionnel (domicile)',
    description: 'Quote-part loyer/charges pour usage pro',
    montantMoyenMensuel: 200,
    pourcentageProMoyen: 20, // % de la surface dédiée
    categoriesApplicables: ['tous'],
  },
  {
    nom: 'Assurance RC Pro',
    description: 'Responsabilité civile professionnelle',
    montantMoyenMensuel: 30,
    pourcentageProMoyen: 100,
    categoriesApplicables: ['tous'],
  },
  {
    nom: 'Frais bancaires pro',
    description: 'Compte bancaire professionnel',
    montantMoyenMensuel: 15,
    pourcentageProMoyen: 100,
    categoriesApplicables: ['tous'],
  },
  {
    nom: 'Comptable',
    description: 'Honoraires expert-comptable',
    montantMoyenMensuel: 100,
    pourcentageProMoyen: 100,
    categoriesApplicables: ['reel'],
  },
  {
    nom: 'Formation professionnelle',
    description: 'Formations, certifications, livres pro',
    montantMoyenMensuel: 50,
    pourcentageProMoyen: 100,
    categoriesApplicables: ['tous'],
  },
  {
    nom: 'Déplacements professionnels',
    description: 'Transports, parking, péages',
    montantMoyenMensuel: 100,
    pourcentageProMoyen: 100,
    categoriesApplicables: ['tous'],
  },
];

// ============================================
// SEUILS D'ALERTE
// ============================================

export const seuilsAlerte = {
  // Approche du seuil micro
  pourcentageAlerteSeuil: 70, // Alerte à 70% du seuil
  pourcentageDangerSeuil: 90, // Danger à 90% du seuil
  
  // Comparaison régimes
  differenceMinimaleChangementRegime: 500, // Économie min pour suggérer un changement
  
  // Dépenses sous-déclarées
  pourcentageDepensesMoyennes: 50, // Si dépenses < 50% de la moyenne secteur, alerte
};

// ============================================
// RÈGLES DE DÉCISION
// ============================================

export const reglesDecision = {
  // Quand suggérer le passage au réel ?
  passageReelSiAbattementInferieur: true, // Si frais réels > abattement forfaitaire
  
  // Quand suggérer le versement libératoire ?
  versementLiberatoireSiTMI: 11, // Si TMI > 11%, le VL peut être intéressant
  
  // Quand suggérer déclaration séparée pour couples ?
  declarationSepareeSiEcartRevenus: 0.4, // Si écart > 40% entre les revenus
};
