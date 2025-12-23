# 🏛️ OLYMPE - Moteur d'Optimisation Fiscale Intelligent

> Le cœur algorithmique de MonFiscalFacile

## Vision

OLYMPE est un moteur de calcul fiscal ultra-puissant, modulaire et extensible.
Il gère TOUS les cas : salariés, indépendants, investisseurs, dirigeants de société.

## Architecture Modulaire (POO)

```
olympe/
├── core/                    # Noyau central
│   ├── Engine.ts           # Classe principale - orchestre tout
│   ├── Calculator.ts       # Calculs de base (IR, tranches)
│   └── Optimizer.ts        # Génère les recommandations
│
├── profiles/               # Profils utilisateurs
│   ├── BaseProfile.ts      # Classe abstraite
│   ├── SalarieProfile.ts   # Salarié classique
│   ├── AutoEntrepreneurProfile.ts
│   ├── TNSProfile.ts       # Travailleur non salarié
│   ├── DirigeantProfile.ts # SASU/EURL
│   └── InvestisseurProfile.ts
│
├── modules/                # Modules de calcul spécialisés
│   ├── ImpotRevenu.ts      # Calcul IR détaillé
│   ├── CotisationsSociales.ts
│   ├── PlusValues.ts       # Immobilier, financier
│   ├── Dividendes.ts       # Flat tax vs barème
│   ├── Retraite.ts         # PER, Madelin
│   └── ACRE.ts             # Exonérations
│
├── rules/                  # Règles fiscales (données)
│   ├── baremes.ts          # Barèmes IR 2024-2025
│   ├── plafonds.ts         # Seuils micro, TVA, etc.
│   ├── taux.ts             # Taux cotisations
│   └── deductions.ts       # Déductions possibles
│
├── strategies/             # Stratégies d'optimisation
│   ├── BaseStrategy.ts     # Interface commune
│   ├── RegimeOptimal.ts    # Micro vs réel
│   ├── StatutOptimal.ts    # Comparaison statuts
│   ├── FraisReels.ts       # Frais réels vs 10%
│   └── Defiscalisation.ts  # PER, dons, etc.
│
└── index.ts                # Export principal
```

## Étapes de Développement

### Phase 1 : Core
1. Créer la classe `Engine` - point d'entrée unique
2. Implémenter `Calculator` avec les tranches IR
3. Créer l'interface `Profile` et les types communs
4. Tester les calculs de base

### Phase 2 : Profils
1. Créer `BaseProfile` abstraite
2. Implémenter chaque type de profil
3. Chaque profil définit ses règles spécifiques
4. Factory pour instancier le bon profil

### Phase 3 : Modules
1. Créer les modules de calcul spécialisés
2. Chaque module est indépendant et testable
3. Les modules s'enregistrent dans l'Engine
4. Composition modulaire selon le profil

### Phase 4 : Stratégies
1. Interface commune pour les stratégies
2. Chaque stratégie analyse et recommande
3. Scoring des recommandations
4. Prioritisation intelligente

## Principes de Code

- **Single Responsibility** : 1 classe = 1 responsabilité
- **Open/Closed** : Extensible sans modifier l'existant
- **Dependency Injection** : Modules injectés dans l'Engine
- **Immutabilité** : Les calculs retournent de nouvelles données
- **Type Safety** : TypeScript strict, pas de `any`

## Exemple d'Utilisation

```typescript
import { Olympe } from '@/lib/olympe';

const engine = new Olympe();

const result = engine.analyze({
  type: 'auto-entrepreneur',
  chiffreAffaires: 50000,
  activite: 'prestation-service',
  situationFamiliale: 'celibataire',
  // ...
});

// result.impots = montant calculé
// result.optimisations = liste des recommandations
// result.scenarios = simulations alternatives
```
