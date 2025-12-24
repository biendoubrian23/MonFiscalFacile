"use client";

import { useState } from "react";
import {
  HelpCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Gift,
  Check,
  Info,
  X,
  Sparkles,
  Users,
  Heart,
  Home,
  Briefcase,
  PiggyBank,
  Building2,
  TrendingUp,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================

interface Reduction {
  id: string;
  nom: string;
  description: string;
  exemple: string;
  type: "reduction" | "deduction" | "credit";
  tauxOuMontant: string;
  plafond?: string;
  inputType: "montant" | "nombre" | "boolean" | "montant-mensuel";
  inputLabel?: string;
  inputMax?: number;
  inputSuffix?: string; // Ex: "€/mois", "€/an", "jours", "enfants", etc.
  calcul: (valeur: number, salaireNet: number, tmi: number) => number;
  conditionsExclusion?: string[]; // Cas où ce n'est PAS déductible
}

interface Categorie {
  id: string;
  nom: string;
  icon: LucideIcon;
  description: string;
  reductions: Reduction[];
}

// ============================================================
// FONCTIONS DE CALCUL FISCAL RÉALISTES (Barème 2025)
// ============================================================

// Barème progressif de l'impôt sur le revenu 2025 (revenus 2024)
// Source : economie.gouv.fr - Revalorisé de 2% pour l'inflation
const BAREME_IR_2025 = [
  { limite: 11520, taux: 0 },
  { limite: 29373, taux: 0.11 },
  { limite: 84000, taux: 0.30 },
  { limite: 180648, taux: 0.41 },
  { limite: Infinity, taux: 0.45 },
];

// Plafond du quotient familial par demi-part (2025)
const PLAFOND_QF_DEMI_PART = 1802;

// Plafond abattement 10% (2025)
const ABATTEMENT_10_MIN = 506;
const ABATTEMENT_10_MAX = 14422;

// Coefficient conversion Net à payer → Net imposable (CSG/CRDS non déductible)
const COEF_NET_IMPOSABLE = 1.03;

// Décote 2025 : Mécanisme de réduction pour les foyers modestes
const DECOTE_SEUIL_CELIBATAIRE = 1977;
const DECOTE_PLAFOND_CELIBATAIRE = 939;
const DECOTE_SEUIL_COUPLE = 3271;
const DECOTE_PLAFOND_COUPLE = 1555;
const DECOTE_TAUX = 0.4525; // 45,25%

// Calcule l'impôt brut pour un revenu imposable et un nombre de parts
function calculerImpotBrut(revenuImposable: number, nbParts: number): number {
  const quotient = revenuImposable / nbParts;
  let impotParPart = 0;
  let revenuRestant = quotient;
  let limitePrec = 0;

  for (const tranche of BAREME_IR_2025) {
    if (revenuRestant <= 0) break;
    const montantTranche = Math.min(revenuRestant, tranche.limite - limitePrec);
    impotParPart += montantTranche * tranche.taux;
    revenuRestant -= montantTranche;
    limitePrec = tranche.limite;
  }

  return Math.round(impotParPart * nbParts);
}

// Calcule la décote (réduction pour les foyers modestes)
// C'est un mécanisme CRUCIAL souvent oublié !
function calculerDecote(impotBrut: number, estCouple: boolean = false): number {
  const seuil = estCouple ? DECOTE_SEUIL_COUPLE : DECOTE_SEUIL_CELIBATAIRE;
  const plafond = estCouple ? DECOTE_PLAFOND_COUPLE : DECOTE_PLAFOND_CELIBATAIRE;
  
  if (impotBrut >= seuil) return 0;
  
  // Décote = plafond - (impôt_brut × 45,25%)
  const decote = plafond - (impotBrut * DECOTE_TAUX);
  return Math.max(0, Math.round(decote));
}

// Calcule le revenu net imposable à partir du net à payer
function calculerRevenuNetImposable(netAPayer: number): number {
  // Le net imposable est environ 3% plus élevé que le net à payer
  // (CSG/CRDS non déductible)
  const netImposable = netAPayer * COEF_NET_IMPOSABLE;
  // Puis on applique l'abattement de 10%
  const abattement = Math.min(Math.max(netImposable * 0.10, ABATTEMENT_10_MIN), ABATTEMENT_10_MAX);
  return netImposable - abattement;
}

// Calcule le nombre de parts fiscales selon le nombre d'enfants (célibataire)
function calculerPartsCelibataire(nbEnfants: number): number {
  if (nbEnfants === 0) return 1;
  if (nbEnfants === 1) return 1.5;
  if (nbEnfants === 2) return 2;
  // À partir du 3ème enfant : +1 part par enfant
  return 2 + (nbEnfants - 2);
}

// Calcule le nombre de parts fiscales selon le nombre d'enfants (couple)
function calculerPartsCouple(nbEnfants: number): number {
  if (nbEnfants === 0) return 2;
  if (nbEnfants === 1) return 2.5;
  if (nbEnfants === 2) return 3;
  // À partir du 3ème enfant : +1 part par enfant
  return 3 + (nbEnfants - 2);
}

// Calcule l'économie réelle liée aux enfants avec le mécanisme du quotient familial
function calculerEconomieEnfants(revenuImposable: number, nbEnfants: number, estCouple: boolean = false): number {
  if (nbEnfants === 0) return 0;
  
  // Parts de base (sans enfants)
  const partsBase = estCouple ? 2 : 1;
  // Parts avec enfants
  const partsAvecEnfants = estCouple 
    ? calculerPartsCouple(nbEnfants) 
    : calculerPartsCelibataire(nbEnfants);
  
  // Calcul de l'impôt sans et avec enfants
  const impotSansEnfants = calculerImpotBrut(revenuImposable, partsBase);
  const impotAvecEnfants = calculerImpotBrut(revenuImposable, partsAvecEnfants);
  
  // Économie brute
  const economieBrute = impotSansEnfants - impotAvecEnfants;
  
  // Calcul du nombre de demi-parts supplémentaires
  // Enfants 1 et 2 : 0.5 part chacun = 1 demi-part chacun
  // Enfants 3+ : 1 part chacun = 2 demi-parts chacun
  const demiPartsEnfants12 = Math.min(nbEnfants, 2);
  const demiPartsEnfants3Plus = Math.max(0, nbEnfants - 2) * 2;
  const totalDemiParts = demiPartsEnfants12 + demiPartsEnfants3Plus;
  
  // Plafonnement : 1 791€ max par demi-part
  const plafond = PLAFOND_QF_DEMI_PART * totalDemiParts;
  
  return Math.min(economieBrute, plafond);
}

// ============================================================
// DONNÉES COMPLÈTES DES RÉDUCTIONS
// ============================================================

const categories: Categorie[] = [
  {
    id: "famille",
    nom: "Famille",
    icon: Users,
    description: "Enfants, garde, scolarité",
    reductions: [
      {
        id: "enfants",
        nom: "Enfants à charge",
        description: "Chaque enfant augmente votre quotient familial. Les 2 premiers = 0,5 part chacun. À partir du 3ème = 1 part entière.",
        exemple: "Couple avec 2 enfants : 3 parts. Avec 3 enfants : 4 parts. Plafond : 1 802€ par demi-part (2025).",
        type: "reduction",
        tauxOuMontant: "0,5 part (1er/2ème) ou 1 part (3ème+)",
        plafond: "1 802€ max par demi-part",
        inputType: "nombre",
        inputLabel: "Nombre d'enfants",
        inputMax: 10,
        inputSuffix: "enfants",
        calcul: (nb, salaire, tmi) => {
          // Calcul réaliste avec barème progressif et quotient familial 2025
          // Utilisation de la conversion net à payer → net imposable
          const revenuImposable = calculerRevenuNetImposable(salaire);
          // Utilisation de la fonction calculerEconomieEnfants avec situation célibataire par défaut
          return calculerEconomieEnfants(revenuImposable, nb, false);
        },
      },
      {
        id: "creche",
        nom: "Frais de crèche",
        description: "Crédit d'impôt de 50% des frais de garde pour les enfants de moins de 6 ans.",
        exemple: "Vous payez 500€/mois de crèche → Vous récupérez 1 750€ par an (plafond 3 500€ de dépenses).",
        type: "credit",
        tauxOuMontant: "50% des frais",
        plafond: "3 500€ de dépenses = 1 750€ max/enfant (2025)",
        inputType: "montant-mensuel",
        inputLabel: "Frais de crèche par mois",
        inputMax: 1000,
        inputSuffix: "€/mois",
        calcul: (mensuel) => Math.min(mensuel * 12, 3500) * 0.5,
      },
      {
        id: "assistante-maternelle",
        nom: "Assistante maternelle (nounou)",
        description: "Même avantage que la crèche : crédit d'impôt de 50%.",
        exemple: "Vous payez 400€/mois → Vous récupérez 1 750€ par an (plafond).",
        type: "credit",
        tauxOuMontant: "50% des frais",
        plafond: "3 500€ de dépenses = 1 750€ max/enfant (2025)",
        inputType: "montant-mensuel",
        inputLabel: "Frais nounou par mois",
        inputMax: 1000,
        inputSuffix: "€/mois",
        calcul: (mensuel) => Math.min(mensuel * 12, 3500) * 0.5,
      },
      {
        id: "scolarite-college",
        nom: "Enfant au collège",
        description: "Réduction d'impôt fixe par enfant scolarisé au collège.",
        exemple: "1 enfant au collège = 61€ de réduction (montant 2025).",
        type: "reduction",
        tauxOuMontant: "61€/enfant",
        inputType: "nombre",
        inputLabel: "Nombre d'enfants au collège",
        inputMax: 10,
        inputSuffix: "enfants",
        calcul: (nb) => nb * 61,
      },
      {
        id: "scolarite-lycee",
        nom: "Enfant au lycée",
        description: "Réduction d'impôt fixe par enfant scolarisé au lycée.",
        exemple: "1 enfant au lycée = 153€ de réduction (montant 2025).",
        type: "reduction",
        tauxOuMontant: "153€/enfant",
        inputType: "nombre",
        inputLabel: "Nombre d'enfants au lycée",
        inputMax: 10,
        inputSuffix: "enfants",
        calcul: (nb) => nb * 153,
      },
      {
        id: "scolarite-superieur",
        nom: "Enfant en études supérieures",
        description: "Réduction d'impôt fixe par enfant dans l'enseignement supérieur.",
        exemple: "1 enfant à l'université = 183€ de réduction (montant 2025).",
        type: "reduction",
        tauxOuMontant: "183€/enfant",
        inputType: "nombre",
        inputLabel: "Nombre d'enfants en études supérieures",
        inputMax: 10,
        inputSuffix: "enfants",
        calcul: (nb) => nb * 183,
      },
      {
        id: "parent-isole",
        nom: "Parent isolé (case T)",
        description: "Si vous élevez seul(e) vos enfants, vous bénéficiez d'une demi-part supplémentaire. Condition : vous devez vivre seul(e) et avoir au moins un enfant à charge.",
        exemple: "Parent isolé avec 1 enfant = 2 parts au lieu de 1.5. Avantage plafonné à 4 174€ (2025).",
        type: "reduction",
        tauxOuMontant: "+0.5 part (plafond 4 174€)",
        inputType: "boolean",
        inputLabel: "Êtes-vous parent isolé ?",
        calcul: (checked, salaire, tmi) => {
          // Plafond spécifique parent isolé 2025 : 4 174€ (revalorisé)
          // La demi-part supplémentaire s'ajoute aux parts enfants
          if (!checked) return 0;
          const revenuImposable = calculerRevenuNetImposable(salaire);
          // Calcul de l'avantage réel via quotient familial (1 part → 1.5 part)
          const impotSansDemiPart = calculerImpotBrut(revenuImposable, 1);
          const impotAvecDemiPart = calculerImpotBrut(revenuImposable, 1.5);
          const avantageBrut = impotSansDemiPart - impotAvecDemiPart;
          // Plafonnement spécifique parent isolé : 4 174€
          return Math.min(avantageBrut, 4174);
        },
      },
      {
        id: "pension-alimentaire",
        nom: "Pension alimentaire versée",
        description: "Les pensions versées à un ex-conjoint ou enfant majeur sont déductibles du revenu imposable.",
        exemple: "Vous versez 500€/mois à un enfant majeur → Plafond 6 858€/an déductibles (2025).",
        type: "deduction",
        tauxOuMontant: "Déduction du revenu",
        plafond: "6 858€/an max par enfant majeur (2025)",
        inputType: "montant-mensuel",
        inputLabel: "Pension versée par mois",
        inputMax: 1500,
        inputSuffix: "€/mois",
        calcul: (mensuel, salaire, tmi) => Math.min(mensuel * 12, 6858) * (tmi / 100),
      },
      {
        id: "handicap",
        nom: "Enfant ou proche handicapé à charge",
        description: "Personne titulaire de la carte mobilité inclusion (CMI) invalidité = demi-part supplémentaire par personne.",
        exemple: "1 personne handicapée à charge = demi-part supplémentaire, plafonnée à 1 802€.",
        type: "reduction",
        tauxOuMontant: "+0.5 part par personne",
        plafond: "1 802€ par demi-part (2025)",
        inputType: "nombre",
        inputLabel: "Nombre de personnes handicapées à charge",
        inputMax: 5,
        inputSuffix: "personnes",
        calcul: (nb, salaire, tmi) => {
          if (nb === 0) return 0;
          const revenuImposable = calculerRevenuNetImposable(salaire);
          // Calcul de l'avantage réel via quotient familial
          // Chaque personne handicapée = +0.5 part
          const impotSans = calculerImpotBrut(revenuImposable, 1);
          const impotAvec = calculerImpotBrut(revenuImposable, 1 + nb * 0.5);
          const avantageBrut = impotSans - impotAvec;
          // Plafonnement : 1 802€ par demi-part
          const plafond = 1802 * nb;
          return Math.min(avantageBrut, plafond);
        },
      },
      {
        id: "ehpad",
        nom: "Parent en maison de retraite",
        description: "Réduction d'impôt de 25% des frais liés à la dépendance (hébergement non inclus).",
        exemple: "Frais de dépendance 8 000€/an → Réduction 2 000€ (plafond 10 000€).",
        type: "reduction",
        tauxOuMontant: "25% des frais de dépendance",
        plafond: "10 000€ de dépenses = 2 500€ max (2025)",
        inputType: "montant",
        inputLabel: "Frais de dépendance EHPAD annuels",
        inputMax: 20000,
        inputSuffix: "€/an",
        calcul: (montant) => Math.min(montant, 10000) * 0.25,
      },
    ],
  },
  {
    id: "dons",
    nom: "Dons",
    icon: Heart,
    description: "Associations, Restos du Cœur...",
    reductions: [
      {
        id: "dons-75",
        nom: "Dons aux organismes d'aide (75%)",
        description: "Restos du Cœur, Secours Populaire, Croix-Rouge, Banques alimentaires... Réduction de 75%.",
        exemple: "Don de 500€ aux Restos du Cœur → Réduction 375€. Plafond 1 000€ de dons (2025).",
        type: "reduction",
        tauxOuMontant: "75% du don",
        plafond: "1 000€ de dons = 750€ max (2025)",
        inputType: "montant",
        inputLabel: "Montant total des dons 75%",
        inputMax: 2000,
        inputSuffix: "€/an",
        calcul: (montant) => Math.min(montant, 1000) * 0.75,
      },
      {
        id: "dons-66",
        nom: "Dons aux associations (66%)",
        description: "Associations d'intérêt général, fondations, partis politiques, syndicats, presse...",
        exemple: "Don de 200€ à une fondation → Réduction 132€. Plafond : 20% du revenu imposable.",
        type: "reduction",
        tauxOuMontant: "66% du don",
        plafond: "20% du revenu imposable",
        inputType: "montant",
        inputLabel: "Montant total des dons 66%",
        inputMax: 10000,
        inputSuffix: "€/an",
        calcul: (montant, salaire) => Math.min(montant, salaire * 0.2) * 0.66,
      },
    ],
  },
  {
    id: "domicile",
    nom: "Emploi à domicile",
    icon: Home,
    description: "Ménage, jardinage, cours...",
    reductions: [
      {
        id: "menage",
        nom: "Ménage / Aide ménagère",
        description: "Crédit d'impôt de 50% pour les services à la personne à domicile.",
        exemple: "Vous payez 200€/mois → Crédit 1 200€/an. Plafond global : 12 000€ de dépenses.",
        type: "credit",
        tauxOuMontant: "50% des dépenses",
        plafond: "12 000€ de dépenses = 6 000€ max/an (2025)",
        inputType: "montant-mensuel",
        inputLabel: "Frais ménage par mois",
        inputMax: 1500,
        inputSuffix: "€/mois",
        calcul: (mensuel) => Math.min(mensuel * 12, 12000) * 0.5,
      },
      {
        id: "jardinage",
        nom: "Jardinage",
        description: "Crédit d'impôt pour les petits travaux de jardinage à domicile.",
        exemple: "1 000€/an de jardinage → 500€ récupérés. Plafond spécifique : 5 000€/an.",
        type: "credit",
        tauxOuMontant: "50% des dépenses",
        plafond: "5 000€/an de dépenses = 2 500€ max",
        inputType: "montant",
        inputLabel: "Dépenses annuelles jardinage",
        inputMax: 5000,
        inputSuffix: "€/an",
        calcul: (montant) => Math.min(montant, 5000) * 0.5,
      },
      {
        id: "cours-particuliers",
        nom: "Cours particuliers / Soutien scolaire",
        description: "Crédit d'impôt pour les cours à domicile.",
        exemple: "Vous payez 200€/mois de cours → 1 200€ récupérés par an.",
        type: "credit",
        tauxOuMontant: "50% des dépenses",
        plafond: "Inclus dans le plafond global emploi domicile (12 000€)",
        inputType: "montant-mensuel",
        inputLabel: "Frais cours par mois",
        inputMax: 1000,
        inputSuffix: "€/mois",
        calcul: (mensuel) => Math.min(mensuel * 12, 12000) * 0.5,
      },
      {
        id: "bricolage",
        nom: "Petit bricolage",
        description: "Crédit d'impôt pour les petits travaux de bricolage (max 2h par intervention).",
        exemple: "500€/an de bricolage → 250€ récupérés.",
        type: "credit",
        tauxOuMontant: "50% des dépenses",
        plafond: "500€/an de dépenses = 250€ max",
        inputType: "montant",
        inputLabel: "Dépenses annuelles bricolage",
        inputMax: 500,
        inputSuffix: "€/an",
        calcul: (montant) => Math.min(montant, 500) * 0.5,
      },
      {
        id: "informatique",
        nom: "Assistance informatique",
        description: "Crédit d'impôt pour l'aide informatique à domicile.",
        exemple: "600€/an → 300€ récupérés. Plafond spécifique : 3 000€/an.",
        type: "credit",
        tauxOuMontant: "50% des dépenses",
        plafond: "3 000€/an de dépenses = 1 500€ max",
        inputType: "montant",
        inputLabel: "Dépenses annuelles informatique",
        inputMax: 3000,
        inputSuffix: "€/an",
        calcul: (montant) => Math.min(montant, 3000) * 0.5,
      },
      {
        id: "aide-proche-fragile",
        nom: "Aide pour un proche âgé ou handicapé",
        description: "Crédit d'impôt majoré si vous employez une aide pour une personne fragile. Plafond relevé à 20 000€.",
        exemple: "Vous payez 600€/mois d'aide → 3 600€ récupérés par an.",
        type: "credit",
        tauxOuMontant: "50% des dépenses",
        plafond: "20 000€ de dépenses = 10 000€ max/an",
        inputType: "montant-mensuel",
        inputLabel: "Frais aide par mois",
        inputMax: 2000,
        inputSuffix: "€/mois",
        calcul: (mensuel) => Math.min(mensuel * 12, 20000) * 0.5,
      },
    ],
  },
  {
    id: "travail",
    nom: "Frais professionnels",
    icon: Briefcase,
    description: "Trajets, repas, syndicat...",
    reductions: [
      {
        id: "frais-km",
        nom: "Frais kilométriques (frais réels)",
        description: "Barème 2025 selon la puissance fiscale. Intéressant si > 10% du salaire net.",
        exemple: "15 000 km/an en 5CV = 6 135€ déductibles. Comparez avec l'abattement 10%.",
        type: "deduction",
        tauxOuMontant: "Barème kilométrique 2025",
        inputType: "montant",
        inputLabel: "Km annuels domicile-travail",
        inputMax: 50000,
        inputSuffix: "km/an",
        calcul: (km, salaire, tmi) => {
          // Barème 2025 pour 5CV (le plus courant)
          // d ≤ 5 000 km : 0,636 × d
          // 5 000 < d ≤ 20 000 km : (0,357 × d) + 1 395
          // d > 20 000 km : 0,427 × d
          let frais;
          if (km <= 5000) {
            frais = km * 0.636;
          } else if (km <= 20000) {
            frais = (km * 0.357) + 1395;
          } else {
            frais = km * 0.427;
          }
          const abattement10 = Math.min(salaire * 0.1, ABATTEMENT_10_MAX); // Plafond abattement 10% : 14 422€ (2025)
          const gain = Math.max(0, frais - abattement10);
          return gain * (tmi / 100);
        },
      },
      {
        id: "syndicat",
        nom: "Cotisations syndicales",
        description: "Crédit d'impôt de 66% des cotisations versées à un syndicat de salariés.",
        exemple: "Cotisation de 150€/an → 99€ récupérés. Plafond : 1% du salaire.",
        type: "credit",
        tauxOuMontant: "66% des cotisations",
        plafond: "1% du salaire brut imposable",
        inputType: "montant",
        inputLabel: "Cotisations syndicales annuelles",
        inputMax: 1000,
        inputSuffix: "€/an",
        calcul: (montant, salaire) => Math.min(montant, salaire * 0.01) * 0.66,
      },
      {
        id: "repas",
        nom: "Frais de repas (frais réels uniquement)",
        description: "⚠️ UNIQUEMENT si vous optez pour les frais réels (au lieu de l'abattement 10%). Montant forfaitaire déductible = différence entre repas pris hors domicile et repas à domicile.",
        exemple: "220 jours × 5,45€ = 1 199€ déductibles → ~360€ d'économie (TMI 30%). Nécessite justificatifs.",
        type: "deduction",
        tauxOuMontant: "5,45€/jour (forfait URSSAF 2025)",
        plafond: "Inclus dans les frais réels - Justificatifs obligatoires",
        inputType: "nombre",
        inputLabel: "Jours de repas hors domicile (si frais réels)",
        inputMax: 250,
        inputSuffix: "jours",
        calcul: (jours, salaire, tmi) => {
          // ATTENTION : Ce calcul n'est valable QUE si l'utilisateur opte pour les frais réels
          // Sinon, l'abattement forfaitaire de 10% s'applique automatiquement
          return jours * 5.45 * (tmi / 100);
        },
        conditionsExclusion: [
          "❌ Vous gardez l'abattement forfaitaire de 10% (option par défaut)",
          "❌ Télétravail à domicile",
          "❌ Repas payé par l'employeur",
          "❌ Tickets restaurant (déduction limitée)",
          "❌ Cantine d'entreprise subventionnée",
          "❌ Vous mangez chez vous"
        ],
      },
      {
        id: "teletravail",
        nom: "Télétravail (allocation employeur)",
        description: "⚠️ INFO : L'allocation télétravail (2,70€/jour) est une EXONÉRATION versée par l'employeur, pas une déduction fiscale directe. Si vous optez pour les frais réels, vous pouvez déduire vos frais réels de télétravail (électricité, internet, etc.) avec justificatifs.",
        exemple: "Si votre employeur vous verse une allocation télétravail, elle est exonérée jusqu'à 626,40€/an. Sinon, frais réels possibles.",
        type: "deduction",
        tauxOuMontant: "2,70€/jour exonérés (employeur)",
        plafond: "626,40€/an max (si versé par employeur)",
        inputType: "nombre",
        inputLabel: "Jours de télétravail (frais réels uniquement)",
        inputMax: 250,
        inputSuffix: "jours",
        calcul: (jours, salaire, tmi) => {
          // ATTENTION : Ceci est une estimation basée sur l'allocation forfaitaire
          // En réalité, l'employeur verse cette allocation (exonérée)
          // Le salarié peut déduire ses frais RÉELS s'il opte pour cette option
          return Math.min(jours * 2.70, 626.40) * (tmi / 100);
        },
      },
      {
        id: "formation",
        nom: "Formation personnelle",
        description: "Frais de formation professionnelle payés de votre poche : déductibles en frais réels.",
        exemple: "Formation à 2 000€ = 600€ d'économie (TMI 30%).",
        type: "deduction",
        tauxOuMontant: "Déduction du revenu imposable",
        inputType: "montant",
        inputLabel: "Frais de formation payés",
        inputMax: 10000,
        inputSuffix: "€/an",
        calcul: (montant, salaire, tmi) => montant * (tmi / 100),
      },
      {
        id: "double-residence",
        nom: "Double résidence",
        description: "Frais déductibles si votre travail vous oblige à loger loin de votre famille (mutation, emploi...).",
        exemple: "Loyer 600€/mois → 7 200€ déductibles = 2 160€ d'économie (TMI 30%).",
        type: "deduction",
        tauxOuMontant: "Loyer + charges déductibles",
        inputType: "montant-mensuel",
        inputLabel: "Loyer + charges par mois",
        inputMax: 2000,
        inputSuffix: "€/mois",
        calcul: (mensuel, salaire, tmi) => mensuel * 12 * (tmi / 100),
      },
    ],
  },
  {
    id: "retraite",
    nom: "Épargne retraite",
    icon: PiggyBank,
    description: "PER, versements déductibles",
    reductions: [
      {
        id: "per",
        nom: "Versements PER",
        description: "Versements déductibles du revenu imposable. Plafond : 10% des revenus N-1 (max 37 680€). PASS 2025 = 47 100€.",
        exemple: "Vous versez 300€/mois → 3 600€ déductibles = 1 080€ d'économie (TMI 30%). C'est le levier d'optimisation le plus puissant !",
        type: "deduction",
        tauxOuMontant: "Déduction du revenu imposable",
        plafond: "10% des revenus (min 4 710€, max 37 680€/an en 2025)",
        inputType: "montant-mensuel",
        inputLabel: "Versements PER par mois",
        inputMax: 3500,
        inputSuffix: "€/mois",
        calcul: (mensuel, salaire, tmi) => {
          const annuel = mensuel * 12;
          // PASS 2025 = 47 100€
          // Plafond minimum : 10% du PASS = 4 710€
          // Plafond maximum : 10% de 8 PASS = 37 680€
          const plafondMin = 4710;
          const plafondMax = 37680;
          const plafond = Math.max(plafondMin, Math.min(salaire * 0.1, plafondMax));
          return Math.min(annuel, plafond) * (tmi / 100);
        },
      },
    ],
  },
  {
    id: "logement",
    nom: "Logement",
    icon: Building2,
    description: "Bornes électriques, travaux...",
    reductions: [
      {
        id: "borne-electrique",
        nom: "Borne de recharge électrique",
        description: "Crédit d'impôt pour l'installation d'une borne de recharge à domicile (résidence principale ou secondaire).",
        exemple: "Installation de 1 500€ → 500€ récupérés (plafonné).",
        type: "credit",
        tauxOuMontant: "75% des dépenses, max 500€/borne",
        plafond: "500€/borne, 1 borne par personne du foyer (2025)",
        inputType: "nombre",
        inputLabel: "Nombre de bornes installées",
        inputMax: 2,
        inputSuffix: "bornes",
        calcul: (nb) => nb * 500,
      },
    ],
  },
  {
    id: "investissements",
    nom: "Investissements",
    icon: TrendingUp,
    description: "PME, FIP, FCPI...",
    reductions: [
      {
        id: "pme",
        nom: "Investissement PME",
        description: "Réduction d'impôt pour souscription au capital de PME (IR-PME).",
        exemple: "Investissement de 10 000€ → 1 800€ de réduction (taux 18% en 2025).",
        type: "reduction",
        tauxOuMontant: "18% (taux normal 2025)",
        plafond: "50 000€ célibataire / 100 000€ couple",
        inputType: "montant",
        inputLabel: "Montant investi en PME",
        inputMax: 50000,
        inputSuffix: "€/an",
        calcul: (montant) => Math.min(montant, 50000) * 0.18,
      },
      {
        id: "fip-fcpi",
        nom: "FIP / FCPI",
        description: "Réduction d'impôt pour investissement dans des fonds d'innovation (FCPI) ou de proximité (FIP).",
        exemple: "5 000€ en FCPI → 900€ de réduction (taux 18%).",
        type: "reduction",
        tauxOuMontant: "18% (2025)",
        plafond: "12 000€ célibataire / 24 000€ couple",
        inputType: "montant",
        inputLabel: "Montant investi en FIP/FCPI",
        inputMax: 12000,
        inputSuffix: "€/an",
        calcul: (montant) => Math.min(montant, 12000) * 0.18,
      },
    ],
  },
  {
    id: "hebergement",
    nom: "Hébergement",
    icon: UserPlus,
    description: "Accueil de proches",
    reductions: [
      {
        id: "hebergement-ascendant",
        nom: "Hébergement d'un parent âgé",
        description: "Déduction forfaitaire pour l'accueil d'un ascendant (parent, grand-parent) de plus de 75 ans, sans ressources suffisantes, vivant sous votre toit.",
        exemple: "1 parent hébergé = 4 080€ déductibles du revenu imposable (2025).",
        type: "deduction",
        tauxOuMontant: "Forfait 4 080€/personne/an",
        plafond: "4 080€ par ascendant hébergé (2025)",
        inputType: "nombre",
        inputLabel: "Nombre de parents/grands-parents hébergés",
        inputMax: 4,
        inputSuffix: "personnes",
        calcul: (nb, salaire, tmi) => nb * 4080 * (tmi / 100),
      },
    ],
  },
];

// ============================================================
// COMPOSANT INFOBULLE
// ============================================================

function Tooltip({ children, content }: { children: React.ReactNode; content: string }) {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        className="ml-1 text-slate hover:text-primary-600 transition-colors"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
      >
        {children}
      </button>
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-charcoal text-white text-xs z-50">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-charcoal" />
        </div>
      )}
    </span>
  );
}

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function EspaceSalariePage() {
  // Mode de saisie du salaire
  const [modeSalaire, setModeSalaire] = useState<"net-annuel" | "net-mensuel" | "brut-annuel">("net-mensuel");
  const [secteur, setSecteur] = useState<"prive" | "public">("prive");
  const [salaireBrutAnnuel, setSalaireBrutAnnuel] = useState(38000);
  const [salaireNetMensuel, setSalaireNetMensuel] = useState(2500);
  const [salaireNetAnnuelDirect, setSalaireNetAnnuelDirect] = useState(30000);
  
  const [valeurs, setValeurs] = useState<Record<string, number>>({});
  const [categorieActive, setCategorieActive] = useState<string | null>("famille");
  const [showBandeau, setShowBandeau] = useState(true);

  // Calcul du salaire net annuel selon le mode
  const calculerSalaireNetAnnuel = (): number => {
    if (modeSalaire === "net-annuel") {
      return salaireNetAnnuelDirect;
    }
    if (modeSalaire === "net-mensuel") {
      return salaireNetMensuel * 12;
    }
    if (modeSalaire === "brut-annuel") {
      // Conversion brut → net selon secteur
      // Privé : environ 23% de charges
      // Public : environ 17% de charges
      const tauxCharges = secteur === "prive" ? 0.23 : 0.17;
      return Math.round(salaireBrutAnnuel * (1 - tauxCharges));
    }
    return 30000;
  };

  const salaireNet = calculerSalaireNetAnnuel();
  
  // Revenu net imposable (avec conversion net à payer → net imposable)
  const revenuNetImposable = calculerRevenuNetImposable(salaireNet);

  // Calcul du TMI (Taux Marginal d'Imposition) - Barème 2025
  const calculerTMI = (revenuImposable: number): number => {
    // Le quotient familial divise le revenu par le nombre de parts
    // Pour le TMI, on prend le revenu imposable directement (1 part pour célibataire)
    if (revenuImposable <= 11520) return 0;
    if (revenuImposable <= 29373) return 11;
    if (revenuImposable <= 84000) return 30;
    if (revenuImposable <= 180648) return 41;
    return 45;
  };

  const tmi = calculerTMI(revenuNetImposable);

  // Calcul de l'impôt de base avec DÉCOTE (simplifié, célibataire)
  const calculerImpotBaseAvecDecote = (revenuImposable: number): number => {
    // Étape 1 : Calcul de l'impôt brut (barème 2025)
    const impotBrut = calculerImpotBrut(revenuImposable, 1); // 1 part pour célibataire
    
    // Étape 2 : Application de la DÉCOTE (mécanisme crucial pour les foyers modestes)
    const decote = calculerDecote(impotBrut, false); // false = célibataire
    
    // Étape 3 : Impôt après décote
    return Math.max(0, impotBrut - decote);
  };

  const impotBase = calculerImpotBaseAvecDecote(revenuNetImposable);

  // Calcul du total des économies (Réductions vs Crédits)
  const calculerEconomies = () => {
    let reductions = 0;
    let credits = 0;
    
    categories.forEach((cat) => {
      cat.reductions.forEach((red) => {
        const valeur = valeurs[red.id] || 0;
        if (valeur > 0) {
          const montant = red.calcul(valeur, salaireNet, tmi);
          if (red.type === "credit") {
            credits += montant;
          } else {
            // Réductions et déductions (gain fiscal)
            // Les réductions s'imputent sur l'impôt jusqu'à 0€
            reductions += montant;
          }
        }
      });
    });
    return { reductions: Math.round(reductions), credits: Math.round(credits) };
  };

  const { reductions, credits } = calculerEconomies();
  const economiesTotal = reductions + credits;
  
  // Logique fiscale précise :
  // 1. On applique les réductions sur l'impôt brut (plafonné à 0)
  const impotApresReductions = Math.max(0, impotBase - reductions);
  
  // 2. On applique les crédits sur le reste (peut être négatif = remboursement)
  const impotFinal = impotApresReductions - credits;

  // Catégorie sélectionnée
  const catSelectionnee = categories.find((c) => c.id === categorieActive);

  // Économie par catégorie
  const getEcoCategorie = (cat: Categorie) => {
    return Math.round(cat.reductions.reduce((sum, red) => {
      const val = valeurs[red.id] || 0;
      return sum + (val > 0 ? red.calcul(val, salaireNet, tmi) : 0);
    }, 0));
  };

  // Mise à jour d'une valeur
  const updateValeur = (id: string, valeur: number) => {
    setValeurs((prev) => ({ ...prev, [id]: valeur }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Espace Salarié</h1>
        <p className="text-slate mt-1">
          Découvrez toutes les façons de réduire vos impôts, simplement
        </p>
      </div>

      {/* Bandeau explicatif - déroulant */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg overflow-hidden">
        <button
          onClick={() => setShowBandeau(!showBandeau)}
          className="w-full p-4 flex items-center gap-3 text-left hover:bg-blue-100/50 transition-colors"
        >
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
          <p className="font-medium text-blue-700 flex-1">Comment ça marche ?</p>
          {showBandeau ? (
            <ChevronUp size={20} className="text-blue-500" />
          ) : (
            <ChevronDown size={20} className="text-blue-500" />
          )}
        </button>
        {showBandeau && (
          <div className="px-4 pb-4 pl-12 text-sm text-blue-700">
            <p>
              1. Entrez votre salaire ci-dessous (on calcule le reste)<br />
              2. Remplissez ce qui vous concerne (par mois, c'est plus simple)<br />
              3. Voyez votre économie en temps réel en haut de page
            </p>
          </div>
        )}
      </div>

      {/* Bloc saisie salaire */}
      <div className="bg-white border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-charcoal text-center">Votre salaire</h2>
        
        {/* Champ salaire net mensuel + affichage annuel */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-center gap-4 md:gap-8">
          <div className="w-full md:w-auto">
            <label className="text-sm text-slate block mb-1">
              Salaire net mensuel (avant impôt)
              <Tooltip content="Ce que vous recevez chaque mois sur votre compte, avant le prélèvement de l'impôt à la source. Regardez votre fiche de paie ou votre dernier virement.">
                <HelpCircle size={14} />
              </Tooltip>
            </label>
            <div className="flex items-center">
              <input
                type="number"
                value={salaireNetMensuel}
                onChange={(e) => setSalaireNetMensuel(Number(e.target.value))}
                className="w-[90%] md:w-48 md:flex-none p-3 border border-gray-200 focus:border-primary-500 focus:outline-none text-lg font-medium"
                placeholder="2500"
              />
              <span className="text-slate ml-2 flex-shrink-0">€/mois</span>
            </div>
          </div>
          
          {/* Salaire net annuel */}
          <div className="w-full md:w-auto">
            <p className="text-xs text-slate mb-1">Salaire net annuel</p>
            <div className="px-6 py-3 border border-gray-200 bg-gray-50 rounded md:min-w-[180px]">
              <p className="text-xl font-bold text-charcoal">{(salaireNetMensuel * 12).toLocaleString()}€</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bloc récapitulatif sticky */}
      <div className="sticky top-0 z-20 bg-white border border-gray-100">
        {/* Ligne 1 : 2 colonnes sur mobile et PC */}
        <div className="grid grid-cols-2 gap-2 md:gap-6 p-4">
          <div className="text-center">
            <p className="text-[10px] md:text-xs text-slate mb-1">
              <span className="hidden md:inline">Impôt </span>Avant optimisation
            </p>
            <p className="text-sm md:text-xl font-bold text-charcoal">{impotBase.toLocaleString()}€</p>
            <p className="text-[10px] md:text-xs text-slate">TMI : {tmi}%</p>
          </div>

          <div className={`text-center p-1 md:p-2 rounded-lg ${impotFinal < 0 ? "bg-primary-50 border border-primary-100" : "bg-green-50"}`}>
            <p className={`text-[10px] md:text-xs mb-1 ${impotFinal < 0 ? "text-primary-700 font-semibold" : "text-green-700"}`}>
              {impotFinal < 0 ? "Virement de l'État" : <><span className="hidden md:inline">Impôt </span>Après optimisation</>}
            </p>
            <p className={`text-sm md:text-2xl font-bold ${impotFinal < 0 ? "text-primary-600" : "text-green-600"}`}>
              {impotFinal < 0 ? "+" : ""}{Math.abs(impotFinal).toLocaleString()}€
            </p>
            {economiesTotal > 0 && impotBase > 0 && (
              <p className={`text-[10px] md:text-xs hidden md:block ${impotFinal < 0 ? "text-primary-600" : "text-green-600"}`}>
                {impotFinal < 0 ? "Vous gagnez de l'argent !" : `Soit ${Math.round((economiesTotal / impotBase) * 100)}% d'économie`}
              </p>
            )}
            {credits > 0 && (
              <p className="text-[10px] md:text-xs text-slate mt-1 border-t border-slate/10 pt-1">
                Dont avance janvier : {Math.round(credits * 0.6).toLocaleString()}€
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bouton Vos Gains - Fixed en haut pour PC */}
      <div className="hidden lg:flex fixed top-4 left-1/2 transform -translate-x-1/2 z-40 ml-36">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border border-amber-200/60 shadow-lg">
          <span className="text-xs uppercase tracking-wider text-amber-700/80 font-medium">Vos Gains</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            +{economiesTotal.toLocaleString()}€
          </span>
          {economiesTotal > 0 && (
            <span className="text-xs text-amber-600 bg-amber-100/50 px-2 py-0.5 rounded-full">
              💰 par an
            </span>
          )}
        </div>
      </div>

      {/* Titre accrocheur */}
      <div className="text-center py-6">
        <h2 className="text-xl lg:text-2xl font-bold text-charcoal mb-2">
          🎯 Cochez ce qui vous concerne, on s'occupe du reste
        </h2>
        <p className="text-slate text-sm lg:text-base max-w-xl mx-auto">
          Chaque case cochée = des euros en moins sur votre déclaration
        </p>
      </div>

      {/* Layout 2 colonnes - Catégories et Détails */}
      {/* Version PC : 2 colonnes */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-6">
        
        {/* Colonne gauche - Liste des catégories */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-sm font-medium text-slate mb-3">Catégories</h3>
          {categories.map((cat) => {
            const eco = getEcoCategorie(cat);
            const isActive = categorieActive === cat.id;
            const IconComponent = cat.icon;

            return (
              <button
                key={cat.id}
                onClick={() => setCategorieActive(cat.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                  isActive 
                    ? "bg-primary-50 border-l-4 border-l-primary-500" 
                    : "bg-white border border-gray-100 hover:bg-gray-50"
                }`}
              >
                <IconComponent 
                  size={20} 
                  className={isActive ? "text-primary-600" : "text-slate"}
                  strokeWidth={1.5}
                />
                
                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${isActive ? "text-primary-700" : "text-charcoal"}`}>
                    {cat.nom}
                  </p>
                  <p className="text-xs text-slate truncate">
                    {cat.description}
                  </p>
                </div>

                {eco > 0 && (
                  <span className="text-xs font-semibold text-primary-600 bg-primary-100 px-2 py-1 rounded">
                    -{eco}€
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Colonne droite - Détails de la catégorie */}
        <div className="lg:col-span-8">
          {catSelectionnee ? (
            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gray-50 border-b border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  {(() => {
                    const IconComponent = catSelectionnee.icon;
                    return <IconComponent size={24} className="text-primary-600" strokeWidth={1.5} />;
                  })()}
                  <div>
                    <h2 className="font-bold text-lg text-charcoal">{catSelectionnee.nom}</h2>
                    <p className="text-sm text-slate">{catSelectionnee.description}</p>
                  </div>
                </div>
              </div>

              {/* Liste des réductions avec checkboxes */}
              <div className="divide-y divide-gray-100">
                {catSelectionnee.reductions.map((red) => {
                  const valeur = valeurs[red.id] || 0;
                  const economie = valeur > 0 ? red.calcul(valeur, salaireNet, tmi) : 0;
                  const isChecked = valeur > 0;

                  return (
                    <div
                      key={red.id}
                      className={`p-4 transition-all ${isChecked ? "bg-primary-50/50" : "hover:bg-gray-50"}`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Checkbox visuelle */}
                        <div 
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            isChecked 
                              ? "bg-primary-500 border-primary-500" 
                              : "border-gray-300"
                          }`}
                        >
                          {isChecked && <Check size={14} className="text-white" />}
                        </div>

                        {/* Contenu */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <p className={`font-medium ${isChecked ? "text-primary-700" : "text-charcoal"}`}>
                              {red.nom}
                            </p>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              red.type === "credit"
                                ? "bg-green-100 text-green-700"
                                : red.type === "deduction"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-amber-100 text-amber-700"
                            }`}>
                              {red.type === "credit" ? "Crédit" : red.type === "deduction" ? "Déduction" : "Réduction"}
                            </span>
                            <Tooltip content={red.exemple}>
                              <HelpCircle size={14} />
                            </Tooltip>
                          </div>
                          
                          <p className="text-sm text-slate mb-2">{red.description}</p>
                          
                          {/* Conditions d'exclusion */}
                          {red.conditionsExclusion && red.conditionsExclusion.length > 0 && (
                            <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-3">
                              <p className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
                                <X size={14} />
                                Cas où ce n'est PAS déductible
                              </p>
                              <ul className="space-y-1">
                                {red.conditionsExclusion.map((condition, idx) => (
                                  <li key={idx} className="text-xs text-red-600 flex items-center gap-2">
                                    <span className="text-red-400">•</span>
                                    {condition}
                                    <X size={12} className="text-red-400" />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <p className="text-xs text-slate mb-3">
                            {red.tauxOuMontant}
                            {red.plafond && <span className="text-slate/70"> • Max: {red.plafond}</span>}
                          </p>

                          {/* Input selon le type */}
                          <div className="flex items-center gap-3 flex-wrap">
                            {red.inputType === "boolean" ? (
                              <button
                                onClick={() => updateValeur(red.id, valeur === 1 ? 0 : 1)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  valeur === 1
                                    ? "bg-primary-500 text-white"
                                    : "bg-gray-100 text-slate hover:bg-gray-200"
                                }`}
                              >
                                {valeur === 1 ? "✓ Oui, ça me concerne" : "Non"}
                              </button>
                            ) : red.inputType === "nombre" ? (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                  <button
                                    onClick={() => updateValeur(red.id, Math.max(0, valeur - 1))}
                                    className="w-8 h-8 rounded flex items-center justify-center hover:bg-gray-200 font-bold text-lg"
                                  >
                                    −
                                  </button>
                                  <span className="w-10 text-center font-semibold">{valeur}</span>
                                  <button
                                    onClick={() => updateValeur(red.id, Math.min(red.inputMax || 10, valeur + 1))}
                                    className="w-8 h-8 rounded flex items-center justify-center hover:bg-gray-200 font-bold text-lg"
                                  >
                                    +
                                  </button>
                                </div>
                                {red.inputSuffix && (
                                  <span className="text-slate text-sm">{red.inputSuffix}</span>
                                )}
                              </div>
                            ) : red.inputType === "montant-mensuel" ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  value={valeur || ""}
                                  onChange={(e) => updateValeur(red.id, Number(e.target.value))}
                                  placeholder="0"
                                  className="w-24 p-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none text-right"
                                />
                                <span className="text-slate text-sm">{red.inputSuffix || "€/mois"}</span>
                                {valeur > 0 && (
                                  <span className="text-xs text-slate bg-gray-100 px-2 py-1 rounded">
                                    = {(valeur * 12).toLocaleString()}€/an
                                  </span>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  value={valeur || ""}
                                  onChange={(e) => updateValeur(red.id, Number(e.target.value))}
                                  placeholder="0"
                                  className="w-24 p-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none text-right"
                                />
                                <span className="text-slate text-sm">{red.inputSuffix || "€"}</span>
                              </div>
                            )}

                            {/* Économie */}
                            {economie > 0 && (
                              <span className="text-primary-600 font-bold bg-primary-100 px-3 py-1 rounded-lg">
                                Économie: -{Math.round(economie).toLocaleString()}€
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Info size={32} className="text-gray-400 mx-auto mb-3" />
              <p className="font-medium text-charcoal mb-1">Sélectionnez une catégorie</p>
              <p className="text-sm text-slate">Cliquez sur une catégorie à gauche pour voir les options disponibles</p>
            </div>
          )}
        </div>
      </div>

      {/* Version Mobile : Accordéon */}
      <div className="lg:hidden space-y-3">
        <h3 className="text-sm font-medium text-slate mb-3">Catégories</h3>
        {categories.map((cat) => {
          const eco = getEcoCategorie(cat);
          const isActive = categorieActive === cat.id;
          const IconComponent = cat.icon;

          return (
            <div key={cat.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden">
              {/* Header de la catégorie - cliquable */}
              <button
                onClick={() => setCategorieActive(isActive ? null : cat.id)}
                className={`w-full flex items-center gap-3 p-4 text-left transition-all ${
                  isActive ? "bg-primary-50" : "hover:bg-gray-50"
                }`}
              >
                <IconComponent 
                  size={20} 
                  className={isActive ? "text-primary-600" : "text-slate"}
                  strokeWidth={1.5}
                />
                
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${isActive ? "text-primary-700" : "text-charcoal"}`}>
                    {cat.nom}
                  </p>
                  <p className="text-xs text-slate">
                    {cat.description}
                  </p>
                </div>

                {eco > 0 && (
                  <span className="text-xs font-semibold text-primary-600 bg-primary-100 px-2 py-1 rounded">
                    -{eco}€
                  </span>
                )}

                {isActive ? (
                  <ChevronUp size={20} className="text-primary-500" />
                ) : (
                  <ChevronDown size={20} className="text-slate" />
                )}
              </button>

              {/* Contenu dépliable */}
              {isActive && (
                <div className="border-t border-gray-100 divide-y divide-gray-100">
                  {cat.reductions.map((red) => {
                    const valeur = valeurs[red.id] || 0;
                    const economie = valeur > 0 ? red.calcul(valeur, salaireNet, tmi) : 0;
                    const isChecked = valeur > 0;

                    return (
                      <div
                        key={red.id}
                        className={`p-4 transition-all ${isChecked ? "bg-primary-50/50" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Checkbox visuelle */}
                          <div 
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                              isChecked 
                                ? "bg-primary-500 border-primary-500" 
                                : "border-gray-300"
                            }`}
                          >
                            {isChecked && <Check size={14} className="text-white" />}
                          </div>

                          {/* Contenu */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <p className={`font-medium ${isChecked ? "text-primary-700" : "text-charcoal"}`}>
                                {red.nom}
                              </p>
                              <span className={`text-xs px-1.5 py-0.5 rounded ${
                                red.type === "credit"
                                  ? "bg-green-100 text-green-700"
                                  : red.type === "deduction"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}>
                                {red.type === "credit" ? "Crédit" : red.type === "deduction" ? "Déduction" : "Réduction"}
                              </span>
                            </div>
                            
                            <p className="text-sm text-slate mb-2">{red.description}</p>
                            
                            <p className="text-xs text-slate mb-3">
                              {red.tauxOuMontant}
                            </p>

                            {/* Input selon le type */}
                            <div className="flex items-center gap-3 flex-wrap">
                              {red.inputType === "boolean" ? (
                                <button
                                  onClick={() => updateValeur(red.id, valeur === 1 ? 0 : 1)}
                                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    valeur === 1
                                      ? "bg-primary-500 text-white"
                                      : "bg-gray-100 text-slate hover:bg-gray-200"
                                  }`}
                                >
                                  {valeur === 1 ? "✓ Oui" : "Non"}
                                </button>
                              ) : red.inputType === "nombre" ? (
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                    <button
                                      onClick={() => updateValeur(red.id, Math.max(0, valeur - 1))}
                                      className="w-8 h-8 rounded flex items-center justify-center hover:bg-gray-200 font-bold text-lg"
                                    >
                                      −
                                    </button>
                                    <span className="w-8 text-center font-semibold">{valeur}</span>
                                    <button
                                      onClick={() => updateValeur(red.id, Math.min(red.inputMax || 10, valeur + 1))}
                                      className="w-8 h-8 rounded flex items-center justify-center hover:bg-gray-200 font-bold text-lg"
                                    >
                                      +
                                    </button>
                                  </div>
                                  {red.inputSuffix && (
                                    <span className="text-slate text-sm">{red.inputSuffix}</span>
                                  )}
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    value={valeur || ""}
                                    onChange={(e) => updateValeur(red.id, Number(e.target.value))}
                                    placeholder="0"
                                    className="w-20 p-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none text-right"
                                  />
                                  <span className="text-slate text-sm">{red.inputSuffix || "€"}</span>
                                </div>
                              )}

                              {/* Économie */}
                              {economie > 0 && (
                                <span className="text-primary-600 font-bold bg-primary-100 px-2 py-1 rounded-lg text-sm">
                                  -{Math.round(economie)}€
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Rappel des erreurs fréquentes */}
      <div className="bg-amber-50 border border-amber-100 p-6 rounded-lg">
        <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
          <Gift size={20} />
          Les 5 oublis les plus fréquents
        </h3>
        <ul className="space-y-2 text-sm text-amber-700">
          <li className="flex items-start gap-2">
            <Check size={16} className="flex-shrink-0 mt-0.5" />
            <span><strong>Frais de garde</strong> : beaucoup oublient de déclarer crèche ou nounou</span>
          </li>
          <li className="flex items-start gap-2">
            <Check size={16} className="flex-shrink-0 mt-0.5" />
            <span><strong>Case T (parent isolé)</strong> : si vous élevez seul(e) vos enfants</span>
          </li>
          <li className="flex items-start gap-2">
            <Check size={16} className="flex-shrink-0 mt-0.5" />
            <span><strong>Petits dons</strong> : même 20€ aux Restos du Cœur compte !</span>
          </li>
          <li className="flex items-start gap-2">
            <Check size={16} className="flex-shrink-0 mt-0.5" />
            <span><strong>Frais de scolarité</strong> : 183€ par enfant en études supérieures</span>
          </li>
          <li className="flex items-start gap-2">
            <Check size={16} className="flex-shrink-0 mt-0.5" />
            <span><strong>Cotisations syndicales</strong> : 66% récupérés en crédit d'impôt</span>
          </li>
        </ul>
      </div>

      {/* Badge Économies fixé en bas - Mobile uniquement */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/60 shadow-lg shadow-amber-100/50 pointer-events-auto">
          <span className="text-[10px] uppercase tracking-wider text-amber-700/80 font-medium">Économies</span>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
            -{economiesTotal.toLocaleString()}€
          </span>
        </div>
      </div>
    </div>
  );
}
