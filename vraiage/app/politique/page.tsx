import Link from 'next/link';

export default function PolitiquePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors"
        >
          ← Retour
        </Link>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Politique de confidentialité</h1>
          <p className="text-sm text-gray-600 mb-8">Date de dernière mise à jour : 10 octobre 2025</p>

          <div className="space-y-8 text-gray-700">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Responsable de la protection des renseignements personnels</h2>
              <p className="mb-3">Le responsable de la protection des renseignements personnels pour notre calculateur d'âge animal est :</p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-semibold">Responsable : Natacha Barrette</p>
                <p><strong>Contact :</strong> Utilisez le formulaire de contact disponible sur la page d'accueil</p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Collecte et utilisation des renseignements personnels</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">2.1 Renseignements collectés</h3>
              <p className="mb-2">Notre calculateur collecte uniquement les informations suivantes, de manière temporaire et locale :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Nom de votre animal (optionnel)</li>
                <li>Caractéristiques de votre animal (espèce, âge, race, sexe, poids, etc.)</li>
                <li>Préférences de cookies (essentiels, analytiques)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">2.2 Finalités de la collecte</h3>
              <p className="mb-2">Les informations sont utilisées pour :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Calculer l'équivalent en âge humain de votre animal</li>
                <li>Fournir des informations sur l'espérance de vie</li>
                <li>Améliorer l'expérience utilisateur (avec votre consentement pour les cookies analytiques)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">2.3 Base légale</h3>
              <p className="mb-2">Le traitement de vos données repose sur :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Votre consentement explicite</strong> pour les cookies non essentiels</li>
                <li><strong>L'intérêt légitime</strong> pour le fonctionnement du calculateur (cookies essentiels)</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Conservation des données</h2>
              <p className="mb-2"><strong>Aucune donnée n'est conservée sur nos serveurs.</strong> Toutes les informations saisies dans le calculateur sont traitées localement et ne sont jamais transmises à nos serveurs.</p>
              <p>Les préférences de cookies sont stockées localement dans votre navigateur pour une durée maximale de 12 mois.</p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Partage des renseignements</h2>
              <p className="mb-2">Vos renseignements personnels ne sont <strong>jamais partagés, vendus ou loués</strong> à des tiers.</p>
              <p className="mb-2">Si vous utilisez les cookies analytiques (Google Analytics), certaines données anonymisées peuvent être traitées par Google conformément à leur politique de confidentialité.</p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Transfert hors Québec/Canada</h2>
              <p className="mb-2">Si vous consentez aux cookies analytiques (Google Analytics), certaines données peuvent être transférées aux États-Unis (Google Analytics). Ce transfert est effectué avec des garanties appropriées et uniquement avec votre consentement explicite.</p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Cookies et technologies similaires</h2>
              <p className="mb-3">Nous utilisons deux catégories de cookies :</p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">6.1 Cookies essentiels</h3>
              <p className="mb-2">Nécessaires au fonctionnement du site. Ils ne peuvent pas être désactivés.</p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">6.2 Cookies analytiques (optionnels)</h3>
              <p className="mb-2">Google Analytics nous aide à comprendre comment les visiteurs utilisent le site. Ces cookies nécessitent votre consentement explicite.</p>
              <p>Vous pouvez gérer vos préférences à tout moment via la bannière de cookies.</p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Sécurité</h2>
              <p className="mb-2">Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Chiffrement HTTPS/SSL sur toutes les pages</li>
                <li>Headers de sécurité (CSP, X-Frame-Options, HSTS)</li>
                <li>Aucun stockage de données personnelles sur nos serveurs</li>
                <li>Validation et échappement des entrées utilisateur</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Modifications de la politique</h2>
              <p>Nous nous réservons le droit de modifier cette politique de confidentialité. Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour.</p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Contact</h2>
              <p className="mb-3">Pour toute question concernant cette politique de confidentialité, utilisez le formulaire de contact disponible sur la <Link href="/" className="text-blue-600 hover:underline">page d'accueil</Link>.</p>
              <p className="text-sm italic">Nous nous engageons à répondre dans un délai raisonnable conformément à la Loi 25.</p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Commission d'accès à l'information du Québec</h2>
              <p className="mb-3">Si vous estimez que vos droits n'ont pas été respectés, vous pouvez déposer une plainte auprès de :</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold mb-1">Commission d'accès à l'information du Québec</p>
                <p className="text-sm">Site web : www.cai.gouv.qc.ca</p>
                <p className="text-sm">Téléphone : 1 888 528-7741</p>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              Retour au calculateur
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-600 text-sm">
          <div className="space-x-4">
            <Link href="/faq" className="hover:underline">FAQ</Link>
            <span>•</span>
            <Link href="/politique" className="hover:underline">Politique de confidentialité</Link>
            <span>•</span>
            <Link href="/" className="hover:underline">Contact</Link>
          </div>
          <p className="mt-2">© 2025 Tous droits réservés • Conforme à la Loi 25 (Québec)</p>
        </div>
      </div>
    </div>
  );
}
