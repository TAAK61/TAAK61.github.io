# Guideline Développement – Portfolio Liquid Glass

Ce document décrit les bonnes pratiques, conventions de code, workflow Git et utilisation de GitHub Copilot (Claude 4) dans WebStorm.

## 1. Environnement de développement
- **IDE** : WebStorm 2025.1+ (plugins : GitHub Copilot, Prettier, ESLint, Tailwind CSS, Three.js type defs).
- **Node** : v20 LTS.
- **Package manager** : pnpm 8.
- **Framework** : Next.js 15 + App Router.
- **Langages** : TypeScript 5 (strict), CSS/Tailwind, GLSL, Markdown.
- **Tests** : Jest 30, Playwright 1.49, axe-core.

## 2. Conventions de code
| Élément | Règle |
|---------|-------|
| Fichiers | `kebab-case` pour CSS/MD, `PascalCase.tsx` pour composants React |
| Imports | Absolus via `@/` alias (`baseUrl` :`./src`) |
| Types | Pas de `any`, génériques au besoin |
| ESLint | extends `next/core-web-vitals`, `@typescript-eslint/recommended` |
| Prettier | 100 carac, trailing comma : all |
| Commit | Conventional Commits v1 (`feat:`, `fix:`, `docs:` …) |

## 3. Workflow Git
1. **main** : toujours déployable.
2. **develop** : intégration continue.
3. **feature/**`<slug>` : une fonctionnalité Liquid Glass ou story.
4. **release/**`<vX.Y.Z>` : préparation release.
5. **hotfix/** : corrections prod.

### Branch naming
```
feature/liquid-glass-distortion
release/v1.2.0
hotfix/crypto-widget-null
```

### Stratégie de version (semver)
- **MAJOR** : rupture API ou design.
- **MINOR** : nouvelle fonctionnalité stable.
- **PATCH** : bug fix/backport.

### Releases GitHub
Chaque merge de `release/**` → `main` déclenche la GitHub Action **create-release** (ci-dessous). Le tag `vX.Y.Z` est généré + notes automatiques.

```yaml
# .github/workflows/release.yml
name: create-release
on:
  push:
    branches: [main]
    paths: ['CHANGELOG.md']
permissions:
  contents: write
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Create release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          tag=$(grep -m1 '^## ' CHANGELOG.md | cut -d' ' -f2)
          gh release create "$tag" --generate-notes
```

## 4. Utilisation de Claude 4 Copilot
- Écrire un **prompt clair** en commentaire avant la zone de code.
- Préférer les requêtes : "Give me a TypeScript function that…".
- Toujours relire, exécuter les tests.
- Les suggestions Copilot sont commitées **avec** attribution (`Co-Authored-By`) automatiquement.

## 5. Structure de répertoire
```
├─ public/
├─ src/
│  ├─ app/        # routes App Router
│  ├─ components/ # React components Liquid Glass
│  ├─ lib/        # helpers & API clients
│  ├─ styles/     # global.css + tailwind.css
│  ├─ three/      # Three.js scenes & shaders
│  └─ tests/      # unit & e2e
├─ .github/
│  └─ workflows/  # CI/CD
├─ CHANGELOG.md
└─ README.md
```

## 6. CI/CD GitHub Actions
- **ci.yml** : lint + test + build.
- **preview.yml** : déploiement preview sur Vercel (PR).
- **release.yml** : création release + tag.

## 7. Qualité & Performance
- LCP < 2.5 s, CLS < 0.1, FID < 100 ms.
- Lighthouse > 90.
- Coverage Jest ≥ 95 %.
- Axe score ≥ 95.

---

*Document maintenu dans `/docs/guideline-dev.md`*