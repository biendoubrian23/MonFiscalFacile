# Guide Pas à Pas Interactif

> Transformer chaque recommandation en action concrète

## Objectif

L'utilisateur sait QUOI faire mais pas COMMENT.
Ce module transforme chaque optimisation en parcours guidé de 3-5 étapes.

## Étapes de Développement

### 1. Structure des Données
- Définir le type `Parcours` (id, titre, étapes, économie estimée)
- Définir le type `Etape` (ordre, titre, description, lien, document)
- Créer la base de parcours prédéfinis

### 2. Composants UI
- Créer `ParcoursList` - liste des parcours disponibles
- Créer `ParcoursCard` - aperçu d'un parcours
- Créer `ParcoursDetail` - vue étape par étape
- Créer `EtapeItem` - case à cocher + contenu

### 3. Logique de Progression
- Stocker l'avancement dans Supabase
- Calculer le pourcentage de complétion
- Débloquer les badges associés

### 4. Contenus des Parcours
- Parcours "Passer au régime réel"
- Parcours "Déclarer ses frais kilométriques"
- Parcours "Ouvrir un PER"
- Parcours "Changer de statut juridique"
- (10-15 parcours au total)

### 5. Intégration
- Lier avec les recommandations OLYMPE
- Afficher les parcours pertinents selon le profil
- Notifier quand un parcours devient pertinent

## Fichiers à Créer

```
guide-interactif/
├── components/
│   ├── ParcoursList.tsx
│   ├── ParcoursCard.tsx
│   ├── ParcoursDetail.tsx
│   └── EtapeItem.tsx
├── data/
│   └── parcours.ts
├── hooks/
│   └── useParcours.ts
├── types.ts
└── page.tsx
```
