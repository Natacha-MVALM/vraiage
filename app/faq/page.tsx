"use client";

import { useState } from 'react';
import Link from 'next/link';

const FAQItem = ({ question, answer, icon }: { question: string; answer: React.ReactNode; icon: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-3 text-gray-800 font-medium">
          <span className="text-xl">{icon}</span>
          {question}
        </span>
        <span className="text-2xl text-gray-400">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-gray-700 space-y-3">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white hover:text-white/80 mb-6 transition-colors"
        >
          ← Retour
        </Link>

        <div className="bg-white/95 backdrop-blur rounded-xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">❓</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Foire aux questions</h1>
            <p className="text-gray-600">Tout ce que tu dois savoir sur le calculateur d'âge</p>
          </div>

          <div className="mb-6">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
            >
              🏠 Retour au calculateur
            </Link>
          </div>

          <div className="space-y-3">
            <FAQItem
              icon="📋"
              question="Comment fonctionne le calculateur d'âge ?"
              answer={
                <>
                  <p>Notre calculateur utilise des formules qui prennent en compte plusieurs facteurs biologiques :</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>L'espèce (chat ou chien)</li>
                    <li>La race et la longévité moyenne</li>
                    <li>Le poids et la taille</li>
                    <li>L'environnement de vie</li>
                    <li>Le statut de stérilisation</li>
                  </ul>
                  <p className="mt-3">Contrairement à la règle simpliste "âge × 7", notre méthode reflète le fait que les animaux vieillissent plus rapidement dans leurs premières années, puis le rythme ralenti avec le temps.</p>
                </>
              }
            />

            <FAQItem
              icon="🔬"
              question="Les résultats sont-ils fiables ?"
              answer={
                <>
                  <p className="mb-3">Les résultats dépendent de la qualité des informations que tu fournis. Plus tu es précis dans tes réponses, plus le calcul sera juste !</p>

                  <p className="mb-3">Nos calculs sont basés sur des recherches scientifiques vétérinaires reconnues (AVMA, AAHA, UC Davis, Royal Veterinary College, et autres institutions de référence).</p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mb-3">
                    <p className="font-semibold mb-2">Important :</p>
                    <p>Si tu n'es pas certain d'une information (poids exact, race), fais de ton mieux pour estimer : le résultat restera une bonne approximation.</p>
                  </div>

                  <p className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded text-sm">
                    <strong>Note :</strong> Ces calculs sont basés sur des moyennes statistiques et ne remplacent pas l'avis d'un vétérinaire pour la santé de ton animal.
                  </p>
                </>
              }
            />

            <FAQItem
              icon="⏰"
              question="Mon animal a dépassé son espérance de vie moyenne. Est-ce inquiétant ?"
              answer={
                <>
                  <p className="font-semibold text-lg">Pas du tout ! Au contraire, bravo 🎉</p>
                  <p className="mt-3">L'espérance de vie affichée est une moyenne statistique basée sur des milliers d'animaux - ce n'est pas une date d'expiration ni une limite fixe.</p>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-3">
                    <p className="font-semibold mb-2">La réalité :</p>
                    <ul className="space-y-1">
                      <li>✅ Environ 50% des animaux vivent au-delà de l'espérance moyenne</li>
                      <li>✅ Beaucoup de facteurs influencent la longévité (soins, alimentation, génétique, qualité de vie)</li>
                      <li>✅ Chaque jour supplémentaire est un cadeau à célébrer</li>
                    </ul>
                  </div>

                  <p className="mt-3 bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                    💡 Si ton compagnon a dépassé son espérance moyenne, c'est que tu prends manifestement bien soin de lui. Continue les soins vétérinaires réguliers et adapte son mode de vie à ses besoins de senior.
                  </p>
                </>
              }
            />

            <FAQItem
              icon="🐕"
              question="Pourquoi les résultats sont différents entre races ?"
              answer={
                <>
                  <p>Tous les chiens et chats ne vieillissent pas au même rythme ! Voici pourquoi :</p>

                  <div className="bg-blue-50 rounded-lg p-4 mt-3">
                    <p className="font-semibold mb-2">🐶 Chez les chiens :</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Les petites races (ex: Chihuahua) vieillissent plus lentement et vivent souvent plus longtemps (12-18 ans)</li>
                      <li>Les grandes races (ex: Dogue Allemand) vieillissent plus rapidement et ont une espérance de vie plus courte (8-10 ans)</li>
                      <li>Les races moyennes sont entre les deux</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 mt-3">
                    <p className="font-semibold mb-2">🐱 Chez les chats :</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Les différences entre races sont moins marquées</li>
                      <li>Le mode de vie (intérieur vs extérieur) a un impact majeur</li>
                      <li>Les chats d'intérieur vivent généralement plus longtemps</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="font-semibold mb-2">Pourquoi ces différences ?</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Métabolisme différent selon la taille</li>
                      <li>Vulnérabilité génétique à certaines maladies</li>
                      <li>Problèmes de santé spécifiques à certaines races</li>
                      <li>Sélection d'élevage ayant impacté la longévité</li>
                    </ul>
                  </div>
                </>
              }
            />

            <FAQItem
              icon="❓"
              question="Pourquoi me demander autant de questions ?"
              answer={
                <>
                  <p>Chaque information compte pour obtenir le résultat précis et personnalisé !</p>
                  <p className="mt-2">Voici pourquoi je demande :</p>

                  <div className="space-y-3 mt-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold">La race :</p>
                      <p className="text-sm">Différences génétiques majeures dans le vieillissement</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold">Le poids :</p>
                      <p className="text-sm">Impact direct sur l'espérance de vie (surpoids = risques)</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold">Le type et crâne (chiens) :</p>
                      <p className="text-sm">Les brachycéphales (nez plats) ont des enjeux spécifiques</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold">La stérilisation :</p>
                      <p className="text-sm">Animaux stérilisés vivent généralement plus longtemps</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold">Le mode de vie :</p>
                      <p className="text-sm">Intérieur vs extérieur change radicalement les risques</p>
                    </div>
                  </div>

                  <p className="mt-3 bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                    Sans ces infos, on ne pourrait te donner qu'un calcul approximatif comme les autres calculateurs en ligne. Notre objectif est de te donner le résultat le plus juste possible ! 💙
                  </p>
                </>
              }
            />

            <FAQItem
              icon="💰"
              question="L'application est-elle gratuite ?"
              answer={
                <>
                  <p className="text-lg font-semibold">Oui, le calculateur d'âge est 100% gratuit ! 🎉</p>
                  <p className="mt-3">Utilise-le autant de fois que tu veux, pour tous tes animaux.</p>
                  <p className="mt-3">Notre objectif est de sensibiliser les propriétaires à l'âge réel de leurs compagnons et les aider à mieux comprendre leurs besoins selon leur stade de vie.</p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
                    <p className="font-semibold mb-2">💝 Si ton animal est senior, nous t'invitons également à découvrir notre application d'évaluation de qualité de vie "À l'Écoute de Nala" pour l'assurer de son bien-être optimal.</p>
                  </div>
                </>
              }
            />

            <FAQItem
              icon="🏠"
              question="Mon chat vit à l'intérieur ET à l'extérieur. Que choisir ?"
              answer={
                <>
                  <p>Choisis selon où ton chat passe la majorité de son temps :</p>

                  <div className="space-y-3 mt-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold">Intérieur :</p>
                      <p className="text-sm">Il sort occasionnellement (jardin surveillé, balcon) mais vit principalement dedans</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold">Intérieur/Extérieur :</p>
                      <p className="text-sm">Il a accès libre et passe environ 50% ou plus de son temps dehors</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold">Extérieur :</p>
                      <p className="text-sm">Il passe la majorité de son temps dehors ou vit exclusivement à l'extérieur</p>
                    </div>
                  </div>

                  <p className="mt-3 bg-green-50 border-l-4 border-green-500 p-3 rounded">
                    En cas de doute, choisis "Intérieur-Extérieur" - c'est souvent l'option la plus représentative ! 🐱😸
                  </p>
                </>
              }
            />

            <FAQItem
              icon="⚖️"
              question="Je ne connais pas le poids exact de mon animal. Que faire ?"
              answer={
                <>
                  <p>Pas de panique ! Voici comment estimer :</p>

                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="font-semibold mb-2">Quelques astuces :</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Compare-le avec des animaux de sa race que tu connais le poids (voisin, ami)</li>
                      <li>Regarde le poids moyen de sa race en ligne</li>
                      <li>En clinique vétérinaire, la plupart ont une balance - demande lors de la prochaine visite !</li>
                      <li>Une approximation fonctionne très bien ! Le résultat restera précis à quelques mois près.</li>
                    </ul>
                  </div>
                </>
              }
            />

            <FAQItem
              icon="🐾"
              question="Je peux calculer l'âge de plusieurs animaux ?"
              answer={
                <>
                  <p className="text-lg">Absolument ! Tu peux utiliser le calculateur autant de fois que tu veux.</p>
                  <p className="mt-3">Après avoir obtenu les résultats d'un animal, clique simplement sur "Nouveau calcul" et recommence pour un autre compagnon. 🐕🐈</p>
                </>
              }
            />

            <FAQItem
              icon="💎"
              question="Les résultats remplacent-ils l'avis d'un vétérinaire ?"
              answer={
                <>
                  <p className="font-semibold text-lg">Non, absolument pas.</p>
                  <p className="mt-3">Notre calculateur est un outil éducatif pour mieux comprendre l'âge de ton animal, identifier à quel stade de vie il se trouve (junior, adulte, senior) et adapter tes soins en conséquence.</p>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-4">
                    <p className="font-semibold mb-2">Il ne remplace pas :</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Un examen vétérinaire</li>
                      <li>Un diagnostic médical</li>
                      <li>Des conseils de santé personnalisés</li>
                    </ul>
                  </div>

                  <p className="mt-3">Si tu as des inquiétudes sur la santé de ton compagnon, consulte toujours un vétérinaire 💙</p>
                </>
              }
            />

            <FAQItem
              icon="🎓"
              question="Un outil éducatif, pas médical"
              answer={
                <>
                  <p>Tu te demandes peut-être : "Si une vétérinaire a créé cette app, pourquoi ne pas inclure les maladies ?"</p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-3">
                    <p className="font-semibold mb-2">Bonne question ! Malgré que je sois médecin vétérinaire, il n'est pas approprié ni légal de faire des estimations d'espérance de vie basées sur des maladies qu'un animal peut avoir.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="font-semibold mb-2">Pourquoi ?</p>
                    <p>Parce qu'évaluer l'impact d'une maladie sur un animal spécifique nécessite bien plus qu'un questionnaire en ligne. Ça demande :</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Un examen physique complet</li>
                      <li>L'historique médical détaillé</li>
                      <li>Parfois des tests diagnostiques</li>
                      <li>Une relation de confiance vétérinaire-client</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
                    <p className="italic">VraiÂge te donne un point de référence général. Pour tout ce qui touche la santé spécifique de ton animal, c'est ton vétérinaire traitant qui reste la meilleure ressource. 💙</p>
                  </div>
                </>
              }
            />

            <FAQItem
              icon="🐕"
              question="L'application fonctionne-t-elle pour toutes les races ?"
              answer={
                <>
                  <p>Oui ! Notre base de données inclut :</p>

                  <div className="bg-blue-50 rounded-lg p-4 mt-3">
                    <p className="font-semibold mb-2">🐶 Chiens :</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Plusieurs races reconnues ayant des données spécifiques</li>
                      <li>Catégories par taille (petite, moyenne, grande, géante)</li>
                      <li>Option "Race inconnue" ou "Croisé"</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 mt-3">
                    <p className="font-semibold mb-2">🐱 Chats :</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Races principales reconnues</li>
                      <li>Option "Race inconnue" (la majorité des chats)</li>
                      <li>Distinction intérieur/extérieur (plus important que la race pour les chats)</li>
                    </ul>
                  </div>

                  <p className="mt-3 bg-gray-50 border-l-4 border-gray-400 p-3 rounded">
                    Si ta race spécifique n'est pas listée, sélectionne "Race inconnue". Le calcul utilisera alors des catégories de poids pour estimer l'âge, ce qui reste très fiable ! 🐾
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mt-3">
                    <p className="font-semibold mb-2">Note importante :</p>
                    <p className="text-sm">Lorsque les données spécifiques à une race ne sont pas disponibles, notre calculateur utilise des catégories basées sur le poids et la taille pour fournir une estimation basée sur des moyennes statistiques pour des animaux similaires.</p>
                  </div>
                </>
              }
            />

            <FAQItem
              icon="⚖️"
              question="Pourquoi seul le surpoids est pris en compte dans le calcul ?"
              answer={
                <>
                  <p className="font-semibold mb-3">Bonne observation !</p>

                  <p className="mb-3">
                    La maigreur chez un animal peut avoir des causes très variées : vieillissement naturel, métabolisme rapide, maladie sous-jacente, ou simplement génétique.
                    Sans examen vétérinaire, il est impossible de savoir si un poids faible est préoccupant ou normal pour cet animal.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-3 mb-3">
                    <p className="font-semibold mb-2 text-blue-900">Le surpoids, c'est différent :</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-900">
                      <li>Facteur de risque modifiable (alimentation, mode de vie)</li>
                      <li>Impact direct et mesurable sur l'espérance de vie</li>
                      <li>Bien documenté scientifiquement, peu importe la cause</li>
                      <li>État chronique stable qu'on peut évaluer objectivement</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <p className="font-semibold mb-2 text-yellow-900">⚠️ Important :</p>
                    <p className="text-yellow-900">
                      Si ton animal est très maigre, <strong>consulte ton vétérinaire</strong> pour écarter toute condition médicale.
                      La maigreur peut être un symptôme qui nécessite une évaluation professionnelle.
                    </p>
                  </div>

                  <p className="mt-3 text-sm text-gray-600 italic">
                    💡 En ne pénalisant pas la maigreur dans nos calculs, nous évitons de créer de fausses inquiétudes
                    pour les animaux naturellement minces ou seniors en santé qui perdent du poids physiologiquement.
                  </p>
                </>
              }
            />

            <FAQItem
              icon="🔒"
              question="Mes données sont-elles sauvegardées ?"
              answer={
                <>
                  <p className="font-semibold">Non, et c'est voulu !</p>
                  <p className="mt-2">Nous ne sauvegardons aucune donnée personnelle ou information sur ton animal. Tout est calculé en temps réel et rien n'est stocké.</p>

                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="font-semibold mb-2">Pourquoi ?</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Respect de ta vie privée</li>
                      <li>Pas besoin de compte ou connexion</li>
                      <li>Utilisation simple et rapide</li>
                    </ul>
                  </div>

                  <p className="mt-3">Si tu veux garder les résultats, on te suggère de :</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Prendre une capture d'écran</li>
                    <li>Noter les informations</li>
                    <li>Partager les résultats avec ton vétérinaire si pertinent</li>
                  </ul>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mt-3">
                    <p className="text-sm italic">🔒 Ta vie privée et celle de ton animal sont importantes pour nous.</p>
                  </div>
                </>
              }
            />

            <FAQItem
              icon="🚀"
              question="Y a-t-il d'autres outils pour accompagner mon animal ?"
              answer={
                <>
                  <p className="font-semibold text-lg mb-3">Oui ! VraiÂge fait partie d'un écosystème d'outils pour mieux accompagner ton compagnon.</p>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mt-3">
                    <p className="font-semibold mb-2 text-blue-900">🎯 À l'Écoute de Nala</p>
                    <p className="mb-2 text-blue-800">Une fois que tu connais l'âge de ton compagnon, tu peux aller plus loin avec notre application d'évaluation de qualité de vie pour animaux seniors :</p>
                    <ul className="space-y-2 text-blue-800">
                      <li>✅ Évaluer la qualité de vie de ton compagnon</li>
                      <li>✅ Suivre son évolution dans le temps</li>
                    </ul>
                    <a
                      href="https://www.ecoutenala.ca"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                    >
                      Découvrir À l'Écoute de Nala →
                    </a>
                  </div>

                  <p className="mt-4 text-sm italic">Les deux outils se complètent pour t'accompagner tout au long du parcours de ton compagnon. 💙</p>
                </>
              }
            />

            <FAQItem
              icon="💝"
              question="Comment puis-je soutenir le projet ?"
              answer={
                <>
                  <p>Tu peux nous aider de plusieurs façons :</p>

                  <div className="space-y-3 mt-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold">📢 Gratuitement :</p>
                      <ul className="list-disc list-inside mt-1 text-sm space-y-1">
                        <li>Partage l'application à ta famille et tes amis</li>
                        <li>Laisse-nous un commentaire ou avis</li>
                        <li>Partage tes résultats sur les réseaux sociaux</li>
                        <li>Signale les bugs ou suggère des améliorations</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="font-semibold">💙 En utilisant nos services :</p>
                      <ul className="list-disc list-inside mt-1 text-sm space-y-1">
                        <li>Teste notre application "À l'Écoute de Nala" quand elle sera lancée</li>
                        <li>Recommande-nous à tes amis propriétaires d'animaux seniors</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-pink-500 p-4 rounded mt-4">
                    <p className="font-semibold">Chaque partage nous aide énormément à faire la différence !</p>
                    <p className="mt-2">Merci de faire partie de l'aventure 🙏💝</p>
                  </div>
                </>
              }
            />
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Tu as d'autres questions ?</h2>
            <p className="mb-4">N'hésite pas à nous contacter ou à commencer ton calcul dès maintenant !</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                href="/"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all"
              >
                📱 Calculer l'âge
              </Link>
              <button
                onClick={() => {
                  // Will be implemented with contact modal
                  alert('Formulaire de contact à venir !');
                }}
                className="bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-300 transition-all"
              >
                📧 Nous contacter
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-white text-sm">
          <p>Calculateur d'âge animal • Les résultats sont basés sur des moyennes vétérinaires</p>
          <div className="mt-2 space-x-4">
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
