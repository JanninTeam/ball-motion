import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import AppNavigator from './src/Navigation';
import LoadingPage from './src/pages/LoadingPage';
import { createContext, useEffect, useState } from 'react';
import { Settings, TSettingsContext } from './src/globals/settings';
import { users } from './sampleData/userData';

type TUserContext = { user: User | null; setUser: SetState<User | null> };
export const SettingsContext = createContext({} as TSettingsContext);
export const UserContext = createContext({} as TUserContext);

export default function App() {
  const [user, setUser] = useState<User | null>(users[0]);
  const [settings, setSettings] = useState(Settings);

  useEffect(() => {
    if (!user) return;

    setSettings(() => user.prefferedSettings);
  }, [user]);

  // TODO: Have this in Realm or something
  useEffect(() => {
    if (!user) return;
    user.prefferedSettings = settings;
  }, [settings]);

  const [fontsLoaded] = useFonts({
    'Jost-Regular': require('./assets/fonts/Jost-Regular.ttf'),
    'Jost-SemiBold': require('./assets/fonts/Jost-SemiBold.ttf'),
    'Jost-Bold': require('./assets/fonts/Jost-Bold.ttf'),
  });

  if (!fontsLoaded) return <LoadingPage />;

  return (
    <>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <UserContext.Provider value={{ user, setUser }}>
          <StatusBar />
          <AppNavigator />
        </UserContext.Provider>
      </SettingsContext.Provider>
    </>
  );
}
