import { unitPresets } from '../constants/units';
import { Gravity } from './gravity';

export const Settings = {
  currentPlanet: 'earth' as keyof typeof Gravity,
  units: unitPresets.imperial,
  darkMode: false, // bool
  notificationsEnabled: true, // bool
  language: 'English', // Language
};

export type SettingsType = typeof Settings;

export type TSettingsContext = {
  settings: SettingsType;
  setSettings: SetState<SettingsType>;
};
