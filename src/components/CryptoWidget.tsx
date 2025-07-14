'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types pour les données crypto
interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  icon: string;
}

// Simulation de données crypto (en production, utiliser une vraie API)
const mockCryptoData: CryptoData[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 43250.50,
    change24h: 2.45,
    volume: 28500000000,
    marketCap: 847000000000,
    icon: '₿'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2650.75,
    change24h: -1.23,
    volume: 15200000000,
    marketCap: 318000000000,
    icon: 'Ξ'
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 98.45,
    change24h: 5.67,
    volume: 1800000000,
    marketCap: 42000000000,
    icon: '◎'
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    price: 0.89,
    change24h: 3.21,
    volume: 450000000,
    marketCap: 8200000000,
    icon: '⬟'
  }
];

export function CryptoWidget() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>(mockCryptoData);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const updateIntervalRef = useRef<NodeJS.Timeout>();

  // Simulation de mise à jour des prix en temps réel
  useEffect(() => {
    const updatePrices = () => {
      setCryptoData(prev => prev.map(crypto => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() - 0.5) * 0.02), // Variation de ±1%
        change24h: crypto.change24h + (Math.random() - 0.5) * 0.5
      })));
    };

    updateIntervalRef.current = setInterval(updatePrices, 3000);
    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, []);

  // Formatage des nombres
  const formatPrice = (price: number) => {
    // Validation du prix pour éviter les erreurs
    if (!price || isNaN(price) || !isFinite(price)) {
      return '$0.00';
    }

    // Configuration sécurisée du NumberFormat
    const options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price > 100 ? 2 : 4
    };

    try {
      return new Intl.NumberFormat('en-US', options).format(price);
    } catch (error) {
      // Fallback en cas d'erreur
      return `$${price.toFixed(2)}`;
    }
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `${(volume / 1e9).toFixed(1)}B`;
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`;
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K`;
    return volume.toString();
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  if (!isVisible) {
    return (
      <motion.button
        onClick={() => setIsVisible(true)}
        className="fixed top-6 right-6 z-40 w-12 h-12 bg-yellow-500/20 backdrop-blur-xl border border-yellow-400/30 rounded-xl flex items-center justify-center text-yellow-400 hover:bg-yellow-500/30 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Afficher les cryptos"
      >
        ₿
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-6 right-6 z-40"
    >
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-lg">₿</span>
            <span className="text-white font-semibold">Crypto Live</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white/60 hover:text-white transition-colors"
              title={isExpanded ? 'Réduire' : 'Développer'}
            >
              {isExpanded ? '📊' : '📈'}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/60 hover:text-white transition-colors"
              title="Masquer"
            >
              ×
            </button>
          </div>
        </div>

        {/* Crypto List */}
        <div className="max-h-80 overflow-y-auto">
          {cryptoData.map((crypto) => (
            <motion.div
              key={crypto.symbol}
              className="p-3 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
              onClick={() => setSelectedCrypto(crypto)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{crypto.icon}</span>
                  <div>
                    <div className="text-white font-medium text-sm">{crypto.symbol}</div>
                    {isExpanded && (
                      <div className="text-white/60 text-xs">{crypto.name}</div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-white font-mono text-sm">
                    {formatPrice(crypto.price)}
                  </div>
                  <div className={`text-xs font-medium ${
                    crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formatChange(crypto.change24h)}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 pt-2 border-t border-white/10"
                >
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-white/60">Volume 24h:</span>
                      <div className="text-white">${formatVolume(crypto.volume)}</div>
                    </div>
                    <div>
                      <span className="text-white/60">Market Cap:</span>
                      <div className="text-white">${formatVolume(crypto.marketCap)}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white/5 text-center">
          <div className="text-white/60 text-xs">
            Mis à jour toutes les 3 secondes
          </div>
          <div className="flex justify-center gap-1 mt-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-green-400 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal de détail crypto */}
      <AnimatePresence>
        {selectedCrypto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCrypto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/20 p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{selectedCrypto.icon}</div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {selectedCrypto.name}
                </h2>
                <div className="text-white/60 mb-6">{selectedCrypto.symbol}</div>

                <div className="text-4xl font-mono font-bold text-white mb-2">
                  {formatPrice(selectedCrypto.price)}
                </div>

                <div className={`text-xl font-semibold mb-6 ${
                  selectedCrypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {formatChange(selectedCrypto.change24h)} (24h)
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-white/60 text-sm">Volume 24h</div>
                    <div className="text-white font-semibold">
                      ${formatVolume(selectedCrypto.volume)}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-white/60 text-sm">Market Cap</div>
                    <div className="text-white font-semibold">
                      ${formatVolume(selectedCrypto.marketCap)}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCrypto(null)}
                  className="w-full py-3 bg-blue-500/20 border border-blue-400/30 rounded-xl text-blue-300 hover:bg-blue-500/30 transition-all"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
