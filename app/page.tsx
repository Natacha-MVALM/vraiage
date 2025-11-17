import VraiAge from '@/components/VraiAge';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'VraiÂge',
    description: 'Calculateur d\'âge biologique pour chiens et chats basé sur des données scientifiques',
    url: 'https://vraiage.com',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD',
    },
    author: {
      '@type': 'Person',
      name: 'Dr. Natacha Barrette',
      jobTitle: 'Vétérinaire',
      description: 'Vétérinaire avec plus de 30 ans d\'expérience',
    },
    inLanguage: 'fr-CA',
    keywords: 'âge chien, âge chat, calculateur âge animal, vétérinaire, santé animale',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VraiAge />
    </>
  );
}
