const monthYear = (date, locale) =>
  new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(date)
  );

/** "mars 2025 – aujourd'hui", falling back to the free-text period. */
export function formatExperiencePeriod(experience, locale, presentLabel) {
  if (experience.startDate) {
    const start = monthYear(experience.startDate, locale);
    const end = experience.current || !experience.endDate ? presentLabel : monthYear(experience.endDate, locale);
    return `${start} – ${end}`;
  }
  if (experience.current && !experience.period) return presentLabel;
  return experience.period || null;
}
