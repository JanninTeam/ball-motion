// TODO: Create different format types for formatDate
// TODO: Once this is updated, update the tests to reflect the new format types
type FormatType = 'YYYY-MM-DD';
type Options = {
  includeZero?: boolean;
};

export function formatDate(
  date: number,
  formatType: FormatType = 'YYYY-MM-DD',
  options: Options = { includeZero: true }
): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${year}-${month}-${day}`;
}
