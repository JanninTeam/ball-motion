import { createContext } from 'react';
import { SettingsType } from '../globals/settings';

export type TSettingsContext = {
  settings: SettingsType;
  setSettings: SetState<SettingsType>;
};

export const SettingsContext = createContext({} as TSettingsContext);
