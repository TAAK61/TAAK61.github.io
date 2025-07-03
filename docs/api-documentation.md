# Documentation API - Portfolio Liquid Glass

## 📋 Vue d'ensemble

Cette documentation décrit les APIs et interfaces utilisées dans le portfolio Liquid Glass, incluant les endpoints internes, les intégrations externes, et les contrats de données.

## 🔗 APIs Internes

### 1. API Crypto (/api/crypto)

#### GET /api/crypto/prices
Récupère les prix des cryptomonnaies en temps réel.

```typescript
interface CryptoPriceResponse {
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  lastUpdated: string;
}
```

**Exemple de réponse :**
```json
{
  "symbol": "BTC",
  "price": 42500.00,
  "change24h": 1200.50,
  "changePercent24h": 2.91,
  "lastUpdated": "2025-01-03T10:30:00Z"
}
```

#### GET /api/crypto/portfolio
Récupère le portfolio crypto personnel.

```typescript
interface CryptoPortfolioResponse {
  totalValue: number;
  tokens: Array<{
    symbol: string;
    amount: number;
    value: number;
    percentage: number;
  }>;
  lastUpdated: string;
}
```

### 2. API NFT (/api/nft)

#### GET /api/nft/collections
Récupère les collections NFT.

```typescript
interface NFTCollection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  floorPrice: number;
  totalSupply: number;
  ownerCount: number;
}
```

#### GET /api/nft/owned
Récupère les NFTs possédés.

```typescript
interface OwnedNFT {
  tokenId: string;
  contractAddress: string;
  name: string;
  description: string;
  imageUrl: string;
  traits: Array<{
    trait_type: string;
    value: string;
  }>;
}
```

### 3. API Collaboration (/api/collaboration)

#### POST /api/collaboration/request
Soumet une demande de collaboration.

```typescript
interface CollaborationRequest {
  name: string;
  email: string;
  company?: string;
  type: 'investment' | 'project' | 'startup' | 'commercial' | 'humanitarian';
  message: string;
  budget?: string;
  timeline?: string;
}

interface CollaborationResponse {
  id: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: string;
  estimatedResponse: string;
}
```

### 4. API Analytics (/api/analytics)

#### POST /api/analytics/track
Enregistre les événements d'interaction.

```typescript
interface AnalyticsEvent {
  eventName: string;
  userId?: string;
  sessionId: string;
  properties: Record<string, any>;
  timestamp: string;
}
```

### 5. API Chat (/api/chat)

#### POST /api/chat/message
Envoie un message au chatbot IA.

```typescript
interface ChatMessage {
  message: string;
  context?: string;
  sessionId: string;
}

interface ChatResponse {
  response: string;
  suggestions?: string[];
  context: string;
  timestamp: string;
}
```

## 🔌 Intégrations Externes

### 1. Setmore API
**Base URL :** `https://developer.setmore.com/api/v1`

#### Endpoints utilisés :
- `GET /bookingpage/{key}` - Récupère les informations de la page de réservation
- `POST /bookingpage/{key}/services` - Récupère les services disponibles

### 2. CoinGecko API
**Base URL :** `https://api.coingecko.com/api/v3`

#### Endpoints utilisés :
- `GET /simple/price` - Prix des cryptomonnaies
- `GET /coins/{id}` - Informations détaillées d'une cryptomonnaie
- `GET /coins/markets` - Données du marché

### 3. OpenSea API
**Base URL :** `https://api.opensea.io/api/v1`

#### Endpoints utilisés :
- `GET /collections` - Collections NFT
- `GET /assets` - Assets NFT
- `GET /account/{address}` - Informations du compte

### 4. Web3 Provider
Intégration avec les providers Web3 pour les interactions blockchain.

```typescript
interface Web3Config {
  provider: 'metamask' | 'walletconnect' | 'coinbase';
  network: 'mainnet' | 'polygon' | 'arbitrum';
  contractAddress?: string;
}
```

## 📊 Structures de Données

### 1. Projet Portfolio

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'blockchain' | 'ai' | 'vr-ar' | '3d';
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'concept';
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
```

### 2. Compétence

```typescript
interface Skill {
  id: string;
  name: string;
  category: 'development' | 'emerging-tech' | 'crypto' | 'business';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
  iconUrl: string;
  color: string;
  order: number;
}
```

### 3. Configuration 3D

```typescript
interface ThreeJSConfig {
  scene: {
    background: string;
    fog?: {
      color: string;
      near: number;
      far: number;
    };
  };
  camera: {
    position: [number, number, number];
    fov: number;
    near: number;
    far: number;
  };
  renderer: {
    antialias: boolean;
    alpha: boolean;
    shadowMap: boolean;
  };
  objects: Array<{
    type: 'mesh' | 'light' | 'particle';
    geometry: string;
    material: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  }>;
}
```

## 🛡️ Sécurité et Authentification

### 1. Rate Limiting
Toutes les APIs sont protégées par un système de rate limiting :

```typescript
interface RateLimitConfig {
  windowMs: number; // 15 minutes
  max: number; // limite de requêtes
  message: string;
  standardHeaders: boolean;
  legacyHeaders: boolean;
}
```

### 2. Validation des Données
Validation avec Zod pour tous les endpoints :

```typescript
import { z } from 'zod';

const CollaborationRequestSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().optional(),
  type: z.enum(['investment', 'project', 'startup', 'commercial', 'humanitarian']),
  message: z.string().min(10).max(2000),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});
```

### 3. Headers de Sécurité
Configuration des headers de sécurité :

```typescript
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline';"
};
```

## 🔄 Gestion des Erreurs

### 1. Codes d'Erreur Standards

```typescript
enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR'
}
```

### 2. Format de Réponse d'Erreur

```typescript
interface ErrorResponse {
  error: {
    code: ErrorCode;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
    requestId: string;
  };
}
```

## 📈 Monitoring et Métriques

### 1. Métriques API
Métriques collectées pour chaque endpoint :

```typescript
interface APIMetrics {
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  timestamp: string;
  userAgent?: string;
  ip?: string;
}
```

### 2. Métriques Performance

```typescript
interface PerformanceMetrics {
  pageLoadTime: number;
  threejsInitTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}
```

## 🔧 Configuration Environment

### 1. Variables d'Environnement

```env
# APIs externes
COINGECKO_API_KEY=your_coingecko_api_key
OPENSEA_API_KEY=your_opensea_api_key
SETMORE_API_KEY=your_setmore_api_key

# Base de données
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url

# Authentification
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret

# Analytics
GOOGLE_ANALYTICS_ID=your_ga_id
MIXPANEL_TOKEN=your_mixpanel_token

# Déploiement
VERCEL_URL=your_vercel_url
NEXT_PUBLIC_SITE_URL=https://kiametoure.me
```

### 2. Configuration TypeScript

```typescript
interface Config {
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  crypto: {
    updateInterval: number;
    supportedTokens: string[];
  };
  nft: {
    collections: string[];
    maxItems: number;
  };
  features: {
    enableAR: boolean;
    enableVoice: boolean;
    enableCrypto: boolean;
    enableAI: boolean;
  };
}
```

## 📚 Exemples d'Utilisation

### 1. Récupération des prix crypto

```typescript
const fetchCryptoPrices = async (): Promise<CryptoPriceResponse[]> => {
  try {
    const response = await fetch('/api/crypto/prices');
    if (!response.ok) throw new Error('Failed to fetch crypto prices');
    return await response.json();
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};
```

### 2. Soumission de demande de collaboration

```typescript
const submitCollaborationRequest = async (
  data: CollaborationRequest
): Promise<CollaborationResponse> => {
  try {
    const response = await fetch('/api/collaboration/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting collaboration request:', error);
    throw error;
  }
};
```

### 3. Interaction avec le chatbot

```typescript
const sendChatMessage = async (message: string): Promise<ChatResponse> => {
  try {
    const response = await fetch('/api/chat/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        sessionId: generateSessionId(),
      }),
    });
    
    if (!response.ok) throw new Error('Failed to send message');
    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};
```

---

*Documentation API mise à jour : 3 janvier 2025*
