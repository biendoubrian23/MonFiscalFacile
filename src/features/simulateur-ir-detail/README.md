# Simulateur d'Impôt sur le Revenu Détaillé

> Comprendre chaque étape du calcul

## Objectif

Montrer le détail complet du calcul IR.
Éducatif et transparent.

## Étapes de Développement

### 1. Saisie des Revenus
- Salaires et traitements
- Revenus indépendants
- Revenus fonciers
- Autres revenus

### 2. Calcul Pas à Pas
- Revenu brut global
- Charges déductibles
- Revenu net imposable
- Application du quotient familial
- Calcul par tranches
- Décote éventuelle
- Réductions/crédits d'impôt

### 3. Visualisation
- Graphique des tranches en barres
- Chaque tranche = une couleur
- Montant par tranche affiché

### 4. Explications
- Tooltip sur chaque étape
- Langage simple, pas de jargon
- Exemples concrets

### 5. Scenarios
- Modifier le quotient familial
- Ajouter des déductions
- Voir l'impact en temps réel

## Fichiers à Créer

```
simulateur-ir-detail/
├── components/
│   ├── RevenusForm.tsx
│   ├── CalculSteps.tsx
│   ├── TranchesChart.tsx
│   └── ExplicationStep.tsx
├── hooks/
│   └── useIRCalcul.ts
├── types.ts
└── page.tsx
```
