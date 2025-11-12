"use client";

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';
import ContactModal from '@/components/ContactModal';
import CookieBanner from '@/components/CookieBanner';
import Link from 'next/link';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import {
  Paw, Sparkles, Cat, Dog, CheckCircle, AlertCircle,
  HelpCircle, ArrowLeft, Mail, ChevronDown, Info, Share2,
  Facebook, Instagram, Copy, Check, MessageCircle,
  HeartHandshake, ExternalLink, Stethoscope, Activity, Download
} from 'lucide-react';

// Constantes déplacées hors du composant pour éviter les re-créations
const LOADING_MESSAGES: Record<string, string[]> = {
    cat: [
      "Ton chat fait ses griffes pendant qu'on analyse son ADN félin...",
      "Consultation de l'oracle des moustaches en cours...",
      "Traduction du langage ronron vers l'humain..."
    ],
    dog: [
      "Ton chien remue la queue pendant qu'on calcule son âge exact...",
      "Analyse des pattes et de la truffe en cours...",
      "Décodage du langage canin vers l'humain..."
    ]
};

// VraiÂge - Paires de Phrases Comparatives Optimisées
// Québec 🍁 vs Europe 🇪🇺
// Version 2.0 - Novembre 2025

interface FunPhrase {
  max: number;
  quebec: {
    verb: string;
    text: string;
    icon: string; // Emoji en string
  };
  europe: {
    verb: string;
    text: string;
    icon: string; // Emoji en string
  };
}

const FUN_PHRASES: FunPhrase[] = [
  // 🧒 Génération Alpha (2010+) → 0-15 ans
  {
    max: 3,
    quebec: { verb: "pleurerait", text: "parce que son iPad est déchargé", icon: "👶" },
    europe: { verb: "pleurerait", text: "parce que sa tablette n'a plus de batterie", icon: "👶" }
  },
  {
    max: 6,
    quebec: { verb: "chanterait", text: "Passe-Partout à tue-tête dans l'auto", icon: "🎵" },
    europe: { verb: "regarderait", text: "Peppa Pig en boucle sur YouTube", icon: "🎵" }
  },
  {
    max: 10,
    quebec: { verb: "jouerait", text: "à 4 coins carré en criant 'SERVEUSE!'", icon: "⚪" },
    europe: { verb: "jouerait", text: "à l'épervier dans la cour de récré", icon: "⚪" }
  },
  {
    max: 13,
    quebec: { verb: "scrollerait", text: "sur TikTok pendant 6h par jour", icon: "📱" },
    europe: { verb: "oublierait", text: "ses devoirs en regardant TikTok", icon: "📱" }
  },
  {
    max: 16,
    quebec: { verb: "stresserait", text: "pour son bal de finissants dans 3 ans", icon: "❤️" },
    europe: { verb: "passerait", text: "son brevet des collèges en transpirant", icon: "❤️" }
  },

  // 🎮 Génération Z (1997-2012) → 15-25 ans
  {
    max: 18,
    quebec: { verb: "échouerait", text: "son permis de conduire 2 fois (minimum)", icon: "🚗" },
    europe: { verb: "calerait", text: "3 fois pendant l'examen de conduite", icon: "🚗" }
  },
  {
    max: 21,
    quebec: { verb: "boirait", text: "du Caribou cheap à la Saint-Jean", icon: "🎉" },
    europe: { verb: "ferait", text: "la fête du 14 juillet sur les Champs-Élysées", icon: "🎉" }
  },
  {
    max: 25,
    quebec: { verb: "finirait", text: "son bac avec 60K$ de dettes étudiantes", icon: "🎓" },
    europe: { verb: "chercherait", text: "désespérément un CDI après son master", icon: "🎓" }
  },

  // 💼 Millennials (1981-1996) → 25-40 ans
  {
    max: 30,
    quebec: { verb: "pleurerait", text: "en voyant le prix des condos à Montréal", icon: "🏠" },
    europe: { verb: "abandonnerait", text: "l'idée d'acheter à Paris (1M€ le 30m²)", icon: "🏠" }
  },
  {
    max: 33,
    quebec: { verb: "attendrait", text: "3 ans pour une place en CPE", icon: "👶" },
    europe: { verb: "mettrait", text: "son enfant sur liste d'attente avant sa naissance", icon: "👶" }
  },
  {
    max: 35,
    quebec: { verb: "commanderait", text: "sur Uber Eats 4 soirs par semaine", icon: "🍕" },
    europe: { verb: "paierait", text: "12€ de frais Deliveroo pour une pizza", icon: "🍕" }
  },
  {
    max: 40,
    quebec: { verb: "aurait", text: "mal au dos en déneigant l'entrée", icon: "😊" },
    europe: { verb: "gémirait", text: "en montant 3 étages sans ascenseur", icon: "😊" }
  },

  // 📻 Génération X (1965-1980) → 40-55 ans
  {
    max: 45,
    quebec: { verb: "scrollerait", text: "sur Facebook en critiquant TikTok", icon: "📱" },
    europe: { verb: "regarderait", text: "BFM TV en disant 'c'était mieux avant'", icon: "📺" }
  },
  {
    max: 50,
    quebec: { verb: "calculerait", text: "combien d'années avant la retraite (23... soupir)", icon: "🌴" },
    europe: { verb: "rêverait", text: "de sa retraite à 64 ans (si elle existe encore)", icon: "🌴" }
  },
  {
    max: 55,
    quebec: { verb: "déneigrait", text: "l'entrée des enfants ET des petits-enfants", icon: "👤" },
    europe: { verb: "garderait", text: "les petits-enfants tous les mercredis", icon: "👤" }
  },

  // 🏡 Baby-Boomers (1946-1964) → 55-75 ans
  {
    max: 60,
    quebec: { verb: "vendrait", text: "sa maison 10x le prix payé en 1985", icon: "💰" },
    europe: { verb: "revendrait", text: "son appartement parisien une fortune", icon: "💰" }
  },
  {
    max: 65,
    quebec: { verb: "irait", text: "au Tim Hortons à 5h du matin jaser", icon: "☕" },
    europe: { verb: "lirait", text: "Le Figaro au café du coin chaque matin", icon: "☕" }
  },
  {
    max: 70,
    quebec: { verb: "raconterait", text: "ENCORE la tempête de verglas de '98", icon: "📖" },
    europe: { verb: "parlerait", text: "de Mai 68 comme si c'était hier", icon: "📖" }
  },
  {
    max: 75,
    quebec: { verb: "gagnerait", text: "au bingo de la paroisse (5e fois cette année)", icon: "🏆" },
    europe: { verb: "jouerait", text: "à la belote au club du 3e âge", icon: "🏆" }
  },

  // 🧓 Génération Silencieuse (1928-1945) → 75-95 ans
  {
    max: 80,
    quebec: { verb: "aurait", text: "plus de piluliers que de verres dans l'armoire", icon: "💊" },
    europe: { verb: "prendrait", text: "8 médicaments (en oubliant lequel)", icon: "💊" }
  },
  {
    max: 85,
    quebec: { verb: "finirait", text: "les mots croisés du JdeM en 10 minutes", icon: "📰" },
    europe: { verb: "complèterait", text: "les mots fléchés du Figaro avant le café", icon: "📰" }
  },
  {
    max: 90,
    quebec: { verb: "refuserait", text: "d'utiliser un ordinateur (papier only)", icon: "📚" },
    europe: { verb: "dirait", text: "'Internet? Non merci, j'ai mes livres'", icon: "📚" }
  },
  {
    max: 95,
    quebec: { verb: "se souviendrait", text: "de la crise d'Octobre 1970 comme si c'était hier", icon: "👥" },
    europe: { verb: "se rappellerait", text: "la guerre avec une précision troublante", icon: "👥" }
  },

  // 👑 Greatest Generation (1901-1927) → 95+ ans
  {
    max: 999,
    quebec: { verb: "passerait", text: "à TVA pour révéler son secret (du gin)", icon: "👑" },
    europe: { verb: "dévoilerait", text: "à France 2 son secret (un verre de rouge/jour)", icon: "👑" }
  }
];

const CAT_BREEDS = [
    { value: 'mixed', name: 'Autre race ou croisé (domestique, gouttière)', lifespan: 15 },
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
    { value: 'scottish-fold', name: 'Scottish Fold', lifespan: 13 }
];

const DOG_BREEDS = [
    { value: 'mixed', name: 'Croisé/Autre race', lifespan: 12.71, size: 'medium', muzzle: 'mesocephalic', weightRange: null },
    { value: 'teckel', name: 'Teckel', lifespan: 15.2, size: 'small', muzzle: 'dolichocephalic', weightRange: '5-10' },
    { value: 'chihuahua', name: 'Chihuahua', lifespan: 15.01, size: 'small', muzzle: 'mesocephalic', weightRange: 'under-5' },
    { value: 'shih-tzu', name: 'Shih Tzu', lifespan: 15.08, size: 'small', muzzle: 'brachycephalic', weightRange: '5-10' },
    { value: 'yorkshire', name: 'Yorkshire', lifespan: 15, size: 'small', muzzle: 'mesocephalic', weightRange: 'under-5' },
    { value: 'jack-russell', name: 'Jack Russell', lifespan: 15, size: 'small', muzzle: 'mesocephalic', weightRange: '5-10' },
    { value: 'caniche', name: 'Caniche', lifespan: 14.2, size: 'medium', muzzle: 'mesocephalic', weightRange: '15-25' },
    { value: 'beagle', name: 'Beagle', lifespan: 14, size: 'medium', muzzle: 'mesocephalic', weightRange: '10-15' },
    { value: 'cocker', name: 'Cocker', lifespan: 13, size: 'medium', muzzle: 'mesocephalic', weightRange: '10-15' },
    { value: 'labrador', name: 'Labrador', lifespan: 13.27, size: 'large', muzzle: 'mesocephalic', weightRange: '25-40' },
    { value: 'golden-retriever', name: 'Golden Retriever', lifespan: 13.93, size: 'large', muzzle: 'mesocephalic', weightRange: '25-40' },
    { value: 'berger-allemand', name: 'Berger Allemand', lifespan: 12.46, size: 'large', muzzle: 'dolichocephalic', weightRange: '40-60' },
    { value: 'husky', name: 'Husky', lifespan: 13, size: 'large', muzzle: 'mesocephalic', weightRange: '40-60' },
    { value: 'bulldog-francais', name: 'Bouledogue Français', lifespan: 10, size: 'medium', muzzle: 'brachycephalic', weightRange: '15-25' },
    { value: 'boxer', name: 'Boxer', lifespan: 10, size: 'large', muzzle: 'brachycephalic', weightRange: '40-60' },
    { value: 'dogue-allemand', name: 'Dogue Allemand', lifespan: 9.63, size: 'giant', muzzle: 'mesocephalic', weightRange: 'over-60' },
    { value: 'saint-bernard', name: 'Saint-Bernard', lifespan: 9, size: 'giant', muzzle: 'mesocephalic', weightRange: 'over-60' },
    { value: 'dogue-bordeaux', name: 'Dogue de Bordeaux', lifespan: 5.5, size: 'giant', muzzle: 'brachycephalic', weightRange: 'over-60' }
];

const DOG_WEIGHT_RANGES = [
    { range: 'under-5', label: 'Moins de 11 lbs (5 kg)', visual: '🐕 Très petit (Chihuahua, Yorkshire)', avgWeight: 3, size: 'small' },
    { range: '5-10', label: '11-22 lbs (5-10 kg)', visual: '🐕 Petit (Jack Russell, Teckel)', avgWeight: 7.5, size: 'small' },
    { range: '10-15', label: '22-33 lbs (10-15 kg)', visual: '🐕 Petit-Moyen (Cocker, Beagle)', avgWeight: 12.5, size: 'medium' },
    { range: '15-25', label: '33-55 lbs (15-25 kg)', visual: '🐕 Moyen (Bulldog, Border Collie)', avgWeight: 20, size: 'medium' },
    { range: '25-40', label: '55-88 lbs (25-40 kg)', visual: '🐕 Grand (Labrador, Golden)', avgWeight: 32.5, size: 'large' },
    { range: '40-60', label: '88-132 lbs (40-60 kg)', visual: '🐕 Très Grand (Berger Allemand, Boxer)', avgWeight: 50, size: 'large' },
    { range: 'over-60', label: 'Plus de 132 lbs (60 kg)', visual: '🐕 Géant (Dogue Allemand, St-Bernard)', avgWeight: 70, size: 'giant' }
];

// Score corporel avec visuels
const BODY_SCORES = [
    {
      value: 'very_underweight',
      label: 'Très maigre',
      description: 'Os saillants, absence de graisse palpable, émacié',
      Icon: AlertCircle
    },
    {
      value: 'underweight',
      label: 'Maigre',
      description: 'Côtes, colonne vertébrale et os du bassin très visibles',
      Icon: AlertCircle
    },
    {
      value: 'ideal',
      label: 'Idéal',
      description: 'Côtes palpables, taille visible de dessus',
      Icon: CheckCircle
    },
    {
      value: 'overweight',
      label: 'Surpoids',
      description: 'Côtes difficiles à palper, taille peu visible',
      Icon: AlertCircle
    },
    {
      value: 'obese',
      label: 'Obèse',
      description: 'Côtes non palpables, abdomen distendu',
      Icon: AlertCircle
    }
];

// Types de museau (chiens uniquement)
const MUZZLE_TYPES = [
    {
      value: 'dolichocephalic',
      label: 'Dolichocéphale',
      description: 'Museau long et fin, plus long que le crâne',
      examples: 'Lévrier, Colley, Teckel',
      multiplier: 1.05,
      image: '/images/muzzle-dolichocephalic.png'
    },
    {
      value: 'mesocephalic',
      label: 'Mésocéphale (Standard)',
      description: 'Proportions équilibrées - crâne et museau de longueur à peu près égale',
      examples: 'Labrador, Beagle, Golden Retriever',
      multiplier: 1.00,
      isDefault: true,
      image: '/images/muzzle-mesocephalic.png'
    },
    {
      value: 'brachycephalic',
      label: 'Brachycéphale',
      description: 'Museau court et écrasé, face aplatie',
      examples: 'Bouledogue, Carlin, Boxer',
      multiplier: 0.85,
      image: '/images/muzzle-brachycephalic.png'
    }
];

// Fonctions utilitaires déplacées hors du composant
const getFunPhrase = (age: number) => {
  return FUN_PHRASES.find(p => age <= p.max) || FUN_PHRASES[FUN_PHRASES.length - 1];
};

const getLifeStageDescription = (lifeStage: string, animalName: string): string => {
  if (lifeStage.includes('Chaton') || lifeStage.includes('Chiot')) {
    return `${animalName} est encore un bébé !`;
  } else if (lifeStage.includes('Junior') || lifeStage.includes('Jeune adulte')) {
    return `${animalName} commence tout juste à apprendre de ses erreurs !`;
  } else if (lifeStage.includes('Adulte') && !lifeStage.includes('Jeune')) {
    return `${animalName} a atteint la "fleur de l'âge" !`;
  } else if (lifeStage.includes('Mature')) {
    return `${animalName} commence déjà son déclin... mais a encore du temps pour profiter de sa vie !`;
  } else if (lifeStage.includes('Senior')) {
    return `${animalName} est à l'âge d'or de sa vie !`;
  } else if (lifeStage.includes('Doyen')) {
    return `${animalName} a dépassé son espérance de vie mais tient le coup !`;
  }
  return "";
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

// Composant principal
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
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
  const [isAboutVraiAgeOpen, setIsAboutVraiAgeOpen] = useState(false);
  const [autoFilledDogMuzzle, setAutoFilledDogMuzzle] = useState(false);
  const [autoFilledDogWeight, setAutoFilledDogWeight] = useState(false);

  // Screenshot functionality
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false);
  const [screenshotCopied, setScreenshotCopied] = useState(false);

  const getWeightRangeLabel = () => {
    if (!formData.dogWeightRange) return '';
    const range = DOG_WEIGHT_RANGES.find(r => r.range === formData.dogWeightRange);
    return range ? range.label : '';
  };

  const convertWeight = (weight: number, fromUnit: string) => {
    if (fromUnit === 'lbs') {
      return weight * 0.453592;
    }
    return weight;
  };

  // Gestion de la sélection de race de chien avec auto-complétion
  const handleDogBreedChange = (breedValue: string) => {
    const selectedBreed = DOG_BREEDS.find(b => b.value === breedValue);

    if (selectedBreed) {
      const newFormData: any = { ...formData, dogBreed: breedValue };

      // Auto-remplir le type de museau
      if (selectedBreed.muzzle) {
        newFormData.dogMuzzle = selectedBreed.muzzle;
        setAutoFilledDogMuzzle(true);
      }

      // Auto-remplir l'intervalle de poids (sauf pour "mixed")
      if (selectedBreed.weightRange) {
        newFormData.dogWeightRange = selectedBreed.weightRange;
        setAutoFilledDogWeight(true);
      } else {
        // Pour "mixed", pas de poids auto-rempli mais muzzle oui
        setAutoFilledDogWeight(false);
      }

      setFormData(newFormData);
    }
  };

  // Handler pour changement de type de museau avec confirmation
  const handleDogMuzzleChange = (muzzleValue: string) => {
    if (autoFilledDogMuzzle) {
      const confirmed = window.confirm(
        "Le type de museau a été automatiquement sélectionné selon la race choisie. Êtes-vous sûr de vouloir le modifier ? Le type suggéré est le plus approprié pour cette race."
      );
      if (confirmed) {
        setFormData({ ...formData, dogMuzzle: muzzleValue });
        setAutoFilledDogMuzzle(false);
      }
    } else {
      setFormData({ ...formData, dogMuzzle: muzzleValue });
    }
  };

  // Handler pour changement d'intervalle de poids avec confirmation
  const handleDogWeightChange = (weightRange: string) => {
    if (autoFilledDogWeight) {
      const confirmed = window.confirm(
        "L'intervalle de poids a été automatiquement sélectionné selon la race choisie. Êtes-vous sûr de vouloir le modifier ? L'intervalle suggéré est le plus approprié pour cette race."
      );
      if (confirmed) {
        setFormData({ ...formData, dogWeightRange: weightRange });
        setAutoFilledDogWeight(false);
      }
    } else {
      setFormData({ ...formData, dogWeightRange: weightRange });
    }
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

    const breedData = CAT_BREEDS.find(b => b.value === breed);
    let lifeExpectancy = breedData ? breedData.lifespan : 15;

    if (lifestyle === 'outdoor') lifeExpectancy -= 4;
    else if (lifestyle === 'mixed') lifeExpectancy -= 2;

    const bodyScoreMultipliers: Record<string, number> = {
      'very_underweight': 0.90, // État critique nécessitant attention vétérinaire
      'underweight': 0.95, // La maigreur peut indiquer une condition sous-jacente
      'ideal': 1.0,
      'overweight': 0.90,
      'obese': 0.80
    };
    lifeExpectancy = lifeExpectancy * (bodyScoreMultipliers[bodyScore] || 1.0);

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
      const range = DOG_WEIGHT_RANGES.find(r => r.range === formData.dogWeightRange);
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

    // Petits chiens vivent plus longtemps → vieillissent plus lentement (multiplicateur < 1)
    // Grands chiens vivent moins longtemps → vieillissent plus vite (multiplicateur > 1)
    const sizeMultipliers: Record<string, number> = {
      'small': 0.83,    // Vieillissent 17% plus lentement
      'medium': 1.0,    // Référence
      'large': 1.18,    // Vieillissent 18% plus vite
      'giant': 1.33     // Vieillissent 33% plus vite
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

    const breedData = DOG_BREEDS.find(b => b.value === breed);
    let lifeExpectancy = breedData ? breedData.lifespan : 12;

    const bodyScoreMultipliers: Record<string, number> = {
      'very_underweight': 0.90, // État critique nécessitant attention vétérinaire
      'underweight': 0.98, // La maigreur peut indiquer une condition sous-jacente
      'ideal': 1.05,
      'overweight': 0.95,
      'obese': 0.80
    };
    lifeExpectancy = lifeExpectancy * (bodyScoreMultipliers[bodyScore] || 1.05);

    if (neutered) {
      lifeExpectancy += 1.5;
    }

    if (breed === 'mixed') {
      lifeExpectancy += 0.5;
    }

    // Appliquer le coefficient de type de museau
    const muzzleType = formData.dogMuzzle || 'mesocephalic';
    const muzzleData = MUZZLE_TYPES.find(m => m.value === muzzleType);
    if (muzzleData) {
      lifeExpectancy = lifeExpectancy * muzzleData.multiplier;
    }

    // Effet du sexe (femelles vivent ~5% plus longtemps)
    if (sex === 'female') {
      lifeExpectancy = lifeExpectancy * 1.05;
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
    const errors: string[] = [];

    if (currentPet === 'cat') {
      if (!formData.catYears && formData.catYears !== 0) {
        errors.push('Veuillez indiquer l\'âge de votre chat');
      }
      if (!formData.catBreed) {
        errors.push('Veuillez sélectionner une race');
      }
      if (!formData.catSex) {
        errors.push('Veuillez indiquer le sexe de votre chat');
      }
      if (!formData.catNeutered) {
        errors.push('Veuillez indiquer si votre chat est stérilisé');
      }
      if (!formData.catLifestyle) {
        errors.push('Veuillez sélectionner le mode de vie');
      }
      if (!formData.catBody) {
        errors.push('Veuillez sélectionner l\'état corporel');
      }
    } else {
      if (!formData.dogYears && formData.dogYears !== 0) {
        errors.push('Veuillez indiquer l\'âge de votre chien');
      }
      if (!formData.dogBreed) {
        errors.push('Veuillez sélectionner une race');
      }
      if (!formData.dogMuzzle) {
        errors.push('Veuillez sélectionner la forme du crâne et museau');
      }
      if (!formData.dogWeight && !formData.dogWeightRange) {
        errors.push('Veuillez indiquer le poids de votre chien');
      }
      if (!formData.dogSex) {
        errors.push('Veuillez indiquer le sexe de votre chien');
      }
      if (!formData.dogNeutered) {
        errors.push('Veuillez indiquer si votre chien est stérilisé');
      }
      if (!formData.dogBody) {
        errors.push('Veuillez sélectionner l\'état corporel');
      }
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleCalculate = () => {
    if (!validateForm()) return;
    if (!validateAge()) return;

    setValidationErrors([]);
    setCurrentPage('loading');
    setShowDelayedContent(false);

    const messages = LOADING_MESSAGES[currentPet!];
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
      case 'instagram':
        navigator.clipboard.writeText(text + ' ' + url);
        alert('📋 Texte copié ! Collez-le dans votre story ou post Instagram.');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Lien copié ! 📋');
        break;
    }
  };

  // Capture screenshot of results
  const captureResultsScreenshot = async (): Promise<Blob | null> => {
    if (!resultsRef.current) return null;

    try {
      setIsCapturingScreenshot(true);

      // Capture avec html2canvas
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Haute résolution
        logging: false,
        useCORS: true,
        allowTaint: true
      });

      // Convertir en blob
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      });
    } catch (error) {
      console.error('Erreur capture screenshot:', error);
      alert('❌ Erreur lors de la capture de l\'image. Veuillez réessayer.');
      return null;
    } finally {
      setIsCapturingScreenshot(false);
    }
  };

  // Download screenshot
  const handleDownloadScreenshot = async () => {
    const blob = await captureResultsScreenshot();
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vraiage-${result?.name || 'resultat'}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Feedback visuel
    setScreenshotCopied(true);
    setTimeout(() => setScreenshotCopied(false), 3000);
  };

  // Share with screenshot
  const handleShareWithScreenshot = async (platform: string) => {
    if (!result) return;

    const blob = await captureResultsScreenshot();
    if (!blob) return;

    let text = `${result.name} a ${result.humanAge} ${result.humanAge < 2 ? 'an' : 'ans'} en âge humain ! 🎉 Découvrez l'âge de votre animal sur VraiÂge !`;
    const url = typeof window !== 'undefined' ? window.location.href : '';

    // Vérifier si Web Share API est disponible (mobile)
    if (navigator.share && navigator.canShare) {
      try {
        const file = new File([blob], `vraiage-${result.name}.png`, { type: 'image/png' });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'VraiÂge - Résultat',
            text: text,
            files: [file]
          });
          return;
        }
      } catch (error) {
        console.log('Web Share API non disponible, fallback vers téléchargement');
      }
    }

    // Fallback: Télécharger + ouvrir plateforme
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `vraiage-${result.name}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);

    // Ouvrir la plateforme après téléchargement
    setTimeout(() => {
      switch(platform) {
        case 'facebook':
          alert('📸 Image téléchargée ! Ouvrez Facebook pour créer votre publication et ajoutez l\'image téléchargée.');
          window.open('https://www.facebook.com/', '_blank');
          break;
        case 'instagram':
          alert('📸 Image téléchargée ! Ouvrez Instagram sur votre téléphone pour créer un post et ajoutez l\'image de votre galerie.');
          break;
        default:
          alert('📸 Image téléchargée avec succès !');
      }
    }, 500);
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

            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
              }
              @keyframes wiggle {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-5deg); }
                75% { transform: rotate(5deg); }
              }
            `}</style>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <button
                onClick={() => {setCurrentPet('cat'); setCurrentPage('catForm');}}
                className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-purple-400 hover:shadow-2xl text-center relative overflow-hidden"
                aria-label="Calculer l'âge de mon chat"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-pink-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center items-center" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <div className="p-6 bg-white rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Cat className="w-24 h-24 text-purple-500 group-hover:text-purple-600 transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="relative text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center mb-2">Chat</div>
                <div className="relative text-sm text-gray-600 text-center">Calculer l'âge de mon chat</div>
              </button>

              <button
                onClick={() => {
                  setCurrentPet('dog');
                  setCurrentPage('dogForm');
                  if (!formData.dogMuzzle) {
                    setFormData({...formData, dogMuzzle: 'mesocephalic'});
                  }
                }}
                className="group p-8 bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-orange-400 hover:shadow-2xl text-center relative overflow-hidden"
                aria-label="Calculer l'âge de mon chien"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-orange-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center items-center" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <div className="p-6 bg-white rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Dog className="w-24 h-24 text-orange-500 group-hover:text-orange-600 transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="relative text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent text-center mb-2">Chien</div>
                <div className="relative text-sm text-gray-600 text-center">Calculer l'âge de mon chien</div>
              </button>
            </div>

            {/* Section À propos de moi */}
            <div className="mt-12 bg-white/80 backdrop-blur rounded-xl border border-white/50 shadow-lg overflow-hidden">
              <button
                onClick={() => setIsAboutMeOpen(!isAboutMeOpen)}
                className="w-full p-6 text-left hover:bg-white/50 transition-colors"
                aria-expanded={isAboutMeOpen}
                aria-controls="about-me-content"
                aria-label="À propos de Dr. Natacha Barrette"
              >
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <span className="text-purple-600 transition-transform duration-300" style={{ transform: isAboutMeOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }} aria-hidden="true">▼</span>
                  À propos de Dre Natacha Barrette
                </h2>
                {!isAboutMeOpen && (
                  <p className="text-gray-600 mt-2 text-sm italic">
                    Je suis médecin vétérinaire depuis plus de 30 ans...
                  </p>
                )}
              </button>

              <div
                id="about-me-content"
                className={`transition-all duration-500 ease-in-out ${isAboutMeOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                role="region"
                aria-labelledby="about-me-heading"
              >
                <div className="px-8 pb-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-200 shadow-lg">
                        <Image
                          src="/natacha-barrette.jpg"
                          alt="Dr. Natacha Barrette"
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 mb-3">
                        Je suis médecin vétérinaire depuis plus de 30 ans, et j'ai accompagné des centaines de familles à travers le vieillissement de leur compagnon.
                      </p>
                      <p className="text-gray-700 mb-3">
                        Trop souvent, j'ai vu des propriétaires découvrir tard — parfois trop tard — que leur animal était déjà senior. Cette réalité m'a poussée à créer des outils simples et accessibles pour aider les gens à mieux comprendre où se situe leur compagnon dans sa vie.
                      </p>
                      <p className="text-gray-700 mb-3">
                        Installée à Québec avec ma fidèle Babette, je mets mon expérience au service de ceux qui, comme toi, veulent prendre soin de leur animal avec justesse et bienveillance.
                      </p>
                      <p className="text-gray-700 mb-3">
                        Parce qu'ils nous aiment sans condition, ils méritent qu'on les accompagne avec soin, au bon moment.
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        Dre Natacha Barrette, médecin vétérinaire<br />
                        Créatrice de VraiÂge • Fondatrice d'À l'écoute de Nala
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section À propos de VraiÂge */}
            <div className="mt-8 bg-white/80 backdrop-blur rounded-xl border border-white/50 shadow-lg overflow-hidden">
              <button
                onClick={() => setIsAboutVraiAgeOpen(!isAboutVraiAgeOpen)}
                className="w-full p-6 text-left hover:bg-white/50 transition-colors"
                aria-expanded={isAboutVraiAgeOpen}
                aria-controls="about-vraiage-content"
                aria-label="À propos de VraiÂge"
              >
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <span className="text-blue-600 transition-transform duration-300" style={{ transform: isAboutVraiAgeOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }} aria-hidden="true">▼</span>
                  C'est quoi, VraiÂge ?
                </h2>
                {!isAboutVraiAgeOpen && (
                  <p className="text-gray-600 mt-2 text-sm italic">
                    Un outil pour comprendre l'âge réel de ton compagnon...
                  </p>
                )}
              </button>

              <div className={`transition-all duration-500 ease-in-out ${isAboutVraiAgeOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 pb-8">
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <p className="font-semibold mb-2">Un outil pour comprendre l'âge réel de ton compagnon</p>
                      <p className="mb-3">
                        Tu as sûrement déjà entendu la fameuse règle du "× 7" pour calculer l'âge de ton chien ou de ton chat. Sauf que cette règle est beaucoup trop simpliste. Un Chihuahua de 10 ans n'a pas du tout le même âge biologique qu'un Berger Allemand du même âge. Chaque animal vieillit différemment.
                      </p>
                      <p className="mb-2">
                        VraiÂge est un calculateur gratuit, ludique et inspiré par la science qui prend en compte les facteurs qui influencent vraiment le vieillissement de ton animal :
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                        <li>Sa race et son espérance de vie moyenne (basée sur les études disponibles — certaines races ont plus de données que d'autres, alors on fait avec ce qu'on a !)</li>
                        <li>Son poids et sa taille</li>
                        <li>Sa morphologie (chiens brachycéphales, mésocéphales, dolichocéphales)</li>
                        <li>Son mode de vie et son niveau d'activité</li>
                        <li>Son environnement (intérieur, extérieur, mixte)</li>
                        <li>Son sexe et son statut de stérilisation</li>
                      </ul>
                      <p className="mt-3">
                        En quelques clics, tu obtiens une estimation de son âge humain équivalent et de son espérance de vie. C'est un repère clair pour mieux comprendre où il en est dans son parcours.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Un outil éducatif, pas un diagnostic</p>
                      <p className="mb-3">
                        VraiÂge te donne un aperçu général de l'âge biologique de ton compagnon. C'est un point de départ pour mieux anticiper ses besoins — mais ce n'est pas une vérité absolue ni un diagnostic médical.
                      </p>
                      <p className="mb-3">
                        Pour un suivi personnalisé et des recommandations adaptées à SA situation unique, consulte toujours ton vétérinaire.
                      </p>
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <p className="italic text-blue-900">
                          VraiÂge + ton vétérinaire = la meilleure combinaison pour prendre soin de ton compagnon à chaque étape.
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Et ensuite ?</p>
                      <p className="mb-2">
                        Si ton compagnon entre dans ses années senior, tu voudras peut-être aller plus loin et évaluer sa qualité de vie au quotidien. C'est pourquoi j'ai créé <strong>À l'écoute de Nala</strong>, une application gratuite qui t'aide à suivre le bien-être de ton animal de façon objective et bienveillante.
                      </p>
                      <p className="mb-3">
                        Les deux outils se complètent pour t'accompagner tout au long du parcours.
                      </p>
                      <a
                        href="https://www.ecoutenala.ca"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
                      >
                        Découvrir À l'Écoute de Nala →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'catForm' && (
          <div className="space-y-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="group inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-all duration-200 mb-6 px-4 py-2 rounded-lg hover:bg-purple-50"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Retour</span>
            </button>

            <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-3">
              Mon Chat
              <Cat className="w-10 h-10 text-purple-500" strokeWidth={1.5} />
            </h2>

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
              <p className="text-xs text-gray-500 mb-2">💡 Seules les races avec données scientifiques spécifiques sont listées. Pour toute autre race ou pour un chat domestique, sélectionnez "Autre race".</p>
              <select
                className="w-full p-3 border-2 rounded-lg focus:border-purple-500 outline-none"
                onChange={(e) => setFormData({...formData, catBreed: e.target.value})}
                defaultValue=""
              >
                <option value="">Choisir une race</option>
                {CAT_BREEDS.map(breed => (
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => setFormData({...formData, catLifestyle: 'indoor'})}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${formData.catLifestyle === 'indoor' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent' : 'border-gray-300 hover:border-purple-300'}`}
                >
                  🏠 Intérieur seulement
                </button>
                <button
                  onClick={() => setFormData({...formData, catLifestyle: 'mixed'})}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${formData.catLifestyle === 'mixed' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent' : 'border-gray-300 hover:border-purple-300'}`}
                >
                  🚪 Intérieur/Extérieur
                </button>
                <button
                  onClick={() => setFormData({...formData, catLifestyle: 'outdoor'})}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${formData.catLifestyle === 'outdoor' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent' : 'border-gray-300 hover:border-purple-300'}`}
                >
                  🌳 Extérieur principalement
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">État corporel</label>
              <p className="text-xs text-gray-500 mb-3 italic">
                💡 Si ton chat est très maigre, consulte un vétérinaire pour écarter toute condition médicale.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {BODY_SCORES.map(score => (
                  <button
                    key={score.value}
                    onClick={() => setFormData({...formData, catBody: score.value})}
                    className={`p-3 rounded-lg border-2 transition-all text-center flex flex-col items-center ${formData.catBody === score.value ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent' : 'border-gray-300 hover:border-purple-300'}`}
                  >
                    <div className="mb-2 flex justify-center">
                      <score.Icon className="w-8 h-8 text-current" />
                    </div>
                    <div className="font-semibold mb-1 text-sm">{score.label}</div>
                    <div className={`text-xs ${formData.catBody === score.value ? 'text-white/90' : 'text-gray-600'}`}>
                      {score.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {validationErrors.length > 0 && (
              <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4">
                <p className="font-bold text-red-800 mb-2">⚠️ Informations manquantes :</p>
                <ul className="list-disc list-inside space-y-1 text-red-700">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleCalculate}
              className="group w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <span>Calculer l'âge</span>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-200" />
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

            <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-3">
              Mon Chien
              <Dog className="w-10 h-10 text-orange-500" strokeWidth={1.5} />
            </h2>

            <div>
              <label className="block mb-2 font-semibold">Nom de ton chien</label>
              <input
                type="text"
                className="w-full p-3 border-2 rounded-lg focus:border-orange-500 outline-none"
                placeholder="Ex: Rex"
                onChange={(e) => setFormData({...formData, dogName: e.target.value})}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Âge</label>
              <p className="text-sm text-gray-600 mb-2 italic">Exemple: 3 ans 6 mois</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm">Année(s)</label>
                  <input
                    type="number"
                    className="w-full p-3 border-2 rounded-lg focus:border-orange-500 outline-none"
                    placeholder="0"
                    min="0"
                    onChange={(e) => setFormData({...formData, dogYears: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">
                    Mois {(formData.dogYears === undefined || formData.dogYears === '' || parseFloat(formData.dogYears) < 2) && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="number"
                    className="w-full p-3 border-2 rounded-lg focus:border-orange-500 outline-none"
                    placeholder="0"
                    min="0"
                    max="11"
                    onChange={(e) => setFormData({...formData, dogMonths: e.target.value})}
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
              <p className="text-xs text-gray-500 mb-2">💡 Seules les races avec données scientifiques spécifiques sont listées. Pour toute autre race ou pour un chien domestique, sélectionnez "Autre race".</p>
              <select
                className="w-full p-3 border-2 rounded-lg focus:border-orange-500 outline-none"
                onChange={(e) => handleDogBreedChange(e.target.value)}
                value={formData.dogBreed || ""}
              >
                <option value="">Choisir une race</option>
                {DOG_BREEDS.map(breed => (
                  <option key={breed.value} value={breed.value}>{breed.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Forme du crâne et museau</label>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3 text-xs text-blue-900">
                <p className="font-semibold mb-1">💡 Comment identifier le type de museau ?</p>
                <p>Observez votre chien de profil. Le type <strong>mésocéphale</strong> (le plus courant) correspond à des proportions équilibrées où le crâne et le museau ont environ la même longueur.</p>
                <p className="mt-1 text-blue-700">⚠️ La forme du museau influence l'espérance de vie (les museaux courts peuvent causer des problèmes respiratoires)</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {MUZZLE_TYPES.map(muzzle => (
                  <button
                    key={muzzle.value}
                    onClick={() => handleDogMuzzleChange(muzzle.value)}
                    className={`p-3 rounded-lg border-2 transition-all text-center flex flex-col items-center ${formData.dogMuzzle === muzzle.value ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white border-transparent' : 'border-gray-300 hover:border-blue-300'}`}
                  >
                    <div className="mb-2">
                      <Image
                        src={muzzle.image}
                        alt={muzzle.label}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                    <div className="font-semibold mb-1 text-sm">{muzzle.label}</div>
                    <div className={`text-xs ${formData.dogMuzzle === muzzle.value ? 'text-white/90' : 'text-gray-600'}`}>
                      {muzzle.description}
                    </div>
                    <div className={`text-xs mt-1 ${formData.dogMuzzle === muzzle.value ? 'text-white/75' : 'text-gray-500'}`}>
                      Ex: {muzzle.examples}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Poids</label>
              <p className="text-xs text-gray-500 mb-2">💡 Sélectionnez l'intervalle qui correspond au poids actuel de votre chien</p>
              <div className="space-y-2">
                {/* Première ligne : 3 options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {DOG_WEIGHT_RANGES.slice(0, 3).map(range => (
                    <button
                      key={range.range}
                      onClick={() => handleDogWeightChange(range.range)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${formData.dogWeightRange === range.range ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white border-transparent' : 'border-gray-300 hover:border-blue-300'}`}
                    >
                      <div className="font-semibold">{range.label}</div>
                      <div className={`text-sm mt-1 ${formData.dogWeightRange === range.range ? 'text-white' : 'text-gray-600'}`}>
                        {range.visual}
                      </div>
                    </button>
                  ))}
                </div>
                {/* Deuxième ligne : 3 options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {DOG_WEIGHT_RANGES.slice(3, 6).map(range => (
                    <button
                      key={range.range}
                      onClick={() => handleDogWeightChange(range.range)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${formData.dogWeightRange === range.range ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white border-transparent' : 'border-gray-300 hover:border-blue-300'}`}
                    >
                      <div className="font-semibold">{range.label}</div>
                      <div className={`text-sm mt-1 ${formData.dogWeightRange === range.range ? 'text-white' : 'text-gray-600'}`}>
                        {range.visual}
                      </div>
                    </button>
                  ))}
                </div>
                {/* Troisième ligne : 1 option centrée */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div></div>
                  {DOG_WEIGHT_RANGES.slice(6).map(range => (
                    <button
                      key={range.range}
                      onClick={() => handleDogWeightChange(range.range)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${formData.dogWeightRange === range.range ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white border-transparent' : 'border-gray-300 hover:border-blue-300'}`}
                    >
                      <div className="font-semibold">{range.label}</div>
                      <div className={`text-sm mt-1 ${formData.dogWeightRange === range.range ? 'text-white' : 'text-gray-600'}`}>
                        {range.visual}
                      </div>
                    </button>
                  ))}
                  <div></div>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Sexe</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({...formData, dogSex: 'male'})}
                  className={`p-3 rounded-lg border-2 transition-all ${formData.dogSex === 'male' ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white border-transparent' : 'border-gray-300'}`}
                >
                  Mâle
                </button>
                <button
                  onClick={() => setFormData({...formData, dogSex: 'female'})}
                  className={`p-3 rounded-lg border-2 transition-all ${formData.dogSex === 'female' ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white border-transparent' : 'border-gray-300'}`}
                >
                  Femelle
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Stérilisé(e) ?</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({...formData, dogNeutered: 'yes'})}
                  className={`p-3 rounded-lg border-2 transition-all ${formData.dogNeutered === 'yes' ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white border-transparent' : 'border-gray-300'}`}
                >
                  Oui
                </button>
                <button
                  onClick={() => setFormData({...formData, dogNeutered: 'no'})}
                  className={`p-3 rounded-lg border-2 transition-all ${formData.dogNeutered === 'no' ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white border-transparent' : 'border-gray-300'}`}
                >
                  Non
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">État corporel</label>
              <p className="text-xs text-gray-500 mb-3 italic">
                💡 Si ton chien est très maigre, consulte un vétérinaire pour écarter toute condition médicale.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {BODY_SCORES.map(score => (
                  <button
                    key={score.value}
                    onClick={() => setFormData({...formData, dogBody: score.value})}
                    className={`p-3 rounded-lg border-2 transition-all text-center flex flex-col items-center ${formData.dogBody === score.value ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white border-transparent' : 'border-gray-300 hover:border-blue-300'}`}
                  >
                    <div className="mb-2 flex justify-center">
                      <score.Icon className="w-8 h-8 text-current" />
                    </div>
                    <div className="font-semibold mb-1 text-sm">{score.label}</div>
                    <div className={`text-xs ${formData.dogBody === score.value ? 'text-white/90' : 'text-gray-600'}`}>
                      {score.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {validationErrors.length > 0 && (
              <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4">
                <p className="font-bold text-red-800 mb-2">⚠️ Informations manquantes :</p>
                <ul className="list-disc list-inside space-y-1 text-red-700">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleCalculate}
              className="group w-full bg-gradient-to-r from-blue-600 to-orange-600 text-white py-5 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <span>Calculer l'âge</span>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-200" />
            </button>
          </div>
        )}

        {currentPage === 'loading' && (
          <div className="text-center py-12">
            <style>{`
              @keyframes gentle-float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-15px); }
              }
              @keyframes pulse-dot {
                0%, 100% { transform: scale(0.8); opacity: 0.5; }
                50% { transform: scale(1.2); opacity: 1; }
              }
            `}</style>

            <div className="mb-6 flex justify-center" style={{ animation: 'gentle-float 2s ease-in-out infinite' }}>
              <div className={`p-8 bg-white rounded-full shadow-lg ${currentPet === 'cat' ? 'shadow-purple-200' : 'shadow-orange-200'}`}>
                {currentPet === 'cat' ? (
                  <Cat className="w-20 h-20 text-purple-500" strokeWidth={1.5} />
                ) : (
                  <Dog className="w-20 h-20 text-orange-500" strokeWidth={1.5} />
                )}
              </div>
            </div>

            <div className="text-xl text-gray-700 mb-4 font-medium">
              {loadingMessage}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-purple-600 rounded-full"
                  style={{
                    animation: 'pulse-dot 1.4s ease-in-out infinite',
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {currentPage === 'result' && result && (
          <div ref={resultsRef} className="space-y-6">
            {showDelayedContent && (
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className={`p-6 bg-white rounded-full shadow-lg ${currentPet === 'cat' ? 'shadow-purple-200' : 'shadow-orange-200'}`}>
                    {currentPet === 'cat' ? (
                      <Cat className="w-16 h-16 text-purple-500" strokeWidth={1.5} />
                    ) : (
                      <Dog className="w-16 h-16 text-orange-500" strokeWidth={1.5} />
                    )}
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{result.name}</h2>
              </div>
            )}

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 text-white text-center">
              <div className="text-6xl font-bold mb-2">{ageCounter}</div>
              <div className="text-2xl">
                {ageCounter < 2 ? 'an' : 'ans'} en âge humain
              </div>
            </div>

            {showDelayedContent && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                  Si {result.name} était un{result.isFemale ? 'e' : ''} humain{result.isFemale ? 'e' : ''}...
                </h3>

                {(() => {
                  const phrase = getFunPhrase(result.humanAge);
                  const pronoun = result.isFemale ? 'elle' : 'il';

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Carte Québec */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-300 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-3xl">🍁</span>
                          <h4 className="font-bold text-lg text-blue-800">Au Québec</h4>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-2xl flex-shrink-0">{phrase.quebec.icon}</span>
                          <p className="text-gray-800 text-base leading-relaxed">
                            {pronoun} {phrase.quebec.verb} {phrase.quebec.text}
                          </p>
                        </div>
                      </div>

                      {/* Carte Europe */}
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-300 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-3xl">🇪🇺</span>
                          <h4 className="font-bold text-lg text-purple-800">En Europe</h4>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-2xl flex-shrink-0">{phrase.europe.icon}</span>
                          <p className="text-gray-800 text-base leading-relaxed">
                            {pronoun} {phrase.europe.verb} {phrase.europe.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {showDelayedContent && (
              <>
                <div className={`bg-gradient-to-r ${currentPet === 'cat' ? 'from-purple-400 to-pink-400' : 'from-blue-400 to-orange-400'} rounded-lg p-5 text-white text-center shadow-md`}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">{currentPet === 'cat' ? '🐱' : '🐶'}</span>
                    <h3 className="text-xl font-bold">Stade de vie</h3>
                  </div>
                  <p className="text-lg">
                    <span className="font-semibold">{result.name}</span> est dans le stade de vie
                  </p>
                  <p className="text-2xl font-bold mt-2">
                    « {result.lifeStage.split(' ').slice(1).join(' ')} »
                  </p>
                  <p className="text-4xl mt-2">
                    {result.lifeStage.split(' ')[0]}
                  </p>
                  <p className="text-base mt-3 italic text-white/90">
                    {getLifeStageDescription(result.lifeStage, result.name)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">Détails du calcul</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Âge réel: {formatAgeWithMonths(result.age)}</p>
                    <p>• Fourchette d'âge humain: {result.interval[0]} - {result.interval[1]} ans</p>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                  <h3 className="font-bold text-blue-900 mb-2">📊 Qu'est-ce que l'espérance de vie?</h3>
                  <p className="text-sm text-blue-800 mb-3">
                    L'espérance de vie est une estimation du nombre d'années que votre animal pourrait vivre, basée sur des données scientifiques et les caractéristiques que vous avez fournies (race, mode de vie, stérilisation, état corporel).
                  </p>
                  <p className="text-xs text-blue-700 italic">
                    💡 Cette information peut vous aider à mieux planifier les soins de santé et à profiter pleinement de chaque moment avec votre compagnon.
                  </p>
                </div>

                <button
                  onClick={() => setShowLifeExpectancy(!showLifeExpectancy)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
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
                    <div className="text-sm mb-4">
                      {result.name} a vécu {result.lifePercentage}% de son espérance de vie
                    </div>

                    {result.age > result.lifeExpectancy && (
                      <div className="mb-4 p-4 bg-white/20 rounded-lg">
                        <div className="font-semibold mb-2">💝 Un cadeau précieux</div>
                        <div className="text-sm">
                          {result.name} a dépassé son espérance de vie moyenne. Chaque jour avec {result.isFemale ? 'elle' : 'lui'} est un cadeau précieux!
                        </div>
                      </div>
                    )}

                    {(result.pet === 'chien' || (result.pet === 'chat' && (result.lifeExpectancy <= 14 || result.lifeExpectancy >= 16))) && (
                      <div className="bg-white/10 border border-white/30 rounded-lg p-4">
                        <button
                          onClick={() => setShowLifeExpectancyInfo(!showLifeExpectancyInfo)}
                          className="w-full flex items-center justify-between text-left font-semibold text-white hover:text-blue-100"
                        >
                          <span>💡 Pourquoi {result.pet === 'chat' ? 'pas 15 ans d\'espérance de vie' : 'cette espérance de vie'} ?</span>
                          <span className="text-2xl">{showLifeExpectancyInfo ? '−' : '+'}</span>
                        </button>

                        {showLifeExpectancyInfo && (
                          <div className="mt-3 text-sm text-white/90 space-y-2">
                            {result.pet === 'chat' ? (
                              <>
                                <p className="font-medium">Le « 15 ans » qu'on entend souvent dire comme espérance de vie des chats correspond plutôt à la longévité typique des chats domestiques (croisés) stérilisés vivant strictement à l'intérieur et ne souffrant pas d'obésité.</p>
                                <p>L'espérance de vie de {result.name} a été calculée en tenant compte de :</p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                  <li>Sa race spécifique s'il en a une qui a été étudiée</li>
                                  <li>Son mode de vie (intérieur/mixte/extérieur)</li>
                                  <li>Son statut de stérilisation</li>
                                  <li>Son état corporel actuel</li>
                                  <li>Son sexe</li>
                                </ul>
                                <p className="italic text-blue-100">Ces facteurs peuvent faire varier l'espérance de vie de mois ou même années !</p>
                              </>
                            ) : (
                              <>
                                <p className="font-medium">L'espérance de vie varie énormément selon la race et la taille du chien.</p>
                                <p>L'espérance de vie de {result.name} a été calculée en tenant compte de :</p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                  <li>Sa race et sa taille (données scientifiques)</li>
                                  <li>Son statut de stérilisation</li>
                                  <li>Son état corporel actuel</li>
                                </ul>
                                <p className="italic text-blue-100">Un petit chien vit généralement plus longtemps qu'un grand chien !</p>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {result.isSenior && (
                  <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl overflow-hidden">
                    {/* Overlay décoratif */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>

                    <div className="relative">
                      {/* Header avec icône */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                          <HeartHandshake className="w-8 h-8 text-white" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-2xl mb-2">
                            Accompagnement senior
                          </h3>
                        </div>
                      </div>

                      {/* Encadré À l'écoute de Nala */}
                      <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl p-4 mb-4">
                        <div className="flex items-start gap-3 mb-3">
                          <Stethoscope className="w-5 h-5 text-white flex-shrink-0 mt-0.5" strokeWidth={2} />
                          <div>
                            <p className="font-bold text-lg mb-1">À l'Écoute de Nala</p>
                            <p className="text-sm text-white/95 leading-relaxed">
                              Outil vétérinaire pour évaluer la qualité de vie des animaux seniors et prendre des décisions éclairées au bon moment.
                            </p>
                          </div>
                        </div>

                        {/* Bénéfices */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-blue-200 flex-shrink-0" />
                            <span className="text-white/90">Questionnaire inspiré par les données scientifiques</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-blue-200 flex-shrink-0" />
                            <span className="text-white/90">Suivi de l'évolution dans le temps</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <HeartHandshake className="w-4 h-4 text-blue-200 flex-shrink-0" />
                            <span className="text-white/90">Aide à la prise de décision</span>
                          </div>
                        </div>
                      </div>

                      {/* Bouton CTA */}
                      <a
                        href="https://ecoutenala.ca"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-3 w-full bg-white text-indigo-700 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>Évaluer la qualité de vie</span>
                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                      </a>
                    </div>
                  </div>
                )}

                <div className="border-t pt-6 space-y-4">
                  <h3 className="font-bold text-lg mb-3 text-center flex items-center justify-center gap-2">
                    <Share2 className="w-5 h-5" />
                    <span>Partager le résultat</span>
                  </h3>

                  {/* Bouton de téléchargement principal */}
                  <button
                    onClick={handleDownloadScreenshot}
                    disabled={isCapturingScreenshot}
                    className="group w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCapturingScreenshot ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Création de l'image...</span>
                      </>
                    ) : screenshotCopied ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Image téléchargée !</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-200" />
                        <span>Télécharger l'image du résultat</span>
                      </>
                    )}
                  </button>

                  {/* Boutons de partage avec capture */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 text-center">Ou partager directement sur :</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleShareWithScreenshot('facebook')}
                        disabled={isCapturingScreenshot}
                        className="group flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                      >
                        <Facebook className="w-5 h-5" />
                        <span className="font-medium">Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShareWithScreenshot('instagram')}
                        disabled={isCapturingScreenshot}
                        className="group flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                      >
                        <Instagram className="w-5 h-5" />
                        <span className="font-medium">Instagram</span>
                      </button>
                    </div>
                  </div>

                  {/* Bouton copier lien classique */}
                  <button
                    onClick={() => handleShare('copy')}
                    className="group w-full flex items-center justify-center gap-2 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all border border-gray-300"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">Copier le lien de l'application</span>
                  </button>
                </div>

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

        {/* Footer - Caché pendant le chargement et pendant le décompte/confettis */}
        {currentPage !== 'loading' && !(currentPage === 'result' && !showDelayedContent) && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center space-y-4">
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                >
                  ❓ FAQ
                </Link>
                <Link
                  href="/politique"
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                >
                  🔒 Politique de confidentialité
                </Link>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                >
                  📧 Contact
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Calculateur d'âge animal • Les résultats sont basés sur des moyennes vétérinaires
              </p>
              <p className="text-xs text-gray-500">
                © 2025 Tous droits réservés • Conforme à la Loi 25 (Québec)
              </p>
            </div>
          </div>
        )}
      </Card>

      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
      <CookieBanner />
    </div>
  );
};

export default VraiAge;
