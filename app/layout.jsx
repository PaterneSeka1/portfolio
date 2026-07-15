import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { getSiteSettings } from "../lib/db/settings";
import { getProfile } from "../lib/db/profile";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata() {
  const [settings, profile] = await Promise.all([getSiteSettings(), getProfile()]);

  const title = settings?.seoTitle || `${profile?.name ?? "Paterne SEKA"} — ${profile?.title ?? "Full-Stack Engineer & Product Builder"}`;
  const description =
    settings?.seoDescription ||
    profile?.promise ||
    "Portfolio de Paterne SEKA, Full-Stack Engineer & Product Builder. Conception et développement d'applications web, plateformes métier et produits numériques robustes et sécurisés.";
  const ogImage = settings?.ogImage;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: profile?.name ?? "Paterne SEKA",
      title,
      description,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${sora.variable} ${inter.variable} antialiased`}>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        {children}
      </body>
    </html>
  );
}
