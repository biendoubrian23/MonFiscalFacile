# Blog / Actualités Fiscales

> Contenu éditorial pour le SEO et la crédibilité

## Objectif

Section blog dans le header de la landing page.
Articles sur les nouveautés fiscales.

## Étapes de Développement

### 1. Structure des Articles
- Titre, slug, date
- Catégorie (actualité, conseil, guide)
- Contenu Markdown ou MDX
- Image de couverture
- Auteur

### 2. Système de Contenu
- Fichiers MDX dans /content/blog
- Frontmatter pour les métadonnées
- Génération statique (SSG)

### 3. Pages
- Liste des articles avec pagination
- Page article individuel
- Catégories/tags
- Recherche (optionnel)

### 4. Design
- Card pour chaque article
- Lecture agréable (typographie)
- Partage social

### 5. Contenu Initial
- "Les 5 erreurs fiscales des indépendants"
- "Nouveautés fiscales 2025"
- "Comment optimiser sa déclaration"
- (5-10 articles de lancement)

## Fichiers à Créer

```
blog/
├── components/
│   ├── ArticleList.tsx
│   ├── ArticleCard.tsx
│   ├── ArticleContent.tsx
│   └── ArticleMeta.tsx
├── lib/
│   └── mdx.ts
├── types.ts
└── page.tsx

content/
└── blog/
    ├── erreurs-fiscales-independants.mdx
    └── nouveautes-2025.mdx
```

## Intégration Header

- Ajouter lien "Blog" dans le Header.tsx
- Entre "Tarifs" et "Connexion"
- Visible sur toutes les pages landing
