"use client";

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';
import ContactModal from '@/components/ContactModal';
import CookieBanner from '@/components/CookieBanner';
import Link from 'next/link';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import {
  Sparkles, Cat, Dog, CheckCircle, AlertCircle,
  HelpCircle, ArrowLeft, Mail, ChevronDown, Info, Share2,
  Facebook, Instagram, Copy, Check, MessageCircle,
  HeartHandshake, ExternalLink, Stethoscope, Activity, Download, Laugh
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

// VraiÂge - Expressions humoristiques
// Version 3.0 - Novembre 2025

interface FunPhrase {
  max: number;
  phrases: string[]; // Liste de phrases pour cet âge
}

const FUN_PHRASES: FunPhrase[] = [
  // 👶 BÉBÉ / JEUNE ENFANT (0-5 ans humains)
  {
    max: 5,
    phrases: [
      "apprendrait tout juste à marcher et ferait des dégâts partout",
      "serait dans sa phase 'je mets tout dans ma bouche'",
      "passerait ses journées à dormir et à réclamer à manger",
      "serait le boss absolu de la maison malgré sa petite taille",
      "pleurerait pour un rien et ce serait normal",
      "aurait des parents qui n'auraient pas dormi depuis des mois"
    ]
  },

  // 🧒 ENFANT (6-12 ans humains)
  {
    max: 12,
    phrases: [
      "courrait partout en criant et refuserait de faire ses devoirs",
      "perdrait une dent par semaine",
      "demanderait 'pourquoi?' toutes les 30 secondes",
      "négocierait 20 minutes pour avoir 5 minutes de plus de tablette",
      "aurait une collection de roches 'spéciales' dans ses poches",
      "mangerait juste des pâtes au beurre et des céréales sucrées",
      "jurerait que son frère ou sa sœur a commencé",
      "connaîtrait par cœur tous les Pokémon mais pas ses tables de multiplication",
      "aurait une énergie infinie sauf quand il faut ranger sa chambre",
      "dirait 'c'est pas juste!' au moins 10 fois par jour"
    ]
  },

  // 🎒 ADO (13-17 ans humains)
  {
    max: 17,
    phrases: [
      "serait un jeune ado boutonneux qui change de voix",
      "vivrait scotché à son téléphone",
      "dormirait jusqu'à midi chaque week-end",
      "répondrait par des grognements plutôt que des mots",
      "trouverait ses parents vraiment gênants",
      "changerait de personnalité selon son groupe d'amis",
      "viderait le frigo en rentrant de l'école",
      "hésiterait encore entre son programme au cégep",
      "porterait un hoodie même en pleine canicule",
      "aurait une crise existentielle par semaine (minimum)",
      "passerait 2 heures dans la salle de bain sans explication",
      "saurait tout mieux que ses parents (évidemment)",
      "aurait honte d'être vu en public avec sa famille"
    ]
  },

  // 🎓 JEUNE ADULTE (18-22 ans humains)
  {
    max: 22,
    phrases: [
      "partirait en appart et appellerait sa mère pour savoir comment faire bouillir de l'eau",
      "penserait savoir tout sur la vie (spoiler: non)",
      "passerait sa vie sur Instagram et TikTok",
      "aurait 2000 amis sur les réseaux et 3 vrais amis",
      "sortirait 4 soirs par semaine et se demanderait pourquoi est fatigué",
      "vivrait pour les vendredis soirs"
    ]
  },

  // 💼 DÉBUT CARRIÈRE (23-30 ans humains)
  {
    max: 30,
    phrases: [
      "commencerait sa carrière en buvant trop de café",
      "se demanderait encore ce qu'il veut faire de sa vie",
      "réaliserait que les impôts, c'est compliqué",
      "mangerait des avocado toasts et rêverait d'acheter une maison",
      "aurait 3 side hustles et un podcast",
      "commanderait UberEats 5 fois par semaine",
      "jonglerait entre Tinder et 'je veux m'installer'",
      "assisterait à 12 mariages par été",
      "s'inscrirait au gym en janvier et abandonnerait en février",
      "découvrirait que son métabolisme ralentit (oups)"
    ]
  },

  // 🏠 ADULTE ÉTABLI (31-40 ans humains)
  {
    max: 40,
    phrases: [
      "s'inquiéterait de son REER et de son hypothèque",
      "trouverait les ados bruyants et incompréhensibles",
      "se coucherait à 21h et trouverait ça cool",
      "conduirait un minivan et assumerait pleinement",
      "regarderait des émissions de réno et dirait 'on pourrait faire ça'",
      "connaîtrait tous les mots de la Reine des Neiges par cœur",
      "commencerait ses phrases par 'De mon temps...'",
      "ne comprendrait plus les nouveaux trends TikTok",
      "réaliserait que la musique de son époque passe maintenant sur les radios 'oldies'",
      "parlerait beaucoup de fibres et d'étirements",
      "dirait 'j'ai mal au dos' au moins une fois par jour"
    ]
  },

  // 🧘 MI-CARRIÈRE (41-55 ans humains)
  {
    max: 55,
    phrases: [
      "s'achèterait peut-être une moto ou une décapotable",
      "hésiterait entre teindre ses cheveux gris ou les assumer",
      "se demanderait où sont passées les 20 dernières années",
      "donnerait des conseils non-sollicités (mais bons!)",
      "maîtriserait l'art de la sieste de 20 minutes",
      "prendrait enfin le temps de lire ces livres empilés",
      "demanderait à ses enfants comment fonctionne son téléphone",
      "écrirait ses textos avec ponctuation et majuscules",
      "investirait dans un BBQ de luxe et des outils électriques",
      "commencerait à jardiner et trouverait ça relaxant"
    ]
  },

  // 🏌️ PRÉ-RETRAITE / JEUNE SENIOR (56-70 ans humains)
  {
    max: 70,
    phrases: [
      "serait probablement en train de jouer au golf",
      "planifierait son prochain voyage dans le Sud",
      "marcherait 10 000 pas par jour et le dirait à tout le monde",
      "prendrait sa retraite et ne saurait plus quoi faire de ses journées",
      "se lèverait à 5h du matin sans réveil (pourquoi?!)",
      "regarderait religieusement les nouvelles du matin",
      "gâterait ses petits-enfants et dirait 'de mon temps...'",
      "aurait 4000 photos de ses petits-enfants dans son téléphone",
      "passerait ses journées dans son cabanon ou son jardin",
      "aurait ENFIN le temps de faire tout ce qu'il remettait à plus tard",
      "ferait partie de 3 clubs sociaux différents"
    ]
  },

  // 👴 SENIOR (71 ans et plus)
  {
    max: 999,
    phrases: [
      "aurait vu tellement de choses qu'il s'étonnerait de rien",
      "raconterait les mêmes histoires 17 fois (mais elles sont bonnes!)",
      "donnerait les meilleurs conseils de vie (basés sur l'expérience)",
      "mangerait à 17h30 pile et se coucherait à 20h",
      "aurait une routine quotidienne gravée dans le marbre",
      "lirait le journal papier chaque matin avec son café",
      "serait ce grand-parent que tout le monde adore",
      "aurait toujours des bonbons dans ses poches",
      "aurait des histoires incroyables à raconter",
      "utiliserait encore un téléphone à clapet (et ça lui va bien)",
      "enverrait des emails avec 'Cordialement' même à sa famille",
      "serait une légende vivante de la famille",
      "aurait traversé une époque fascinante et en serait fier",
      "profiterait de chaque moment précieux",
      "vivrait ses années bonus au max!"
    ]
  }
];

// Espérances de vie basées sur études scientifiques (PMC, UK 2024)
// Base neutre : conditions moyennes (non stérilisé, mixte indoor/outdoor)
const CAT_BREEDS = [
    { value: 'mixed', name: 'Autre race ou croisé (domestique, gouttière)', lifespan: 12 },
    { value: 'birman', name: 'Birman', lifespan: 14.4 },
    { value: 'burmese', name: 'Burmese', lifespan: 14.4 },
    { value: 'siamese', name: 'Siamois', lifespan: 12.5 },
    { value: 'persian', name: 'Persan', lifespan: 12.5 },
    { value: 'british-shorthair', name: 'British Shorthair', lifespan: 9.6 },
    { value: 'maine-coon', name: 'Maine Coon', lifespan: 9.7 },
    { value: 'ragdoll', name: 'Ragdoll', lifespan: 9.0 },
    { value: 'abyssinian', name: 'Abyssin', lifespan: 10 },
    { value: 'bengal', name: 'Bengal', lifespan: 10.3 },
    { value: 'sphynx', name: 'Sphynx', lifespan: 6.7 },
    { value: 'russian-blue', name: 'Bleu Russe', lifespan: 13 },
    { value: 'scottish-fold', name: 'Scottish Fold', lifespan: 11.5 }
];

// Espérances de vie basées sur VetCompass UK 2022 (PMC9050668)
// Ces données reflètent la population réelle (majoritairement stérilisée, mix mâles/femelles)
const DOG_BREEDS = [
    { value: 'mixed', name: 'Croisé/Autre race', lifespan: null, size: 'medium', muzzle: 'mesocephalic', weightRange: null }, // Calculé selon poids
    { value: 'teckel', name: 'Teckel', lifespan: 12.0, size: 'small', muzzle: 'dolichocephalic', weightRange: '5-10' },
    { value: 'chihuahua', name: 'Chihuahua', lifespan: 7.9, size: 'small', muzzle: 'mesocephalic', weightRange: 'under-5' },
    { value: 'shih-tzu', name: 'Shih Tzu', lifespan: 11.0, size: 'small', muzzle: 'brachycephalic', weightRange: '5-10' },
    { value: 'yorkshire', name: 'Yorkshire', lifespan: 12.5, size: 'small', muzzle: 'mesocephalic', weightRange: 'under-5' },
    { value: 'jack-russell', name: 'Jack Russell', lifespan: 12.7, size: 'small', muzzle: 'mesocephalic', weightRange: '5-10' },
    { value: 'caniche', name: 'Caniche', lifespan: 14.2, size: 'medium', muzzle: 'mesocephalic', weightRange: '15-25' },
    { value: 'beagle', name: 'Beagle', lifespan: 9.8, size: 'medium', muzzle: 'mesocephalic', weightRange: '10-15' },
    { value: 'cocker', name: 'Cocker', lifespan: 11.3, size: 'medium', muzzle: 'mesocephalic', weightRange: '10-15' },
    { value: 'labrador', name: 'Labrador', lifespan: 11.8, size: 'large', muzzle: 'mesocephalic', weightRange: '25-40' },
    { value: 'golden-retriever', name: 'Golden Retriever', lifespan: 11.2, size: 'large', muzzle: 'mesocephalic', weightRange: '25-40' },
    { value: 'berger-allemand', name: 'Berger Allemand', lifespan: 10.2, size: 'large', muzzle: 'dolichocephalic', weightRange: '40-60' },
    { value: 'husky', name: 'Husky', lifespan: 9.5, size: 'large', muzzle: 'mesocephalic', weightRange: '40-60' },
    { value: 'bulldog-francais', name: 'Bouledogue Français', lifespan: 4.5, size: 'medium', muzzle: 'brachycephalic', weightRange: '15-25' },
    { value: 'boxer', name: 'Boxer', lifespan: 10.0, size: 'large', muzzle: 'brachycephalic', weightRange: '40-60' },
    { value: 'dogue-allemand', name: 'Dogue Allemand', lifespan: 8.5, size: 'giant', muzzle: 'mesocephalic', weightRange: 'over-60' },
    { value: 'saint-bernard', name: 'Saint-Bernard', lifespan: 8.0, size: 'giant', muzzle: 'mesocephalic', weightRange: 'over-60' },
    { value: 'dogue-bordeaux', name: 'Dogue de Bordeaux', lifespan: 5.5, size: 'giant', muzzle: 'brachycephalic', weightRange: 'over-60' },
    { value: 'bulldog-anglais', name: 'Bouledogue Anglais', lifespan: 7.4, size: 'medium', muzzle: 'brachycephalic', weightRange: '15-25' },
    { value: 'carlin', name: 'Carlin (Pug)', lifespan: 7.6, size: 'small', muzzle: 'brachycephalic', weightRange: '5-10' },
    { value: 'cavalier', name: 'Cavalier King Charles', lifespan: 10.4, size: 'small', muzzle: 'brachycephalic', weightRange: '5-10' },
    { value: 'border-collie', name: 'Border Collie', lifespan: 12.1, size: 'medium', muzzle: 'dolichocephalic', weightRange: '15-25' },
    { value: 'springer', name: 'Springer Spaniel', lifespan: 11.9, size: 'medium', muzzle: 'mesocephalic', weightRange: '15-25' },
    { value: 'staffie', name: 'Staffordshire Bull Terrier', lifespan: 11.3, size: 'medium', muzzle: 'brachycephalic', weightRange: '10-15' }
];

// Espérances de vie par poids basées sur PMC9989186 (2.3M chiens)
// Utilisées uniquement pour les races inconnues/croisées
const DOG_WEIGHT_RANGES = [
    { range: 'under-5', label: 'Moins de 11 lbs (5 kg)', visual: '🐕 Très petit (Chihuahua, Yorkshire)', avgWeight: 3, size: 'small', baseLifeExpectancy: 13.5 },
    { range: '5-10', label: '11-22 lbs (5-10 kg)', visual: '🐕 Petit (Jack Russell, Teckel)', avgWeight: 7.5, size: 'small', baseLifeExpectancy: 13.5 },
    { range: '10-15', label: '22-33 lbs (10-15 kg)', visual: '🐕 Petit-Moyen (Cocker, Beagle)', avgWeight: 12.5, size: 'medium', baseLifeExpectancy: 12.5 },
    { range: '15-25', label: '33-55 lbs (15-25 kg)', visual: '🐕 Moyen (Bulldog, Border Collie)', avgWeight: 20, size: 'medium', baseLifeExpectancy: 12.5 },
    { range: '25-40', label: '55-88 lbs (25-40 kg)', visual: '🐕 Grand (Labrador, Golden)', avgWeight: 32.5, size: 'large', baseLifeExpectancy: 11.5 },
    { range: '40-60', label: '88-132 lbs (40-60 kg)', visual: '🐕 Très Grand (Berger Allemand, Boxer)', avgWeight: 50, size: 'large', baseLifeExpectancy: 10.5 },
    { range: 'over-60', label: 'Plus de 132 lbs (60 kg)', visual: '🐕 Géant (Dogue Allemand, St-Bernard)', avgWeight: 70, size: 'giant', baseLifeExpectancy: 9.5 }
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
const getFunPhrase = (age: number, animalName: string, isFemale: boolean) => {
  const ageGroup = FUN_PHRASES.find(p => age <= p.max) || FUN_PHRASES[FUN_PHRASES.length - 1];
  const phrases = ageGroup.phrases;
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

  // Construire la phrase complète avec le nom et le pronom
  const pronoun = isFemale ? 'elle' : 'il';
  const fullPhrase = `Si ${animalName} était humain et avait cet âge, ${pronoun} ${randomPhrase}`;

  return fullPhrase;
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
    let lifeExpectancy = breedData ? breedData.lifespan : 12;

    // Mode de vie : indoor ajoute des années, outdoor en retire
    // Basé sur études montrant ~2 ans de différence indoor vs outdoor
    if (lifestyle === 'indoor') lifeExpectancy += 2;
    else if (lifestyle === 'outdoor') lifeExpectancy -= 3;
    // mixed = 0 (référence neutre)

    const bodyScoreMultipliers: Record<string, number> = {
      'very_underweight': 0.90,
      'underweight': 0.95,
      'ideal': 1.0,
      'overweight': 0.95, // Chats en léger surpoids vivent parfois plus longtemps (études PMC)
      'obese': 0.85
    };
    lifeExpectancy = lifeExpectancy * (bodyScoreMultipliers[bodyScore] || 1.0);

    // Stérilisation : +1 an (études montrent ~1-1.5 ans de gain)
    if (neutered) {
      lifeExpectancy += 1;
    }

    // Bonus croisé : +0.5 an (vigueur hybride)
    if (breed === 'mixed') {
      lifeExpectancy += 0.5;
    }

    // Femelle : +0.5 an (études montrent ~0.5-1 an de différence)
    if (sex === 'female') {
      lifeExpectancy += 0.5;
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
    const weightRangeData = DOG_WEIGHT_RANGES.find(r => r.range === formData.dogWeightRange);

    let lifeExpectancy: number;
    const isKnownBreed = breedData && breedData.lifespan !== null;

    if (isKnownBreed) {
      // Race connue : utiliser directement la donnée scientifique VetCompass
      // Ces données incluent déjà l'effet moyen de la stérilisation, du sexe et du museau
      lifeExpectancy = breedData.lifespan as number;
    } else {
      // Race inconnue/croisée : calculer selon le poids + modificateurs
      lifeExpectancy = weightRangeData?.baseLifeExpectancy || 12;

      // Modificateurs pour races inconnues uniquement
      const muzzleType = formData.dogMuzzle || 'mesocephalic';
      if (muzzleType === 'brachycephalic') {
        lifeExpectancy -= 1.5; // Museau écrasé : -1.5 ans
      } else if (muzzleType === 'dolichocephalic') {
        lifeExpectancy += 0.5; // Museau long : +0.5 an
      }

      // Femelle : +0.3 an (études montrent ~0.3 an de différence)
      if (sex === 'female') {
        lifeExpectancy += 0.3;
      }

      // Stérilisé : +0.5 an (effet modeste car études incluent ~85% stérilisés)
      if (neutered) {
        lifeExpectancy += 0.5;
      }
    }

    // Modificateur universel : score corporel (applicable à toutes les races)
    const bodyScoreMultipliers: Record<string, number> = {
      'very_underweight': 0.85,
      'underweight': 0.95,
      'ideal': 1.0,
      'overweight': 0.95,
      'obese': 0.85
    };
    lifeExpectancy = lifeExpectancy * (bodyScoreMultipliers[bodyScore] || 1.0);

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

    // Télécharger l'image automatiquement
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `vraiage-${result.name}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);

    // Détection mobile/desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Ouvrir la plateforme après téléchargement
    setTimeout(() => {
      switch(platform) {
        case 'facebook':
          if (isMobile) {
            // Sur mobile, essayer d'ouvrir l'app Facebook
            window.location.href = 'fb://facewebmodal/f?href=https://www.facebook.com/';
            // Fallback vers le web si l'app n'est pas installée
            setTimeout(() => {
              window.open('https://www.facebook.com/', '_blank');
            }, 500);
          } else {
            // Sur desktop, ouvrir Facebook directement
            window.open('https://www.facebook.com/', '_blank');
          }
          alert('📸 Image enregistrée !\n\n✅ Sur Facebook : Créez un nouveau post et ajoutez l\'image que vous venez de télécharger.\n\nL\'image est dans votre dossier Téléchargements (ou Galerie sur mobile).');
          break;
        case 'instagram':
          if (isMobile) {
            alert('📸 Image enregistrée dans votre Galerie !\n\n✅ Ouvrez Instagram et créez un nouveau post.\n✅ Sélectionnez l\'image "vraiage" que vous venez de télécharger.\n\nBonne publication ! 📱✨');
            // Essayer d'ouvrir l'app Instagram
            window.location.href = 'instagram://camera';
            // Fallback
            setTimeout(() => {
              window.open('https://www.instagram.com/', '_blank');
            }, 500);
          } else {
            alert('📸 Image téléchargée !\n\n📱 Instagram ne permet pas de publier depuis un ordinateur.\n\n✅ Transférez l\'image sur votre téléphone ou ouvrez instagram.com pour créer un post.');
            window.open('https://www.instagram.com/', '_blank');
          }
          break;
        default:
          alert('📸 Image téléchargée avec succès !');
      }
    }, 300);
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
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex justify-center mt-8 mb-8">
                <Image
                  src="/logo-transparent-texte.png"
                  alt="VraiÂge Logo"
                  width={600}
                  height={150}
                  className="object-contain w-full min-w-[50%]"
                  priority
                />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-1">
                Quel est le <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">VraiÂge</span> de ton compagnon ?
              </h1>
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
                className="group p-6 bg-white/95 backdrop-blur-sm rounded-2xl hover:scale-105 transition-all duration-300 border-2 border-white/50 hover:border-purple-400 shadow-xl hover:shadow-2xl text-center relative overflow-hidden"
                aria-label="Calculer l'âge de mon chat"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-pink-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center items-center" style={{ animation: 'float 3s ease-in-out infinite' }}>
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
                className="group p-6 bg-white/95 backdrop-blur-sm rounded-2xl hover:scale-105 transition-all duration-300 border-2 border-white/50 hover:border-orange-400 shadow-xl hover:shadow-2xl text-center relative overflow-hidden"
                aria-label="Calculer l'âge de mon chien"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-orange-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center items-center" style={{ animation: 'float 3s ease-in-out infinite' }}>
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
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
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
                    <div className="flex-1 w-full">
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
          <div className="space-y-6">
            {/* Zone de capture pour réseaux sociaux */}
            <div ref={resultsRef} className="mx-auto max-w-2xl bg-white p-6 rounded-xl space-y-6">
              {showDelayedContent && (
                <div className="text-center">
                  <div className="mb-2 flex justify-center">
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
                  {(() => {
                    const phrase = getFunPhrase(result.humanAge, result.name, result.isFemale);

                    return (
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-300 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                          <Laugh className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" strokeWidth={1.5} />
                          <p className="text-gray-800 text-lg leading-relaxed">
                            {phrase}
                          </p>
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
                </>
              )}
            </div>
            {/* Fin de la zone de capture */}

            {showDelayedContent && (
              <>

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
                Calculateur d'âge animal • Les résultats sont basés sur des moyennes
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
