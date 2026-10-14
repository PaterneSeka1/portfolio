export const locales = ["fr", "en"];
export const defaultLocale = "fr";

export function isLocale(value) {
  return locales.includes(value);
}

/**
 * Builds a public URL path for a locale. French is the default locale and is
 * served without prefix ("/work"); English lives under "/en" ("/en/work").
 */
export function localePath(locale, path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** Removes the locale prefix from a pathname ("/en/work" -> "/work"). */
export function stripLocale(pathname) {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

export const ogLocales = { fr: "fr_FR", en: "en_US" };
