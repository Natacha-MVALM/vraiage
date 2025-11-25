import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL('https://vraiage.com'),
  title: {
    default: "VraiÂge - Calculateur d'âge pour animaux de compagnie",
    template: "%s | VraiÂge"
  },
  description: "Découvrez le vrai âge biologique de votre chien ou chat avec notre calculateur scientifique. Basé sur des données vétérinaires pour chats et chiens de toutes races.",
  keywords: ["âge chien", "âge chat", "calculateur âge animal", "âge biologique chien", "âge biologique chat", "vétérinaire", "santé animale", "espérance de vie chien", "espérance de vie chat"],
  authors: [{ name: "Dr. Natacha Barrette" }],
  creator: "Dr. Natacha Barrette",
  publisher: "VraiÂge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/logo-icon.svg',
    apple: '/logo-icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: 'https://vraiage.com',
    title: "VraiÂge - Calculateur d'âge pour chiens et chats",
    description: "Découvrez le vrai âge biologique de votre animal avec notre calculateur scientifique créé par une vétérinaire.",
    siteName: 'VraiÂge',
    images: [
      {
        url: '/logo-icon.svg',
        width: 1200,
        height: 1200,
        alt: 'VraiÂge Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: "VraiÂge - Calculateur d'âge pour animaux",
    description: "Découvrez le vrai âge biologique de votre chien ou chat",
    images: ['/logo-icon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'votre-code-google-search-console',
    // yandex: 'votre-code-yandex',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="canonical" href="https://vraiage.com" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
