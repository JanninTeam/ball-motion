export const SPEEDS = ['mph', 'kph', 'm/s'] as const;
export const DISTANCES = ['yards', 'meters', 'feet'] as const;
export const SPORTS = [
  'golf',
  'baseball',
  'basketball',
  'tennis',
  'soccer',
] as const;

export type Speed = (typeof SPEEDS)[number];
export type Distance = (typeof DISTANCES)[number];
export type Sport = (typeof SPORTS)[number];

export type UnitEnum = 'speed' | 'distance';
export type UnitType = Speed | Distance;
export type Unit = Record<Sport, { speed: Speed; distance: Distance }>;
export type NewUnit = { speed: Speed } | { distance: Distance };

export const unitPresets = {
  imperial: {
    golf: { speed: 'mph', distance: 'yards' },
    baseball: { speed: 'mph', distance: 'feet' },
    basketball: { speed: 'mph', distance: 'feet' },
    tennis: { speed: 'mph', distance: 'feet' },
    soccer: { speed: 'mph', distance: 'feet' },
  },

  metric: {
    golf: { speed: 'kph', distance: 'yards' },
    baseball: { speed: 'kph', distance: 'meters' },
    basketball: { speed: 'kph', distance: 'meters' },
    tennis: { speed: 'kph', distance: 'meters' },
    soccer: { speed: 'kph', distance: 'meters' },
  },
};
