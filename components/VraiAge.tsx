"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

const VraiAge = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentPet, setCurrentPet] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loadingMessage, setLoadingMessage] = useState('');
  const [result, setResult] = useState<any>(null);
  const [showLifeExpectancy, setShowLifeExpectancy] = useState(false);
  const [ageCounter, setAgeCounter] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showDelayedContent, setShowDelayedContent] = useState(false);
  const [showWeightHelper, setShowWeightHelper] = useState(false);
  const [showBodyScoreHelper, setShowBodyScoreHelper] = useState(false);
  const [weightUnit, setWeightUnit] = useState('kg');
  const [showAgeError, setShowAgeError] = useState(false);
  const [showLifeExpectancyInfo, setShowLifeExpectancyInfo] = useState(false);

  // Messages de chargement
  const loadingMessages: Record<string, string[]> = {
    cat: [
      "Ton chat fait ses griffes pendant qu'on analyse son ADN félin... 🐾",
      "Consultation de l'oracle des moustaches en cours... 🔮",
      "Traduction du langage ronron vers l'humain... 😸"
    ],
    dog: [
      "Ton chien remue la queue pendant qu'on calcule son âge exact... 🐕",
      "Analyse des pattes et de la truffe en cours... 🐾",
      "Décodage du langage canin vers l'humain... 🐶"
    ]
  };

  // Phrases humoristiques originales de VraiÂge
  const funPhrases = [
    { max: 3, text: "serait à la garderie en train de faire des siestes", icon: "🍼" },
    { max: 6, text: "apprendrait à compter jusqu'à 10", icon: "🎈" },
    { max: 10, text: "jouerait aux billes dans la cour d'école", icon: "⚽" },
    { max: 13, text: "découvrirait les joies de TikTok", icon: "📱" },
    { max: 16, text: "aurait son premier crush au secondaire", icon: "💕" },
    { max: 18, text: "étudierait pour son permis de conduire", icon: "🚗" },
    { max: 21, text: "fêterait sa majorité dans tous les pays", icon: "🎉" },
    { max: 25, text: "terminerait ses études universitaires", icon: "🎓" },
    { max: 30, text: "penserait à s'acheter un condo", icon: "🏠" },
    { max: 35, text: "jonglerait entre carrière et vie de famille", icon: "💼" },
    { max: 40, text: "commencerait à avoir mal au dos", icon: "😅" },
    { max: 45, text: "dirait 'c'était mieux dans mon temps'", icon: "📻" },
    { max: 50, text: "planifierait déjà sa retraite anticipée", icon: "🏖️" },
    { max: 55, text: "serait grand-parent gâteau", icon: "👴" },
    { max: 60, text: "profiterait de ses REER bien mérités", icon: "💰" },
    { max: 65, text: "jouerait au golf tous les matins", icon: "⛳" },
    { max: 70, text: "raconterait ses histoires pour la 100e fois", icon: "📖" },
    { max: 75, text: "serait la vedette du bingo du jeudi", icon: "🎱" },
    { max: 80, text: "aurait une collection impressionnante de piluliers", icon: "💊" },
    { max: 85, text: "ferait des marathons de mots croisés", icon: "📰" },
    { max: 90, text: "serait une encyclopédie vivante", icon: "📚" },
    { max: 95, text: "aurait vu passer trois générations", icon: "👨‍👩‍👧‍👦" },
    { max: 100, text: "recevrait une lettre de la Reine", icon: "👑" },
    { max: 999, text: "entrerait dans le livre des records", icon: "🏆" }
  ];

  // Données races chats avec espérance de vie
  const catBreeds = [
    { value: 'mixed', name: 'Croisé (gouttière)', lifespan: 15 },
    { value: 'birman', name: 'Birman', lifespan: 16.1 },
    { value: 'burmese', name: 'Burmese', lifespan: 14.3 },
    { value: 'siamese', name: 'Siamois', lifespan: 14.2 },
    { value: 'persian', name: 'Persan', lifespan: 14.1 },
    { value: 'british-shorthair', name: 'British Shorthair', lifespan: 11.8 },
    { value: 'maine-coon', name: 'Maine Coon', lifespan: 11 },
    { value: 'ragdoll', name: 'Ragdoll', lifespan: 10.1 },
    { value: 'abyssinian', name: 'Abyssin', lifespan: 10 },
    { value: 'bengal', name: 'Bengal', lifespan: 14 },
    { value: 'sphynx', name: 'Sphynx', lifespan: 7 },
    { value: 'russian-blue', name: 'Bleu Russe', lifespan: 16 },
    { value: 'scottish-fold', name: 'Scottish Fold', lifespan: 13 },
    { value: 'other', name: 'Autre race', lifespan: 14 }
  ];

  // Données races chiens avec espérance de vie
  const dogBreeds = [
    { value: 'mixed', name: 'Croisé', lifespan: 12.71, size: 'medium' },
    { value: 'teckel', name: 'Teckel', lifespan: 15.2, size: 'small' },
    { value: 'chihuahua', name: 'Chihuahua', lifespan: 15.01, size: 'small' },
    { value: 'shih-tzu', name: 'Shih Tzu', lifespan: 15.08, size: 'small' },
    { value: 'yorkshire', name: 'Yorkshire', lifespan: 15, size: 'small' },
    { value: 'jack-russell', name: 'Jack Russell', lifespan: 15, size: 'small' },
    { value: 'caniche', name: 'Caniche', lifespan: 14.2, size: 'medium' },
    { value: 'beagle', name: 'Beagle', lifespan: 14, size: 'medium' },
    { value: 'cocker', name: 'Cocker', lifespan: 13, size: 'medium' },
    { value: 'labrador', name: 'Labrador', lifespan: 13.27, size: 'large' },
    { value: 'golden-retriever', name: 'Golden Retriever', lifespan: 13.93, size: 'large' },
    { value: 'berger-allemand', name: 'Berger Allemand', lifespan: 12.46, size: 'large' },
    { value: 'husky', name: 'Husky', lifespan: 13, size: 'large' },
    { value: 'bulldog-francais', name: 'Bouledogue Français', lifespan: 10, size: 'medium' },
    { value: 'boxer', name: 'Boxer', lifespan: 10, size: 'large' },
    { value: 'dogue-allemand', name: 'Dogue Allemand', lifespan: 9.63, size: 'giant' },
    { value: 'saint-bernard', name: 'Saint-Bernard', lifespan: 9, size: 'giant' },
    { value: 'dogue-bordeaux', name: 'Dogue de Bordeaux', lifespan: 5.5, size: 'giant' },
    { value: 'other', name: 'Autre race', lifespan: 12, size: 'medium' }
  ];

  // Intervalles de poids pour chiens
  const dogWeightRanges = [
    { range: 'under-5', label: 'Moins de 11 lbs (5 kg)', visual: '🐕 Très petit (Chihuahua, Yorkshire)', avgWeight: 3, size: 'small' },
    { range: '5-10', label: '11-22 lbs (5-10 kg)', visual: '🐕 Petit (Jack Russell, Teckel)', avgWeight: 7.5, size: 'small' },
    { range: '10-15', label: '22-33 lbs (10-15 kg)', visual: '🐕 Petit-Moyen (Cocker, Beagle)', avgWeight: 12.5, size: 'medium' },
    { range: '15-25', label: '33-55 lbs (15-25 kg)', visual: '🐕 Moyen (Bulldog, Border Collie)', avgWeight: 20, size: 'medium' },
    { range: '25-40', label: '55-88 lbs (25-40 kg)', visual: '🐕 Grand (Labrador, Golden)', avgWeight: 32.5, size: 'large' },
    { range: '40-60', label: '88-132 lbs (40-60 kg)', visual: '🐕 Très Grand (Berger Allemand, Boxer)', avgWeight: 50, size: 'large' },
    { range: 'over-60', label: 'Plus de 132 lbs (60 kg)', visual: '🐕 Géant (Dogue Allemand, St-Bernard)', avgWeight: 70, size: 'giant' }
  ];

  // Score corporel avec visuels
  const bodyScores = [
    {
      value: 'very-thin',
      label: 'Très maigre',
      description: 'Côtes, colonne et os du bassin très visibles',
      emoji: '🦴'
    },
    {
      value: 'thin',
      label: 'Maigre',
      description: 'Côtes facilement visibles, taille marquée',
      emoji: '📏'
    },
    {
      value: 'ideal',
      label: 'Idéal',
      description: 'Côtes palpables, taille visible de dessus',
      emoji: '✅'
    },
    {
      value: 'overweight',
      label: 'Surpoids',
      description: 'Côtes difficiles à palper, taille peu visible',
      emoji: '🎈'
    },
    {
      value: 'obese',
      label: 'Obèse',
      description: 'Côtes non palpables, abdomen distendu',
      emoji: '🔴'
    }
  ];

  const getFunPhrase = (age: number) => {
    return funPhrases.find(p => age <= p.max) || funPhrases[funPhrases.length - 1];
  };

  const formatAgeWithMonths = (ageInYears: number) => {
    const years = Math.floor(ageInYears);
    const months = Math.round((ageInYears - years) * 12);

    if (months === 0) {
      return `${years} ${years < 2 ? 'an' : 'ans'}`;
    } else if (months === 12) {
      return `${years + 1} ${years + 1 < 2 ? 'an' : 'ans'}`;
    } else {
      return `${years} ${years < 2 ? 'an' : 'ans'} ${months} mois`;
    }
  };

  const getWeightRangeLabel = () => {
    if (!formData.dogWeightRange) return '';
    const range = dogWeightRanges.find(r => r.range === formData.dogWeightRange);
    return range ? range.label : '';
  };

  const convertWeight = (weight: number, fromUnit: string) => {
    if (fromUnit === 'lbs') {
      return weight * 0.453592;
    }
    return weight;
  };

  const calculateCatAge = () => {
    const years = parseFloat(formData.catYears) || 0;
    const months = parseFloat(formData.catMonths) || 0;
    const age = years + (months / 12);
    const lifestyle = formData.catLifestyle || 'indoor';
    const sex = formData.catSex || 'male';
    const breed = formData.catBreed || 'mixed';
    const bodyScore = formData.catBody || 'ideal';
    const neutered = formData.catNeutered === 'yes';

    let humanAge;
    if (age <= 1) {
      humanAge = age * 15;
    } else if (age <= 2) {
      humanAge = 15 + (age - 1) * 9;
    } else {
      humanAge = 24 + (age - 2) * 4;
    }

    const lifestyleMultipliers: Record<string, number> = {
      'indoor': 1.0,
      'mixed': 1.05,
      'outdoor': 1.15
    };

    humanAge = humanAge * lifestyleMultipliers[lifestyle];

    const breedData = catBreeds.find(b => b.value === breed);
    let lifeExpectancy = breedData ? breedData.lifespan : 15;

    if (lifestyle === 'outdoor') lifeExpectancy -= 5;
    else if (lifestyle === 'mixed') lifeExpectancy -= 2;

    const bodyScoreMultipliers: Record<string, number> = {
      'very-thin': 0.85,
      'thin': 0.90,
      'ideal': 1.0,
      'overweight': 0.90,
      'obese': 0.80
    };
    lifeExpectancy = lifeExpectancy * bodyScoreMultipliers[bodyScore];

    if (neutered) {
      lifeExpectancy += 2;
    }

    if (breed === 'mixed') {
      lifeExpectancy += 1.5;
    }

    if (sex === 'female') {
      lifeExpectancy += 1;
    }

    lifeExpectancy = Math.round(lifeExpectancy * 10) / 10;
    humanAge = Math.round(humanAge);
    const interval = [Math.round(humanAge * 0.9), Math.round(humanAge * 1.1)];

    let lifeStage = '';
    if (age < 0.5) lifeStage = '🍼 Chaton';
    else if (age <= 2) lifeStage = '⚡ Junior';
    else if (age <= 6) lifeStage = '💪 Adulte';
    else if (age <= 10) lifeStage = '🎯 Mature';
    else if (age <= 14) lifeStage = '🧘 Senior';
    else lifeStage = '👑 Doyen';

    const lifePercentage = Math.min(100, Math.round((age / lifeExpectancy) * 100));

    return {
      name: formData.catName || 'Ton chat',
      age,
      humanAge,
      interval,
      lifeStage,
      lifeExpectancy,
      lifePercentage,
      isSenior: age >= 10,
      pet: 'chat',
      sex,
      isFemale: sex === 'female'
    };
  };

  const calculateDogAge = () => {
    const years = parseFloat(formData.dogYears) || 0;
    const months = parseFloat(formData.dogMonths) || 0;
    const age = years + (months / 12);

    let weight;
    if (formData.dogWeightRange) {
      const range = dogWeightRanges.find(r => r.range === formData.dogWeightRange);
      weight = range ? range.avgWeight : 20;
    } else if (formData.dogWeight) {
      weight = convertWeight(parseFloat(formData.dogWeight), weightUnit);
    } else {
      weight = 20;
    }

    const sex = formData.dogSex || 'male';
    const breed = formData.dogBreed || 'mixed';
    const bodyScore = formData.dogBody || 'ideal';
    const neutered = formData.dogNeutered === 'yes';

    let sizeCategory;
    if (weight < 5) sizeCategory = 'small';
    else if (weight < 15) sizeCategory = 'small';
    else if (weight < 40) sizeCategory = 'medium';
    else if (weight < 90) sizeCategory = 'large';
    else sizeCategory = 'giant';

    let humanAge = age > 0 ? 16 * Math.log(age) + 31 : 0;

    const sizeMultipliers: Record<string, number> = {
      'small': 1.2,
      'medium': 1.0,
      'large': 0.85,
      'giant': 0.75
    };

    humanAge = humanAge * sizeMultipliers[sizeCategory];

    if (humanAge < 0) humanAge = 0;
    humanAge = Math.round(humanAge);
    const interval = [Math.round(humanAge * 0.85), Math.round(humanAge * 1.15)];

    let lifeStage = '';
    if (age < 1) lifeStage = '🍼 Chiot';
    else if (age <= 3) lifeStage = '⚡ Jeune adulte';
    else if (age <= 6) lifeStage = '💪 Adulte';
    else if (age <= 8) lifeStage = '🎯 Mature';
    else if (age <= 10) lifeStage = '🧘 Senior';
    else lifeStage = '👑 Doyen';

    const breedData = dogBreeds.find(b => b.value === breed);
    let lifeExpectancy = breedData ? breedData.lifespan : 12;

    const bodyScoreMultipliers: Record<string, number> = {
      'very-thin': 0.85,
      'thin': 0.90,
      'ideal': 1.15,
      'overweight': 0.95,
      'obese': 0.85
    };
    lifeExpectancy = lifeExpectancy * bodyScoreMultipliers[bodyScore];

    if (neutered) {
      lifeExpectancy += 1.5;
    }

    if (breed === 'mixed') {
      lifeExpectancy += 0.5;
    }

    lifeExpectancy = Math.round(lifeExpectancy * 10) / 10;

    const lifePercentage = Math.min(100, Math.round((age / lifeExpectancy) * 100));

    return {
      name: formData.dogName || 'Ton chien',
      age,
      humanAge,
      interval,
      lifeStage,
      lifeExpectancy,
      lifePercentage,
      isSenior: lifePercentage >= 75,
      pet: 'chien',
      sex,
      isFemale: sex === 'female'
    };
  };

  const validateAge = () => {
    const years = parseFloat(currentPet === 'cat' ? formData.catYears : formData.dogYears) || 0;
    const months = currentPet === 'cat' ? formData.catMonths : formData.dogMonths;

    if (years < 2 && (months === undefined || months === '' || months === null)) {
      setShowAgeError(true);
      setTimeout(() => setShowAgeError(false), 4000);
      return false;
    }
    return true;
  };

  const validateForm = () => {
    if (currentPet === 'cat') {
      if (!formData.catYears && formData.catYears !== 0) {
        alert('⚠️ Veuillez indiquer l\'âge de votre chat');
        return false;
      }
      if (!formData.catBreed) {
        alert('⚠️ Veuillez sélectionner une race');
        return false;
      }
      if (!formData.catSex) {
        alert('⚠️ Veuillez indiquer le sexe de votre chat');
        return false;
      }
      if (!formData.catNeutered) {
        alert('⚠️ Veuillez indiquer si votre chat est stérilisé');
        return false;
      }
      if (!formData.catLifestyle) {
        alert('⚠️ Veuillez sélectionner le mode de vie');
        return false;
      }
      if (!formData.catBody) {
        alert('⚠️ Veuillez sélectionner l\'état corporel');
        return false;
      }
    } else {
      if (!formData.dogYears && formData.dogYears !== 0) {
        alert('⚠️ Veuillez indiquer l\'âge de votre chien');
        return false;
      }
      if (!formData.dogBreed) {
        alert('⚠️ Veuillez sélectionner une race');
        return false;
      }
      if (!formData.dogWeight && !formData.dogWeightRange) {
        alert('⚠️ Veuillez indiquer le poids de votre chien');
        return false;
      }
      if (!formData.dogSex) {
        alert('⚠️ Veuillez indiquer le sexe de votre chien');
        return false;
      }
      if (!formData.dogNeutered) {
        alert('⚠️ Veuillez indiquer si votre chien est stérilisé');
        return false;
      }
      if (!formData.dogBody) {
        alert('⚠️ Veuillez sélectionner l\'état corporel');
        return false;
      }
    }
    return true;
  };

  const handleCalculate = () => {
    if (!validateForm()) return;
    if (!validateAge()) return;

    setCurrentPage('loading');
    setShowDelayedContent(false);

    const messages = loadingMessages[currentPet!];
    let messageIndex = 0;
    setLoadingMessage(messages[0]);

    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 2500);

    setTimeout(() => {
      clearInterval(messageInterval);
      const calculationResult = currentPet === 'cat' ? calculateCatAge() : calculateDogAge();
      setResult(calculationResult);
      setCurrentPage('result');

      let counter = 0;
      const targetAge = calculationResult.humanAge;
      const increment = targetAge / 50;

      const counterInterval = setInterval(() => {
        counter += increment;
        if (counter >= targetAge) {
          counter = targetAge;
          clearInterval(counterInterval);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
          setTimeout(() => setShowDelayedContent(true), 2000);
        }
        setAgeCounter(Math.round(counter));
      }, 40);
    }, 7000);
  };

  const handleShare = (platform: string) => {
    if (!result) return;

    let text = `${result.name} a ${result.humanAge} ${result.humanAge < 2 ? 'an' : 'ans'} en âge humain ! 🎉`;

    if (showLifeExpectancy) {
      text += ` Son espérance de vie est de ${formatAgeWithMonths(result.lifeExpectancy)}. Découvrez l'âge de votre animal sur VraiÂge !`;
    }

    const url = typeof window !== 'undefined' ? window.location.href : '';

    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' #VraiAge')}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Lien copié ! 📋');
        break;
    }
  };

  // Composant Confetti
  const Confetti = () => {
    const confettiPieces = Array.from({ length: 100 }, (_, i) => {
      const angle = (i / 100) * 2 * Math.PI;
      const velocity = 150 + Math.random() * 100;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity;
      const rotation = Math.random() * 360;
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      return (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            left: '50%',
            top: '50%',
            transform: `rotate(${rotation}deg)`,
            animation: `confetti-fall-${i} 2s ease-out forwards`,
          }}
        />
      );
    });

    return (
      <>
        <style>
          {Array.from({ length: 100 }, (_, i) => {
            const angle = (i / 100) * 2 * Math.PI;
            const velocity = 150 + Math.random() * 100;
            const x = Math.cos(angle) * velocity;
            const y = Math.sin(angle) * velocity;

            return `
              @keyframes confetti-fall-${i} {
                0% {
                  transform: translate(0, 0) rotate(0deg);
                  opacity: 1;
                }
                100% {
                  transform: translate(${x}px, ${y}px) rotate(720deg);
                  opacity: 0;
                }
              }
            `;
          }).join('')}
        </style>
        <div className="fixed inset-0 pointer-events-none z-50">
          {confettiPieces}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-4 flex items-center justify-center">
      {showConfetti && <Confetti />}

      <Card className="w-full max-w-2xl p-8 bg-white/95 backdrop-blur shadow-2xl">
        {currentPage === 'home' && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Quel est le <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">VRAI âge</span> de ton compagnon ?
              </h1>
              <p className="text-gray-600">Calcul personnalisé basé sur les données scientifiques actuelles</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => {setCurrentPet('cat'); setCurrentPage('catForm');}}
                className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:scale-105 transition-transform border-2 border-transparent hover:border-purple-400"
              >
                <div className="text-6xl mb-4">🐱</div>
                <div className="text-xl font-semibold">Chat</div>
              </button>

              <button
                onClick={() => {setCurrentPet('dog'); setCurrentPage('dogForm');}}
                className="p-8 bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl hover:scale-105 transition-transform border-2 border-transparent hover:border-orange-400"
              >
                <div className="text-6xl mb-4">🐕</div>
                <div className="text-xl font-semibold">Chien</div>
              </button>
            </div>
          </div>
        )}

        {currentPage === 'catForm' && (
          <div className="space-y-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-purple-600 hover:text-purple-800 mb-4"
            >
              ← Retour
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">Mon Chat 🐱</h2>

            <div>
              <label className="block mb-2 font-semibold">Nom de ton chat</label>
              <input
                type="text"
                className="w-full p-3 border-2 rounded-lg focus:border-purple-500 outline-none"
                placeholder="Ex: Minou"
                onChange={(e) => setFormData({...formData, catName: e.target.value})}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Âge</label>
              <p className="text-sm text-gray-600 mb-2 italic">Exemple: 1 an 3 mois</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm">Année(s)</label>
                  <input
                    type="number"
                    className="w-full p-3 border-2 rounded-lg focus:border-purple-500 outline-none"
                    placeholder="0"
                    min="0"
                    onChange={(e) => setFormData({...formData, catYears: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">
                    Mois {(formData.catYears === undefined || formData.catYears === '' || parseFloat(formData.catYears) < 2) && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="number"
                    className="w-full p-3 border-2 rounded-lg focus:border-purple-500 outline-none"
                    placeholder="0"
                    min="0"
                    max="11"
                    onChange={(e) => setFormData({...formData, catMonths: e.target.value})}
                  />
                </div>
              </div>
              {showAgeError && (
                <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  ⚠️ Pour un animal de moins de 2 ans, les mois sont obligatoires pour un calcul précis.
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 font-semibold">Race</label>
              <select
                className="w-full p-3 border-2 rounded-lg focus:border-purple-500 outline-none"
                onChange={(e) => setFormData({...formData, catBreed: e.target.value})}
                defaultValue=""
              >
                <option value="">Choisir une race</option>
                {catBreeds.map(breed => (
                  <option key={breed.value} value={breed.value}>{breed.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Sexe</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({...formData, catSex: 'male'})}
                  className={`p-3 rounded-lg border-2 transition-all ${formData.catSex === 'male' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent' : 'border-gray-300'}`}
                >
                  Mâle
                </button>
                <button
                  onClick={() => setFormData({...formData, catSex: 'female'})}
                  className={`p-3 rounded-lg border-2 transition-all ${formData.catSex === 'female' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent' : 'border-gray-300'}`}
                >
                  Femelle
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Stérilisé(e) ?</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({...formData, catNeutered: 'yes'})}
                  className={`p-3 rounded-lg border-2 transition-all ${formData.catNeutered === 'yes' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent' : 'border-gray-300'}`}
                >
                  Oui
                </button>
                <button
                  onClick={() => setFormData({...formData, catNeutered: 'no'})}
                  className={`p-3 rounded-lg border-2 transition-all ${formData.catNeutered === 'no' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent' : 'border-gray-300'}`}
                >
                  Non
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Mode de vie</label>
              <div className="space-y-2">
                <button
                  onClick={() => setFormData({...formData, catLifestyle: 'indoor'})}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${formData.catLifestyle === 'indoor' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent' : 'border-gray-300'}`}
                >
                  🏠 Intérieur seulement
                </button>
                <button
                  onClick={() => setFormData({...formData, catLifestyle: 'mixed'})}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${formData.catLifestyle === 'mixed' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent' : 'border-gray-300'}`}
                >
                  🚪 Intérieur/Extérieur
                </button>
                <button
                  onClick={() => setFormData({...formData, catLifestyle: 'outdoor'})}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${formData.catLifestyle === 'outdoor' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent' : 'border-gray-300'}`}
                >
                  🌳 Extérieur principalement
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">État corporel</label>
              <div className="space-y-2">
                {bodyScores.map(score => (
                  <button
                    key={score.value}
                    onClick={() => setFormData({...formData, catBody: score.value})}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${formData.catBody === score.value ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent' : 'border-gray-300'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="mr-2">{score.emoji}</span>
                        <span className="font-semibold">{score.label}</span>
                      </div>
                    </div>
                    <div className={`text-sm mt-1 ${formData.catBody === score.value ? 'text-white' : 'text-gray-600'}`}>
                      {score.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
            >
              Calculer l'âge 🎉
            </button>
          </div>
        )}

        {currentPage === 'dogForm' && (
          <div className="space-y-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-orange-600 hover:text-orange-800 mb-4"
            >
              ← Retour
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">Mon Chien 🐕</h2>

            <p className="text-center text-gray-600">
              Formulaire chien à venir... Pour l'instant, testez avec un chat!
            </p>
          </div>
        )}

        {currentPage === 'loading' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-6 animate-bounce">
              {currentPet === 'cat' ? '🐱' : '🐕'}
            </div>
            <div className="text-xl text-gray-700 mb-4">
              {loadingMessage}
            </div>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          </div>
        )}

        {currentPage === 'result' && result && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{currentPet === 'cat' ? '🐱' : '🐕'}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{result.name}</h2>
              <div className="text-lg text-gray-600">{result.lifeStage}</div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 text-white text-center">
              <div className="text-6xl font-bold mb-2">{ageCounter}</div>
              <div className="text-2xl">
                {ageCounter < 2 ? 'an' : 'ans'} en âge humain
              </div>
              {showDelayedContent && (
                <div className="mt-4 text-lg">
                  {getFunPhrase(result.humanAge).icon} {getFunPhrase(result.humanAge).text}
                </div>
              )}
            </div>

            {showDelayedContent && (
              <>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">Détails du calcul</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Âge réel: {formatAgeWithMonths(result.age)}</p>
                    <p>• Fourchette d'âge humain: {result.interval[0]} - {result.interval[1]} ans</p>
                    <p>• Stade de vie: {result.lifeStage}</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowLifeExpectancy(!showLifeExpectancy)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
                >
                  {showLifeExpectancy ? 'Masquer' : 'Voir'} l'espérance de vie
                </button>

                {showLifeExpectancy && (
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                    <h3 className="font-bold text-xl mb-4">Espérance de vie</h3>
                    <div className="text-3xl font-bold mb-2">
                      {formatAgeWithMonths(result.lifeExpectancy)}
                    </div>
                    <div className="bg-white/20 rounded-full h-4 mb-2">
                      <div
                        className="bg-white rounded-full h-4 transition-all duration-1000"
                        style={{width: `${result.lifePercentage}%`}}
                      ></div>
                    </div>
                    <div className="text-sm">
                      {result.name} a vécu {result.lifePercentage}% de son espérance de vie
                    </div>
                    {result.age > result.lifeExpectancy && (
                      <div className="mt-4 p-4 bg-white/20 rounded-lg">
                        <div className="font-semibold mb-2">💝 Un cadeau précieux</div>
                        <div className="text-sm">
                          {result.name} a dépassé son espérance de vie moyenne. Chaque jour avec {result.isFemale ? 'elle' : 'lui'} est un cadeau précieux!
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="border-t pt-6">
                  <h3 className="font-bold text-lg mb-3 text-center">Partager le résultat</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    >
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all"
                    >
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                    >
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
                    >
                      Copier lien
                    </button>
                  </div>
                </div>

                {result.isSenior && (
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-6 text-white">
                    <h3 className="font-bold text-xl mb-3">🧘 Accompagnement senior</h3>
                    <p className="mb-4">
                      {result.name} entre dans une phase de vie qui mérite une attention particulière.
                    </p>
                    <a
                      href="https://www.ecoutenala.ca"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-white text-blue-600 py-3 rounded-lg font-semibold text-center hover:bg-blue-50 transition-all"
                    >
                      Découvrir Écoute Nala →
                    </a>
                  </div>
                )}

                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setFormData({});
                    setResult(null);
                    setShowLifeExpectancy(false);
                  }}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Nouveau calcul
                </button>
              </>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default VraiAge;
