export function isDefined(value: unknown): boolean {
  if (!value) return false;
  // if (isNaN(value as number)) return false;

  return true;
}
