# Simulateurs Avancés

> Retraite, Dividendes, ACRE

## Objectif

Simulateurs spécialisés pour cas complexes.
Chacun répond à un besoin précis.

---

## Simulateur de Retraite

### Étapes
1. Saisie des revenus actuels et passés
2. Estimation des trimestres
3. Calcul pension de base
4. Options : PER, Madelin, rachat trimestres
5. Affichage projection avec/sans optimisation

### Résultat
- Pension estimée à 62, 64, 67 ans
- Impact des cotisations volontaires
- Recommandations personnalisées

---

## Simulateur Dividendes (SASU/EURL)

### Étapes
1. Saisie du résultat de la société
2. Choix rémunération vs dividendes
3. Calcul charges sur rémunération
4. Calcul flat tax ou barème sur dividendes
5. Affichage net optimal

### Résultat
- Répartition optimale salaire/dividendes
- Graphique comparatif
- Impact sur retraite

---

## Simulateur ACRE / Exonérations

### Étapes
1. Vérifier éligibilité (questions)
2. Date de création de l'activité
3. Calcul des cotisations sans ACRE
4. Calcul avec ACRE (50% première année)
5. Économie réalisée

### Résultat
- Éligible : Oui/Non
- Montant économisé
- Durée de l'exonération
- Démarches à faire

## Fichiers à Créer

```
simulateurs-avances/
├── retraite/
│   ├── components/
│   │   ├── RetraiteForm.tsx
│   │   └── RetraiteResult.tsx
│   └── page.tsx
├── dividendes/
│   ├── components/
│   │   ├── DividendesForm.tsx
│   │   └── DividendesOptimizer.tsx
│   └── page.tsx
├── acre/
│   ├── components/
│   │   ├── AcreEligibility.tsx
│   │   └── AcreResult.tsx
│   └── page.tsx
└── types.ts
```
