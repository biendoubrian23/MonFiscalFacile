# Comparateur de Statuts Juridiques

> Trouver le statut optimal en quelques clics

## Objectif

Comparer visuellement AE, EURL, SASU.
Calcul personnalisé selon le CA de l'utilisateur.

## Étapes de Développement

### 1. Interface de Saisie
- Chiffre d'affaires prévu
- Type d'activité
- Situation personnelle
- Objectifs (dividendes, retraite, etc.)

### 2. Calcul Comparatif
- Utiliser OLYMPE pour chaque statut
- Calculer : impôts, cotisations, net
- Coût de création/gestion
- Protection sociale

### 3. Tableau Comparatif
- Colonnes : AE, EURL IS, EURL IR, SASU
- Lignes : revenus, charges, impôts, net
- Mise en avant du meilleur choix

### 4. Détail par Statut
- Cliquer pour voir le détail
- Avantages / Inconvénients
- "Pour qui c'est fait"

### 5. Recommandation
- Algo de scoring
- Phrase simple : "Pour vous, le meilleur choix est..."
- Lien vers parcours de changement

## Fichiers à Créer

```
comparateur-statuts/
├── components/
│   ├── StatutInput.tsx
│   ├── ComparisonTable.tsx
│   ├── StatutDetail.tsx
│   └── Recommendation.tsx
├── data/
│   └── statuts-config.ts
├── hooks/
│   └── useComparateurStatuts.ts
├── types.ts
└── page.tsx
```
