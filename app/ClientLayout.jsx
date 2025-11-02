'use client'

import { useThemeStore } from "./store/themeStore";
import Navbar from "./(screen)/components/Navbar";
import Footer from "./(screen)/components/Footer";

export default function ClientLayout({ children }) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="min-h-screen transition-colors duration-700">
        {children}
      </main>
      <Footer theme={theme} />
    </>
  );
}
