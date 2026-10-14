const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" });
const relative = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });

export function formatDate(value) {
  return value ? dateFormatter.format(new Date(value)) : "—";
}

/** "il y a 3 jours", "hier", or a date beyond a month. */
export function formatRelative(value, now = Date.now()) {
  if (!value) return "—";
  const diff = new Date(value).getTime() - now;
  const minutes = Math.round(diff / 60000);
  if (Math.abs(minutes) < 60) return relative.format(minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return relative.format(hours, "hour");
  const days = Math.round(hours / 24);
  if (Math.abs(days) < 30) return relative.format(days, "day");
  return formatDate(value);
}
