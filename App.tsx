import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import AppNavigator from './src/Navigation';
import LoadingPage from './src/pages/LoadingPage';
import { createContext, useState } from 'react';
import { Settings, SettingsType } from './src/globals/settings';

type TSettingsContext = {
  settings: SettingsType;
  setSettings: SetState<SettingsType>;
};

export const SettingsContext = createContext({} as TSettingsContext);

export default function App() {
  const [settings, setSettings] = useState(Settings);

  const [fontsLoaded] = useFonts({
    'Jost-Regular': require('./assets/fonts/Jost-Regular.ttf'),
    'Jost-SemiBold': require('./assets/fonts/Jost-SemiBold.ttf'),
    'Jost-Bold': require('./assets/fonts/Jost-Bold.ttf'),
  });

  if (!fontsLoaded) return <LoadingPage />;

  return (
    <>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <StatusBar />
        <AppNavigator />
      </SettingsContext.Provider>
    </>
  );
}
