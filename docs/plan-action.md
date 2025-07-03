# Plan d’Action – Portfolio Liquid Glass

| Phase | Durée | Milestone | Issues clés | Release cible |
|-------|-------|-----------|------------|---------------|
| **Foundation** | S1–S2 | Repo initial + CI (tasks 1–2) | init-next, liquid-glass-base | v0.1.0-alpha |
| **Core UI** | S3–S6 | Hero, Navigation, Expertise (tasks 3–5) | hero-3d, nav-dots, expertise-cards | v0.5.0-beta |
| **Immersion** | S7–S10 | Portfolio 3D + AR (task 6) | portfolio-gallery | v0.7.0-beta2 |
| **Crypto Layer** | S11–S12 | Crypto/NFT widgets (task 7) | crypto-widgets | v0.8.0-rc |
| **Collaboration** | S13 | Booking integration (task 8) | booking | v0.9.0-rc2 |
| **Quality Pass** | S14 | A11y & Perf (task 9) | a11y-perf | v0.9.5-rc3 |
| **Release** | S15 | v1.0.0 stable | release/v1.0.0 | v1.0.0 |

## Détails de chaque phase
### Foundation (Semaines 1-2)
- Configurer Next.js, Tailwind, TypeScript strict.
- Ajouter ESLint & Prettier.
- Mettre en place CI GitHub Actions : lint, test, build.
- Créer composant `GlassContainer` avec fallback.
- **Sortie** : release `v0.1.0-alpha`.

### Core UI (Semaines 3-6)
- Développer Hero 3D, Navigation Dots, cartes Expertise.
- Implémenter commandes vocales (Web Speech API).
- **Sortie** : `v0.5.0-beta`.

### Immersion (Semaines 7-10)
- Intégrer galerie 3D portfolio, portails AR.
- Optimiser WebXR detection.
- **Sortie** : `v0.7.0-beta2`.

### Crypto Layer (Semaines 11-12)
- Ajouter price tracker DeFi, NFT showcase.
- Sécuriser appels API (rate limits).
- **Sortie** : `v0.8.0-rc`.

### Collaboration (Semaine 13)
- Intégrer Setmore avec pré-remplissage.
- Instrumenter analytics d’événement.
- **Sortie** : `v0.9.0-rc2`.

### Quality Pass (Semaine 14)
- Axe-core, Lighthouse, optimise images/textures.
- Ajouter `prefers-reduced-motion`.
- **Sortie** : `v0.9.5-rc3`.

### Release (Semaine 15)
- Geler fonctionnalités, corriger bugs.
- Merge develop → main, tag `v1.0.0`.
- Générer release notes automatiques.

## Publication & Versionning Git/GitHub
1. **Git Flow** avec branches principales `main`, `develop`.
2. **Feature branches** pour chaque tâche.
3. **Release branches** pour préparation livraison.
4. **GitHub Actions** :
   - `ci.yml` (lint+test+build)
   - `release.yml` (création tag + notes)
   - `preview.yml` (deploy preview Vercel)
5. **SemVer** appliqué.
6. **CHANGELOG.md** mis à jour à chaque PR.
7. **Tag** `vX.Y.Z` déclenche `gh release create`.

---
*Ce plan guide Claude 4 & Copilot pour orchestrer le développement end-to-end.*