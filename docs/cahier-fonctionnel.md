# Cahier Fonctionnel - Portfolio Liquid Glass kiametoure.me

Ce document détaille les **User Stories**, les **règles de gestion**, les **spécifications d’interface** et les **contrats API** nécessaires au développement du portfolio.

## 1. User Stories (US)
| ID | Rôle | Besoin | Critère d’acceptation |
|----|------|--------|-----------------------|
| US-001 | Visiteur | Visualiser un portfolio immersif | Le Hero affiche fluidement le titre et objets 3D avec Liquid Glass à 60 fps |
| US-002 | Visiteur | Naviguer sans scroll sur desktop | Les dots Liquid Glass animent la transition vers chaque section en <500 ms |
| US-003 | Visiteur | Explorer mes compétences | La section Expertise affiche 4 cards Liquid Glass avec morphing interactif |
| US-004 | Visiteur | Découvrir projets | Galerie 3D immersive avec 3 projets/catégorie, portail AR disponible si WebXR support |
| US-005 | Visiteur | Consulter portfolio crypto | Widget DeFi live met à jour cours en <5 s |
| US-006 | Visiteur | Prendre rendez-vous | Clic sur "Book" ouvre Setmore dans nouvelle tab, préremplit nom + email |
| US-007 | Visiteur | Explorer via voix | Commande vocale « Go to projects » passe à la section Portfolio |
| US-008 | Administrateur | Créer release Git | Chaque fonctionnalité majeure validée ↦ tag vX.Y.Z + release note auto |
| US-009 | Screen reader user | Accéder contenu | Les composants Liquid Glass exposent aria-label et respectent WCAG AA |

## 2. Règles de Gestion (RG)
1. RG-01 : Si `prefers-reduced-motion` actif, désactiver morphing et minimiser blur.
2. RG-02 : Fallback vers style glassmorphism sur navigateurs ne supportant pas `backdrop-filter`.
3. RG-03 : Limite 9 projets affichés (3×3) ; autres via modal.
4. RG-04 : Token JWT requis pour appeler API DeFi et NFT.
5. RG-05 : Release GitHub créée uniquement après tests (Jest 95 % coverage, Playwright e2e green).

## 3. Spécifications Interface
### 3.1 Hero
- Conteneur `.hero` full-screen, Liquid Glass pseudo `::after` distortion.
- Three.js scene fixe (objets flottants).

### 3.2 Navigation Dots
- `<nav class="glass-dots">` position : fixed right 50 px.
- Dot actif : scale 1.5 + blur highlight.

### 3.3 Cards Expertise
- Classe `.glass-card` : `backdrop-filter: blur(2px) saturate(180%)`.
- Hover : morphing border-radius 2rem → 0.5rem.

### 3.4 Galerie 3D
- `<canvas id="portfolioWebGL">` 100%, lazy-loaded IntersectionObserver.
- Portail AR : A-frame `<a-portal>`.

### 3.5 Collaboration Form
- JSON payload `{name,email,type,message}` POST `/api/collab`.

## 4. Contrats API
### 4.1 /api/crypto
- GET returns `{symbol:string, price:number, change24:number}`.

### 4.2 /api/nft
- GET returns paginated `{items:[{id,title,imgUrl}...]}`.

### 4.3 /api/collab
- POST stores request in Firebase Cloud Firestore.

## 5. KPI & Tests
- CLS <0.1, LCP <2.5 s, FID <100 ms.
- Axe-core score ≥95.
- WebGL frame time <16 ms.

## 6. Diagramme de Séquence (simplifié)
Visiteur → Hero → Nav Dot click → Animation Three.js → Show Section → (if) XR → Setmore booking redirect.

---
*Fin du cahier fonctionnel.*