import { getHexOpacity } from '../src/util/getHexOpacity';
import { describe, expect, it } from '@jest/globals';

describe('getHexOpacity', () => {
  it('should return the correct hex value for opacity 0.25', () => {
    const opacity = 0.25;
    const expected = '40';
    const result = getHexOpacity(opacity);
    expect(result).toEqual(expected);
  });

  it('should return the correct hex value for opacity 0.75', () => {
    const opacity = 0.75;
    const expected = 'bf';
    const result = getHexOpacity(opacity);
    expect(result).toEqual(expected);
  });

  it('should return the correct hex value for opacity 0.9', () => {
    const opacity = 0.9;
    const expected = 'e6';
    const result = getHexOpacity(opacity);
    expect(result).toEqual(expected);
  });

  it('should return the correct hex value for opacity 0', () => {
    const opacity = 0;
    const expected = '00';
    const result = getHexOpacity(opacity);
    expect(result).toEqual(expected);
  });

  it('should return the correct hex value for opacity 1', () => {
    const opacity = 1;
    const expected = 'ff';
    const result = getHexOpacity(opacity);
    expect(result).toEqual(expected);
  });

  it('should return the correct hex value for opacity 0.5', () => {
    const opacity = 0.5;
    const expected = '80';
    const result = getHexOpacity(opacity);
    expect(result).toEqual(expected);
  });

  it('should return the correct hex value for opacity 0.33', () => {
    const opacity = 0.33;
    const expected = '54';
    const result = getHexOpacity(opacity);
    expect(result).toEqual(expected);
  });
});
