# MonFiscalFacile - Charte Graphique

## Philosophie
Design minimaliste, premium et professionnel. Pas de surcharge visuelle.
L'objectif est d'inspirer confiance et clarté dans un domaine (fiscal) souvent perçu comme complexe.

## Couleurs

### Palette Principale
- **Vert Émeraude** `#10B981` - Couleur principale (gains, économies, succès, CTA primaires)
- **Noir Charbon** `#1A1A1A` - Titres, textes importants
- **Blanc Cassé** `#FAFAFA` - Fonds principaux
- **Gris Ardoise** `#64748B` - Textes secondaires, descriptions

### Palette Secondaire
- **Bleu Acier** `#3B82F6` - Liens, éléments interactifs secondaires
- **Rouge Bordeaux** `#DC2626` - Alertes, pertes, erreurs
- **Jaune Ambre** `#F59E0B` - Avertissements, attention

### Dégradés (utilisés avec parcimonie)
- Hero gradient: `from-offwhite to-primary-50`

## Typographie

### Famille
- **Police principale**: Inter (Google Fonts)
- **Fallback**: system-ui, sans-serif

### Tailles
- **Hero titre**: 4rem (64px) - font-bold
- **H1**: 2.5rem (40px) - font-bold
- **H2**: 2rem (32px) - font-semibold
- **H3**: 1.5rem (24px) - font-semibold
- **Body**: 1rem (16px) - font-normal
- **Small**: 0.875rem (14px) - font-normal
- **Micro**: 0.75rem (12px) - font-medium

## Composants

### Boutons
- **ANGLES DROITS** - Pas d'arrondi (rounded-none)
- Padding: `px-8 py-4`
- Transition: `transition-all duration-200`

#### Bouton Primaire
```css
bg-primary-500 text-white hover:bg-primary-600 
```

#### Bouton Secondaire
```css
border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white
```

#### Bouton Ghost
```css
text-primary-500 hover:text-primary-600 underline-offset-4 hover:underline
```

### Cards
- **ANGLES DROITS** - Pas d'arrondi
- Fond: `bg-white`
- Bordure: `border border-gray-200`
- Ombre: `shadow-sm hover:shadow-md`

### Inputs
- **ANGLES DROITS**
- Bordure: `border border-gray-300 focus:border-primary-500`
- Padding: `px-4 py-3`

## Icônes
- **Bibliothèque**: Lucide React
- **Style**: Stroke, pas filled
- **Taille par défaut**: 20px
- **Usage**: MINIMAL - uniquement quand vraiment nécessaire
- Pas d'emojis ni d'icônes décoratives

## Espacement
- Section padding: `py-20 px-6`
- Container max-width: `max-w-6xl mx-auto`
- Gap cards: `gap-8`
- Gap éléments: `gap-4`

## Effets
- Hover boutons: `transition-all duration-200`
- Hover cards: `hover:shadow-md transition-shadow`
- Pas d'animations excessives

## Règles Strictes
1. ❌ PAS d'angles arrondis (sauf exceptions mineures)
2. ❌ PAS d'emojis
3. ❌ PAS d'icônes décoratives inutiles
4. ❌ PAS de gradients multicolores
5. ✅ Espaces blancs généreux
6. ✅ Hiérarchie visuelle claire
7. ✅ Contraste fort pour lisibilité
