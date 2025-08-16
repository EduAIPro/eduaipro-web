export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function removeUnitModulePatternsExtended(input: string): string {
  return input
    .replace(/\b(Unit|Module)\s+\d{1,2}\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}
