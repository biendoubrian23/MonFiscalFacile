# Mode Déclaration Pas à Pas

> Guide pendant la vraie déclaration

## Objectif

Accompagner sur impots.gouv.fr.
Case par case, étape par étape.

## Étapes de Développement

### 1. Parcours Type Déclaration
- Identification du type de déclaration
- Sélection des rubriques concernées
- Ordre des étapes

### 2. Guide Case par Case
- Numéro de case (ex: 1AJ, 5HQ)
- Montant à reporter
- Capture d'écran annotée
- Explication du champ

### 3. Interface
- Mode "lecture" facile
- Boutons Précédent/Suivant
- Progression visible
- Checklist intégrée

### 4. Contenu par Profil
- Salarié : cases salaires, frais réels
- Auto-entrepreneur : cases BIC/BNC
- Investisseur : revenus fonciers, PV

### 5. Ressources
- Liens directs vers impots.gouv.fr
- Vidéo tutoriel courte
- FAQ spécifique déclaration

## Fichiers à Créer

```
mode-declaration/
├── components/
│   ├── DeclarationWizard.tsx
│   ├── CaseGuide.tsx
│   ├── ScreenshotAnnotated.tsx
│   └── ProgressDeclaration.tsx
├── data/
│   ├── cases-salarie.ts
│   ├── cases-independant.ts
│   └── cases-investisseur.ts
├── hooks/
│   └── useDeclarationGuide.ts
├── types.ts
└── page.tsx
```
