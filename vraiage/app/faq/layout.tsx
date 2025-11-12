import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Questions fréquentes | VraiÂge",
  description: "Toutes vos questions sur le calculateur d'âge pour chats et chiens. Comment fonctionne VraiÂge, fiabilité des résultats, espérance de vie et plus encore.",
  keywords: ["FAQ calculateur âge chat", "FAQ calculateur âge chien", "questions âge animal", "espérance de vie chat", "espérance de vie chien", "calculateur vétérinaire"],
  openGraph: {
    title: "FAQ - Questions fréquentes | VraiÂge",
    description: "Toutes vos questions sur le calculateur d'âge pour chats et chiens",
    type: "website",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
