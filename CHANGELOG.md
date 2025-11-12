# 📝 Changelog - VraiÂge

Historique des changements et mises à jour de l'application.

---

## [2.0.0] - 2025-11-12

### 🎉 Fonctionnalités majeures

#### Phrases Comparatives V2.0
- **Structure verb + text** : Séparation verbe/texte pour flexibilité grammaticale
- **Émojis en strings** : Suppression des dépendances Icon components
- **24 paires optimisées** : Réduction de 25 à 24 (suppression doublon Mai 68)
- **Organisation générationnelle** : Alpha → Z → Millennials → X → Boomers → Silent → Greatest
- **Phrases plus distinctes culturellement** :
  - Passe-Partout vs Peppa Pig (QC vs EU très distinct)
  - Uber Eats vs Deliveroo (marques locales)
  - JdeM vs Le Figaro (journaux emblématiques)

#### Options État Corporel Complètes
- **Ajout "Très maigre"** :
  - Multiplicateur 0.90 (chats et chiens)
  - Description : "Os saillants, absence de graisse palpable, émacié"
- **Ajout "Maigre"** :
  - Multiplicateur 0.95 (chats) / 0.98 (chiens)
  - Description : "Côtes, colonne vertébrale et os du bassin très visibles"
- **5 options complètes** : Très maigre, Maigre, Idéal, Surpoids, Obèse
- **Grille responsive** : 1 col mobile, 2 cols tablette, 5 cols desktop

### ✨ Améliorations UX

#### Design harmonisé
- **Bouton "Calculer l'âge" chien** : Alignement Sparkles corrigé
  - Ajout `flex items-center justify-center gap-3`
  - Harmonisation avec bouton chat (py-5, rounded-xl)
  - Micro-interactions : hover:shadow-xl, scale transformations

#### Corrections taxonomiques
- **Dolichocéphales** : Remplacé "Berger Allemand" par "Teckel"
  - Plus représentatif de la morphologie dolichocéphalique

### 📚 Documentation mise à jour

#### PHRASES_DROLES.md V2.0
- Toutes les 24 paires listées avec organisation générationnelle
- Statistiques d'utilisation par génération
- Références culturelles populaires (QC vs EU)
- Notes techniques (interface TypeScript)
- Phrases les plus virales attendues

#### VERIFICATION_PHRASES.md V2.0
- Checklist complète des 24 paires
- Annotations des nouveautés et améliorations
- Notes de révision V2.0
- Phrases retirées documentées

#### CHANGELOG.md
- Création de ce document pour traçabilité

### 🔧 Détails techniques

**Fichiers modifiés :**
- `components/VraiAge.tsx` (107 insertions, 85 suppressions)
  - Lignes 34-186 : FUN_PHRASES interface et data
  - Lignes 233-264 : BODY_SCORES avec 5 options
  - Lignes 460-466 : Multiplicateurs chats
  - Lignes 565-571 : Multiplicateurs chiens
  - Lignes 1243, 1487 : Grilles responsive état corporel
  - Ligne 272 : Dolichocéphales Teckel
  - Lignes 1510, 1513 : Bouton calculer chien

**Commits :**
- `d8aea26` : Feature: Phrases comparatives V2.0 + Correctifs UX

**Lignes de code :**
- Total modifié : 192 lignes
- Net ajouté : +22 lignes

---

## [1.5.0] - 2025-11-12 (session précédente)

### Fonctionnalités ajoutées
- CTA "À l'écoute de Nala" pour animaux seniors
- Partage réseaux sociaux avec capture d'écran
- Phrases descriptives pour chaque stade de vie
- Système de phrases comparatives Québec vs Europe (V1.0)

### Corrections
- URL ecoutenala.ca corrigée (sans www)
- Texte CTA seniors sans fausses attentes
- Palette couleur indigo pour contraste

---

## Notes de version

### Structure des versions
- **Major (X.0.0)** : Changements majeurs d'architecture ou de fonctionnalités
- **Minor (1.X.0)** : Nouvelles fonctionnalités
- **Patch (1.0.X)** : Corrections de bugs

### Version actuelle : 2.0.0
- Refonte complète du système de phrases comparatives
- Extension des options d'évaluation corporelle

---

**Généré avec [Claude Code](https://claude.com/claude-code)**
