"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Fonction de partage du portfolio
  const sharePortfolio = async () => {
    const shareData = {
      title: "Paterne SEKA",
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Lien copié dans le presse-papier !");
      }
    } catch (err) {
      console.error("Erreur lors du partage :", err);
    }
  };

  return (
    <nav
      className={`w-full flex justify-between items-center py-4 px-6 fixed top-0 left-0 z-50 backdrop-blur-md transition-colors duration-500
        ${theme === "dark" ? "bg-gray-900/70 text-white" : "bg-white/70 text-gray-900"}`}
    >
      <Link
        href="/"
        className="flex items-center gap-3 text-2xl font-bold group"
        onClick={closeMenu}
      >
        <div
          className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-300
            ${theme === "dark"
              ? "border-green-400 group-hover:border-green-300"
              : "border-green-600 group-hover:border-green-500"
            } group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.6)]`}
        >
          <Image
            src="/me.jpeg"
            alt="Photo de Paterne SEKA"
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>

        <span
          className={`text-transparent bg-clip-text bg-gradient-to-r
            ${theme === "dark" ? "from-blue-400 to-green-500" : "from-blue-600 to-green-700"}`}
        >
          Paterne SEKA
        </span>
      </Link>

      {/* Menu Desktop */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/projects" className="hover:text-red-500 transition-colors">
          Projets
        </Link>
        <Link href="/skills" className="hover:text-red-500 transition-colors">
          Skills
        </Link>
        <Link href="/contact" className="hover:text-red-500 transition-colors">
          Contact
        </Link>
        <Link href="/about" className="hover:text-red-500 transition-colors">
          About
        </Link>

        {/* Bouton de thème */}
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full shadow-md hover:scale-105 transition-transform bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
          title="Changer de thème"
        >
          {theme === "dark" ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m9-9h-1.5M4.5 12H3m15.364-6.364l-1.06 1.06M6.696 17.304l-1.06 1.06m0-12.728l1.06 1.06m10.608 10.608l1.06 1.06M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-yellow-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21a9.75 9.75 0 010-19.5c.967 0 1.905.147 2.789.42a.75.75 0 01.293 1.279 7.5 7.5 0 006.67 12.803z" />
            </svg>
          )}
        </button>

        {/* Bouton de partage */}
        <button
          onClick={sharePortfolio}
          className="p-3 rounded-full shadow-md hover:scale-105 transition-transform bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
          title="Partager le portfolio"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 8.25l7.5-7.5m0 0v7.5m0-7.5h-7.5M16.5 16.5l-7.5 7.5m0 0v-7.5m0 7.5h7.5" />
          </svg>
        </button>
      </div>

      {/* Menu Mobile */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full shadow-md hover:scale-105 transition-transform bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
          title="Changer de thème"
        >
          {theme === "dark" ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m9-9h-1.5M4.5 12H3m15.364-6.364l-1.06 1.06M6.696 17.304l-1.06 1.06m0-12.728l1.06 1.06m10.608 10.608l1.06 1.06M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-yellow-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21a9.75 9.75 0 010-19.5c.967 0 1.905.147 2.789.42a.75.75 0 01.293 1.279 7.5 7.5 0 006.67 12.803z" />
            </svg>
          )}
        </button>

        <button
          onClick={sharePortfolio}
          className="p-3 rounded-full shadow-md hover:scale-105 transition-transform bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
          title="Partager le portfolio"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 8.25l7.5-7.5m0 0v7.5m0-7.5h-7.5M16.5 16.5l-7.5 7.5m0 0v-7.5m0 7.5h7.5" />
          </svg>
        </button>

        {/* Burger Menu */}
        <button
          onClick={toggleMenu}
          className="p-3 rounded-full shadow-md hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Ouvrir le menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Liens Mobile */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out shadow-lg
          ${theme === "dark" ? "bg-gray-900/95 text-white" : "bg-white/95 text-gray-900"}
          ${isMenuOpen ? "max-h-screen opacity-100 visible" : "max-h-0 opacity-0 invisible overflow-hidden"}`}
      >
        <div className="flex flex-col p-6 space-y-4">
          <Link href="/projects" className="hover:text-red-500 transition-colors text-lg" onClick={closeMenu}>
            Projets
          </Link>
          <Link href="/skills" className="hover:text-red-500 transition-colors text-lg" onClick={closeMenu}>
            Skills
          </Link>
          <Link href="/contact" className="hover:text-red-500 transition-colors text-lg" onClick={closeMenu}>
            Contact
          </Link>
          <Link href="/about" className="hover:text-red-500 transition-colors text-lg" onClick={closeMenu}>
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
