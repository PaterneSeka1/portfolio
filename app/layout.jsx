import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Paterne SEKA — Full-Stack Engineer & Product Builder",
  description:
    "Portfolio de Paterne SEKA, Full-Stack Engineer & Product Builder. Conception et développement d'applications web, plateformes métier et produits numériques robustes et sécurisés.",
};

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
