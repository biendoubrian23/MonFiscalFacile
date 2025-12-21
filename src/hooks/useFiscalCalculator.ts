/**
 * Hook personnalisé pour le calcul fiscal
 * Utilise l'algorithme d'optimisation
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  ProfilUtilisateur,
  ProfilPersonnel,
  ProfilProfessionnel,
  ProfilFinancier,
  ProfilFiscal,
  DiagnosticFiscal,
  DepensesProfessionnelles,
} from '@/lib/fiscal/types';
import { genererDiagnostic } from '@/lib/fiscal/optimiseur';

// Profil par défaut (simplifié pour l'onboarding)
const depensesDefaut: DepensesProfessionnelles = {
  localPro: 0,
  assurancePro: 0,
  cfe: 500,
  internetPro: 0,
  telephonePro: 0,
  logiciels: 0,
  materielInformatique: 0,
  deplacements: 0,
  formation: 0,
  vehiculePro: false,
  kmAnnuels: 0,
  puissanceFiscale: 5,
  fraisVehiculeReels: 0,
  coworking: 0,
  fraisBancaires: 0,
  comptable: 0,
  autres: 0,
};

const profilDefaut: ProfilUtilisateur = {
  personnel: {
    pays: 'france',
    age: 35,
    situationFamiliale: 'celibataire',
    conjointRevenu: 0,
    enfants: [],
  },
  professionnel: {
    statut: 'auto-entrepreneur',
    typeActivite: 'service',
    secteur: 'services',
    dateDebut: new Date(),
    regimeActuel: 'micro',
  },
  financier: {
    caAnnuel: 36000,
    depensesPro: depensesDefaut,
    autresRevenus: 0,
    patrimoineImmobilier: false,
    creditImmobilier: false,
  },
  fiscal: {
    tvaAssujetti: false,
    versementLiberatoire: false,
    optionIS: false,
    declarationCommune: false,
  },
};

export interface OnboardingData {
  // Étape 1: Identité
  pays: 'france' | 'belgique' | 'suisse' | 'luxembourg';
  statut: 'auto-entrepreneur' | 'freelance' | 'eurl' | 'sasu' | 'particulier';
  situationFamiliale: 'celibataire' | 'marie' | 'pacse' | 'divorce' | 'veuf';
  
  // Étape 2: Famille (optionnel)
  nbEnfants: number;
  enfantsDetails: Array<{
    age: number;
    scolarite: 'maternelle' | 'primaire' | 'college' | 'lycee' | 'superieur' | null;
    fraisGarde: number;
  }>;
  conjointRevenu: number;
  
  // Étape 3: Activité
  typeActivite: 'service' | 'vente' | 'mixte';
  
  // Étape 4: Revenus
  caAnnuel: number;
  depensesMensuelles: number;
  
  // Étape 5: Fiscal
  tva: boolean;
  regimeActuel: 'micro' | 'reel-simplifie' | 'reel-normal';
}

export const onboardingDefaut: OnboardingData = {
  pays: 'france',
  statut: 'auto-entrepreneur',
  situationFamiliale: 'celibataire',
  nbEnfants: 0,
  enfantsDetails: [],
  conjointRevenu: 0,
  typeActivite: 'service',
  caAnnuel: 36000,
  depensesMensuelles: 400,
  tva: false,
  regimeActuel: 'micro',
};

function convertirOnboardingEnProfil(data: OnboardingData): ProfilUtilisateur {
  // Convertir les enfants
  const enfants = data.enfantsDetails.map(e => ({
    age: e.age,
    scolarite: e.scolarite,
    fraisGardeMensuel: e.fraisGarde,
    gardeAlternee: false,
  }));

  return {
    personnel: {
      pays: data.pays,
      age: 35, // Par défaut, peut être demandé plus tard
      situationFamiliale: data.situationFamiliale,
      conjointRevenu: data.conjointRevenu,
      enfants,
    },
    professionnel: {
      statut: data.statut,
      typeActivite: data.typeActivite,
      secteur: 'general',
      dateDebut: new Date(),
      regimeActuel: data.regimeActuel,
    },
    financier: {
      caAnnuel: data.caAnnuel,
      depensesPro: {
        ...depensesDefaut,
        autres: data.depensesMensuelles * 12, // Estimation grossière
      },
      autresRevenus: 0,
      patrimoineImmobilier: false,
      creditImmobilier: false,
    },
    fiscal: {
      tvaAssujetti: data.tva,
      versementLiberatoire: false,
      optionIS: false,
      declarationCommune: data.situationFamiliale === 'marie' || data.situationFamiliale === 'pacse',
    },
  };
}

export function useFiscalCalculator() {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(onboardingDefaut);
  const [diagnostic, setDiagnostic] = useState<DiagnosticFiscal | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Mettre à jour les données d'onboarding
  const updateOnboarding = useCallback((updates: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...updates }));
  }, []);

  // Ajouter un enfant
  const ajouterEnfant = useCallback((enfant: OnboardingData['enfantsDetails'][0]) => {
    setOnboardingData(prev => ({
      ...prev,
      nbEnfants: prev.nbEnfants + 1,
      enfantsDetails: [...prev.enfantsDetails, enfant],
    }));
  }, []);

  // Supprimer un enfant
  const supprimerEnfant = useCallback((index: number) => {
    setOnboardingData(prev => ({
      ...prev,
      nbEnfants: Math.max(0, prev.nbEnfants - 1),
      enfantsDetails: prev.enfantsDetails.filter((_, i) => i !== index),
    }));
  }, []);

  // Générer le diagnostic
  const calculerDiagnostic = useCallback(() => {
    setIsCalculating(true);
    
    // Simuler un petit délai pour l'UX
    setTimeout(() => {
      const profil = convertirOnboardingEnProfil(onboardingData);
      const resultat = genererDiagnostic(profil);
      setDiagnostic(resultat);
      setIsCalculating(false);
    }, 500);
  }, [onboardingData]);

  // Profil complet (pour les fonctions avancées)
  const profilComplet = useMemo(() => {
    return convertirOnboardingEnProfil(onboardingData);
  }, [onboardingData]);

  // Estimation rapide (sans diagnostic complet)
  const estimationRapide = useMemo(() => {
    const profil = convertirOnboardingEnProfil(onboardingData);
    
    // Calcul simplifié
    let cotisations = 0;
    if (profil.professionnel.statut === 'auto-entrepreneur') {
      const taux = profil.professionnel.typeActivite === 'vente' ? 0.123 : 0.211;
      cotisations = profil.financier.caAnnuel * taux;
    }

    // Abattement micro
    let baseImposable = profil.financier.caAnnuel;
    if (profil.professionnel.regimeActuel === 'micro') {
      const abattement = profil.professionnel.typeActivite === 'vente' ? 0.71 : 0.34;
      baseImposable = profil.financier.caAnnuel * (1 - abattement);
    }

    // IR estimé (simplifié)
    let ir = 0;
    if (baseImposable > 11294) {
      ir = (baseImposable - 11294) * 0.11;
    }
    if (baseImposable > 28797) {
      ir += (Math.min(baseImposable, 82341) - 28797) * 0.19;
    }

    const total = cotisations + ir + 500; // +CFE estimée

    return {
      caAnnuel: profil.financier.caAnnuel,
      cotisations: Math.round(cotisations),
      ir: Math.round(ir),
      total: Math.round(total),
      // Économie potentielle estimée à 15-20% en moyenne
      economiePotentielle: Math.round(total * 0.18),
    };
  }, [onboardingData]);

  return {
    onboardingData,
    updateOnboarding,
    ajouterEnfant,
    supprimerEnfant,
    calculerDiagnostic,
    diagnostic,
    isCalculating,
    profilComplet,
    estimationRapide,
  };
}

// Hook pour stocker les données en localStorage
export function usePersistentFiscal() {
  const calculator = useFiscalCalculator();

  // Sauvegarder dans localStorage à chaque changement
  const saveData = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mff_onboarding', JSON.stringify(calculator.onboardingData));
      if (calculator.diagnostic) {
        localStorage.setItem('mff_diagnostic', JSON.stringify(calculator.diagnostic));
      }
    }
  }, [calculator.onboardingData, calculator.diagnostic]);

  // Charger depuis localStorage
  const loadData = useCallback(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mff_onboarding');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          calculator.updateOnboarding(data);
        } catch {
          // Ignorer les erreurs de parsing
        }
      }
    }
  }, [calculator]);

  return {
    ...calculator,
    saveData,
    loadData,
  };
}
