"use client";

import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function PolitiqueCookies() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4">
      <Card className="max-w-4xl mx-auto my-8 p-8">
        <Link
          href="/"
          className="inline-block mb-6 text-purple-600 hover:text-purple-800 font-medium"
        >
          ← Retour à l'accueil
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          🍪 Politique de gestion des cookies
        </h1>

        <p className="text-sm text-gray-600 mb-8">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-CA')}
        </p>

        <div className="space-y-8 text-gray-700">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Qu'est-ce qu'un cookie ?
            </h2>
            <p className="mb-3">
              Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, tablette, téléphone)
              lorsque vous visitez un site web. Les cookies permettent au site de mémoriser vos actions et
              préférences sur une période donnée.
            </p>
          </section>

          {/* Cookies utilisés */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Quels cookies utilise VraiÂge ?
            </h2>

            <div className="space-y-6">
              {/* Cookies essentiels */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  1. Cookies essentiels (obligatoires)
                </h3>
                <p className="mb-3 text-blue-900">
                  Ces cookies sont indispensables au fonctionnement du site. Vous ne pouvez pas les refuser.
                </p>
                <div className="bg-white rounded p-3 space-y-2">
                  <div>
                    <p className="font-semibold text-gray-900">cookieConsent</p>
                    <p className="text-sm text-gray-600">
                      Mémorise votre choix concernant les cookies<br/>
                      Durée : 1 an<br/>
                      Fournisseur : VraiÂge
                    </p>
                  </div>
                </div>
              </div>

              {/* Cookies fonctionnels */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                <h3 className="text-xl font-bold text-purple-900 mb-2">
                  2. Cookies fonctionnels
                </h3>
                <p className="mb-3 text-purple-900">
                  Ces cookies permettent d'améliorer les fonctionnalités du site. Vous pouvez les refuser.
                </p>
                <div className="bg-white rounded p-3 space-y-2">
                  <div>
                    <p className="font-semibold text-gray-900">EmailJS</p>
                    <p className="text-sm text-gray-600">
                      Permet l'envoi de messages via le formulaire de contact<br/>
                      Durée : Session (disparaît à la fermeture du navigateur)<br/>
                      Fournisseur : EmailJS (États-Unis)<br/>
                      <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                        Politique de confidentialité EmailJS
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Cookies analytiques */}
              <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  3. Cookies analytiques (actuellement non utilisés)
                </h3>
                <p className="text-gray-700">
                  VraiÂge n'utilise actuellement aucun cookie de suivi, d'analyse ou de publicité.
                  Nous ne suivons pas votre navigation et ne collectons aucune donnée analytique.
                </p>
              </div>
            </div>
          </section>

          {/* Vos droits */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Vos droits et choix
            </h2>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-green-900 mb-2">
                ✓ Vous avez le contrôle
              </h3>
              <ul className="space-y-2 text-green-900">
                <li>• Vous pouvez refuser les cookies fonctionnels sans impact sur l'utilisation de base du site</li>
                <li>• Vous pouvez modifier vos préférences à tout moment en supprimant vos cookies de navigateur</li>
                <li>• Vous pouvez configurer votre navigateur pour bloquer les cookies</li>
              </ul>
            </div>

            <h3 className="font-bold text-gray-900 mb-2">
              Comment gérer vos cookies via votre navigateur :
            </h3>
            <ul className="space-y-2">
              <li>
                <strong>Chrome :</strong>{' '}
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                  Guide de gestion des cookies
                </a>
              </li>
              <li>
                <strong>Firefox :</strong>{' '}
                <a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies-preferences" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                  Guide de gestion des cookies
                </a>
              </li>
              <li>
                <strong>Safari :</strong>{' '}
                <a href="https://support.apple.com/fr-ca/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                  Guide de gestion des cookies
                </a>
              </li>
              <li>
                <strong>Edge :</strong>{' '}
                <a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                  Guide de gestion des cookies
                </a>
              </li>
            </ul>
          </section>

          {/* Conformité */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Conformité légale
            </h2>
            <p className="mb-3">
              VraiÂge respecte la <strong>Loi 25</strong> du Québec sur la protection des renseignements personnels
              ainsi que le <strong>Règlement général sur la protection des données (RGPD)</strong> européen.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-900 mb-2">Principes appliqués :</h3>
              <ul className="space-y-1 text-blue-900">
                <li>✓ Consentement explicite avant tout cookie non essentiel</li>
                <li>✓ Information claire et accessible sur l'utilisation des cookies</li>
                <li>✓ Possibilité de retirer votre consentement à tout moment</li>
                <li>✓ Minimisation des données collectées</li>
                <li>✓ Aucune vente de données personnelles</li>
              </ul>
            </div>
          </section>

          {/* Durée de conservation */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Durée de conservation
            </h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Type de cookie</th>
                  <th className="border border-gray-300 p-3 text-left">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3">Consentement aux cookies</td>
                  <td className="border border-gray-300 p-3">1 an</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">EmailJS (fonctionnel)</td>
                  <td className="border border-gray-300 p-3">Session uniquement</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Transferts internationaux */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Transferts de données
            </h2>
            <p className="mb-3">
              Certains services tiers (comme EmailJS) peuvent être hébergés aux États-Unis.
              Ces transferts sont encadrés par :
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Les clauses contractuelles types de la Commission européenne</li>
              <li>Des garanties de protection équivalentes au RGPD</li>
              <li>Votre consentement explicite lors de l'acceptation des cookies</li>
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Questions ou préoccupations ?
            </h2>
            <p className="mb-3">
              Pour toute question concernant l'utilisation des cookies sur VraiÂge, vous pouvez nous contacter via :
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="font-medium text-purple-900">
                📧 Email : <a href="mailto:admin@ecoutenala.ca" className="text-purple-600 hover:underline">admin@ecoutenala.ca</a>
              </p>
              <p className="text-sm text-purple-800 mt-2">
                Nous nous engageons à répondre à toute demande dans un délai de 30 jours.
              </p>
            </div>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Modifications de cette politique
            </h2>
            <p>
              Cette politique de cookies peut être mise à jour occasionnellement. La date de dernière mise à jour
              est indiquée en haut de cette page. Nous vous encourageons à consulter régulièrement cette page
              pour rester informé de nos pratiques en matière de cookies.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
          >
            ← Retour à VraiÂge
          </Link>
        </div>
      </Card>
    </div>
  );
}
