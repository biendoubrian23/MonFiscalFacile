# Bibliothèque de Modèles de Documents

> Documents prêts à l'emploi, pré-remplis

## Objectif

Modèles de lettres et formulaires.
Pré-remplis avec les infos utilisateur.

## Étapes de Développement

### 1. Liste des Modèles
- Demande de régime réel
- Lettre de résiliation
- Demande d'ACRE
- Attestation sur l'honneur
- Formulaire P2-P4
- (10-15 modèles essentiels)

### 2. Interface de Sélection
- Grille de cartes
- Catégories (fiscal, administratif, social)
- Recherche par mot-clé
- Badge Premium pour certains

### 3. Pré-remplissage
- Injecter les données du profil
- Champs éditables si besoin
- Aperçu avant téléchargement

### 4. Génération
- Format Word (.docx)
- Format PDF
- Copier le texte

### 5. Instructions
- Chaque modèle a un mini-guide
- Où l'envoyer
- Délai de traitement

## Fichiers à Créer

```
modeles-documents/
├── components/
│   ├── ModelesList.tsx
│   ├── ModeleCard.tsx
│   ├── ModelePreview.tsx
│   └── ModeleEditor.tsx
├── templates/
│   ├── regime-reel.ts
│   ├── demande-acre.ts
│   └── ...
├── utils/
│   └── generateDocument.ts
├── types.ts
└── page.tsx
```
