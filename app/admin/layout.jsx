import { Toaster } from "react-hot-toast";
import { sora, inter } from "../fonts";
import "../globals.css";

export const metadata = {
  title: "Administration — Paterne SEKA",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${sora.variable} ${inter.variable} antialiased bg-white text-navy`}>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        {children}
      </body>
    </html>
  );
}
