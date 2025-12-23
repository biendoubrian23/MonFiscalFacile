# Calculatrices Fiscales

> Outils pratiques pour le quotidien

## Objectif

Calculatrices spécialisées : frais km, cotisations sociales.
Interface simple, résultat immédiat.

## Calculatrice Frais Kilométriques

### Étapes
1. Interface avec champs : km parcourus, puissance fiscale, type véhicule
2. Intégrer le barème officiel 2024
3. Calcul automatique avec formule officielle
4. Afficher le résultat + détail du calcul
5. Option export pour déclaration

### Formule
- Jusqu'à 5000 km : d × 0.xxx
- De 5001 à 20000 km : (d × 0.xxx) + xxx
- Plus de 20000 km : d × 0.xxx

## Calculatrice Cotisations Sociales

### Étapes
1. Sélection du statut (AE, TNS, SASU)
2. Saisie du chiffre d'affaires / rémunération
3. Appliquer les taux par statut
4. Afficher détail : maladie, retraite, CSG, etc.
5. Échéancier trimestriel/mensuel

### Taux par Statut
- Auto-entrepreneur prestations : 21.1%
- Auto-entrepreneur vente : 12.3%
- TNS : environ 45%
- SASU : charges patronales + salariales

## Fichiers à Créer

```
calculatrices/
├── components/
│   ├── CalculatriceFraisKm.tsx
│   ├── CalculatriceCotisations.tsx
│   ├── ResultatCalcul.tsx
│   └── CalculatriceSelector.tsx
├── data/
│   ├── bareme-km.ts
│   └── taux-cotisations.ts
├── hooks/
│   ├── useFraisKm.ts
│   └── useCotisations.ts
├── types.ts
└── page.tsx
```
