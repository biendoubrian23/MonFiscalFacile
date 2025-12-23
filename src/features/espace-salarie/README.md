# Espace Salarié

## Objectif
Page dédiée aux salariés novices qui veulent comprendre et optimiser leurs impôts.
Interface ultra-simple, visuelle, avec infobulles explicatives et exemples concrets.

## Fonctionnalités principales

### 1. Simulateur de déclaration simplifié
- Entrée du salaire net annuel
- Calcul automatique de l'impôt de base
- Affichage clair du résultat

### 2. Réductions interactives en temps réel
- Liste de TOUTES les réductions possibles
- Checkbox ou slider pour chaque option
- Affichage instantané de l'économie
- Comparaison avant/après toujours visible

### 3. Catégories de réductions
- Famille (enfants, garde, pension...)
- Dons et générosité
- Emploi à domicile
- Investissements
- Épargne retraite
- Frais professionnels
- Logement

### 4. Infobulles pédagogiques
- Chaque terme a une explication simple
- Exemples concrets avec montants
- Icône (?) cliquable partout

## Principes UX

1. ZÉRO jargon sans explication
2. Montants en euros, pas en pourcentage
3. Gains toujours en vert et bien visibles
4. Progression étape par étape possible
5. Mode "Je ne sais pas" pour les champs

## Fichiers

- `liste-reductions-salarie.md` : Liste exhaustive de toutes les réductions
- `page.tsx` : Page principale interactive
- `components/` : Composants réutilisables

## Étapes de développement

1. Lister TOUTES les réductions fiscales pour salariés
2. Créer le composant de saisie du salaire
3. Créer le simulateur d'impôt de base
4. Créer les sections de réductions par catégorie
5. Ajouter les infobulles avec exemples
6. Implémenter le calcul temps réel
7. Ajouter la comparaison avant/après
8. Tester avec utilisateurs novices
