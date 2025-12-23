# Suivi des Dépenses Professionnelles

> Enregistrer ses dépenses tout au long de l'année

## Objectif

Formulaire simple pour ajouter ses dépenses.
Catégorisation automatique, totaux, export.

## Étapes de Développement

### 1. Formulaire d'Ajout
- Date de la dépense
- Montant TTC / HT
- Catégorie (dropdown)
- Description courte
- Upload justificatif (optionnel)

### 2. Catégories
- Fournitures bureau
- Déplacements
- Repas d'affaires
- Logiciels/abonnements
- Matériel informatique
- Formation
- Honoraires
- Autres

### 3. Liste des Dépenses
- Tableau avec tri/filtre
- Recherche par mot-clé
- Filtre par période
- Suppression/modification

### 4. Récapitulatif
- Total par catégorie
- Graphique camembert
- Évolution mensuelle
- Comparaison année précédente

### 5. Export
- CSV pour comptable
- PDF récapitulatif
- Intégration avec calculatrice frais réels

## Fichiers à Créer

```
suivi-depenses/
├── components/
│   ├── DepenseForm.tsx
│   ├── DepensesList.tsx
│   ├── DepensesChart.tsx
│   └── DepensesRecap.tsx
├── hooks/
│   └── useDepenses.ts
├── types.ts
└── page.tsx
```
