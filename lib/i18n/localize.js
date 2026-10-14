import { defaultLocale } from "./config";
import { frenchTypography, mapStrings } from "./typography";

/**
 * Content is stored in French in the regular columns; English translations live
 * in an optional `en` JSON column holding the same keys. Any key missing from
 * the translation falls back to the French value, so a partially translated
 * entry never renders empty.
 */
function isFilled(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

function mergeTranslation(base, translation) {
  if (!translation || typeof translation !== "object") return base;
  const result = { ...base };
  for (const [key, value] of Object.entries(translation)) {
    if (!isFilled(value)) continue;
    const current = base?.[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      current &&
      typeof current === "object" &&
      !Array.isArray(current)
    ) {
      result[key] = mergeTranslation(current, value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

export function localize(entity, locale) {
  if (!entity) return entity;
  const { en, ...base } = entity;
  if (locale === defaultLocale) return mapStrings(base, frenchTypography);
  return mergeTranslation(base, en);
}

export function localizeAll(entities, locale) {
  return (entities ?? []).map((entity) => localize(entity, locale));
}
