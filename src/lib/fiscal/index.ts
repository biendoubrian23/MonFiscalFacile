/**
 * MonFiscalFacile - Module Fiscal
 * Export centralisé de tous les outils fiscaux
 */

// Types
export * from './types';

// Règles fiscales par pays
export { reglesFiscalesFrance2024, depensesTypesFreelance, seuilsAlerte, reglesDecision } from './regles-france';

// Calculateur
export {
  calculerPartsFiscales,
  calculerIR,
  calculerCotisationsMicro,
  calculerBaseImposableMicro,
  calculerCreditsImpotFamille,
  calculerFraisKilometriques,
  calculerSituationActuelle,
  simulerRegimeReel,
  comparerRegimes,
} from './calculateur';

// Optimiseur
export { genererDiagnostic } from './optimiseur';
