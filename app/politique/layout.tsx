import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | VraiÂge",
  description: "Politique de confidentialité conforme à la Loi 25 (Québec). Protection de vos données personnelles, cookies, droits RGPD et transparence totale.",
  keywords: ["politique confidentialité", "Loi 25 Québec", "protection données", "RGPD", "vie privée", "cookies"],
  openGraph: {
    title: "Politique de confidentialité | VraiÂge",
    description: "Politique de confidentialité conforme à la Loi 25 (Québec)",
    type: "website",
  },
};

export default function PolitiqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
