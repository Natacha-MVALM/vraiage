"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      functional: true,
      analytics: false, // Pas d'analytics pour l'instant
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const acceptNecessaryOnly = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      functional: false,
      analytics: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center p-4 z-[100]">
      <div className="bg-white rounded-t-2xl shadow-2xl max-w-4xl w-full p-6 animate-slide-up">
        <div className="flex items-start gap-4 mb-4">
          <div className="text-4xl">🍪</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Nous respectons votre vie privée
            </h2>
            <p className="text-gray-700 mb-3">
              VraiÂge utilise des cookies essentiels pour assurer le bon fonctionnement de l'application et améliorer votre expérience. Aucune donnée personnelle n'est vendue ou partagée avec des tiers.
            </p>

            {showDetails && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <input type="checkbox" checked disabled className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Cookies essentiels (obligatoires)</p>
                    <p className="text-sm text-gray-600">
                      Nécessaires au fonctionnement de base du site. Stockage de vos préférences et sécurité.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <input type="checkbox" checked disabled className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Cookies fonctionnels</p>
                    <p className="text-sm text-gray-600">
                      Permettent d'envoyer des messages via le formulaire de contact (EmailJS). Aucun suivi publicitaire.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <input type="checkbox" disabled className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Cookies analytiques (désactivés)</p>
                    <p className="text-sm text-gray-600">
                      Nous n'utilisons actuellement aucun cookie de suivi ou d'analyse.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-purple-600 hover:text-purple-800 text-sm font-medium mb-3"
            >
              {showDetails ? '▲ Masquer les détails' : '▼ Voir les détails'}
            </button>

            <p className="text-sm text-gray-600">
              En cliquant sur "Accepter", vous consentez à l'utilisation des cookies essentiels et fonctionnels.
              Consultez notre <Link href="/politique-cookies" className="text-purple-600 hover:underline font-medium">politique de cookies</Link> pour plus d'informations.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={acceptNecessaryOnly}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cookies essentiels uniquement
          </button>
          <button
            onClick={acceptAll}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
          >
            Accepter tous les cookies
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Conforme à la Loi 25 (Québec) et au RGPD
        </p>
      </div>
    </div>
  );
}
