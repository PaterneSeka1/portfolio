import localFont from "next/font/local";

export const sora = localFont({
  src: "./fonts/sora-latin-wght-normal.woff2",
  variable: "--font-sora",
  weight: "100 800",
  display: "swap",
});

export const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
