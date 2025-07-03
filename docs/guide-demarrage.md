# Guide de Démarrage - Portfolio Liquid Glass

## 🚀 Démarrage rapide

Ce guide vous accompagne étape par étape pour configurer et lancer le développement du portfolio Liquid Glass.

## 📋 Prérequis

### Système
- **OS** : Windows 10/11, macOS 10.15+, ou Linux Ubuntu 18.04+
- **RAM** : 8 GB minimum (16 GB recommandé)
- **Stockage** : 2 GB d'espace libre

### Outils de développement
- **Node.js** : Version 20 LTS ou supérieure
- **pnpm** : Version 8+ (gestionnaire de paquets recommandé)
- **Git** : Version 2.30+ 
- **IDE** : WebStorm 2024.3+ ou VS Code avec extensions

### Comptes requis
- **GitHub** : Pour le repository et CI/CD
- **Vercel/Netlify** : Pour le déploiement
- **CoinGecko API** : Pour les données crypto
- **Setmore** : Pour le système de réservation

## 🛠️ Installation

### 1. Cloner le repository
```bash
git clone https://github.com/TAAK61/portfolio-liquid-glass.git
cd portfolio-liquid-glass
```

### 2. Installer les dépendances
```bash
# Installer pnpm si pas déjà fait
npm install -g pnpm

# Installer les dépendances du projet
pnpm install
```

### 3. Configuration des variables d'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env.local

# Éditer le fichier avec vos clés API
nano .env.local
```

Variables essentielles :
```env
# APIs externes
NEXT_PUBLIC_COINGECKO_API_KEY=votre_cle_coingecko
NEXT_PUBLIC_SETMORE_API_KEY=votre_cle_setmore

# Configuration site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Portfolio Liquid Glass"

# Features flags
NEXT_PUBLIC_ENABLE_AR=true
NEXT_PUBLIC_ENABLE_VOICE=true
NEXT_PUBLIC_ENABLE_CRYPTO=true
NEXT_PUBLIC_ENABLE_AI=true
```

### 4. Démarrer le serveur de développement
```bash
pnpm dev
```

Le site sera accessible sur `http://localhost:3000`

## 🎯 Première configuration

### 1. Vérifier l'installation
Ouvrez votre navigateur et vérifiez que :
- ✅ La page se charge sans erreur
- ✅ Les styles Tailwind sont appliqués
- ✅ La console ne montre pas d'erreur critique

### 2. Tester les fonctionnalités de base
```bash
# Lancer les tests
pnpm test

# Vérifier le linting
pnpm lint

# Vérifier le build
pnpm build
```

## 📁 Structure du projet expliquée

```
portfolio-liquid-glass/
├── 📁 public/                    # Assets statiques
│   ├── 📁 images/               # Images et illustrations
│   ├── 📁 models/               # Modèles 3D (.gltf, .glb)
│   ├── 📁 textures/             # Textures pour Three.js
│   └── 📄 favicon.ico           # Favicon du site
├── 📁 src/                       # Code source principal
│   ├── 📁 app/                  # App Router Next.js 15
│   │   ├── 📄 globals.css       # Styles globaux
│   │   ├── 📄 layout.tsx        # Layout principal
│   │   ├── 📄 page.tsx          # Page d'accueil
│   │   └── 📁 api/              # API routes
│   ├── 📁 components/           # Composants React
│   │   ├── 📁 ui/               # Composants UI de base
│   │   ├── 📁 glass/            # Composants Liquid Glass
│   │   ├── 📁 sections/         # Sections de la page
│   │   └── 📁 three/            # Composants Three.js
│   ├── 📁 lib/                  # Utilitaires
│   │   ├── 📄 utils.ts          # Fonctions utilitaires
│   │   ├── 📄 constants.ts      # Constantes globales
│   │   └── 📄 api-clients.ts    # Clients API
│   ├── 📁 styles/               # Styles personnalisés
│   │   ├── 📄 liquid-glass.css  # Styles Liquid Glass
│   │   └── 📄 components.css    # Styles composants
│   └── 📁 types/                # Types TypeScript
├── 📁 docs/                     # Documentation
├── 📁 tests/                    # Tests unitaires et e2e
└── 📁 .github/workflows/        # CI/CD GitHub Actions
```

## 🎨 Développement des composants

### 1. Composant Liquid Glass de base
```typescript
// src/components/glass/GlassContainer.tsx
import { ReactNode } from 'react';

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
  opacity?: number;
}

export const GlassContainer = ({ 
  children, 
  className = '', 
  blur = 'md',
  opacity = 0.15 
}: GlassContainerProps) => {
  return (
    <div 
      className={`
        glass-container 
        backdrop-blur-${blur} 
        bg-white/[${opacity}] 
        border border-white/20 
        rounded-xl 
        shadow-lg 
        ${className}
      `}
    >
      {children}
    </div>
  );
};
```

### 2. Section avec Three.js
```typescript
// src/components/sections/HeroSection.tsx
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const HeroSection = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Configuration Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="h-screen relative">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-6xl font-bold text-white">
          Concepteur de solutions IT & Digital
        </h1>
      </div>
    </section>
  );
};
```

## 🔧 Workflow de développement

### 1. Créer une nouvelle fonctionnalité
```bash
# Créer une nouvelle branche
git checkout -b feature/nom-de-la-fonctionnalite

# Développer la fonctionnalité
# ...

# Commit et push
git add .
git commit -m "feat: ajout de la fonctionnalité X"
git push origin feature/nom-de-la-fonctionnalite
```

### 2. Tester avant commit
```bash
# Tests unitaires
pnpm test

# Tests e2e
pnpm test:e2e

# Linting
pnpm lint

# Build
pnpm build
```

### 3. Créer une Pull Request
1. Aller sur GitHub
2. Créer une Pull Request depuis votre branche
3. Attendre les vérifications CI/CD
4. Merger après validation

## 🎯 Suivi des tâches

### Consulter les tâches
Le fichier `/docs/tasks-tracker.md` contient la liste complète des tâches à réaliser.

### Mettre à jour le statut
Quand vous commencez une tâche :
1. Changez le statut de ❌ à 🟡
2. Mettez à jour les heures réalisées
3. Commitez le changement

Exemple :
```markdown
| T001 | Configuration initiale | 🟡 En cours | feature/init-project | 3h | 1h |
```

## 🐛 Résolution de problèmes

### Problèmes courants

#### 1. Erreur de dépendances
```bash
# Nettoyer et réinstaller
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

#### 2. Erreur Three.js
```bash
# Vérifier la version
pnpm list three

# Réinstaller si nécessaire
pnpm remove three @types/three
pnpm add three @types/three
```

#### 3. Erreur de build
```bash
# Vérifier les erreurs TypeScript
pnpm type-check

# Nettoyer le cache Next.js
pnpm next:clean
```

### Logs et debug
```bash
# Activer les logs de debug
NEXT_PUBLIC_DEBUG=true pnpm dev

# Voir les logs détaillés
pnpm dev --debug
```

## 📊 Métriques et monitoring

### Vérifier les performances
```bash
# Audit Lighthouse
pnpm audit:lighthouse

# Analyse du bundle
pnpm analyze

# Tests de performance
pnpm test:perf
```

### Métriques à surveiller
- **Performance** : LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Accessibilité** : Score > 95
- **Bundle size** : < 500KB initial
- **Frame rate** : 60fps desktop, 30fps mobile

## 🚀 Déploiement

### Déploiement automatique
Le déploiement se fait automatiquement via GitHub Actions :
- **Push sur main** → Déploiement production
- **Pull Request** → Déploiement preview

### Déploiement manuel
```bash
# Build de production
pnpm build

# Déploiement Vercel
vercel --prod

# Ou déploiement Netlify
netlify deploy --prod
```

## 📚 Ressources utiles

### Documentation
- [Next.js App Router](https://nextjs.org/docs/app)
- [Three.js Documentation](https://threejs.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Outils de développement
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [Three.js Editor](https://threejs.org/editor/)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### Communauté
- [GitHub Discussions](https://github.com/TAAK61/portfolio-liquid-glass/discussions)
- [Discord de Three.js](https://discord.gg/56GBJwAnUS)
- [Reddit r/nextjs](https://www.reddit.com/r/nextjs/)

## 🎯 Prochaines étapes

1. **Commencer par la Phase 1** : Configuration initiale
2. **Suivre le plan d'action** : `/docs/plan-action.md`
3. **Mettre à jour régulièrement** : `/docs/tasks-tracker.md`
4. **Documenter les changements** : `CHANGELOG.md`

## 💡 Conseils pour débuter

### Pour les développeurs débutants
- Commencez par les composants UI simples
- Testez chaque fonctionnalité individuellement
- Utilisez les DevTools pour déboguer
- N'hésitez pas à demander de l'aide dans les discussions

### Pour les développeurs expérimentés
- Respectez l'architecture définie
- Optimisez les performances dès le début
- Implementez les tests au fur et à mesure
- Contribuez à l'amélioration de la documentation

---

*Guide mis à jour : 3 janvier 2025*
