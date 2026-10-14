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
      <body className={`${sora.variable} ${inter.variable} antialiased bg-[#f5f6f8] text-navy`}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { borderRadius: "10px", fontSize: "14px", color: "#0d1b2a", boxShadow: "0 8px 30px rgba(13,27,42,0.12)" },
            success: { iconTheme: { primary: "#059669", secondary: "#fff" } },
          }}
        />
        {children}
      </body>
    </html>
  );
}
