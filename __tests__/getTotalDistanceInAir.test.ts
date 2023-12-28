import { getTotalDistanceInAir } from '../src/util/getAnalytics';
import { describe, expect, it } from '@jest/globals';

// All the expected values were calculated from this website:
// https://amesweb.info/Physics/Projectile-Motion-Calculator.aspx

const roundingError = 0.00005;
describe('getTotalDistanceInAir', () => {
  it('calculates the total distance correctly for a given set of parameters', () => {
    const distanceProps = {
      speedLossAvg: 0.5,
      initialSpeed: 10,
      direction: 45,
    };

    const expectedDistance = 10.19368;
    const result = getTotalDistanceInAir(distanceProps);

    // My calculations are exact while the website is rounded, so we need to check if the values are within a certain range
    expect(result).toBeGreaterThanOrEqual(expectedDistance - roundingError);
    expect(result).toBeLessThanOrEqual(expectedDistance + roundingError);
  });

  it('calculates the total distance correctly going straight up', () => {
    const distanceProps = {
      speedLossAvg: 0,
      initialSpeed: 10,
      direction: 90,
    };

    // Should be 0 because the ball is going straight up
    const expectedDistance = 0;
    const result = getTotalDistanceInAir(distanceProps);

    expect(result).toBeGreaterThanOrEqual(expectedDistance - roundingError);
    expect(result).toBeLessThanOrEqual(expectedDistance + roundingError);
  });

  it('calculates the total distance correctly for random parameters', () => {
    const distanceProps = {
      speedLossAvg: 0,
      initialSpeed: 100,
      direction: 30,
    };

    const expectedDistance = 882.79858;
    const result = getTotalDistanceInAir(distanceProps);

    expect(result).toBeGreaterThanOrEqual(expectedDistance - roundingError);
    expect(result).toBeLessThanOrEqual(expectedDistance + roundingError);
  });

  it('calculates the total distance correctly for random parameters', () => {
    const distanceProps = {
      speedLossAvg: 0,
      initialSpeed: 241.3,
      direction: 63,
    };

    const expectedDistance = 4801.79131;
    const result = getTotalDistanceInAir(distanceProps);

    expect(result).toBeGreaterThanOrEqual(expectedDistance - roundingError);
    expect(result).toBeLessThanOrEqual(expectedDistance + roundingError);
  });
});
