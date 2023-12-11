import { formatDate } from '../src/util/formatDate';
import { describe, expect, it } from '@jest/globals';

describe('formatDate', () => {
  it('should format a date in the correct format', () => {
    const date = 1641022496000; // January 1, 2022 12:34:56 PM UTC
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('2022-1-1');
  });

  it('should handle leading zeros in the date', () => {
    const date = 1643896087000; // February 3, 2022 09:08:07 AM UTC
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('2022-2-3');
  });

  it('should handle single-digit minutes', () => {
    const date = 1649156584000; // April 5, 2022 12:03:04 PM UTC
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('2022-4-5');
  });

  it('should handle single-digit seconds', () => {
    const date = 1651877645000; // May 6, 2022 12:34:05 PM UTC
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('2022-5-6');
  });

  it('should handle single-digit hours', () => {
    const date = 1646425567000; // March 4, 2022 05:06:07 AM UTC
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('2022-3-4');
  });
});
