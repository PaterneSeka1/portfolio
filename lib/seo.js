import { defaultLocale, localePath, locales, ogLocales } from "./i18n/config";
import { getDictionary } from "./i18n";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");


/** hreflang alternates for a locale-independent path ("/work/rh-vedem"). */
export function languageAlternates(path) {
  const languages = Object.fromEntries(locales.map((locale) => [locale, localePath(locale, path)]));
  return { ...languages, "x-default": localePath(defaultLocale, path) };
}

/**
 * Page metadata with canonical URL, hreflang alternates, Open Graph and Twitter
 * card. `path` is the locale-independent path of the page.
 */
export function buildMetadata({ locale, path = "/", title, description, type = "website" }) {
  const dict = getDictionary(locale);
  const url = localePath(locale, path);
  const plainTitle = typeof title === "object" && title ? title.absolute : title;
  const socialTitle = plainTitle
    ? plainTitle.includes(dict.meta.siteName)
      ? plainTitle
      : `${plainTitle} — ${dict.meta.siteName}`
    : dict.meta.defaultTitle;
  const socialDescription = description || dict.meta.description;
  const image = {
    url: `/og/${locale}`,
    width: 1200,
    height: 630,
    alt: dict.meta.ogAlt,
    type: "image/png",
  };

  return {
    metadataBase: new URL(SITE_URL),
    ...(title ? { title } : {}),
    description: socialDescription,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      siteName: dict.meta.siteName,
      url,
      title: socialTitle,
      description: socialDescription,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [image],
    },
  };
}
