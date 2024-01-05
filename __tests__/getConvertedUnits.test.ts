import getConvertedUnits from '../src/util/getConvertedUnits';
import { SettingsType } from '../src/globals/settings';
import { Sport } from '../src/constants/units';
import { it, expect } from '@jest/globals';

const demoSettings: SettingsType = {
  currentPlanet: 'earth',
  units: {
    golf: { speed: 'mph', distance: 'yards' },
    baseball: { speed: 'kph', distance: 'meters' },
    basketball: { speed: 'm/s', distance: 'feet' },
    tennis: { speed: 'mph', distance: 'feet' },
    soccer: { speed: 'mph', distance: 'feet' },
  },
  darkMode: false,
  notificationsEnabled: true,
  language: 'English',
};

// All of the following values were calculated using Google's unit converter
it('converts speed to mph correctly', () => {
  const converted = getConvertedUnits({
    value: 1,
    settings: demoSettings,
    sport: 'golf' as Sport,
    unitType: 'speed',
  });

  expect(converted).toEqual({ value: 2.23694, unit: 'mph' });
});

it('converts speed to kph correctly', () => {
  const converted = getConvertedUnits({
    value: 1,
    settings: demoSettings,
    sport: 'baseball' as Sport,
    unitType: 'speed',
  });

  expect(converted).toEqual({ value: 3.6, unit: 'kph' });
});

it('converts speed to m/s correctly', () => {
  const converted = getConvertedUnits({
    value: 1,
    settings: demoSettings,
    sport: 'basketball' as Sport,
    unitType: 'speed',
  });

  expect(converted).toEqual({ value: 1, unit: 'm/s' });
});

// Distance tests
it('converts distance to yards correctly', () => {
  const converted = getConvertedUnits({
    value: 1,
    settings: demoSettings,
    sport: 'golf' as Sport,
    unitType: 'distance',
  });

  expect(converted).toEqual({ value: 1.09361, unit: 'yards' });
});

it('converts distance to meters correctly', () => {
  const converted = getConvertedUnits({
    value: 1,
    settings: demoSettings,
    sport: 'baseball' as Sport,
    unitType: 'distance',
  });

  expect(converted).toEqual({ value: 1, unit: 'meters' });
});

it('converts distance to feet correctly', () => {
  const converted = getConvertedUnits({
    value: 1,
    settings: demoSettings,
    sport: 'basketball' as Sport,
    unitType: 'distance',
  });

  expect(converted).toEqual({ value: 3.28084, unit: 'feet' });
});
