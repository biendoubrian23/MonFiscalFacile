# Système de Gamification

> Rendre l'optimisation fiscale amusante

## Objectif

Niveaux, badges, barre de progression.
Transformer la corvée fiscale en jeu satisfaisant.

## Étapes de Développement

### 1. Système de Points
- Définir les actions qui donnent des points
- Calcul du score global
- Seuils pour chaque niveau

### 2. Niveaux
- Débutant fiscal (0-100 pts)
- Initié (100-300 pts)
- Expert (300-600 pts)
- Maître fiscal (600+ pts)

### 3. Badges
- Premier diagnostic ✓
- Frais réels optimisés ✓
- Parcours complété ✓
- 1000€ économisés ✓
- (15-20 badges au total)

### 4. Composants UI
- Créer `NiveauBadge` - affiche le niveau
- Créer `ProgressionBar` - barre visuelle
- Créer `BadgesGallery` - tous les badges
- Créer `AchievementPopup` - notification badge

### 5. Intégration
- Déclencher les badges automatiquement
- Stocker dans Supabase
- Afficher sur le dashboard

## Fichiers à Créer

```
gamification/
├── components/
│   ├── NiveauBadge.tsx
│   ├── ProgressionBar.tsx
│   ├── BadgesGallery.tsx
│   └── AchievementPopup.tsx
├── data/
│   ├── badges.ts
│   └── niveaux.ts
├── hooks/
│   └── useGamification.ts
├── types.ts
└── context/
    └── GamificationContext.tsx
```
