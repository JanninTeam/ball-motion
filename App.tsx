import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import AppNavigator from './src/Navigation';
import LoadingPage from './src/pages/LoadingPage';
import { createContext, useState } from 'react';

type Settings = any; // TODO: Add type
export const SettingsContext = createContext({
  units: 'metric',
  settings: {},
  setSettings: (settings: Settings) => {},
});

export default function App() {
  const [settings, setSettings] = useState<Settings>({});

  const [fontsLoaded] = useFonts({
    'Jost-Regular': require('./assets/fonts/Jost-Regular.ttf'),
    'Jost-SemiBold': require('./assets/fonts/Jost-SemiBold.ttf'),
    'Jost-Bold': require('./assets/fonts/Jost-Bold.ttf'),
  });

  if (!fontsLoaded) return <LoadingPage />;

  return (
    <>
      <SettingsContext.Provider
        value={{ settings, setSettings, units: 'metric' }}
      >
        <StatusBar />
        <AppNavigator />
      </SettingsContext.Provider>
    </>
  );
}
