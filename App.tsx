import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import AppNavigator from './src/Navigation';
import LoadingPage from './src/pages/LoadingPage';
import { useEffect, useState } from 'react';
import { Settings } from './src/globals/settings';
import { users } from './sampleData/userData';
import WarningPage from './src/pages/WarningPage';
import { SettingsContext } from './src/context/settingsContext';
import { UserContext } from './src/context/userContext';

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

  const hasServerIp = process.env.EXPO_PUBLIC_SERVER_URL !== undefined;
  const [showWarning, setShowWarning] = useState(!hasServerIp);

  if (!fontsLoaded) return <LoadingPage />;

  if (showWarning) {
    return (
      <WarningPage
        message="No server IP set in .env file."
        fix="Set the EXPO_PUBLIC_SERVER_URL variable in the .env file to the IP address of your system."
        visible={true}
        setVisible={setShowWarning}
      />
    );
  }

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
