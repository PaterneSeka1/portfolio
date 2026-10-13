import fr from "./dictionaries/fr";
import en from "./dictionaries/en";
import { defaultLocale, isLocale } from "./config";
import { frenchTypography, mapStrings } from "./typography";

const dictionaries = {
  fr: mapStrings(fr, frenchTypography),
  en,
};

export function getDictionary(locale) {
  return dictionaries[isLocale(locale) ? locale : defaultLocale];
}
