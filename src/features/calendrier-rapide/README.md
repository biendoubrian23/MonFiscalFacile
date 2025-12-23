# Calendrier Fiscal (Bouton Discret)

> Les dates importantes sans encombrer l'interface

## Objectif

Petit bouton/icône qui ouvre un popup calendrier.
Pas un onglet complet, juste un accès rapide.

## Étapes de Développement

### 1. Bouton d'Accès
- Icône calendrier dans le header du dashboard
- Badge avec nombre d'échéances proches
- Tooltip au survol

### 2. Popup Calendrier
- Modal ou dropdown
- Vue mois en cours
- Prochaines échéances listées
- Lien vers détail si besoin

### 3. Données
- Réutiliser les données de checklist-fiscale
- Filtrer les 30 prochains jours
- Mettre en avant les urgences

### 4. Style
- Discret mais accessible
- Couleur rouge si échéance < 7 jours
- Animation subtile pour attirer l'attention

## Fichiers à Créer

```
calendrier-rapide/
├── components/
│   ├── CalendarButton.tsx
│   └── CalendarPopup.tsx
├── hooks/
│   └── useUpcomingDates.ts
└── types.ts
```
