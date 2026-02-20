"use client";
import React from "react";
import { useThemeStore } from "../../store/themeStore";
import "./shooting-stars.css";

const pseudoRandom = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

export default function ShootingStars() {
  const { theme } = useThemeStore();

  const colors =
    theme === "dark"
      ? ["#ffffff", "#00d4ff", "#9b59b6"]
      : ["#80c8ff", "#b6ff80", "#ff80bf"];

  return (
    <div className="shooting-stars-container">
      {Array.from({ length: 20 }).map((_, i) => {
        const x = pseudoRandom(i + 1);
        const duration = 2 + pseudoRandom((i + 1) * 3) * 3;
        const color = colors[Math.floor(pseudoRandom((i + 1) * 7) * colors.length)];

        return (
          <div
            key={i}
            className="star"
            style={{
              "--x": x,
              "--duration": `${duration}s`,
              "--color": color,
            }}
          ></div>
        );
      })}
    </div>
  );
}
