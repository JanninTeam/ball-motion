import { useFonts } from 'expo-font';
import AppNavigator from './src/Navigation';
import LoadingPage from './src/pages/LoadingPage';
import { StatusBar } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Jost-Regular': require('./assets/fonts/Jost-Regular.ttf'),
    'Jost-SemiBold': require('./assets/fonts/Jost-SemiBold.ttf'),
    'Jost-Bold': require('./assets/fonts/Jost-Bold.ttf'),
  });

  if (!fontsLoaded) return <LoadingPage />;
  return (
    <>
      <StatusBar />
      <AppNavigator />
    </>
  );
}
