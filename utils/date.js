export function getFormattedDate(date) {
  const isoString = date.toISOString().slice(0, 10);
  const [year, month, day] = isoString.split("-");
  return `${day}-${month}-${year}`;
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
