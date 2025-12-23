# Glossaire Fiscal Interactif

> Comprendre les termes sans se prendre la tête

## Objectif

Dictionnaire des termes fiscaux.
Définitions simples, exemples concrets.

## Étapes de Développement

### 1. Base de Termes
- 50-100 termes essentiels
- Définition courte (2-3 phrases)
- Exemple concret
- Lien vers action associée

### 2. Interface
- Recherche instantanée
- Index alphabétique
- Catégories (impôts, cotisations, statuts)
- Favoris

### 3. Termes à Inclure
- Micro-entreprise
- Régime réel
- BIC / BNC
- Quotient familial
- Décote
- PER
- Flat tax
- Plus-value
- ...

### 4. Intégration
- Tooltips dans l'app
- Mots soulignés cliquables
- Popup avec définition

### 5. SEO (bonus)
- Chaque terme = une page
- Bon référencement naturel
- Trafic organique

## Fichiers à Créer

```
glossaire/
├── components/
│   ├── GlossaireSearch.tsx
│   ├── GlossaireList.tsx
│   ├── TermeCard.tsx
│   └── TermeTooltip.tsx
├── data/
│   └── termes.ts
├── hooks/
│   └── useGlossaire.ts
├── types.ts
└── page.tsx
```
