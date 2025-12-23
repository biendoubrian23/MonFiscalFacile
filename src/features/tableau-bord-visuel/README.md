# Tableau de Bord Annuel Visuel

> Vue d'ensemble avec graphiques

## Objectif

Visualiser revenus, charges, impôts.
Évolution mois par mois, année par année.

## Étapes de Développement

### 1. Widgets Principaux
- Carte résumé : revenu net après impôts
- Carte économies réalisées
- Carte prochaine échéance
- Score d'optimisation

### 2. Graphiques
- Courbe évolution revenus/impôts sur 12 mois
- Camembert répartition des charges
- Barres comparaison années
- Jauge score d'optimisation

### 3. Données
- Agréger les simulations
- Données saisies manuellement
- Import possible (optionnel)

### 4. Interactivité
- Hover pour détails
- Clic pour filtrer
- Export des graphiques

### 5. Responsive
- Adaptation mobile
- Widgets empilables
- Scroll horizontal si besoin

## Fichiers à Créer

```
tableau-bord-visuel/
├── components/
│   ├── DashboardGrid.tsx
│   ├── SummaryCard.tsx
│   ├── EvolutionChart.tsx
│   ├── RepartitionPie.tsx
│   └── ScoreGauge.tsx
├── hooks/
│   └── useDashboardData.ts
├── types.ts
└── page.tsx
```
