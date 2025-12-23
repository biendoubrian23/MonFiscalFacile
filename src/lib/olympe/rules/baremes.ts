/**
 * OLYMPE - Barèmes fiscaux 2024-2025
 * 
 * Toutes les données officielles centralisées
 */

// ============================================================
// TRANCHES D'IMPÔT SUR LE REVENU 2024 (revenus 2023)
// ============================================================

export const TRANCHES_IR_2024 = [
  { min: 0, max: 11294, taux: 0 },
  { min: 11294, max: 28797, taux: 0.11 },
  { min: 28797, max: 82341, taux: 0.30 },
  { min: 82341, max: 177106, taux: 0.41 },
  { min: 177106, max: Infinity, taux: 0.45 },
];

// Tranches 2025 (revenus 2024) - à mettre à jour
export const TRANCHES_IR_2025 = [
  { min: 0, max: 11520, taux: 0 },
  { min: 11520, max: 29373, taux: 0.11 },
  { min: 29373, max: 83988, taux: 0.30 },
  { min: 83988, max: 180648, taux: 0.41 },
  { min: 180648, max: Infinity, taux: 0.45 },
];

// ============================================================
// DÉCOTE
// ============================================================

export const DECOTE = {
  seuilCelibataire: 1929,
  seuilCouple: 3191,
  tauxDecote: 0.4525,
  plafondCelibataire: 873,
  plafondCouple: 1444,
};

// ============================================================
// ABATTEMENTS
// ============================================================

export const ABATTEMENTS = {
  fraisPro10: {
    taux: 0.10,
    minimum: 495,
    maximum: 14171,
  },
  microBIC: {
    vente: 0.71,
    service: 0.50,
  },
  microBNC: 0.34,
};

// ============================================================
// COTISATIONS SOCIALES AUTO-ENTREPRENEUR
// ============================================================

export const TAUX_AE = {
  venteMarchandises: 0.123,
  prestationServiceBIC: 0.211,
  prestationServiceBNC: 0.211,
  professionLiberale: 0.211,
  locationMeublee: 0.06, // Approximatif
};

// Taux avec ACRE (50% première année)
export const TAUX_AE_ACRE = {
  venteMarchandises: 0.0615,
  prestationServiceBIC: 0.1055,
  prestationServiceBNC: 0.1055,
  professionLiberale: 0.1055,
};

// ============================================================
// PLAFONDS MICRO-ENTREPRISE 2024
// ============================================================

export const PLAFONDS_MICRO = {
  venteMarchandises: 188700,
  prestationService: 77700,
  professionLiberale: 77700,
};

// ============================================================
// TVA
// ============================================================

export const SEUILS_TVA = {
  vente: {
    franchise: 91900,
    majoree: 101000,
  },
  service: {
    franchise: 36800,
    majoree: 39100,
  },
};

// ============================================================
// BARÈME KILOMÉTRIQUE 2024
// ============================================================

export const BAREME_KM_2024 = {
  auto: {
    '3CV': { jusqu5000: 0.529, de5001a20000: { base: 0.316, fixe: 1065 }, plus20000: 0.370 },
    '4CV': { jusqu5000: 0.606, de5001a20000: { base: 0.340, fixe: 1330 }, plus20000: 0.407 },
    '5CV': { jusqu5000: 0.636, de5001a20000: { base: 0.357, fixe: 1395 }, plus20000: 0.427 },
    '6CV': { jusqu5000: 0.665, de5001a20000: { base: 0.374, fixe: 1457 }, plus20000: 0.447 },
    '7CV+': { jusqu5000: 0.697, de5001a20000: { base: 0.394, fixe: 1515 }, plus20000: 0.470 },
  },
  moto: {
    '1-2CV': { jusqu3000: 0.395, de3001a6000: { base: 0.099, fixe: 891 }, plus6000: 0.248 },
    '3-5CV': { jusqu3000: 0.468, de3001a6000: { base: 0.082, fixe: 1158 }, plus6000: 0.275 },
    '5CV+': { jusqu3000: 0.606, de3001a6000: { base: 0.079, fixe: 1583 }, plus6000: 0.343 },
  },
};

// ============================================================
// FLAT TAX
// ============================================================

export const FLAT_TAX = {
  taux: 0.30,
  composantes: {
    prelevementsForfaitaires: 0.128,
    prelevementsSociaux: 0.172,
  },
};

// ============================================================
// CSG / CRDS
// ============================================================

export const CSG_CRDS = {
  tauxGlobal: 0.172,
  csgDeductible: 0.068,
  csgNonDeductible: 0.024,
  crds: 0.005,
  prelevementSolidarite: 0.075,
};

// ============================================================
// PER (Plan Épargne Retraite)
// ============================================================

export const PLAFONDS_PER = {
  tauxRevenu: 0.10,
  minimum: 4399, // 2024
  maximum: 35194, // 2024
};

// ============================================================
// REDUCTION DONS
// ============================================================

export const REDUCTION_DONS = {
  tauxClassique: 0.66,
  tauxAidePauvrete: 0.75,
  plafondAidePauvrete: 1000,
  plafondPourcentage: 0.20, // 20% du revenu imposable
};
