"use client";
import React from "react";
import { useThemeStore } from "../../store/themeStore";
import "./twinkling-stars.css";

export default function TwinklingStars() {
  const { theme } = useThemeStore();

  const colors = theme === "dark"
    ? ["#ffffff", "#00d4ff", "#9b59b6"]
    : ["#80c8ff", "#b6ff80", "#ff80bf"];

  return (
    <div className="twinkling-stars">
      {Array.from({ length: 120 }).map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <div
            key={i}
            className="twinkle"
            style={{
              "--x": Math.random(),
              "--y": Math.random(),
              "--delay": `${Math.random() * 5}s`,
              "--duration": `${2 + Math.random() * 4}s`,
              "--opacity": Math.random(),
              "--color": color,
            }}
          ></div>
        );
      })}
    </div>
  );
}
