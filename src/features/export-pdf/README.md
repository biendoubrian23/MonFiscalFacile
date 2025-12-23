# Export PDF du Diagnostic

> Donner une valeur tangible au service

## Objectif

PDF professionnel avec diagnostic complet.
À montrer à son comptable ou garder comme référence.

## Étapes de Développement

### 1. Choix Technique
- Utiliser react-pdf ou jsPDF
- Générer côté client (pas de serveur)
- Template responsive A4

### 2. Contenu du PDF
- Page de garde avec branding
- Résumé de la situation
- Graphique des impôts
- Liste des optimisations
- Plan d'action
- QR code vers l'app

### 3. Design du PDF
- Respecter la charte graphique
- Vert émeraude, angles droits
- Typographie Inter
- Mise en page professionnelle

### 4. Génération
- Bouton "Télécharger PDF"
- Loader pendant génération
- Nom fichier personnalisé

### 5. Options
- Choisir les sections à inclure
- Ajouter des notes personnelles
- Format paysage ou portrait

## Fichiers à Créer

```
export-pdf/
├── components/
│   ├── PDFDocument.tsx
│   ├── PDFCoverPage.tsx
│   ├── PDFSummary.tsx
│   ├── PDFOptimisations.tsx
│   └── PDFActionPlan.tsx
├── templates/
│   └── DiagnosticTemplate.tsx
├── utils/
│   └── generatePDF.ts
└── types.ts
```
