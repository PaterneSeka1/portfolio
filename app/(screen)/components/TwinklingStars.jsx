"use client";
import React from "react";
import { useThemeStore } from "../../store/themeStore";
import "./twinkling-stars.css";

const pseudoRandom = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

export default function TwinklingStars() {
  const { theme } = useThemeStore();

  const colors =
    theme === "dark"
      ? ["#ffffff", "#00d4ff", "#9b59b6"]
      : ["#80c8ff", "#b6ff80", "#ff80bf"];

  return (
    <div className="twinkling-stars">
      {Array.from({ length: 120 }).map((_, i) => {
        const x = pseudoRandom(i + 11);
        const y = pseudoRandom((i + 1) * 5);
        const delay = `${pseudoRandom((i + 1) * 7) * 5}s`;
        const duration = `${2 + pseudoRandom((i + 1) * 9) * 4}s`;
        const opacity = pseudoRandom((i + 1) * 13);
        const color = colors[Math.floor(pseudoRandom((i + 1) * 17) * colors.length)];

        return (
          <div
            key={i}
            className="twinkle"
            style={{
              "--x": x,
              "--y": y,
              "--delay": delay,
              "--duration": duration,
              "--opacity": opacity,
              "--color": color,
            }}
          ></div>
        );
      })}
    </div>
  );
}
