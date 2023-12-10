export function getHexOpacity(opacity: number): string {
  const hex = Math.round(opacity * 255).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
