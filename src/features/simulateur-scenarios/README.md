# Simulateur "Et Si..."

> Voir l'impact fiscal de chaque décision en temps réel

## Objectif

Permettre de modifier ses données et voir instantanément l'impact.
"Et si j'augmente mon CA ?" "Et si j'achète du matériel ?"

## Étapes de Développement

### 1. Interface de Simulation
- Créer les sliders pour chaque variable clé
- Affichage temps réel du résultat
- Comparaison avant/après visuelle

### 2. Variables Modifiables
- Chiffre d'affaires
- Dépenses professionnelles
- Frais kilométriques
- Investissements (PER, immobilier)
- Changement de statut (toggle)

### 3. Moteur de Recalcul
- Connecter avec OLYMPE
- Debounce pour performance
- Cache des calculs précédents

### 4. Visualisation
- Graphique comparatif barres
- Indicateur économie/surcoût
- Animation des transitions

### 5. Scénarios Prédéfinis
- "Je double mon CA"
- "Je passe en SASU"
- "J'ouvre un PER maximum"
- Boutons raccourcis

## Fichiers à Créer

```
simulateur-scenarios/
├── components/
│   ├── ScenarioSliders.tsx
│   ├── ComparisonChart.tsx
│   ├── ResultDisplay.tsx
│   └── QuickScenarios.tsx
├── hooks/
│   └── useScenario.ts
├── types.ts
└── page.tsx
```
