import { Gravity } from './gravity';

export const Settings = {
  currentPlanet: 'earth' as keyof typeof Gravity,
  units: 'metric', // Metric or Imperial
  darkMode: false, // bool
  notificationsEnabled: true, // bool
  language: 'English', // Language
};

export type SettingsType = typeof Settings;
