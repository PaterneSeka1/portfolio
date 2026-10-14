/** Web app manifest: name, colours and the PS icon used when the site is pinned or installed. */
export default function manifest() {
  return {
    name: "Paterne SEKA — Full-Stack Engineer & Product Builder",
    short_name: "Paterne SEKA",
    description: "Portfolio de Paterne SEKA, Full-Stack Engineer & Product Builder basé à Abidjan.",
    start_url: "/",
    display: "browser",
    background_color: "#09131e",
    theme_color: "#09131e",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  }
}
