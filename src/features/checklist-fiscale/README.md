# Checklist Fiscale Annuelle

> Ne plus jamais oublier une échéance importante

## Objectif

Calendrier personnalisé avec toutes les dates clés.
Cases à cocher pour suivre sa progression.

## Étapes de Développement

### 1. Données du Calendrier
- Définir les échéances par profil
- Dates fixes (déclaration IR, TVA)
- Dates dynamiques (selon le statut)

### 2. Composants UI
- Créer `CalendrierFiscal` - vue calendrier
- Créer `MoisCard` - résumé par mois
- Créer `EcheanceItem` - tâche à faire
- Créer `ProgressBar` - avancement global

### 3. Personnalisation
- Filtrer selon le profil utilisateur
- Ajouter des rappels personnalisés
- Marquer comme fait / à faire

### 4. Persistance
- Sauvegarder l'état dans Supabase
- Synchroniser entre sessions
- Historique des années précédentes

### 5. Notifications (optionnel)
- Email de rappel X jours avant
- Préférences de notification
- Intégration calendrier (iCal)

## Fichiers à Créer

```
checklist-fiscale/
├── components/
│   ├── CalendrierFiscal.tsx
│   ├── MoisCard.tsx
│   ├── EcheanceItem.tsx
│   └── ProgressGlobal.tsx
├── data/
│   └── echeances.ts
├── hooks/
│   └── useChecklist.ts
├── types.ts
└── page.tsx
```
