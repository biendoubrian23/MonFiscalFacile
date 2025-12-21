# Architecture de l'Algorithme Fiscal

## Vue d'ensemble

MonFiscalFacile utilise un **moteur d'optimisation fiscale basé sur des règles** (Rule-Based Expert System), pas de l'IA ou du Machine Learning. C'est un système déterministe qui applique les règles fiscales françaises 2024 au profil de l'utilisateur.

---

## Flux utilisateur (Arbre de décision)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DÉBUT : SIMULATION                                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  ÉTAPE 1 : SITUATION                                                         │
│  ─────────────────                                                           │
│  • Pays (France, Belgique, Suisse, Luxembourg)                              │
│  • Statut professionnel (Auto-entrepreneur, Freelance, EURL, Particulier)   │
│  • Situation familiale (Célibataire, Marié, Pacsé, Divorcé, Veuf)          │
│  • Nombre d'enfants                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
         [A des enfants ou                    [Célibataire sans
          en couple?]                          enfants]
                    │                                 │
                    ▼                                 │
┌─────────────────────────────────┐                  │
│  ÉTAPE 2 : FAMILLE              │                  │
│  ──────────────────             │                  │
│  Pour chaque enfant :           │                  │
│  • Âge                          │                  │
│  • Scolarité (maternelle →      │                  │
│    supérieur)                   │                  │
│  • Frais de garde (si < 6 ans)  │                  │
│                                 │                  │
│  Si en couple :                 │                  │
│  • Revenu du conjoint           │                  │
└─────────────────────────────────┘                  │
                    │                                 │
                    └────────────────┬────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  ÉTAPE 3 : ACTIVITÉ                                                          │
│  ─────────────────                                                           │
│  • Type d'activité :                                                         │
│    - Prestation de services (conseil, dev, design...)                       │
│    - Vente de produits (e-commerce, artisanat...)                           │
│    - Mixte (services + vente)                                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  ÉTAPE 4 : REVENUS                                                           │
│  ────────────────                                                            │
│  • Chiffre d'affaires annuel (10k€ → 200k€)                                 │
│  • Dépenses professionnelles mensuelles (0€ → 3000€)                        │
│  • Kilomètres professionnels annuels (0 → 30 000 km)                        │
│  • Puissance fiscale du véhicule (3, 5, 7 CV)                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  ÉTAPE 5 : FISCAL                                                            │
│  ───────────────                                                             │
│  • Assujetti à la TVA ? (Oui/Non)                                           │
│  • Récapitulatif du profil                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ALGORITHME D'OPTIMISATION                                 │
│  ═══════════════════════════════════════════                                │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    ▼                ▼                ▼
            ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
            │  CALCUL     │  │  CALCUL     │  │  GÉNÉRATION │
            │  SITUATION  │  │  SCÉNARIOS  │  │  ALERTES    │
            │  ACTUELLE   │  │  ALTERNATIFS│  │             │
            └─────────────┘  └─────────────┘  └─────────────┘
                    │                │                │
                    └────────────────┼────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DASHBOARD                                          │
│  ═══════════════════════════════════                                        │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  KPIs PRINCIPAUX                                                     │    │
│  │  • CA annuel                                                         │    │
│  │  • Cotisations + IR                                                  │    │
│  │  • Revenu net                                                        │    │
│  │  • Score d'optimisation                                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  ALERTES                                                             │    │
│  │  • Proximité seuils micro                                            │    │
│  │  • Dépenses sous-déclarées                                           │    │
│  │  • Régime non optimal                                                │    │
│  │  • Crédits famille non utilisés                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  ACTIONS RECOMMANDÉES (triées par priorité)                          │    │
│  │  • Haute : Changement de régime urgent                               │    │
│  │  • Moyenne : Optimisations recommandées                              │    │
│  │  • Basse : Améliorations optionnelles                                │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  COMPARATIF RÉGIMES                                                  │    │
│  │  Micro vs Réel simplifié : économie potentielle                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Architecture technique

### 1. Types (`/src/lib/fiscal/types.ts`)

```typescript
// Profil utilisateur complet
ProfilUtilisateur {
  pays, statut, situationFamiliale, nbEnfants, enfants[],
  revenuConjoint, typeActivite, caAnnuel, chargesReellesAnnuelles,
  kmProfessionnels, puissanceFiscaleVehicule, assujettitTVA,
  regimeActuel, annee
}

// Résultat des calculs
ResultatCalcul {
  revenuImposable, partsFiscales, cotisations, ir,
  fraisKm, creditsImpot, totalPrelevements, revenuNet
}

// Diagnostic complet
DiagnosticFiscal {
  situationActuelle, scenarios[], meilleurScenario,
  economiesPotentielles, alertes[], actions[]
}
```

### 2. Règles fiscales (`/src/lib/fiscal/regles-france.ts`)

Contient les données fiscales françaises 2024 :

| Catégorie | Données |
|-----------|---------|
| **Tranches IR** | 0%, 11%, 30%, 41%, 45% |
| **Seuils micro** | 77 700€ (services), 188 700€ (vente) |
| **Abattements** | 34% (services), 50% (vente), 71% (mixte) |
| **Cotisations** | 21.1% (services), 12.3% (vente) |
| **Crédits enfants** | 50% frais garde, 61-183€ scolarité |
| **Barème km** | 3-7 CV, tranches 0-5000/5001-20000/20001+ |

### 3. Calculateur (`/src/lib/fiscal/calculateur.ts`)

```
calculerSituationActuelle(profil)
    │
    ├── calculerPartsFiscales(situation, nbEnfants)
    │   └── Quotient familial (1, 1.5, 2, 2.5+...)
    │
    ├── calculerCotisationsMicro(ca, type) OU calculerCotisationsReel(ca, charges)
    │
    ├── calculerIR(revenuImposable, parts)
    │   └── Application barème progressif
    │
    ├── calculerCreditsImpotFamille(enfants)
    │   ├── Crédit garde (50%, max 2300€/enfant)
    │   └── Réduction scolarité (61€-183€)
    │
    └── calculerFraisKilometriques(km, puissance)
        └── Barème fiscal selon tranches
```

### 4. Optimiseur (`/src/lib/fiscal/optimiseur.ts`)

```
genererDiagnostic(profil)
    │
    ├── 1. Calculer situation actuelle
    │
    ├── 2. Simuler scénarios alternatifs
    │   ├── Scénario "micro" (si actuellement en réel)
    │   └── Scénario "réel" (si actuellement en micro)
    │
    ├── 3. Détecter les alertes
    │   ├── Proximité seuils (< 10% du plafond)
    │   ├── Dépassement seuils
    │   ├── Dépenses sous-déclarées
    │   └── Régime non optimal
    │
    ├── 4. Générer les actions
    │   ├── Changement de régime
    │   ├── Déclarer plus de dépenses
    │   ├── Utiliser crédits famille
    │   └── Déduire frais km
    │
    └── 5. Retourner DiagnosticFiscal
```

---

## Logique de décision par profil

### Auto-entrepreneur / Micro-entreprise

```
SI CA < seuil_micro ALORS
    Comparer :
    - Micro : CA × (1 - abattement) × taux_cotis
    - Réel : (CA - charges_réelles) × taux_cotis
    
    SI charges_réelles > CA × abattement ALORS
        Recommander → RÉEL
    SINON
        Recommander → MICRO
```

### Famille avec enfants

```
POUR CHAQUE enfant :
    SI âge < 6 ET fraisGarde > 0 ALORS
        Crédit = min(fraisGarde × 12 × 50%, 2300€)
    
    SI scolarité == 'college' ALORS Réduction += 61€
    SI scolarité == 'lycee' ALORS Réduction += 153€
    SI scolarité == 'superieur' ALORS Réduction += 183€
    
Ajouter à creditsImpot
```

### Couple (marié/pacsé)

```
Parts fiscales = 2 + (0.5 × nbEnfants jusqu'à 2) + (1 × enfants suivants)

Revenu imposable = (revenus_pro + revenu_conjoint) / parts

Optimiser déclaration commune vs séparée (si pertinent)
```

---

## Extensibilité

### Ajouter un nouveau pays

1. Créer `/src/lib/fiscal/regles-{pays}.ts`
2. Implémenter les mêmes interfaces que `regles-france.ts`
3. Ajouter la détection dans `calculateur.ts`

### Ajouter un nouveau type de déduction

1. Ajouter le type dans `types.ts`
2. Ajouter les règles dans `regles-france.ts`
3. Créer la fonction de calcul dans `calculateur.ts`
4. Intégrer dans `optimiseur.ts`

---

## Principes de conception

1. **Séparation des préoccupations** : Types, Règles, Calculs, Optimisation sont isolés
2. **Données externalisées** : Les règles fiscales sont dans des fichiers dédiés, faciles à mettre à jour
3. **Pas de magie** : Calculs déterministes, reproductibles, vérifiables
4. **Extensible** : Nouveaux pays, nouvelles règles sans refactoring majeur
5. **Testable** : Chaque fonction peut être testée unitairement
