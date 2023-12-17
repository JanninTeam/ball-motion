import { useFonts } from 'expo-font';
import AppNavigator from './src/Navigation';
import LoadingPage from './src/pages/LoadingPage';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Jost-Regular': require('./assets/fonts/Jost-Regular.ttf'),
    'Jost-SemiBold': require('./assets/fonts/Jost-SemiBold.ttf'),
    'Jost-Bold': require('./assets/fonts/Jost-Bold.ttf'),
  });

  if (!fontsLoaded) return <LoadingPage />;
  return <AppNavigator />;
}
