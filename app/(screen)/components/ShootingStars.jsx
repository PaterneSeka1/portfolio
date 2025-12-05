"use client";
import React from "react";
import { useThemeStore } from "../../store/themeStore";
import "./shooting-stars.css";

export default function ShootingStars() {
  const { theme } = useThemeStore();

  // Palette selon thème
  const colors = theme === "dark"
    ? ["#ffffff", "#00d4ff", "#9b59b6"] // blanc, bleu néon, violet
    : ["#80c8ff", "#b6ff80", "#ff80bf"]; // bleu pastel, vert clair, rose pastel

  return (
    <div className="shooting-stars-container">
      {Array.from({ length: 20 }).map((_, i) => {
        const randomX = Math.random();
        const randomDuration = 2 + Math.random() * 3;
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <div
            key={i}
            className="star"
            style={{
              "--x": randomX,
              "--duration": `${randomDuration}s`,
              "--color": color,
            }}
          ></div>
        );
      })}
    </div>
  );
}
