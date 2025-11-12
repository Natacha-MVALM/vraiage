import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VraiÂge - Calculateur d'âge pour animaux",
  description: "Découvrez le vrai âge de votre chien ou chat avec notre calculateur basé sur des données scientifiques",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
