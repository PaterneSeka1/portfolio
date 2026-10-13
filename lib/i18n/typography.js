const NBSP = " ";
const NNBSP = " ";

/**
 * French typographic rules applied at render time, so that both seed content
 * and text typed in the admin follow them:
 * - non-breaking space before ":" and inside « »;
 * - narrow non-breaking space before ";", "!" and "?";
 * - typographic apostrophe.
 * Strings without a space before the punctuation (URLs, query strings) are left untouched.
 */
export function frenchTypography(text) {
  if (typeof text !== "string" || text.length === 0) return text;
  return text
    .replace(/[   ]+:/g, `${NBSP}:`)
    .replace(/[   ]+([;!?])/g, `${NNBSP}$1`)
    .replace(/«[  ]*/g, `«${NBSP}`)
    .replace(/[  ]*»/g, `${NBSP}»`)
    .replace(/(\p{L})'(\p{L})/gu, "$1’$2");
}

/** Applies a string transform to every string of a plain object/array tree. */
export function mapStrings(value, transform) {
  if (typeof value === "string") return transform(value);
  if (Array.isArray(value)) return value.map((item) => mapStrings(item, transform));
  if (value && typeof value === "object" && !(value instanceof Date)) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, mapStrings(item, transform)]));
  }
  return value;
}
